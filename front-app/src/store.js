import { writable } from 'svelte/store';


import { customAlphabet } from 'nanoid'
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);


export const lang = writable("fr")
export let upColor = writable("#45B877");
export let downColor = writable("#FFFFFF")


function createCartStore() {
    let saved = localStorage.getItem('cart') || '{}'


    try {
        saved = JSON.parse(saved)
    } catch {
        saved = {
            cartID: nanoid(),
            items: {}
        }
    }
    console.log(saved)

    if (saved.cartID == undefined) {
        saved.cartID = nanoid()
        localStorage.setItem('cart', JSON.stringify(saved))
    }
    if (saved.items == undefined) {
        saved.items = []
    }
    console.log(saved)
    const { subscribe, set, update } = writable(saved);

    return {
        subscribe,
        set: (newV) => {
            Object.entries(newV).forEach((item) => {
                if (item.quantity == undefined) {
                    item.quantity = 1
                }
            })
            localStorage.setItem('cart', JSON.stringify(newV))

            set(newV)
        },
        add: (newV) => {
            update((oldV) => {
                oldV.items = {...oldV.items, ...newV }
                Object.entries(oldV.items).forEach((item) => {
                    if (item.quantity == undefined) {
                        item.quantity = 1
                    }
                })
                localStorage.setItem('cart', JSON.stringify(oldV))
                return oldV
            })
        },
        remove: (key) => {
            update((oldV) => {
                if (oldV.items[key]) {
                    delete oldV.items[key]
                }
                localStorage.setItem('cart', JSON.stringify(oldV))
                return oldV
            })
        },
        reset: () => {
            localStorage.setItem('cart', JSON.stringify({}))
            set({
                cartID: nanoid(),
                items: []
            })
        }

    };
}

export const cart = createCartStore()