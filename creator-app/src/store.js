import {writable} from 'svelte/store'



function createSideNavStore() {
    let saved = Boolean(localStorage.getItem('sideNav')) || false
	const { subscribe, set, update } = writable(saved);

	return {
		subscribe,
		set: (newV) => {
            localStorage.setItem('sideNav', newV)
            set(newV)
        },
		
	};
}
export const navCollapse = createSideNavStore()
export const navCollapsable = writable(true)
