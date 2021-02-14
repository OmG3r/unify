<style>
    .u-table {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .u-table-head {
        width: 100%;
        display: flex;
        padding: 10px 10px 10px 20px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 0px 15px #0000001c;
        background-color: white;
    }

    .u-table-body {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
   
    .u-table-head > div {
        text-align: center;
       
    }

    .t-head-cart-session-id, :global(.t-body-cart-session-id ){
        width: 20%;
    }
    .t-head-item-info, :global(.t-body-item-info) {
        width: 25%
    }

    .t-head-client-info, :global(.t-body-client-info) {
        width: 30%
    }
    .t-head-date, :global(.t-body-date) {
        width: 10%;
    }
    .t-head-status, :global(.t-body-status) {
        width: 15%;
    }
   

    .u-cart {
        border-left: 5px solid var(--AccentColor);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin: 16px 0;
    }
    .u-bar {
        width: 20%;
        height: 5px;
        border-bottom-right-radius:8px;
        border-top-right-radius: 8px;
        background-color: var(--AccentColor);
    }

    .u-center-area {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
    }
</style>


<script>
    export let statusData
    export let filters
    import Item from './_Item.svelte'
    import {colors} from '../../utils.js'
    export let carts
    import {onDestroy} from 'svelte'
    export let first = true
    import MaterialSpinner from '../../comps/misc/MaterialSpinner.svelte'
           
    const statusColor = {
        'in_progress': '#26a65b',
        'printing': '#836349',
        'in_delivery': '#34a1fd',
        'delivered': '#2fcb82',
        'cancelled': '#f39c11',
        'returned': '#e84c3d'
    }
    
    const templ = {
        status: 'in_progress',
        text: 'In Progress'
    }
    let displayCarts = []
    let unsubscribeCarts = carts.subscribe((v) => {
        $filters = $filters
    })
    let unsubscribeFilters = filters.subscribe((v) => {
        console.time('filter')
        let copy = JSON.parse(JSON.stringify($carts))
        copy = copy.filter((cart) => {
            if (Object.keys(cart.items).length == 0) {
                return false
            }

            if (v.address.states.length > 0) {
                if (!v.address.states.includes(cart.state)) {
                    return false
                }
            }

            if (v.address.cities.length > 0) {
                if (!v.address.cities.includes(cart.city)) {
                    return false
                }
            }

            if (v.address.postals.length > 0) {
                if (!v.address.postals.includes(cart.postal)) {
                    return false
                }
            }

            if (v.date.start != 0) {
                if (cart.timestamp.seconds < v.date.start) {
                    return false
                }
            }

            if (v.date.end != 0) {
                if (cart.timestamp.seconds > v.date.end) {
                    return false
                }
            }

            if (v.search != "") {
                let searchs = [cart.cartID, cart.phoneNumber, cart.name]
                if (!searchs.some((item) => item.includes(v.search))) {
                    return false
                }
            }

            return true
        })


        for (let cart of copy) {
            let arrayed = Object.entries(cart.items).filter(([key, item]) => {
                if (v.statuses.length > 0) {
                    if (!v.statuses.includes(item.status)) {
                        return false
                    }
                }   
                if (v.creators.length > 0) {
                    if (!v.creators.includes(item.creator)) {
                        return false
                    }
                }
                if (v.models.length > 0) {
                    if (!v.models.includes(key)) {
                        return false
                    }
                }
               
                return true
            })
            cart.items = Object.fromEntries(arrayed)

        }

        copy = copy.filter((cart) => {
            if (Object.keys(cart.items).length == 0) {
                return false
            }
            return true
        })
        displayCarts = copy
        console.timeEnd('filter')
    })

    onDestroy(() => {
        unsubscribeCarts()
        unsubscribeFilters()
    })
</script>

<div class="u-table">

    <div class="u-table-head">
        <div class="t-head-cart-session-id">
            <abbr title="Cart & Session ID">C/S ID</abbr>
        </div>
        <div class="t-head-item-info">
            <abbr title="Item Info"> Item Info</abbr>
        </div>
        <div class="t-head-client-info">
            <abbr title="Client Info">Client Info</abbr>
        </div>
        <div class="t-head-date">
            <abbr title="Date">Date</abbr>
        </div>
        <div class="t-head-status">
            <abbr title="Status">Status</abbr>
        </div>
    </div>
    <div class="u-table-body">
        {#if !first}
            {#each displayCarts as cart}
                <div class="u-cart">
                    <div class="u-bar"></div>
                    {#each Object.entries(cart.items) as [key, item]}
                        <Item {statusData} {cart} {item} /> 
                    {/each}

                    <div class="u-bar"></div>
                </div>
            {:else}
                <div class="u-center-area">
                    no orders ?
                </div>
            {/each}
        {:else}
            <div class="u-center-area">
                <MaterialSpinner width="75px" height="75px" />
            </div>
        {/if}
        
    </div>
</div>