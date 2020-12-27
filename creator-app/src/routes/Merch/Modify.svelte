<style>
    .u-view  {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
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
        border-color: #d23149;
        color: white;
        cursor: pointer;
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.34),
            0 0px 10px rgb(70 185 120 / 0.32);
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
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.5),
            0 0px 10px rgb(70 185 120 / 0.5);
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
    

    const priceCalculatorData = writable({})
    let loaded = false;
    let itemData = undefined
    let savedData = undefined
    onMount(async () => {
        let resp = await db.doc("/creators/" + $user.docData.username + "/merch/" + params.itemid).get()
        let data = resp.data()
        if (data == undefined) {
            navigate('/merch/all')
        }

        for (let x of ['front','back']) {
            let path = 'creators/' + $user.docData.username + "/merch/" + params.itemid + "/" + x
            data.imgs[x] = uuidToImageLink(data.imgs[x], path)
            console.log(data.imgs[x])
        }
        console.log(data)
        data.cost = creations[data.mockup].cost
        data.profit = creations[data.mockup].profit
        itemData = data
        
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
            batch.update(db.doc("/creators/" + $user.docData.username + "/merch/" + params.itemid), {deleted: true})
            batch.update(db.doc("/creators/" + $user.docData.username + "/merch/all"), {[params.itemid + "." + deleted]: true})
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
        if ($priceCalculatorData.profitable == false) {
            notification.set({
                accentColor: "alert",
                title: "Profit",
                content: "Item should generate profit",
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
            updateAll[params.itemid + '.price'] = $priceCalculatorData.price
        }

        if (Object.keys(updateDoc).length != 0) {
            let batch = db.batch()
            batch.update(db.doc("/creators/" + $user.docData.username + "/merch/" + params.itemid), updateDoc);
            batch.update(db.doc("/creators/" + $user.docData.username + "/merch/all"), updateAll)
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
        }, 8000);
        

    }

    let nameInput
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
                    <img src={itemData.imgs.front} alt="front">
    
                </div>
    
                <div class="image-container">
                    <img src={itemData.imgs.back} alt="back">
                    
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
                        unifyProfit={itemData.profit}
                        price={itemData.price}
                    />
                </div>
                <div on:click={doUpdate} class="u-update">
                    {#if updating}
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