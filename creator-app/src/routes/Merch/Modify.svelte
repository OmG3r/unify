
<style>
    .u-view  {
        width: 100%;
        min-height: 100vh;
        
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .u-view.center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .u-content {
        min-height: calc(100vh - 54px);
        max-height: calc(100vh - 54px);;
        display: flex;
    }

    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #D8DAE0;
        padding: 8px 12px;
        height: 54px;
        align-items: center;
        background-color: white;
    }

    .u-button, .u-update {
        padding: 6px 24px;
        background-color: #d23149;
        color: white;
        cursor: pointer;
        font-weight: bold;
        border-radius: 3px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .u-update {
        width: 80%;
        background-color: #46b978;
        border-color: #46b978;
        margin: auto auto 0 auto
    }
    
    .u-button:hover {
        color: #d23149;
        background-color:white;
        border:1px solid #d23149;
    }

    .u-image-section {
        min-height: 100%;
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .u-info-section {
        min-height: 100%;
        width: 60%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #ddd;
    }


    .image-container {
        max-width: 80%;
        width: 100%;
        height: 100%;
        max-height: 48%;
        display: flex;
        justify-content: center;
        
        
        border-radius: 3px;
    }

    .image-container img {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 0 0 1px #ddd; 
        display: block;
        border-radius: 10px;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        padding: 8px 0;
        border-bottom: 1px solid #ddd;
        margin-bottom: 8px;
    }
    .input-container label {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 8px;
    }
    .input-container .input-text {
        height: 36px;
        padding: 4px 8px;
        box-shadow: 0 0 0 1px #ddd;
        border: none;
    }
 @media only screen and (max-width: 1180px) {
      .u-content{
          flex-direction: column;
          margin: 0 0 100px 0;
      }
      .u-image-section{
        width: 100%;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        }
        .image-container{
            margin: 15px 5px 0 5px;
        }
        .u-info-section{
            margin-top: 25px;
            width: 100%;
        }
      
  }
    
</style>


<script>
    export let params = {}
    import PriceCalculator from './_PriceCalculator.svelte'
    import {onMount} from 'svelte'
    import {db, user} from '../../firebase.js'
    import MaterialSpinner from '../../comps/MaterialSpinner.svelte'
    import {navigate} from 'svelte-routing'
    import {uuidToImageLink} from '../../utils.js'
    import {writable} from 'svelte/store'
    import {creations} from '../../mockupdata.js'
    import {notification, popup} from '../../utils.js'
    import {accentColor} from  "../../store.js"
    

    const priceCalculatorData = writable({})
    let loaded = false;
    let itemData = undefined
    let savedData = undefined
    onMount(async () => {
        let resp = await db.doc("/creators/" + $user.claims.username + "/merch/" + params.itemid).get()
        let data = resp.data()
        if (data == undefined) {
            navigate('/merch/all')
        }

        for (let [col, facades]  of Object.entries(data.imgs)) {
            console.log(facades)
            for (let [facade, id] of Object.entries(facades)) {
                let path = 'creators/' + $user.claims.username + "/merch/" + params.itemid + "/" + facade + "-" + col
                data.imgs[col][facade] = uuidToImageLink(id, path)
                console.log(data.imgs[col][facade])
            } 
        }
            
       
        
        console.log(data)
        data.cost = creations[data.mockup].cost
        data.uprofit = creations[data.mockup].profit
        data.delivery = creations[data.mockup].delivery
        console.info('this is itemData')
        itemData = data
        console.info('this is itemData')
        console.log(itemData)
        loaded = true

    })
    let deleting = false;
    const doDelete = async () => {
        if (deleting) {
            return
        }
        deleting = true

        let resp = await $popup(
            {
                title: "Delete Merch " + itemData.name, 
                desc: "Are you sure you want to delete item " + itemData.id,
                buttons: [
                    {name: "Confirm", value: true, color: 'ok'},
                    {name: "Decline", value: false, color: 'danger'}
                ]
            }
        )
        if (resp == 'true') {
            let batch = db.batch()
            batch.update(db.doc("/creators/" + $user.claims.username + "/merch/" + params.itemid), {deleted: true})
            batch.update(db.doc("/creators/" + $user.claims.username + "/merch/all"), {[params.itemid + "." + "deleted"]: true})
            await batch.commit()
            notification.set({
                accentColor: "success",
                title: "Success",
                content: "Merch Deleted",
            })
            setTimeout(() => {
               navigate('/merch/all')
            }, 800)
        }
        deleting = false

    }
    let updating = false
    const doUpdate = async () => {
        if (updating == true) {
            return
        }
        updating = true;
        if ($priceCalculatorData.profit < 2) {
            notification.set({
                accentColor: "alert",
                title: "Profit",
                content: "Item should generate at least 2tnd profit",
            })
            updating = false
            return
        }
        if (nameInput.value.length == 0) {
            notification.set({
                accentColor: "alert",
                title: "Merch Name",
                content: "Merch must have a name",
            })
            updating = false
            return 
        }
        let didModif = false
        let updateDoc = {}
        let updateAll = {}
        if (nameInput.value != itemData.name) {
            updateDoc.name = nameInput.value
            updateAll[params.itemid + '.name'] = nameInput.value
        }
        if ($priceCalculatorData.price != itemData.price) {
            updateDoc.price = $priceCalculatorData.price
            updateDoc.profit = $priceCalculatorData.profit
            updateAll[params.itemid + '.price'] = $priceCalculatorData.price
            updateAll[params.itemid + '.profit'] = $priceCalculatorData.profit
        }

        if (Object.keys(updateDoc).length != 0) {
            let batch = db.batch()
            batch.update(db.doc("/creators/" + $user.claims.username + "/merch/" + params.itemid), updateDoc);
            batch.update(db.doc("/creators/" + $user.claims.username + "/merch/all"), updateAll)
            await batch.commit()
            notification.set({
                accentColor: "success",
                title: "Success",
                content: "Merch Updated",
            })
        } else {
            notification.set({
                accentColor: "alert",
                title: "No Modification",
                content: "Nothing to Update",
            })
        }
        setTimeout(() => {
            updating = false
        }, 1000);
        

    }

    let nameInput

    let color = "white";
    let background = $accentColor;
    let border= $accentColor;
    let handleMouseOver = (e) =>{
        color = $accentColor;
        background = "white";
        border= $accentColor;
    }
    let handleMouseOut = (e) =>{
        color = "white";
        background = $accentColor;
        border= $accentColor;
    }
</script>


<div class:center={!loaded} class="u-view">
    {#if loaded && itemData}
        <header>
            <div on:click={doDelete}  href="/merch/create" class="u-button">
                {#if deleting}
                    <MaterialSpinner />
                {:else}
                    Delete
                {/if}
            </div>
        </header>
        <div class="u-content">

            <div class="u-image-section">
                <div class="image-container">
                    <img src={itemData.imgs[itemData.featuredColor].front} alt="front">
    
                </div>
    
                <div class="image-container">
                    <img src={itemData.imgs[itemData.featuredColor].back} alt="back">
                    
                </div>
    
            </div>
    
            <div class="u-info-section">
                <div class="input-container">
                    <label for="name">Merch Name</label>
                    <input bind:this={nameInput} value={itemData.name} class="input-text" type="text" id="name">
                </div>
    
                <div class="input-container">
                    <label for="name">Price</label>
                    <PriceCalculator
                        {priceCalculatorData}
                        cost={itemData.cost}
                        unifyProfit={itemData.uprofit}
                        price={itemData.price}
                        delivery={itemData.delivery}
                        xCreatorPorfit={itemData.profit}
                        modify={true}
                    />
                    {itemData.profit}
                </div>
            <div on:click={doUpdate} class="u-update" style="background:{background};color:{color};border:1px solid {border}" on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}> 
                    {#if updating }
                        <MaterialSpinner />
                    {:else}
                        Update
                    {/if}

                </div>
            </div>

        </div>
        
    {:else}
        <MaterialSpinner />
    {/if}

</div>