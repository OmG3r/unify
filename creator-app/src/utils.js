import { customAlphabet } from 'nanoid'

export const textToHex = (text) => {
	let colors = {
		"black": "#000000",
		"grey": "#e5e5e5",
		"red": "#941E1E",
		"white": "#ffffff",
		"green": "#3B922D"
    }
    
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

export const taxRate = 0.19
export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)
