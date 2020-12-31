<script>
    import { dbWrapper } from "../../firebase.js";
    import { uuidToImageLink, socialMedias } from "../../utils.js";
    import { link } from "svelte-routing";

    export let params = {};
    let loaded = false;
    let displayProducts = [];
    let colors = ["0e80f6", "d40019", "46B978", "737372"];
    
    dbWrapper.get("/creators/omg3r/merch/all").then((data) => {
        console.log(data);
        if (data == undefined) {
            displayProducts = [];
            loaded = true;
            return;
        }

        displayProducts = Object.entries(data).map(([key, value]) => {
            value.id = key;
            for (let x of ["front", "back"]) {
                value.imgs[x] = uuidToImageLink(
                    value.imgs[x],
                    "creators/omg3r/merch/" + key + "/" + x
                );
            }
            return value;
        });
        console.log(displayProducts);
        let loaded = true;
    });
</script>

<style>

    .profile_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        align-items: center;
    }
    .profile_container .big_title {
        font-size: 30px;
        font-weight: 600;
        width: 100%;
        text-align: left;
    }
    hr {
        width: 100%;
    }
     .u_products {
        min-height: 100%;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        row-gap: 50px;
    }

    .single_product {
        background-color: #f6f6f8;
        border-radius: 20px;
        margin: 25px 15px 25px 15px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 240px;
        cursor: pointer;
        user-select: none;
    }
    .single_product img {
        max-width: 100%;
    }
    .single_product .product_img{
        border-radius: 20px;
    }

    .cartBtns {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 0px;
        background-color: #181d22;
        border-radius: 0 20px 0 20px;
        justify-content: center;
        width: 45px;
        height: 90px;
    }
    .cartBtns div img {
        width: 25px;
        filter: invert(100%) sepia(0%) saturate(7428%) hue-rotate(68deg) brightness(101%) contrast(87%);
        margin: 5px 0px 5px 0px;
        cursor: pointer;
    }
    .cartBtns div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%; 
    }
    .cartBtns .icon1:active {
        background-color: #46B978;
        border-radius: 0 17px 0 0;
    }
    .cartBtns .icon2:active {
        background-color: #46B978;
        border-radius: 0 0px 0 17px;
    }
    .productInfo {
        width: 100%;
        padding: 0px 20px 0px 20px;
    }

    .productInfo .product_title {
        font-size: 20px;
        font-weight: 600;
    }
    .productInfo .product_price {
        font-weight: 700;
        display: flex;
        flex-direction: column;
    }
    .product_price .current_price {
        font-size: 20px;
        margin: 10px 0 10px 0;
    }
    .product_price .old_price .price {
        text-decoration: line-through;
        color: #c8c9ca;
        font-weight: 600;
        margin-right: 10px;
    }
    .product_price .old_price .percentage_discount {
        background-color: #181d22;
        color: white;
        padding: 4px;
        border-radius: 5px;
        font-weight: 600;
    }

   
    /******************end Budget slider******************/

  
  
    .colors {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        margin-top: 15px;
        padding: 0px 20px 0px 20px;
    }

    .color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    .color_border {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
    }
    .color_border:hover {
        border-width: 2px !important;
    }
    @media only screen and (max-width: 1180px) {
         .u_products {
            grid-template-columns: 1fr 1fr;
            flex: 0 0 45%;
            padding: 0px;
        }
        .big_title {
            margin-left: 25px;
        }
        hr {
            display: none;
        }
    }
      @media only screen and (max-width: 800px) {
        .u_products {
            grid-template-columns: 1fr;
            flex: 0 0 100%;
        }
    }

</style>

<div class="profile_container">
    <div class="big_title">My Wishlist</div>
    <hr/>

    <div class="product_container">
         <div class="u_products">
            {#each displayProducts as product}
                <div class="single_product">
                    <a
                        use:link
                        href={'/' + params.userid + '/merch/' + product.id}>
                        <img
                            class="product_img"
                            src={product.imgs[product.featuredFace]}
                            alt="product" />
                    </a>

                    <div class="cartBtns">
                        <div class="icon1">
                            <img
                                src="/img/misc/cart.png"
                                alt="cart"
                                on:click={() => {
                                    cart.add({
                                        [params.userid +
                                        '/' +
                                        product.id]: product,
                                    });
                                }} />
                        </div>
                        <div class="icon2">
                            <img src="/img/misc/heart.png" alt="heart" />
                        </div>
                    </div>
                    <div class="productInfo">
                        <span class="product_title">{product.name}</span>
                        <div class="product_price">
                            <span class="current_price">{product.price}
                                TND</span>
                            <span class="old_price">
                                <span class="price">50 TND</span>
                                <span class="percentage_discount">-20%</span>
                            </span>
                        </div>
                    </div>
                    <div class="colors">
                        {#each colors as color}
                            <div
                                class="color_border"
                                style="border:0px solid #{color};">
                                <div
                                    class="color"
                                    style="background-color:#{color}" />
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
