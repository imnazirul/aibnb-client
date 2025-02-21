"use client"

import Link from "next/link";
import {useEffect} from "react";
import {useParams, usePathname} from "next/navigation";
import {default as URL} from 'url'

const Sidebar = ({title, menu}) => {

    useEffect(() => {
        const items = document.querySelectorAll('.menu > li');
        items.forEach(item => {
            let link = item.querySelector('a');
            let submenu = item.querySelector('.submenu');
            if (!!link && !!submenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('click')
                    link.classList.toggle('active');
                    submenu.classList.toggle('active');
                    submenu.style.maxHeight = submenu.classList.contains('active') ? submenu.scrollHeight + "px" : 0;
                })
            }
        })
    }, [])

    const pathName = usePathname()
    const params = useParams()
    const matchParamsUrl = (path) => {
        for (let key in params) {
            path = path.replace(`:${key}`, params[key])
        }
        return path === pathName
    }

    const urlToPathName = (url) => {
        url = URL.parse(url)
        return url.pathname
    }


    useEffect(() => {
        const items = document.querySelectorAll('.menu a');
        let activeItem
        items.forEach(item => {
            item.classList.remove('active')
            let itemParent = item.parentElement.parentElement
            if (itemParent.classList.contains('submenu')) {
                itemParent.classList.remove('active')
                itemParent.style.maxHeight = 0
                itemParent.parentElement.firstChild?.classList?.remove('active')
            }
            let find = menu.reduce((acc, item) => {
                if (item.href === pathName) {
                    return item
                }
                if (item.child) {
                    return item.child.find(item => item.href === pathName || item.childHrefs?.find(matchParamsUrl)) || acc
                }
                return acc
            }, null)
            if (item.href === window.location.href || urlToPathName(item.href) === find?.href) {
                activeItem = item
            }
        })
        if (activeItem) {
            activeItem.classList.add('active')
            let itemParent = activeItem.parentElement.parentElement
            if (itemParent.classList.contains('submenu')) {
                itemParent.classList.add('active')
                itemParent.style.maxHeight = itemParent.scrollHeight + "px"
                itemParent.parentElement.firstChild?.classList?.add('active')
            }
        }
    }, [pathName])


    return (
        <>
            <div
                onClick={() => {
                    window.document.querySelector('.sidebar').classList.toggle('open')
                    window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                }}
                className="sidebar-overlay"/>
            <aside className="sidebar">
                <div className="title">
                    {title}
                </div>
                <ul className="menu">
                    {menu.map((item, index) => (
                        <li key={index}>
                            {item.menu && <div className="nav-menu">{item.menu}</div>}
                            {item.label && !item.child && (
                                <Link href={item.href || '#!'} className="nav-link">
                                    {item.icon && <span className="icon">{item.icon}</span>}
                                    <span className="label">{item.label}</span>
                                </Link>
                            )}
                            {item.child && (
                                <>
                                    <a role="button" className="nav-link has-arrow">
                                        {item.icon && <span className="icon">{item.icon}</span>}
                                        <span className="label">{item.label}</span>
                                    </a>
                                    <ul className="submenu">
                                        {item.child.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.href || '#!'} className="nav-link">
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </>

    )
}

export default Sidebar