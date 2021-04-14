<style>
    .u-view {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        
        display: flex;
    }
    .controls {
        min-width: 350px;
        min-height: 100vh;
        height: 100%;
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
    .border-error {
        border: 2px solid #ee2761;
    }
    .u-spinner-area {
        width: 100%;
        min-height: 100vh;
        position: fixed;
        background-color: rgba(0,0,0,0.6);

        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 900;
    }
</style>

<script>
    import {onDestroy, onMount} from 'svelte'
    import {writable} from 'svelte/store'
    import {user, storage, db} from '../../firebase.js'
    import {navCollapsable, navCollapse} from '../../store.js'
    import {colors, formatCssStyle, notification, nanoid} from '../../utils.js'
    import {creations} from '../../mockupdata.js'
    import FabricCanva from './_FabricCanva.svelte'
    import PriceCalculator from './_PriceCalculator.svelte'
    import {navigate} from 'svelte-routing'
    import MaterialSpinner from '../../comps/MaterialSpinner.svelte'
    export let params


    const unsubUser = user.subscribe((v) => {
        if (v) {
            if (v.docData?.storeEnabled == false) {
                notification.set({
                    accentColor: "alert",
                    title: "Error",
                    content: "Your store must be enabled to create merch" 
                })
                navigate('/merch/all', {replace: true})
            }
        }
    })
    onDestroy(() => {
        unsubUser() 
    })

    console.log(params)
    console.log(creations)
    const MAX_IMAGE_SIZE_MB = 6
    
    let recievedMockData = false
    const priceCalculatorData = writable({})
    const showBoundaries = writable(true)

    let spinit = false;
    let mockup = {
        imgs: {
            front: '',
            back: ''
        },
        profit: 1,
        cost: 10
    }

    const merchData = {
        id: nanoid(),
        name: '',
        featuredFace: 'front',
        mockup: params.itemid,
        imgs: {
            front: '',
            back: ''
        },
        price: 0,

    }

    const printarea = writable({
        front: {
            area: 0,
            price: 0
        },
        back: {
            area: 0,
            price: 0
        }
    })
    
    const action = writable('Design')
    const facade = writable('Front')
    const selectedColor = writable('Blue')
    const merchColors = writable([])
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
        $printarea = {
            front: {
                area: 0,
                price: 0,
                minPrice: mockup.print.front
            },
            back: {
                area: 0,
                price: 0,
                minPrice: mockup.print.back
            }
        }
        recievedMockData = true;
        $navCollapsable = false
        $navCollapse = true
        $selectedColor = mockup.colors[0]
        $merchColors = [mockup.colors[0]]
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

    const addImage = async (img) => {
        console.log("adding image to " + $facade.toLocaleLowerCase())
        let activeCanva = canvas[$facade.toLocaleLowerCase()]
        await fabric.Image.fromURL(URL.createObjectURL(img), function(oImg) {
            oImg.clipPath = canvas[$facade.toLocaleLowerCase()].boundary
            let gid = nanoid()
            oImg.originalGID = gid
            imageOriginals[gid] = img
            activeCanva.items.push(oImg)
            oImg.scaleToWidth(100, false)
            oImg.center()
            activeCanva.canva.add(oImg)
            oImg.center()
            oImg.set({top: mockup.printable[$facade.toLocaleLowerCase()].top + 5})
            oImg.setCoords();
            oImg.saveState();
            
            console.log(oImg._originalElement.currentSrc)
        });
        setTimeout(() => {
            
            relayer()
        }, 1000);
    }
    let imageOriginals = {}
    const handleUploadedFile = async (event) => {

        let img = event.target.files[0]
        if (img == undefined) {
            return
        }
        if (img.size > MAX_IMAGE_SIZE_MB * 1024 * 1024 ) {
            notification.set({
                accentColor: "alert",
                title: "Image size",
                content: "Image size should not exceed " + MAX_IMAGE_SIZE_MB + " MBs",
            })
            return
        }
        
        addImage(img)
        
        
    }
    const handleFileDrop = (event) => {
        let img = event.dataTransfer.files[0]
        if (img == undefined) {
            return
        }
        if (img.size > MAX_IMAGE_SIZE_MB * 1024 * 1024 ) {
            notification.set({
                accentColor: "alert",
                title: "Image size",
                content: "Image size should not exceed " + MAX_IMAGE_SIZE_MB + " MBs",
            })
            return
        }
        
        addImage(img)
    }

    const finalizeCreation = async () => {
        console.log(merchData)
        if (merchData.name.length == 0) {
            nameError = true;
            notification.set({
                accentColor: "alert",
                title: "Merch name",
                content: "Input merch name",
            })
            return
        }


        if (canvas.front.items.length + canvas.back.items.length == 0) {
            notification.set({
                accentColor: "alert",
                title: "Add customizations",
                content: "Atleast 1 customization is needed to create merch",
            })
            return
        }

        if ($priceCalculatorData.profit < 2) {
            notification.set({
                accentColor: "alert",
                title: "Profit",
                content: "A merch should generate atleast a profit of 2 tnd",
            })
            return
        }
        spinit = true

        merchData.creator = $user.claims.username
        merchData.price = $priceCalculatorData.price
        merchData.profit = $priceCalculatorData.profit
        merchData.sizes = mockup.sizes
        merchData.metadata = mockup.metadata
        let uploadImage = (f, npath) => {
            return new Promise(async (resolve, reject) => {
                let path = 'creators/' + npath
                let create = storage.ref().child(path);
                let upping = undefined
                if (typeof f == "string") {
                    upping = create.putString(f, "data_url")
                } else {
                    upping = create.put(f)
                }
                
                let listen = (snapshot) => {
                    let uploadPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                }
                let errfunc = (er) => {
                    console.log(er)
                    reject(er)
                }
                let successfunc = async () => {
                    resolve(await upping.snapshot.ref.getDownloadURL())
                }
                upping.on('state_changed', listen, errfunc, successfunc)
            })
        }
        //console.log(canvas.front.canva.toDataURL({format: 'jpeg',quality: 0.3}))
        $showBoundaries = false
        merchData.colors = $merchColors
        let initColor = $selectedColor
        merchData.featuredColor = initColor
        for (let col of merchData.colors) {
            $selectedColor = col
            let frontPath = $user.claims.username + "/merch/" + merchData.id + "/front-" + col
            let backPath = $user.claims.username + "/merch/" + merchData.id + "/back-" + col
            merchData.imgs[col] = merchData.imgs[col] || {}
            merchData.imgs[col].front = (await uploadImage(canvas.front.canva.toDataURL({format: 'jpeg',quality: 0.9}), frontPath)).split('token=', 2)[1]
            merchData.imgs[col].back = (await uploadImage(canvas.back.canva.toDataURL({format: 'jpeg',quality: 0.9}), backPath)).split('token=', 2)[1]
        }
        /*
        let frontPath = $user.claims.username + "/merch/" + merchData.id + "/front"
        let backPath = $user.claims.username + "/merch/" + merchData.id + "/back"
        merchData.imgs.front = (await uploadImage(canvas.front.canva.toDataURL({format: 'jpeg',quality: 0.9}), frontPath)).split('token=', 2)[1]
        
        merchData.imgs.back = (await uploadImage(canvas.back.canva.toDataURL({format: 'jpeg',quality: 0.9}), backPath)).split('token=', 2)[1]
        */
        $showBoundaries = true
        $selectedColor = initColor
        function blobToDataURL(blob, callback) {
            var a = new FileReader();
            a.onload = function(e) {callback(e.target.result);}
            a.readAsDataURL(blob);
        }
        merchData.print = {
            'front': '',
            'back': ''
        }
        for (let face of ['front', 'back']) {
            let allObjects = canvas[face].canva.getObjects().filter((item) => !['color-box', 'boundary', 'mockup'].includes(item.id))
            if (allObjects.length > 0) {
                let compPath = $user.claims.username + "/merch/" + merchData.id + "/" + face  + "-print.png"
                canvas[face].mockup.set('opacity', 0)
                canvas[face].background.set('opacity', 0)
                canvas[face].boundary.set('opacity', 0)
                const imgData = canvas[face].canva.toDataURL({
                    top: canvas[face].boundary.top + canvas[face].boundary.strokeWidth,
                    left: canvas[face].boundary.left + canvas[face].boundary.strokeWidth,
                    width: canvas[face].boundary.width - canvas[face].boundary.strokeWidth ,
                    height: canvas[face].boundary.height - canvas[face].boundary.strokeWidth,
                    multiplier: 7,
                    quality: 1,
                    format:'png'
                })
                canvas[face].mockup.set('opacity', 1)
                canvas[face].background.set('opacity', 1)
                canvas[face].boundary.set('opacity', 1)
                let imguuid = (await uploadImage(imgData, compPath)).split('token=', 2)[1]
                merchData.print[face] = imguuid
            }

        }
        


        
        merchData.color = $selectedColor
        console.log(merchData)
        merchData.timestamp = firebase.firestore.FieldValue.serverTimestamp()
        merchData.printarea = {
           
            front: {
                area: $printarea.front.area,
                price: $printarea.front.price,
            },
            back: {
                area: $printarea.back.area,
                price: $printarea.back.price,
            }
        
        }
        const batch = db.batch();
        batch.set(db.doc('/creators/' + $user.claims.username + "/merch/all"), {[merchData.id]: merchData}, {merge: true})
        batch.set(db.doc('/creators/' + $user.claims.username + "/merch/" + merchData.id), merchData)
        await batch.commit()
    
        spinit = false;


        notification.set({
                accentColor: "success",
                title: "Success",
                content: "Merch created",
        })
        navigate('/merch/all', {replace: true})
        }
    let nameError = false;
    const ascertainColorClick = (name) => {
        if ($merchColors.includes(name)) {
            $merchColors = $merchColors.filter((item) => item != name)
            if ($merchColors.length == 0) {
                $merchColors = [mockup.colors[0]]
                $selectedColor = mockup.colors[0]
            } else {
                $selectedColor = $merchColors[0]
            }
        } else {
            $merchColors = [...$merchColors, name]
            $selectedColor = name
        }
    }


    const exportClip = () => {
        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
        var link = document.createElement("a");
        canvas.front.mockup.set('opacity', 0)
        canvas.front.background.set('opacity', 0)
        canvas.front.boundary.set('opacity', 0)

        var imgData = canvas.front.canva.toDataURL({
            top: canvas.front.boundary.top+ canvas.front.boundary.strokeWidth,
            left: canvas.front.boundary.left+ canvas.front.boundary.strokeWidth,
            width: canvas.front.boundary.width - canvas.front.boundary.strokeWidth ,
            height: canvas.front.boundary.height - canvas.front.boundary.strokeWidth,
            multiplier: 7,
            format:'png'
        })
        

        canvas.front.mockup.set('opacity', 1)
        canvas.front.background.set('opacity', 1)
        canvas.front.boundary.set('opacity', 1)
        var strDataURI = imgData.substr(22, imgData.length);
        var blob = dataURLtoBlob(imgData);
        var objurl = URL.createObjectURL(blob);

        link.download = "helloWorld.png";

        link.href = objurl;

        link.click();

    }
</script>

<div 
on:drop|preventDefault={handleFileDrop}
on:dragover|preventDefault|stopPropagation
class="u-view">
    {#if spinit}
        <div class="u-spinner-area">
            <MaterialSpinner />

        </div>
    {/if}

    <div class="controls">
        <div class="u-title">
            Create Your Merch
        </div>
        <div class="control-container">
            <div class="control-title">Merch Name</div>
            <input bind:value={merchData.name} class:border-error={nameError} on:click={() => {nameError = false}} placeholder="Merch Name" type="text" class="merch-name">
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
                <!--
                <div class="option">
                    <img src="/imgs/misc/designer/font.png" alt="im">
                    <span>Add Text</span>
                </div>
                -->
            </div>
        </div>

        <div class="control-container">
            <div class="control-title">Select Product Color</div>
            <div class="colors-container">
                {#if mockup && mockup.colors}
                    {#each mockup.colors as name}
                        <abbr class="color-circle-container" title={name}>
                            <div 
                            on:click={() => {ascertainColorClick(name)}}
                            class:active={$merchColors.includes(name)} 
                            style={formatCssStyle({'background-color': colors[name.toLocaleLowerCase()]})} 
                            class="color-circle">

                            </div>
                        </abbr>
                    {/each}
                {/if}
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
            {#if recievedMockData}
                <PriceCalculator
                unifyProfit={mockup.profit}
                cost={mockup.cost}
                delivery={mockup.delivery}
                {priceCalculatorData}
                {printarea}
                />
            {/if}
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
                        {showBoundaries}
                        boundaryData={mockup.printable.front}
                        {mockup}
                        {printarea}
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
                        {showBoundaries}
                        {mockup}
                        boundaryData={mockup.printable.back}
                        {printarea}
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
                <!--<div on:click={exportClip} class="action">pictures</div>-->
               
            </div>
        </div>
    </div>
    
</div>