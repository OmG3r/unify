<style>


</style>


<script>
    export let params = {}
    import NavbarCC from "../components/NavbarCC.svelte";
    import Single from '../components/SingleProductPage/singleProduct.svelte'
    import {onMount} from 'svelte'
    import {dbWrapper} from '../firebase.js'
    import {navigate} from 'svelte-routing'
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    let validated = false
    let data = {}
    let creatorData = {}
    onMount(async () => {
        creatorData = await dbWrapper.get('/creators/' + params.userid)
        data = await dbWrapper.get('/creators/' + params.userid + "/merch/all")
        if (data[params.itemid] == undefined) {
            
            navigate('/' + params.userid)
        } else {
            validated = true;
        }  
    })

</script>
{#if validated}
    <NavbarCC {creatorData} />
    <Single {params} />
{:else}
    <div class="u-view">
        <MaterialSpinner />

    </div>
{/if}


