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
        background-color: #181d22;
        color: white;
        width: 100px;
        border:none;
        outline: none;
        border-radius: 8px;
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
    import { calculateBasePrice, round} from '../../utils.js'
    import { createEventDispatcher } from 'svelte';
    import {onMount} from 'svelte'
    const dispatch = createEventDispatcher();
    import {taxRate, clicPayRate} from '../../mockupdata.js'
    import { accentColor } from '../../store.js';
    export let cost
    export let unifyProfit;
    export let priceCalculatorData;
    export let delivery
    export let printarea;
    export let frontCost = 0;
    export let backCost = 0;


    export let price = round(((unifyProfit * (1 + taxRate)) + delivery + cost +frontCost + backCost) * (1 + clicPayRate), 1) + 2

    let theInput
    let hadData = false
    if (printarea?.subscribe) {
        printarea.subscribe((v) => {
            if (hadData === false && v.front.price == 0 && v.back.price == 0) {


                return
            } else if (hadData === true && v.front.price == 0 && v.back.price == 0 ) {
                hadData = false
                let creatorProfit = round( ( ((price / (1 + clicPayRate)) - cost - delivery - frontCost - backCost) / ( 1+ taxRate) ) - unifyProfit, 1 )
                console.log('creatorPorift: ' + creatorProfit)
                frontCost = v.front.price
                backCost = v.back.price
                price = round((((unifyProfit + creatorProfit) * (1 + taxRate)) + delivery + cost +frontCost + backCost) * (1 + clicPayRate), 1)
                profitable = !(creatorProfit < 1)
                theInput.value = price
                $priceCalculatorData = {profit: creatorProfit, price, profitable}
            } else  {
                hadData = true
                console.log(v)
                let creatorProfit = round( ( (($priceCalculatorData.price / (1 + clicPayRate)) - cost - delivery - frontCost - backCost) / ( 1+ taxRate) ) - unifyProfit, 1 )
                console.log('creatorPorift: ' + creatorProfit)
                frontCost = v.front.price
                backCost = v.back.price
                price = round((((unifyProfit + creatorProfit) * (1 + taxRate)) + delivery + cost +frontCost + backCost) * (1 + clicPayRate), 1)
                profitable = !(creatorProfit < 1)
                theInput.value = price
                $priceCalculatorData = {profit: creatorProfit, price, profitable}
            }

        })
    }

    let adjustedTVA = clicPayRate - ((unifyProfit + cost + delivery ) * clicPayRate ) / price


    
    let profit = round( ( ((price / (1 + clicPayRate)) - cost - delivery - frontCost - backCost) / ( 1+ taxRate) ) - unifyProfit, 1 )
    let profitable = !(profit < 1)
    console.log(profitable)
    $priceCalculatorData = {profit, price, profitable}
    console.log($priceCalculatorData)
    
        //
        //
   
    const handlePriceChange = (e) => {
        let price = e.target.value
        console.log('input price:' +price)
        console.log('itemcost:' +cost)
        console.log('unify profit:' +unifyProfit)
        profit = round( ( ((price / (1 + clicPayRate)) - cost - delivery - frontCost - backCost) / ( 1+ taxRate) ) - unifyProfit, 1 )
        
        profitable = !(profit < 1)

        $priceCalculatorData = {profit, price, profitable}
        console.log($priceCalculatorData)
        console.log('profit:' + profit)
    
    }
</script>


<div class="u-price-calculator">
    <div class:red={!$priceCalculatorData.profitable} class="u-price-wrapper">
        <div class:red={!$priceCalculatorData.profitable} class="u-currency">TND</div>
        <input bind:this={theInput}  on:input={handlePriceChange} class:red={!$priceCalculatorData.profitable}  value={price}  class="price-input" type="number">
    </div>
    
<div class:red={!$priceCalculatorData.profitable} class="u-profit" >
        {#if $priceCalculatorData.profitable}
            TND {profit} profit/sale
        {:else}
            no profit
        {/if}

    </div>

</div>