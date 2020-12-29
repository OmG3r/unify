<style>
    .u-price-calculator {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .u-price-wrapper {
        position: relative;
        color: white;
    }
    .u-price-wrapper.red {
        color: #ee2761
    }
    .price-input {
        padding: 10px 8px 10px 40px;
        background-color: #2e2d3e;
        color: white;
        width: 100px;
        border:none;
        outline: none;
    }
    .price-input.red {
        color: #ee2761;
        border: 1px solid #ee2761;
    }
    .u-currency {
        font-size: 14px;

        position: absolute;
        top: 0;
        left: 8px;
        bottom: 0;
        margin: auto;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .u-currency.red {
        color: #ee2761;  
    }
    .u-profit {
        color: #32b259;
        font-size: 14px;
    }
    .u-profit.red {
        color: #ee2761
    }
</style>

<script>

    import { createEventDispatcher } from 'svelte';
    import {onMount} from 'svelte'
    const dispatch = createEventDispatcher();
    import {taxRate, clicPayRate} from '../../mockupdata.js'
    export let cost
    export let unifyProfit;
    export let priceCalculatorData;
    
    
    export let price = Math.floor((cost + unifyProfit ) * (1 + taxRate)) + 2


    let adjustedTVA = clicPayRate - ((unifyProfit + cost) * clicPayRate ) / price


    let profit = Math.floor((price / (1 + taxRate)) - ((cost + unifyProfit) ))
    let profitable = !(profit < 1)
    console.log(profit)
    $priceCalculatorData = {profit, price, profitable}
    
    
        //
        //
   
    const handlePriceChange = (e) => {
        let price = e.target.value
        console.log(price)
        console.log(cost)
        console.log(unifyProfit)
        profit = Math.floor((price / (1 + taxRate)) - ((cost + unifyProfit) ))
        console.log(profit)
        profitable = !(profit < 1)

        $priceCalculatorData = {profit, price, profitable}
    
    }
</script>


<div class="u-price-calculator">
    <div class:red={!profitable} class="u-price-wrapper">
        <div class:red={!profitable} class="u-currency">TND</div>
        <input  on:input={handlePriceChange} class:red={!profitable}  value={price}  class="price-input" type="number">
    </div>
    
    <div class:red={!profitable} class="u-profit">
        {#if profitable}
            TND {profit} profit/sale
        {:else}
            no profit
        {/if}

    </div>

</div>