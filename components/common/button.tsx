import Link from "next/link"
import { Fragment } from "react"

interface ButtonProps {
    children: any
    className?: string
    href?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean

}

const Button = ({ children, className, href, ...props }: ButtonProps) => {
    let Wrapper = !!href ? ({ children }) => <Link href={href}>{children}</Link> : Fragment

    return (
        <Wrapper>
            <button
                {...props}
                className={'bg-primary rounded px-6 py-[17px] text-h4 font-medium ' + (className || '')}>
                {children}
            </button>
        </Wrapper>

    )
}

export default Button;