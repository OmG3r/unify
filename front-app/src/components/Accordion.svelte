<style>
    
    .u-accordion-item {
        width: 100%;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        max-width: 800px;
        
    }
    .u-accordion-header {
        width: 100%;
        border-bottom: 1px solid black;;
    }
    .u-accordion-collapse {
        width: 100%;
        overflow: hidden;
        height: 0;
        transition: height 0.35s ease;
    }
    .u-accordion-body {
        width: 100%;
    }


</style>



<script>
    let show = false
    const handleShow = (event) => {
        show = !show
        if (show) {
            let parent = event.target.closest('.u-accordion-item')
            let bodyHeight = theBody.offsetHeight
            collapser.style.height = String(bodyHeight) + "px"
        } else {
            collapser.style.height = "0px"
        }
        
    }
    let theBody, collapser
</script>



<div class="u-accordion-item">
    <div on:click={handleShow} class="u-accordion-header">
        <slot name="head" >Accordion Title</slot>
    </div>
    <div bind:this={collapser} class="u-accordion-collapse">
        <div bind:this={theBody} class="u-accordion-body">
            <slot name="body">Accordion Body</slot>
        </div>

    </div>
    

</div>

