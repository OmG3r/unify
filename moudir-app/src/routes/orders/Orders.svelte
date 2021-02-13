<style>
    .u-view {
        height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        width: 100%;
        background-color: #f2f8f1;
    }

</style>

<script>
    import Filters from './_Filters.svelte'
    import Table from './_Table.svelte'

    import {onMount, onDestroy} from 'svelte'
    import {user} from '../../firebase.js'
    import {navigate} from 'svelte-routing'
    import {writable} from 'svelte/store'
    let unsubscribeUser = user.subscribe((v) => {
        if (v == undefined) {
            navigate('/login', {replace: true})
        }
    })
    onDestroy(() => {
        unsubscribeUser()
    })

    let filters = writable({
        search: '',
        creators: [],
        statuses: [],
        date: {
            start: {},
            end: {}
        }
    })
    filters.subscribe((v) => {
        console.log(v)
    })
</script>


<div class="u-view">
    <Filters {filters} />
    <Table />

</div>