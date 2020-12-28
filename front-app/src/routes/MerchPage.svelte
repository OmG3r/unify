<style>
    .u-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
    }

</style>


<script>
	import Merch from "../components/MerchPage/merch.svelte";
    export let params = {}
    import {onMount} from 'svelte'
    import {dbWrapper} from '../firebase.js'
    import {navigate} from 'svelte-routing'
    import Navbar from '../components/newNavbar.svelte'
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    import {uuidToImageLink} from '../utils.js'
    

    let validated = false;
    let data = {}
    onMount(async () => {
        data = await dbWrapper.get('/creators/' + params.userid)
        if (Object.keys(data).length == 0) {
            navigate('/')
            return
        }
        for (let x of ['logo', 'banner']) {
            data[x] = uuidToImageLink(data[x], 'creators/' + params.userid + '/' + x)
        }
        data = data
        console.log(data)
        validated = true
    })

</script>

{#if validated}
    <Navbar creatorData={data}/>
    <Merch creatorData={data} {params}/>

{:else}
    <div class="u-view">
        <MaterialSpinner />

    </div>
{/if}