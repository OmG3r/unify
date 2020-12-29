export const itemBaseStorageLink = "https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/"

export const uuidToImageLink = (uuid, path) => {
	return itemBaseStorageLink + encodeURIComponent(path) + "?alt=media&token=" + uuid
}
export const socialMedias = [
    {type: 'facebook', link: 'https://facebook.com'},
    {type: 'youtube', link: 'https://youtube.com'},
    {type: 'instagram', link: 'https://instagram.com'},
    {type: 'twitch', link: 'https://twitch.tv'}
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