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
    import ExportExcel from './_ExportPriningExcel.svelte'
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


   
</script>

<div on:click={() => {$showOverlay = false}} class="u-overlay">
    <div on:click|preventDefault|stopPropagation class="u-box">
        <h3>Export Selected {$selectedItems.length} Items </h3>
        <div class="u-options">
            <ExportExcel {selectedItems} {carts} />
           
        </div>


        <div on:click={() => {$showOverlay = false}} class="u-cancel">
            Cancel

        </div>
    </div>

</div>

