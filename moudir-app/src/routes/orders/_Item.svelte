<style>
     .u-item {
        
        display: flex;
        margin: 10px 0;
        height: 140px;
        max-height: 140px;
        padding: 10px 5px 10px 5px;
        box-shadow: 0px 0px 15px #0000001c;
        background-color: white;
        margin-left: 10px;
        position: relative;
    }

    .u-item.selected {
        -webkit-box-shadow: 0px 5px 9px 0px #46B978; 
        box-shadow: 0px 5px 9px 0px #46B978;
    }
    .u-select-box {
        position: absolute;
        left: -30px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        background-color: #EBEBEB;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding: 10px;
        /*box-shadow: inset 0px 0px 1px 0px #000000;*/
        border: 3px solid transparent;
        outline: none;
    }
    .u-select-box:focus {
        border: 3px solid #46B978;
    }
    .u-select-box img {
        max-width: 100%;
    }
    .t-body-cart-session-id {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .t-body-item-info {
        display: flex;
    }
    .u-item-image {
        width: 50%;
        display: flex;
        justify-content: center;
    }
    .u-item-image img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        box-shadow: 0px 0px 15px #0000001c;
        border-radius: 4px;
    }
    .u-item-info-data {
        width: 50%;
        height: 100%;
    }
    
    .u-item-quantity-price {
        display: flex;
        justify-content: space-between;

    }
    .u-item-name {
        font-weight: bold;
        font-size: 20px;
    }
    .u-item-color-size {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    .u-item-size, .u-item-color {
        display: flex;
        align-items: center;
        
    }
    .color-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 8px;
    }
    .u-size {
        width: 15px;
        height: 15px;
        background-color: #181D22;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        margin-left: 12px;
    }
    .u-item-price {
        font-weight: bold;
        font-size: 16px;
        color: var(--AccentColor)
    }
    .u-item-creator {
        font-size: 12px;
        font-weight: 700;
        color: #33333378;
        margin-bottom: 8px;
    }
    .bold {
        font-weight: bold;
    }
    .t-body-client-info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-left: 20px;
    }
    .u-client-name-container {
        margin-bottom: 8px;
    }
    .u-client-name {
        
        font-size: 18px;
    }
    .u-client-phone-number {
        margin-bottom: 8px;
    }
    
    .t-body-date {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column; 
    }
    .t-body-status {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;   
    }
    .t-body-status-select {
        padding: 8px 16px;
    }
    .t-body-status-select option {
        color: white;
        height: 30px;
        padding: 8px;
    }
    :global(.selectContainer) {
        min-width: 140px;
    }
</style>


<script>
    import Select from 'svelte-select'
    import Address from './_Address.svelte'
    import {colors, formatTimestampToDate, formatPhoneNumber} from '../../utils.js'
    import {onDestroy} from 'svelte'
    export let item;
    export let cart
    export let statusData
    export let selectedItems
    let itemCartID = cart.cartID + "-" + item.creator + "-" + item.id
    const handleSelect = (event) => {
        let selected = event.detail.value
    }
    const handleSelectedItems = () => {
        console.log(itemCartID)
        if (selected) {
            $selectedItems = $selectedItems.filter((itemx) => itemx != itemCartID)
        } else {
            $selectedItems = [...$selectedItems, itemCartID]
        }
    }
    let selected = false
    let unsubscribeSelectedItems = selectedItems.subscribe((v) => {
        
        selected = v.includes(itemCartID)
    })

    onDestroy(() => {
        unsubscribeSelectedItems()
    })
</script>


<div class:selected={selected} class="u-item">
    <div
    tabindex="0"
    on:click={handleSelectedItems}
    class="u-select-box noselect">
    
        {#if !selected}
            <img src="/imgs/misc/add-list.png" alt="add-list">
        {:else}
            <img src="/imgs/misc/remove-list.png" alt="remove-list">
        {/if}
    </div>
    <div class="t-body-cart-session-id">
        <div class="u-cart-id">CartID: <span class="bold">#{cart.cartID}</span> </div>
        <div class="u-session-id">Session: {cart.sessionID  ? cart.sessionID : "-"}</div>
    </div>
    <div class="t-body-item-info">
        <div class="u-item-image">
            <img src={item.img} alt={item.name}>
        </div>
        <div class="u-item-info-data">
            <div class="u-item-name">{item.name}</div>
            <div class="u-item-creator">{item.creator}</div>
            <div class="u-item-color-size">
                <div class="u-item-color">Color: <div style={"background-color:" + colors[item.color.toLowerCase()] + ";"} class="color-circle"></div></div>
                <div class="u-item-size">Size: <span class="u-size">{item.size}</span> </div>
            </div>
            
            <div class="u-item-quantity-price">
                <div class="u-item-quantity">
                    Qty: {item.quantity}
                </div>
                <div class="u-item-price">
                    Price: {item.price} TND
                </div>
            </div>
        </div>
    </div>
    <div class="t-body-client-info">
        <div class="u-client-name-container"><span class="u-client-name bold">{cart.name}</span></div>
        <div class="u-client-phone-number"> {formatPhoneNumber(cart.phoneNumber)}</div>
        <Address  {cart} />
    </div>
    <div class="t-body-date">
        {formatTimestampToDate(cart.timestamp)}
    </div>
    <div class="t-body-status">
        <!--
        <select class="t-body-status-select">
            {#each Object.entries(statusData) as [id, statusValue]}
                <option
                    style={"background-color:" + statusValue.color + ";" } 
                    value={id}
                    selected={item.status && item.status.id == id}>
                    {statusValue.text}
                </option>
            {/each}
        </select>
        -->
        <Select
        on:select={handleSelect}
        selectedValue={item.status ? {label: statusData[item.status].text, value: item.status} : {value: 'in_progress', value: 'in_progress'}}
        items={Object.entries(statusData).map(([id, data]) => { return {value: id, label: data.text}})} />
    </div>

</div>