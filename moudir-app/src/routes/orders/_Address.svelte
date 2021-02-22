<style>
    .u-container-address {
        display: flex;
        align-items: center;
    }
    p.u-client-address {
        margin: 0;
    }

    .u-edit {
        display: block;
        max-width: 24px;
        margin-left: 10px;
    }

    .u-address-popup {
        position: fixed;
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.8);

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
    }

    .u-box {
        background-color: white;
        padding: 30px 60px;
        border-radius: 4px;
        width: 500px;
        
        
    }

    .u-entry {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .u-entry span {
        display: block;
        min-width: 70px;
    }
    
    .u-address-input {
        height: 42px;
        border: 1px solid #d8dbdf;
        padding: 6px 10px;
        width: 100%;
        outline: none;
    }
    .u-address-input:focus {
        border: 1px solid #006fe8;
        
    }
    .u-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
    }
    .u-title {
        text-align: center;
    }
    .u-buttons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    .u-button {
        padding: 8px 16px;
        border-radius: 3px;
        color: white;
        cursor: pointer;
    }
    .u-button.discard {
        background-color: teal;
    }

    .u-button.update {
        background-color: thistle;
    }
</style>

<script>

    import {states} from '../../states.js'
    import Select from 'svelte-select'
    import {formatPhoneNumber} from '../../utils'
    import {onDestroy} from 'svelte'
    import {writable} from 'svelte/store'
    export let cart
    const edit = writable(false)
    let unsubscribeEdit = edit.subscribe((v) => {
        if (v == true) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    })

    onDestroy(() => {
        if ($edit == true) {
            document.body.style.overflowY = "auto"   
        }
        unsubscribeEdit()
    })

    let info = {
        address: cart.address,
        state: cart.state,
        city: cart.city,
        postal: cart.postal
        
    }
    let acceptedCitiesPostals = {
        cities: states[info.state].cities,
        postals: states[info.state].postals
    }
   
    const handleSelectState = (event) => {
        let v = ''
        if (event.detail) {
            v = event.detail
            console.log(event.detail)
            acceptedCitiesPostals = {
                cities: states[v].cities,
                postals: states[v].postals
            }

            info.state = v.value
            info.city = ''
            info.postal = ''
        } else {
            info.state = ''
            info.city = ''
            info.postal = ''
        }
    }

    const handleSelectCity = (event) => {
        let v = ''
        if (event.detail) {
            v = event.detail.value
        }
        info.city = v
    }
    const handleSelectPostal = (event) => {
        console.log(event)
        let v = ''
        if (event.detail) {
            v = event.detail.value
        }
        info.postal = v
    }
    let updating = false
    const doUpdate = () => {
        if (updating) {
            return
        }
        updating = true
        
        if (cart.address == info.address && cart.city == info.city && cart.state == info.state && cart.postal == info.postal) {
            updating = false
            return
        }
        console.log(info)
        updating = false
    }
</script>
<div class="u-container-address">
    
    <p class="u-client-address">{cart.address}, {cart.state != "Other" ? cart.state: ""}, {cart.city != cart.state ? (cart.city + ", ") : ""}{cart.postal != "Other" ? cart.postal : ""}</p>
    <img on:click={() => {$edit = true}} class="u-edit" src="/imgs/misc/edit.png" alt="edit">
    
</div>
{#if $edit}
<div on:click={() => {$edit = false}} class="u-address-popup">
    <div on:click|stopPropagation class="u-box">
        <h2 class="u-title">Edit Address</h2>
        <div class="u-info">
            <div class="u-name">
                {cart.name}
            </div>
            <div class="u-phone">
                {formatPhoneNumber(cart.phoneNumber)}
            </div>
        </div>
        <div class="u-entry">
            <span>Address</span>
            <input value={cart.address} class="u-address-input" type="text">
        </div>
        <div class="u-entry">
            <span>State</span>
            <Select items={Object.keys(states)} selectedValue={info.state} on:select={handleSelectState}/>
        </div>
        <div class="u-entry">
            <span>City</span>
            <Select
                items={acceptedCitiesPostals.cities} 
                selectedValue={info.city}
                on:select={handleSelectCity}/>
        </div>
        <div class="u-entry">
            <span>Postal</span>
            <Select
                items={acceptedCitiesPostals.postals}
                selectedValue={info.postal}
                on:select={handleSelectPostal}/>
        </div>
        <div class="u-buttons">

            <div on:click={() => {$edit = false}} class="u-button discard">
                Discard
            </div>
            <div on:click={doUpdate} class="u-button update">
                Update
            </div>
        </div>

    </div>

</div>
{/if}