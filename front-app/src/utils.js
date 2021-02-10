export const itemBaseStorageLink = "https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/"

export const uuidToImageLink = (uuid, path) => {
    return itemBaseStorageLink + encodeURIComponent(path) + "?alt=media&token=" + uuid
}
export const socialMedias = [
    { type: 'facebook', link: 'https://facebook.com' },
    { type: 'youtube', link: 'https://youtube.com' },
    { type: 'instagram', link: 'https://instagram.com' },
    { type: 'twitch', link: 'https://twitch.tv' }
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