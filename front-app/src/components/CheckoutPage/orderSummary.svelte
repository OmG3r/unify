<script>
    import {link} from 'svelte-routing'
    import {cart} from '../../store.js'
    import {onMount, onDestroy} from 'svelte'
    
    console.log($cart)
    let normalTotal = 0;
    let unsubscribeCart = () => {};
    unsubscribeCart = cart.subscribe((data) => {
        normalTotal = Object.entries(data.items).reduce((acc, [key, value]) => {
            acc += value.price * (value.quantity ? value.quantity : 1);
            return acc;
        }, 0);
    });

    onDestroy(() => {
        unsubscribeCart()
    })
</script>

<style>
     .container{
        width: 20%;
    }
    .title {
        font-size: 25px;
        font-weight: 700;
        color: rgb(var(--userColor));
    }

    .p_img {
        background-color: white;
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 18px rgba(var(--userColor), 0.15);
        border-radius: 15px;
        margin-right: 15px;
        overflow: hidden;
    }
    .p_img img {
        max-width: 100%;
    }
    .info {
        font-size: 12px;
        color: rgb(var(--userColor));
        display: flex;
        flex-direction: column;
        font-weight: 700;
    }
    .info .p_title,
    .info .p_sub_title {
        font-size: 13px;
    }
    .single_product {
        margin: 5px 0 5px 0;
    }
    .orders {
        overflow-y: scroll;
        height: 170px;
        scrollbar-color: #181d22 #8b8e90;
    }
    .orders::-webkit-scrollbar {
        width: 11px;
    }
    .orders::-webkit-scrollbar-track {
        background-color: #8b8e90;
    }
    .orders::-webkit-scrollbar-thumb {
        background-color: #181d22;
    }
    .unit_price,
    .quantity,
    .color_size,
    .single_product {
        display: flex;
        flex-direction: row;
        margin: 2px 0 2px 0;
    }
    .color_size .color,
    .color_size .size {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .color_size .size {
        margin-left: 10px;
    }
    .color_size .color .shape {
        margin-left: 15px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
    }
    .color_size .size .shape {
        margin-left: 15px;
        width: 20px;
        height: 20px;
        background-color: rgb(var(--userColor));
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }

    .unit_price .price {
        margin-left: 15px;
        color: #46b978;
    }
    .quantity .qty {
        margin-left: 15px;
    }
    hr {
        border-top: 1px solid rgba(var(--userColor), 0.3);
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
        font-size: 14px;
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
        font-size: 13px;
        font-weight: 600;
    }
    .final_total .prices .shipping {
        color: #46b978;
    }
    .total {
        display: flex;
        justify-content: flex-end;
        color: rgb(var(--userColor));
        font-size: 15px;
        font-weight: 700;
        margin: 15px 0 15px 0;
    }
    .back_to_cart {
        color: #46b978;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .back_to_cart:active {
        color: #6bc793;
        user-select: none;
    }
   

    @media only screen and (max-width: 1000px) {
        .orders {
            overflow-y: auto;
            height: auto;
        }

        .container {
            margin-bottom: 8px;
            width: 100%;
        }
    }
</style>

<div class="container">
    <span class="title">Order Summary</span>
    <hr />
    <div class="orders">
        {#each Object.entries($cart.items) as [key, order]}
            <div class="single_product">
                <div class="p_img"><img src="{order.imgs[order.color][order.featuredFace]}" alt="tshirt" /></div>
                <div class="info">
                    <span class="p_title">{order.name}</span>
                    <span class="p_sub_title">{order.creator}</span>
                    <div class="color_size">
                        <div class="color">
                            Color:
                            <div
                                class="shape"
                                style="background-color:{order.color}" />
                        </div>
                        <div class="size">
                            Size:
                            <div class="shape">{order.size}</div>
                        </div>
                    </div>
                    <div class="unit_price">
                        Unit Price:
                        <div class="price">{order.price} TND</div>
                    </div>
                    <div class="quantity">
                        Qty:
                        <div class="qty">{order.quantity}</div>
                    </div>
                </div>
            </div>
            <hr />
        {/each}
    </div>
    <div class="final_total">
        <div class="titles">
            <span class="subtotal">Subtotal</span>
            <span class="shipping">Shipping</span>
            {#if false}
            <span class="promotional_code">
                Promotional Code
                <span class="code">ti3leh10</span>
            </span>
            {/if}
        </div>
        <div class="prices">
            <span class="subtotal">{normalTotal} DT</span>
            <span class="shipping">Free</span>
             {#if false}<span class="promotional_code">- 15.7 DT</span>{/if}
        </div>
    </div>
    <hr />
    <span class="total">Total: {normalTotal} DT</span>
    <hr />
    <a use:link href="/cart" class="back_to_cart">Back To Cart</a>
</div>
