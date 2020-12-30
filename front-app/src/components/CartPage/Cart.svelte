

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 0 50px 0 50px;
        margin-top: 100px;
    }
    .container .title {
        font-size: 30px;
        font-weight: 700;
        color: rgb(var(--userColor));
    }
    .container .sub_title {
        font-size: 20px;
        color: rgba(var(--userColor), 0.5);
    }
    .single_order {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        grid-column-start: 1;
        grid-column-end: 5;
        margin: 15px 0 15px 0;
    }
    .orders_container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    hr {
        grid-column-start: 1;
        grid-column-end: 5;
        border: 0;
        border-top: 1px solid #8b8e9059;
        width: 100%;   
    }
    .article_title {
        grid-column-start: 1;
        grid-column-end: 2;
        color: #8b8e90;
        justify-self: center;
    }
    .quantity_title {
        grid-column-start: 2;
        grid-column-end: 3;
        color: #8b8e90;
        justify-self: center;
    }
    .unit_price_title {
        grid-column-start: 3;
        grid-column-end: 4;
        color: #8b8e90;
        justify-self: center;
    }
    .total_price_title {
        grid-column-start: 4;
        grid-column-end: 5;
        color: #8b8e90;
        justify-self: center;
    }

    .article {
        grid-column-start: 1;
        grid-column-end: 2;
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .quantity {
        grid-column-start: 2;
        grid-column-end: 3;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .quantity .qty_btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 2px solid #181d22;
        border-radius: 25px;
        height: 40px;
        width: max-content;
        width: 150px;
        background-color: #181d22;
        border: none;
    }
    .quantity .qty_btn div {
        width: 33.33%;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
    }
    .quantity .qty_btn .minus {
        color: white;
        font-size: 25px;
        border-radius: 25px 0 0 25px;
        cursor: pointer;
        height: 100%;
        user-select: none;
    }
    .quantity .qty_btn .minus:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .quantity .qty_btn .plus {
        color: white;
        font-size: 25px;
        height: 100%;
        user-select: none;
        border-radius: 0 25px 25px 0px;
        cursor: pointer;
    }
    .quantity .qty_btn .plus:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .quantity .qty_btn .qty {
        font-size: 20px;
    }
    .qty::-webkit-outer-spin-button,
    .qty::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .qty {
        width: 33.33%;
        background-color: #181d22;
        border: none;
        color: white;
        text-align: center;
    }
    .unit_price {
        grid-column-start: 3;
        grid-column-end: 4;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 18px;
        font-weight: 700;
    }
    .unit_price .old_price {
        text-decoration: line-through solid rgba(var(--userColor), 0.5);
        color: rgba(var(--userColor), 0.5);
    }
    .unit_price .economie {
        color: rgb(var(--AccentColor));
    }
    .single_order .total_price {
        grid-column-start: 4;
        grid-column-end: 5;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
    }

    .single_order .total_price .btns {
        margin-top: 15px;
        display: flex;
        width: 50px;
        justify-content: space-between;
        cursor: pointer;
    }
    .single_order .total_price .btns i:active {
        color: rgb(var(--AccentColor));
    }

    .article .info {
        display: flex;
        flex-direction: column;
    }
    .article .info .p_title {
        display: flex;
        flex-direction: column;
    }
    .article .info .p_title .title {
        font-size: 25px;
        color: #181d22;
    }
    .article .info .p_title .sub_title {
        font-size: 15px;
        color: #181d22;
        font-weight: 600;
    }
    .article .info .color {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        font-weight: 600;
        align-items: center;
    }
    .article .info .color .shape {
        margin-left: 15px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
    }

    .article .info .size {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        font-weight: 600;
        align-items: center;
    }
    .article .info .size .shape {
        margin-left: 15px;
        width: 30px;
        height: 30px;
        background-color: #181d22;
        border-radius: 10px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }
    .article .p_img img {
        max-width: 100%;
    }
    .article .p_img {
        background-color: white;
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 18px rgba(var(--userColor), 0.15);
        border-radius: 15px;
        margin-right: 15px;
    }
    .discount_container {
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
    }
    .discount_container .title {
        margin-right: 15px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
    }
    .discount_container .promo_code {
        border-radius: 15px 0 0 15px;
        border: 1px solid rgba(var(--userColor), 0.5);
        padding: 12px;
        font-size: 15px;
        font-weight: 600;
    }
    .discount_container .apply_btn {
        background-color: rgb(var(--AccentColor));
        color: white;
        width: 80px;
        border-radius: 0 15px 15px 0;
        border: none;
        font-size: 15px;
        font-weight: 600;
    }
    .discount_container .apply_btn:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    button {
        cursor: pointer;
    }
    input:focus,
    button:focus {
        outline: none;
    }
    .final_total {
        margin: 20px 0 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .final_total .titles,
    .final_total .prices {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 700;
    }
    .final_total .prices {
        align-items: flex-end;
    }
    .final_total .titles {
        align-items: flex-start;
    }
    .final_total .prices span,
    .final_total .titles span {
        margin: 5px 0 5px 0;
    }
    .promotional_code .code {
        color: rgba(var(--userColor), 0.5);
        font-size: 15px;
        font-weight: 600;
    }
    .final_total .prices .shipping {
        color: rgb(var(--AccentColor));
    }
    .total {
        display: flex;
        justify-content: flex-end;
        color: rgb(var(--userColor));
        font-size: 18px;
        font-weight: 700;
        margin: 15px 0 15px 0;
    }
    .continue_finilize {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0 15px 0;
    }
    .continue_finilize .continue,
    .continue_finilize .finilize {
        width: 300px;
        height: 40px;
        color: white;
        font-size: 16px;
        font-weight: 700;
        border: none;
        border-radius: 12px;
        margin: 0 10px 0 10px;
    }
    .continue_finilize .continue {
        background-color: rgb(var(--userColor));
    }
    .continue_finilize .continue:active {
        background-color: rgba(var(--userColor), 0.8);
    }
    .continue_finilize .finilize {
        background-color: rgb(var(--AccentColor));
    }
    .continue_finilize .finilize:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }

    .sizes {
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+);
        background-position: 25px center;
        background-repeat: no-repeat;
        outline: none;
        border: 1px solid #DDD;
        border-radius: 0;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        padding: 4px 8px;
        width: 50px;
        
        margin-left: 16px;

        border-radius: 3px;
    }
    .radio_btns{
        margin-left: 15px;
        display: flex;
        flex-direction: row;
    }
    .size_label div{
        width:30px;
        height:30px;
        margin:0 5px 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(var(--userColor));
        color: white;
        font-size: 15px;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
    }
    input[type="radio"]{
        display: block;
    }
    input[type="radio"]:checked + div{
        background-color: rgb(var(--AccentColor));
    }
   
    .quantity_mobile {
        width: 100%;
        display: flex;
        margin-top: 15px;
        font-weight: 600;
        align-items: center;
    }
    .quantity_mobile .qty_btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 2px solid #181d22;
        border-radius: 25px;
        height: 30px;
        width: max-content;
        width: 100px;
        background-color: rgb(var(--userColor));
        border: none;
        margin-left: 15px;
        font-size: 20px;
    }
    .quantity_mobile .qty_btn div {
        width: 33.33%;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
    }
    .quantity_mobile .qty_btn .minus {
        color: white;
        border-radius: 25px 0 0 25px;
        cursor: pointer;
        height: 100%;
        user-select: none;
    }
    .quantity_mobile .qty_btn .minus:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .quantity_mobile .qty_btn .plus {
        color: white;
        height: 100%;
        user-select: none;
        border-radius: 0 25px 25px 0px;
        cursor: pointer;
    }
    .quantity_mobile .qty_btn .plus:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .unit_price_mobile,.total_price_mobile{
        font-weight: 600;
        margin-top: 15px;
        display:flex;
        flex-direction: row;
    }
    
    .price_mobile{
        font-size: 17px;
        margin-left:15px;
    }
    .btns_mobile{
        margin-top: 15px;
    }
    .btns_mobile img{
        width: 25px;
        height:25px;
        cursor: pointer;
        margin: 0 5px 0 5px;
    }
   .btns_mobile img:active{
        filter: invert(62%) sepia(12%) saturate(1951%) hue-rotate(93deg) brightness(100%) contrast(83%);
    }
    .mobile_items{
        display: none;
    }
    @media only screen and (max-width: 1180px) {
        .desktop_items{display:none !important;}
        .single_order,.orders_container,.mobile_items {display: block !important;}
        .container{padding:0 10px 0 10px}
      }
</style>
<script>
    import {cart} from '../../store.js'
    import {navigate} from 'svelte-routing'
    import {onMount} from 'svelte'
    import {textToHex} from '../../utils.js'
    let quantity = 1;
    let loaded = false
    onMount(() => {
        if (Object.keys($cart).length == 0) {
            navigate('/')
        }
        loaded = true
    })
    const handleChangeSize = (key, e) => {
        $cart = {
            ...$cart,
            [key]: {
                ...$cart[key],
                size: e.target.value
            }
        }
        console.log($cart)

    }

    const updateQuantity = (key, e) => {
        $cart = {
            ...$cart,
            [key]: {
                ...$cart[key],
                quantity: e.target.value
            }
        }
    }
    const isSelected = () =>  {
        return 
    }

    const calculateTotal = () => {
        
    }
    let normalTotal = 0
    cart.subscribe((data) => {
        normalTotal = Object.entries(data).reduce((acc, [key, value]) => {
            acc += value.price * (value.quantity ? value.quantity : 1)
            return acc
        }, 0)
    })

</script>
{#if loaded}
    <div class="container">
        <span class="title">Shopping cart ({Object.keys($cart).length} Articles )</span>
        <span class="sub_title">Free Delivery</span>

        <div class="orders_container">
           
            <span class="article_title desktop_items">Article</span>
            <span class="quantity_title desktop_items">Quantity</span>
            <span class="unit_price_title desktop_items">Unit Price</span>
            <span class="total_price_title desktop_items">Total price</span>
            
            <hr />
            {#each Object.entries($cart) as [key, value]}
                <div class="single_order">
                <!--********-->
                    <div class="article">
                        <div class="p_img">
                            <img crossorigin="anonymous" src={value.imgs[value.featuredFace]} alt="order" />
                        </div>
                        <div class="info">
                            <div class="p_title">
                                <span class="title">{value.name}</span>
                                <span class="sub_title">from {value.creator}</span>
                            </div>
                            <div class="color">
                                Color:
                                <div style={"background-color:" + textToHex(value.color) + ";"} class="shape" />
                            </div>
                            <div class="size">
                                Size:
                                <div class="radio_btns">
                                        {#each ['S', 'M', 'L', 'XL'] as size}
                                <label class="size_label"for="{size}">
                                    <input type="radio" on:change={(e)=>{handleChangeSize(key,e)}}  value="{size}"  id={size} name="size" >
                                    <div>{size}</div>
                                </label>
                                 {/each}
                                </div>
                            </div>
                            <div class="mobile_items">
                                <div class="quantity_mobile">
                                    Quantity:
                                    <div class="qty_btn">
                                        <div class="minus"
                                        on:click={() => {
                                            value.quantity <= 1 || value.quantity == undefined ? (value.quantity = 1) : (value.quantity -= 1);
                                        }}>
                                    -
                                    </div>
                                    <input disabled class="qty" on:change={(e) => {updateQuantity(key, e)}} value={value.quantity ? value.quantity : 1} />
                                    <div class="plus"
                                        on:click={() => {
                                            value.quantity += 1;
                                        }}>
                                        +
                                    </div>
                                    </div>
                                    
                                </div>

                                <div class="unit_price_mobile">
                                    Unit Price:
                                    <div class="price_mobile">{value.price}TND</div> 
                                </div>

                                <div class="total_price_mobile">
                                    Total Price:
                                    <div class="price_mobile">{value.price * (value.quantity ? value.quantity : 1)} TND</div>
                                    
                                </div>

                                <div class="btns_mobile">
                                <img src="img/misc/heart.png" alt="heart">
                                <img src="img/misc/delete.png" alt="delete">
                            </div>
                        </div>
                            
                        </div>
                    </div>
                    <!--********-->
                   
                        <div class="quantity desktop_items">
                            <div class="qty_btn">
                                <div
                                    class="minus"
                                    on:click={() => {
                                        value.quantity <= 1 || value.quantity == undefined ? (value.quantity = 1) : (value.quantity -= 1);
                                    }}>
                                    -
                                </div>
                                
                                <input disabled class="qty" on:change={(e) => {updateQuantity(key, e)}} value={value.quantity ? value.quantity : 1} />
                                <div
                                    class="plus"
                                    on:click={() => {
                                        value.quantity += 1;
                                    }}>
                                    +
                                </div>
                            </div>
                        </div>
                        <!--********-->
                        <div class="unit_price desktop_items">
                            <div class="price">{value.price} TND</div>
                            {#if false}
                                <div class="old_price">52 DT</div>
                                <div class="economie">Economie: 7 DT</div>
                            {/if}
                        </div>
                        <!--********-->
                        <div class="total_price desktop_items">
                            <div class="price">{value.price * (value.quantity ? value.quantity : 1)} TND</div>
                            <div class="btns">
                                <i class="far fa-heart" />
                                <i class="fas fa-minus" />
                            </div>
                        </div>
                        <!--********-->
                        </div>
          
                <hr />
            {/each}
            
        </div>
        {#if false}
        <div class="discount_container">
            <span class="title">Promo code:</span>
            <input type="text" class="promo_code" placeholder="Enter promo code" />
            <button type="button" class="apply_btn">Apply</button>
        </div>
        {/if}

        <div class="final_total">
            <div class="titles">
                <span class="subtotal">Subtotal</span>
                <span class="shipping">Shipping</span>
               {#if false} <span class="promotional_code">
                    Promotional Code
                    <span class="code">ti3leh10</span>
                </span>{/if}
            </div>
            <div class="prices">
                <span class="subtotal">{normalTotal} DT</span>
                <span class="shipping">Free</span>
               {#if false} <span class="promotional_code">- 15.7 DT</span>{/if}
            </div>
        </div>
        <hr />
        <span class="total">Total: {normalTotal} DT</span>

        <div class="continue_finilize">
         {#if false}<button class="continue">Continue Shopping</button>{/if}
            <button class="finilize">Finilize Your Order</button>
        </div>
    </div>
{/if}