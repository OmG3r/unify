<style>
    .u-overlay {
        position: fixed;

        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        height: 100vh;
        width: 100vw;
        

        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;

        
    }

    .u-box {
        width: 600px;
        border-radius: 4px;
        padding: 20px;
        background-color: white;        
    }

    .u-options {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: auto;
        margin-bottom: 16px;
    }

    .u-option {
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: #50c275;
        border-radius: 4px;
        color: white;
        height: 45px;
    }

    .u-icon {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
    }


    .u-icon img {
        display: block;
        max-width: 100%;
        height: 100%;
    }


    .u-cancel {
        width: 50%;
        margin: 0 auto;
        padding: 8px 16px;
        text-align: center;
        background-color: #f44336;
        color: white;
    }
</style>

<script>
    export let selectedItems
    export let showOverlay
    export let carts
    import {onDestroy} from 'svelte'
    let unsubscribeShowOverlay = showOverlay.subscribe((v) => {
        if (v == true) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    })
    onDestroy(() => {
        unsubscribeShowOverlay()
        document.body.style.overflowY = "auto"
    })


    const exportPrinting = () => {
        /*
            creator-itemid -> Size -> Color
        */
        const hasheCarts = $carts.reduce((acc, curr) => {
            acc[curr.cartID] = curr
            return acc
        }, {})
        let itemCount = $selectedItems.reduce((itemCount, curr) => {
            console.log(curr)
            let [cartID, creator, itemID]  = curr.split('-')
            let itemRef = creator + "-" + itemID
            console.log(cartID)
            console.log(hasheCarts)

            let itemData = hasheCarts[cartID].items[itemRef]
            if (itemCount[itemRef] == undefined) {
                itemCount[itemRef] = {}
                for (const size of itemData.sizes) {
                    itemCount[itemRef][size] = {}
                    for (const color of itemData.colors) {
                        itemCount[itemRef][size][color] = 0 
                    }
                }
            } else if (itemCount[itemRef][itemData.size] == undefined) {
                itemCount[itemRef][itemData.size] = {}
                for (const color of itemData.colors) {
                    itemCount[itemRef][size][color] = 0 
                }
            } else if (itemCount[itemRef][itemData.size][itemData.color] == undefined) {
                itemCount[itemRef][itemData.size][itemData.color] = 0 
            }

            
            itemCount[itemRef][itemData.size][itemData.color] += 1
            return itemCount
        }, {})
        console.log(itemCount)
    }
    
</script>

<div on:click={() => {$showOverlay = false}} class="u-overlay">
    <div on:click|preventDefault|stopPropagation class="u-box">
        <h3>Export Selected {$selectedItems.length} Items </h3>
        <div class="u-options">
            <div on:click={exportPrinting} class="u-option">
                <div class="u-icon">
                    <img src="/imgs/misc/hoodie-print.png" alt="print">
                </div>
                <div  class="u-text">
                    Printing
                </div>

            </div>
           

        </div>


        <div on:click={() => {$showOverlay = false}} class="u-cancel">
            Cancel

        </div>
    </div>

</div>

