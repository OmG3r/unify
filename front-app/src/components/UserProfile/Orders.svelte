<script>
    import { dbWrapper } from "../../firebase.js";
    import { uuidToImageLink, socialMedias } from "../../utils.js";
    import { link } from "svelte-routing";

    export let params = {};
    let loaded = false;
    let displayProducts = [];
    let colors = [
        {
            color:"0e80f6",
            border:2
        },
         
         {
            color:"d40019",
            border:0
        }, 
        {
            color:"46B978",
            border:0
        }, 
        {
            color:"737372",
            border:0
        }];

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
    }
    .p_img img {
        width: 60px;
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
        color: rgb(var(--AccentColor));
    }
    .quantity .qty {
        margin-left: 15px;
    }
    hr {
        border-top: 1px solid rgba(var(--userColor), 0.3);
    }
   

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
    .single_product .product_img {
        border-radius: 20px;
    }

  
    .cartBtns div img {
        width: 25px;
        filter: invert(100%) sepia(0%) saturate(7428%) hue-rotate(68deg)
            brightness(101%) contrast(87%);
        margin: 5px 0px 5px 0px;
        cursor: pointer;
    }
   

    /******************end Budget slider******************/

 

    .color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
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
    <div class="big_title">My Orders</div>
    <hr />

    <div class="product_container">
        <div class="u_products">
                 {#each displayProducts as product}
                <div class="single_product">
                <a use:link href={'/' + params.userid + '/merch/' + product.id} class="p_img">
                    <img class="product_img" src={product.imgs[product.featuredFace]} alt="product" />
                </a>
                <div class="info">
                    <span class="p_title">{product.title}</span>
                    <span class="p_sub_title">{product.sub_title}</span>
                    <div class="color_size">
                        <div class="color">
                            Color:
                            <div
                                class="shape"
                                style="background-color=#{product.color}" />
                        </div>
                        <div class="size">
                            Size:
                            <div class="shape">{product.size}</div>
                        </div>
                    </div>
                    <div class="unit_price">
                        Unit Price:
                        <div class="price">{product.price} TND</div>
                    </div>
                    <div class="quantity">
                        Qty:
                        <div class="qty">{product.qty}</div>
                    </div>
                    
                </div>
            </div>
            <hr />
            {/each}
        </div>
    </div>
</div>
