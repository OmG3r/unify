<style>


</style>


<script>
    import {onMount} from 'svelte'

    export let hash = {}
    export let facade;
    export let selectedColor
    export let mockupURL;

    let canvaDiv;

    onMount(async () => {
        hash.canva = new fabric.Canvas(canvaDiv, {width:600, height:600});
        hash.background = new fabric.Rect({
            fill: $selectedColor,
            width:600,
            height: 600,
            selectable: false
        });
        hash.background.center()
        hash.canva.add(hash.background);
        await fabric.Image.fromURL(mockupURL, function(oImg) {
            hash.mockup = oImg
            oImg.scaleToWidth(600, false)
            oImg.set('selectable', false);
            hash.canva.add(oImg)
        });

        selectedColor.subscribe((v) => {
            hash.background.set('fill', v)
            hash.canva.renderAll();
        })
    })
</script>

<canvas bind:this={canvaDiv} class="c-canva"  id="front"></canvas>