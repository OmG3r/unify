<style>
    .u-view {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: auto;
        display: flex;
    }
    .controls {
        min-width: 350px;
        min-height: 100vh;
        max-height: 100vh;
        background-color: #212032;
    }

    .u-title {
        padding: 16px;
        text-align: center;
        color: white;
        background-color: #0a0918;
    }

    .design-container {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        height: 100%;
        display: flex;
    }

    .u-box {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
    }

    .facades {
        width: 100px;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .facade {
        width: 50px;
        height: 50px;
        margin: 12px 0;
        border: 2px solid #d8dae0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
    }
    .facade.active {
        border: 3px solid #282562;
    }

    .actions {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .action {
        border: 1px solid #6a6f72;
        color: #6a6f72;
        padding: 8px 16px;
        cursor: pointer;
    }

    .action.active {
        background-color: #282562;
        border: 1px solid #282562;
        color: white
    }



    .design-area {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    #c {
        width: 600px;
        height: 600px;
        
    }
    .control-container {
        padding: 20px 20px;
        border-bottom: 1px solid hsla(0,0%,100%,.05);
    }

    .control-title {
        font-weight: bold;
        color: white;
        margin-bottom: 16px;
    }

    .options {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #5ec8d5;
        
    }

    .option {
        display: flex;
        align-items: center;
        border: 2px solid #5ec8d5;
        border-radius: 4px;
        padding: 6px 10px;
        width: 48%;
        cursor: pointer;
    
    }
    label.option {
        position: relative;
    }
    .option img {
        max-width: 32px;
        margin-right: 8px;
    }
    #img-uploader {
        position: absolute;
        visibility: hidden;
    }
    .colors-container {
        display: flex;
    }
    .color-circle-container {
        margin: 0 8px;
    }
    .color-circle {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 3px solid transparent
    }
    .color-circle.active {
        border: 3px solid #5ec8d5;
    }
    .u-canva-container {
        display: none;
    }
    .u-canva-container.active {
        display: block;
    }

    .show-faces {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
    .one-face {
        width: 48%;
        padding: 6px 8px;
        text-align: center;
        color: #5ec8d5;
        border: 2px solid #5ec8d5;
        border-radius: 4px;
        cursor: pointer;
    }
    .one-face.active {
        color: #212032;
        background-color: #5ec8d5;
    }
    .merch-name {
        border: 2px solid #5ec8d5;;
        width: 100%;
        padding: 6px 8px;
        background-color: #2e2d3e;
        border-radius: 4px;
        outline: none;
        color: white;
    }
    .flexed {
        display: flex;
    }
    .u-finalize {
        padding: 8px 16px;
        background-color: #ee2761;
        color: #212032;
        margin-left: auto;
        border-radius: 3px;
        cursor: pointer;
    }
</style>

<script>
    import {onDestroy, onMount} from 'svelte'
    import {writable} from 'svelte/store'
    import {navCollapsable, navCollapse} from '../../store.js'
    import {colors, formatCssStyle, notification} from '../../utils.js'
    import {creations} from '../../mockupdata.js'
    import FabricCanva from './_FabricCanva.svelte'
    import PriceCalculator from './_PriceCalculator.svelte'
    import {navigate} from 'svelte-routing'
    export let params
    console.log(params)
    console.log(creations)
    let mockup = {
        imgs: {
            front: '',
            back: ''
        },
        profit: 1,
        cost: 10
    }

    const merchData = {
        name: '',
        featuredFace: 'front',
        mockup: params.itemid,
        imgs: {
            front: '',
            back: ''
        },
        price: 0
    }
    
    const action = writable('Design')
    const facade = writable('Front')
    const selectedColor = writable(Object.values(colors)[0])
    const handleKeypress = (e) => {
            e = e || window.event;
            // use e.keyCode
            console.log(e.code)
            if (e.code == "Delete") {
                if (canvas[$facade.toLocaleLowerCase()].canva.getActiveObjects().length > 0) {
                    for (let x of canvas[$facade.toLocaleLowerCase()].canva.getActiveObjects()) {
                        canvas[$facade.toLocaleLowerCase()].canva.remove(x); 
                    }
                   
                }
            }
        }

    let canvas = {
        front: {
            canva: '',
            background: '',
            mockup: '',
            items: []
        },
        back: {
            canva: '',
            background: '',
            mockup: '',
            items: []
        }
    }
    onMount(async () => {
        console.log(creations[params.itemid])
        if (creations[params.itemid] == undefined) {
            console.log("navigating")
            navigate("/merch/create")
        }
        mockup = creations[params.itemid]
        $navCollapsable = false
        $navCollapse = true
        document.addEventListener('keyup', handleKeypress)
        
    })
   
    onDestroy(() => {
        $navCollapsable = true
        document.removeEventListener('keyup', handleKeypress)
    })
    const relayer = () => {
        let activeCanva = canvas[$facade.toLocaleLowerCase()]
        activeCanva.canva.sendToBack(activeCanva.background)
        activeCanva.canva.bringToFront(activeCanva.mockup)
        activeCanva.canva.renderAll()
    }

    const addImage = async (url) => {
        let activeCanva = canvas[$facade.toLocaleLowerCase()]
        await fabric.Image.fromURL(url, function(oImg) {
            activeCanva.items.push(oImg)
            oImg.scaleToWidth(200, false)
            oImg.center()
            activeCanva.canva.add(oImg)
            oImg.center()
        });
        setTimeout(() => {
            relayer()
        }, 1000);
    }

    const handleUploadedFile = async (event) => {

        let img = event.target.files[0]
        addImage(URL.createObjectURL(img))
        
        
    }
    const handleFileDrop = (event) => {
        let img = event.dataTransfer.files[0]
        addImage(URL.createObjectURL(img))
    }

    const finalizeCreation = () => {
        notification.set({
            accentColor: "alert",
            title: "Delete",
            content: "an error happend",
        })
    }
</script>

<div 
on:drop|preventDefault={handleFileDrop}
on:dragover|preventDefault|stopPropagation
class="u-view">
    <div class="controls">
        <div class="u-title">
            Create Your Merch
        </div>
        <div class="control-container">
            <div class="control-title">Merch Name</div>
            <input placeholder="Merch Name" type="text" class="merch-name">
        </div>

        <div class="control-container">
            <div class="control-title">Design your product</div>
            <div class="options">
                <label for="img-uploader" class="option">
                    <input 
                    on:change={handleUploadedFile} 
                    accept="image/png, image/jpeg"
                    id="img-uploader" type="file">
                    <img src="/imgs/misc/designer/picture.png" alt="im">
                    <span>Add Image</span> 

                </label>
                <div class="option">
                    <img src="/imgs/misc/designer/font.png" alt="im">
                    <span>Add Text</span>
                </div>
            </div>
        </div>

        <div class="control-container">
            <div class="control-title">Select Product Color</div>
            <div class="colors-container">
                    {#each Object.entries(colors) as [name, hex]}
                    <abbr class="color-circle-container" title={name}>
                        <div 
                        on:click={() => {$selectedColor ==  hex ? "" : $selectedColor =  hex}}
                        class:active={$selectedColor ==  hex} 
                        style={formatCssStyle({'background-color': hex})} 
                        class="color-circle">

                        </div>
                    </abbr>
                {/each}
            </div>
        </div>

        <div class="control-container">
            <div class="control-title">Which face customers see first</div>
            <div class="show-faces">
                <div
                on:click={() => {merchData.featuredFace = 'front'}}
                class:active={merchData.featuredFace == 'front'} class="one-face">
                    Front
                </div>
                <div 
                on:click={() => {merchData.featuredFace = 'back'}}
                class:active={merchData.featuredFace == 'back'}
                class="one-face">
                    Back
                </div>

            </div>
        </div>
        <div class="control-container">
            <div class="control-title">Set Your Price</div>
            <PriceCalculator
            unifyProfit={mockup.profit}
            cost={mockup.cost}
            />
        </div>

        <div class="control-container flexed">
            <div on:click={finalizeCreation} class="u-finalize">
                CREATE
            </div>
        </div>

    </div>
    <div on:keyup={handleKeypress} class="design-container">
        <div class="facades">
            {#each ["Front", "Back"] as laction}
                <div 
                on:click={() => {$facade == laction ? "" : $facade = laction}}
                class:active={$facade == laction}
                class="facade">{laction}</div>
            {/each}
        </div>
        <div class="u-box">
            <div class="design-area">
                <div class="u-canva-container" class:active={$facade == "Front"}>
                    {#if mockup.imgs.front}
                        <FabricCanva
                        bind:hash={canvas.front}
                        facade={"Front"} 
                        {selectedColor} 
                        mockupURL={mockup.imgs.front}
                        />
                    {/if}
                </div>
                <div  class:active={$facade == "Back"} class="u-canva-container">
                    {#if mockup.imgs.back}
                        <FabricCanva
                        bind:hash={canvas.back}
                        facade={"Back"} 
                        {selectedColor} 
                        mockupURL={mockup.imgs.back}
                        />
                    {/if}
                </div>
                
            </div>
            <div class="actions">
                {#each ["Design", "Preview"] as laction}
                    <div 
                    on:click={() => {$action == laction ? "" : $action = laction}}
                    class:active={$action == laction}
                    class="action">{laction}</div>
    
                {/each}
               
            </div>
        </div>
    </div>
    
</div>