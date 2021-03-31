<style>
    .u-center-area {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100vh
    }

</style>


<script>
    import { Router, Link, Route, navigate } from "svelte-routing";
    export let url = "";
    export let params
    $: localParams  = params
    import {onMount} from 'svelte'
    import  {dbWrapper} from '../../firebase.js'

    import Redirector from '../../components/misc/Redirector.svelte'
    import MerchPage from './MerchPage.svelte'
    import DonationPage from './DonationPage.svelte'
    import SingleProduct from './SingleProductPage.svelte'
    import FooterCC from '../../components/FooterCC.svelte'
    import MaterialSpinner from '../../components/misc/MaterialSpinner.svelte'

    console.log("entry work")
    let validated = false
    onMount(async () => {
        params.userid = params.userid.toLowerCase()
        let data = await dbWrapper.get('/creators/' + params.userid, false, true)
        if (Object.keys(data).length == 0) {
            console.log("no store")
            navigate('/')
        } else if (data.storeEnabled == false) {
            if (data.fromCache) {
                data = await dbWrapper.get('/creators/' + params.userid, true)
                if (data.storeEnabled == false) {
                    //store is disabled from cache then read and is disbaled from DB tooo
                    navigate('/', {replace: true})
                } else {
                    // store was disabled from cache but enabled from DB
                    navigate('/' + params.userid + '/merch', { replace: true })
                    validated = true
                }
            } else {
                // store is disabled from DB
                navigate('/', {replace: true})
            }
            
        } else {
           
            validated = true
        }
    })

</script>



<Router url={url}>


    <Route path="/">
        {#if validated == false}
            <div class="u-center-area">
                <MaterialSpinner width="75px" height="75px" />

            </div>
            
        {:else}
            <Redirector path={"/" + params.userid + "/merch"} />
        {/if}
    </Route>

    <Route path="/tip">
        {#if validated == false}
            <div class="u-center-area">
                <MaterialSpinner width="75px" height="75px" />

            </div>
            
        {:else}
            <DonationPage params={localParams} />
            <FooterCC />
        {/if}
    </Route>

    
    <Route path="/merch">
        {#if validated == false}
            <div class="u-center-area">
                <MaterialSpinner width="75px" height="75px" />

            </div>
            
        {:else}
            <MerchPage params={localParams} />
            <FooterCC />
        {/if}
    </Route>

    <Route let:params path="/merch/:itemid">
        {#if validated == false}
            <div class="u-center-area">
                <MaterialSpinner width="75px" height="75px" />

            </div>
            
        {:else}
            <SingleProduct params={{...localParams, ...params}} />
            <FooterCC />
        {/if}


        
    </Route>

</Router>
