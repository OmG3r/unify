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