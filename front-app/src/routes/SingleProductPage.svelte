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
    import {uuidToImageLink} from '../utils'
    let validated = false
    let data = {}
    let creatorData = {}
    onMount(async () => {
        creatorData = await dbWrapper.get('/creators/' + params.userid)
        for (let x of ['logo', 'banner']) {
            if (creatorData[x]) {
                creatorData[x] = uuidToImageLink(creatorData[x], 'creators/' + params.userid + '/' + x)
            }
            
        }
        data = await dbWrapper.get('/creators/' + params.userid + "/merch/all")
        if (data[params.itemid] == undefined) {
            
            navigate('/' + params.userid)
        } else {
            validated = true;
            document.title = "Unify - " +  (creatorData.name ? creatorData.name : creatorData.username) + " - Store"
        }  
    })

</script>
{#if validated}
    <NavbarCC {creatorData} />
    <Single {params} {creatorData} />
{:else}
    <div class="u-view">
        <MaterialSpinner />

    </div>
{/if}


