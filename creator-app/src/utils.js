import { customAlphabet } from 'nanoid'
import { writable } from 'svelte/store'
export const itemBaseStorageLink = "https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/"

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

export const formatCssStyle = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        return acc + key + ": " + value + ";"
    }, "")
}

export const uuidToImageLink = (uuid, path) => {
    return itemBaseStorageLink + encodeURIComponent(path) + "?alt=media&token=" + uuid
}


export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

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

export const calculateBasePrice = ({ cost, profit, delivery, taxRate, clicToPay, ceil }) => {
    if (taxRate == undefined) {
        taxRate = 0.19
    }
    if (clicToPay == undefined) {
        clicToPay = 0.025
    }
    console.log(cost)
    let calc = ((profit * (1 + taxRate)) + delivery + cost) * (1 + clicToPay)
    console.log(calc)
    if (ceil) {
        calc = Math.ceil(calc)
    }

    return calc
}