import { customAlphabet } from 'nanoid'


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


export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)
