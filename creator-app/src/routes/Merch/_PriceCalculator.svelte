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
import { onMount } from 'svelte';

    import {taxRate} from '../../mockupdata.js'
    export let cost
    export let unifyProfit;
    export let price;
    $: {
        price = Math.floor((cost + unifyProfit) * (1 + taxRate)) + 5;
    }
    $: profit = Math.floor((price / (1 + taxRate)) - ((cost + unifyProfit) ))
    
</script>


<div class="u-price-calculator">
    <div class:red={profit < 2} class="u-price-wrapper">
        <div class:red={profit < 2} class="u-currency">TND</div>
        <input class:red={profit < 2}  bind:value={price}  class="price-input" type="number">
    </div>
    
    <div class:red={profit < 2} class="u-profit">
        {#if profit >= 2}
            TND {profit} profit/sale
        {:else}
            no profit
        {/if}

    </div>

</div>