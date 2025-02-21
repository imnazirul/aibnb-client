"use server"

import {revalidateTag} from "next/cache";


export const getServerData = async (url: string, {tags, cache}: {
    tags?: string[],
    cache?: 'no-cache' | 'default' | 'reload' | 'force-cache' | 'only-if-cached'
}) => {
    try {
        const res = await fetch(process.env.backend_url + 'api/v1' + url, {
            next: {
                tags: tags || [],
            },
            cache: cache || 'default'
        })
        return await res.json()
    } catch (e)  {
        return {
            error: true,
            msg: 'An error occurred.'
        }
    }
}


export async function searchLocation(search: string) {
    'use server'
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${process.env.google_map}`
    const res = await fetch(url, {
        cache: 'no-cache'
    })
    return await res.json()
}

export async function getPlaceDetail(placeId: string) {
    'use server'
    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.google_map}`
    const res = await fetch(url, {
        cache: 'no-cache'
    })
    return await res.json()
}



export async function getSVG(url: string) {
    'use server'
    const res = await fetch(url)
    return await res.text()
}


export async function clearApiCache(tag: string) {
    'use server'
    console.log(tag)
    revalidateTag(tag)
}