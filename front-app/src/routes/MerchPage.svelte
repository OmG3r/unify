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
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    import {uuidToImageLink} from '../utils.js'
    import Navbar from "../components/NavbarCC.svelte";

    let validated = false;
    let data = {}
    onMount(async () => {
        console.log("merch page mounted")
        data = await dbWrapper.get('/creators/' + params.userid)
        if (Object.keys(data).length == 0) {
            navigate('/')
            return
        }
        for (let x of ['logo', 'banner']) {
            if (data[x]) {
                data[x] = uuidToImageLink(data[x], 'creators/' + params.userid + '/' + x)
            }
            
        }
        data = data
        console.log("creator data xd")
        console.log(data)
        validated = true
    })

</script>

{#if validated}
    <Navbar bind:creatorData={data}/>
    <Merch creatorData={data} {params}/>

{:else}
    <div class="u-view">
<<<<<<< HEAD
        <MaterialSpinner width="100px" height="100px" />
=======
        <MaterialSpinner  width="100px" height="100px"/>
>>>>>>> up

    </div>
{/if}