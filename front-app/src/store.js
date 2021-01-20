import { writable } from 'svelte/store';

export const lang = writable("fr")
export let upColor = writable("#45B877");
export let downColor = writable("#FFFFFF")


function createCartStore() {
    let saved = localStorage.getItem('cart') || '{}'
    console.log(saved)
    saved = JSON.parse(saved)
    const { subscribe, set, update } = writable(saved);

    return {
        subscribe,
        set: (newV) => {
            localStorage.setItem('cart', JSON.stringify(newV))
            Object.entries(newV).forEach((item) => {
                if (item.quantity == undefined) {
                    item.quantity = 1
                }
            })
            set(newV)
        },
        add: (newV) => {
            update((oldV) => {
                let resp = {...oldV, ...newV }
                Object.entries(resp).forEach((item) => {
                    if (item.quantity == undefined) {
                        item.quantity = 1
                    }
                })
                localStorage.setItem('cart', JSON.stringify(resp))
                console.log(resp)
                return resp
            })
        },
        remove: (key) => {
            update((oldV) => {
                if (oldV[key]) {
                    delete oldV[key]
                }
                localStorage.setItem('cart', JSON.stringify(oldV))
                return oldV
            })
        },
        reset: () => {
            localStorage.setItem('cart', JSON.stringify({}))
            set({})
        }

    };
}

export const cart = createCartStore()