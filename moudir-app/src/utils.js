import { writable } from 'svelte/store'
export const itemBaseStorageLink = "https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/"
export const uuidToImageLink = (uuid, path) => {
    return itemBaseStorageLink + encodeURIComponent(path) + "?alt=media&token=" + uuid
}

export const notification = writable(0)
export const popup = writable({})

export const urlPostReq = async(url, data) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Access-Control-Origin": "*"
    }
    let resp = await fetch(url, {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: new URLSearchParams(data)
    })
    return resp
}

export const statusColors = {
    "Delivered": '34bf65',
    "Printing": '2985d4',
    'Delivering': 'ffb100',
    'In Progress': '34bf65'

}
export const colors = {
    "black": "#000000",
    "grey": "#e5e5e5",
    "red": "#941E1E",
    "white": "#ffffff",
    "green": "#3B922D"
}

export const formatTimestampToDate = (t) => {
    const a = new Date(t * 1000);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();
    return date + "/" + month + "/" + year
}
export const formatTimestampToDateTime = (t) => {
    const a = new Date(t * 1000);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();
    const hours = a.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + a.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + a.getSeconds();
    return date + "/" + month + "/" + year + " - " + hours + ':' + minutes.substr(-2)
}

export const formatPhoneNumber = (phone) => {
    let arrayed = phone.split("")
    let len = arrayed.length
    arrayed.splice(len - 3, 0, " ")
    arrayed.splice(len - 6, 0, " ")
    arrayed.splice(len - 8, 0, " ")
    return arrayed.join("")
}