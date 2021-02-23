<style>
    .u-box {
        position: absolute;
        bottom: 30px;
        right: 30px;

        background-color: #50c275;
        color: white;

        padding: 0 20px 0 20px;
        border-radius: 3px;

        display: flex;
        align-items: center;
        height: 40px;
        
    }

    .u-actions {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin-left: 10px;
    }

    .u-action {
        padding: 6px 16px;
        margin: 0 4px;
        height: 100%;
        border-radius: 4px;
        cursor: pointer;
    }

    .u-action img {
        max-height: 100%;
    }

    .discard {
        background-color: #f44336;
    }
    .export {
        background-color: white;
    }
</style>


<script>
    import ExportOverlay from './_ExportOverlay.svelte'
    import {writable} from 'svelte/store'
    export let selectedItems
    export let carts
    let showOverlay = writable(false)
    const resetSelectedItems = () => {
        $selectedItems = []
    }

    const showExportOverlay = () => {
        $showOverlay = true
    }
</script>

{#if $selectedItems.length > 0}
    <div class="u-box">
        <div class="u-text">
            {$selectedItems.length} Items Selected
        </div>
        <div class="u-actions">
            <div on:click={resetSelectedItems} class="u-action discard">
                <img src="/imgs/misc/clear.png" alt="clear">
            </div>
            <div on:click={showExportOverlay} class="u-action export">
                <img src="/imgs/misc/download.png" alt="download">

            </div>
        </div>
    </div>
    
    {#if $showOverlay}
        <ExportOverlay {carts}  {showOverlay} {selectedItems} />
    {/if}
    
{/if}
