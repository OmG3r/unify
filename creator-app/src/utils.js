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

export const formatCssStyle = (data) =>  {
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