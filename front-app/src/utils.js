import { writable } from 'svelte/store'

export const itemBaseStorageLink = "https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/"

export const uuidToImageLink = (uuid, path) => {
    return itemBaseStorageLink + encodeURIComponent(path) + "?alt=media&token=" + uuid
}
export const socialMedias = [
    { type: 'facebook' },
    { type: 'youtube'},
    { type: 'instagram' },
    { type: 'twitch'},
    { type: 'nimo' },
    { type: 'twitter' },
    { type: 'Tiktok' },
    { type: 'baaz' },
    { type: 'pinterest'}
]

export const colors = {
    "black": "#000000",
    "grey": "#e5e5e5",
    "red": "#941E1E",
    "white": "#ffffff",
    "green": "#3B922D"
}
export const textToHex = (text) => {


    if (colors[text.toLowerCase()] != undefined) {
        return colors[text.toLowerCase()]
    }
    return colors["black"]
}
export const notification = writable(0)

export const urlPostReq = async(url, xdata) => {
    let data = JSON.parse(JSON.stringify(xdata))
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Access-Control-Origin": "*"
    }
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            data[key] = JSON.stringify(value)
        }
    })
    console.log(data)
    console.log(data.cart.items)
    let resp = await fetch(url, {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: new URLSearchParams(data)
    })
    return resp
}

export const generateDeliveryDate = () => {
    let d = new Date()
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    let todayUnix = date.getTime() / 1000
    let minWaitDays = 5
    let maxWaitDays = minWaitDays + 3
    const minWaitStamp = todayUnix + minWaitDays * 3600 * 24
    const minDate = new Date(minWaitStamp * 1000)
    const maxWaitStamp = todayUnix + maxWaitDays * 3600 * 24
    const maxDate = new Date(maxWaitStamp * 1000)

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let minFormat = String(days[minDate.getDay()] + " " + minDate.getDate() + " " + months[minDate.getMonth()])
    let maxFormat = String(days[maxDate.getDay()] + " " + maxDate.getDate() + " " + months[minDate.getMonth()])

    return [minFormat, maxFormat]
}