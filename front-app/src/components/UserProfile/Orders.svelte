<script>
    import { dbWrapper, user } from "../../firebase.js";

    import { uuidToImageLink, socialMedias, colors } from "../../utils.js";
    import { link } from "svelte-routing";
    import {onDestroy } from 'svelte'
    import MaterialSpinner from '../misc/MaterialSpinner.svelte'
import { lang } from "../../store.js";

    export let params = {};
    let loaded = false;
    let displayProducts = 
    [
        {
            "id":"RQGHN7",
            "img":"../img/hoodie.png",
            "creator":"ti3leh",
            "name":"hoodie 7amra",
            "color":"0e80f6",
            "size":"S",
            "qty":"1",
            "price":"69.99",
            "date":"27/01/2021",
            "status":"in delivery",
            "statusColor":"ffb100"
        },
        {
            "id":"GJYS78",
            "img":"../img/tshirt.png",
            "creator":"beki",
            "name":"tshirt unique feras",
            "color":"d40019",
            "size":"S",
            "qty":"2",
            "price":"98.50",
            "date":"22/01/2021",
            "status":"Delivered",
            "statusColor":"34bf65"
        },
         {
            "id":"GJYS78",
            "img":"../img/tshirt.png",
            "creator":"beki",
            "name":"tshirt unique feras",
            "color":"d40019",
            "size":"S",
            "qty":"2",
            "price":"98.50",
            "date":"22/01/2021",
            "status":"Printing",
            "statusColor":"2985d4"
        },
         {
            "id":"GJYS78",
            "img":"../img/tshirt.png",
            "creator":"beki",
            "name":"tshirt unique feras",
            "color":"d40019",
            "size":"S",
            "qty":"2",
            "price":"98.50",
            "date":"22/01/2021",
            "status":"Delivered",
            "statusColor":"34bf65"
        }
    ];
    const statusColors = {
        "Delivered": '34bf65',
        "Printing": '2985d4',
        'Delivering': 'ffb100',
        'In Progress': '34bf65'

    }
    displayProducts = []
    
        let name =""
   /* dbWrapper.get("/creators/omg3r/merch/all").then((data) => {
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
    });*/
    let orders = {}
    let initialized = false;
    let unsubscribeUser = user.subscribe(async (v) => {
        if (v == 0) {
            return
        }
        if (v == undefined) {
            
        } else {
            console.log(v.uid)
            let path = "users/" + v.uid
            console.log(path)
            let data = await dbWrapper.get(path, true)
            orders = data.orders || {}
            console.log("eorders")
            console.log(data)
            console.log("orders")
            if (Object.keys(orders).length == 0) {
                initialized  = true
                return
            }
            displayProducts = []
            
            for ( let [key, values] of Object.entries(orders)){
                    for  ( let [lkey, iteminfo] of Object.entries(values.items)) {
                    console.log(iteminfo.creator)
                    let path = "creators/" + iteminfo.creator + "/merch/all"
                    let data = await dbWrapper.get(path, true)
                    console.log("d")
                    console.log(data)
                    console.log("iteminfo")
                    console.log(iteminfo)
                    console.log(data[iteminfo.id])
                    iteminfo.img = uuidToImageLink(data[iteminfo.id].imgs[iteminfo.color][data[iteminfo.id].featuredFace],"creators/" + iteminfo.creator + "/merch/" + iteminfo.id + "/" + data[iteminfo.id].featuredFace + "-" + iteminfo.color)
                    iteminfo.price = data[iteminfo.id].price
                    iteminfo.name = data[iteminfo.id].name
                    iteminfo.cartID = key
                    console.log(values)
                    iteminfo.timestamp = values.timestamp?.seconds || 1610233362
                    if (iteminfo.status == undefined) {
                        iteminfo.status = "In Progress"
                    }
                    displayProducts.push(iteminfo)
                    
                }
                
            }
            
            
            displayProducts.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
            displayProducts = displayProducts
            console.log("finished")
            console.log(orders)
            console.log(displayProducts)
            initialized = true
        }
        
       
    })
    const formatTimestampToDate = (t) => {
        const a = new Date(t* 1000);
        const year = a.getFullYear();
        const month = a.getMonth() + 1;
        const date = a.getDate() + 1;
        return date + "/" + month + "/" + year
    }
    onDestroy(() => {
        unsubscribeUser()
    })

</script>

<style>
 
    .color,
    .size {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
        margin-top: 2px;
    }

    .color .shape {
        margin-left: 5px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }
    .size{margin-left: 5px;}
    .size .shape {
        margin-left: 5px;
        width: 15px;
        height: 15px;
        background-color: #181D22;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 10px;
    }

    .total_price {
        margin-left: 15px;
        color: #46B978;
    }
    .quantity {
        margin-left: 15px;
    }
    hr {
        border-top: 1px solid rgba(21,29,34, 0.3) !important;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        scrollbar-color: #181d22 #8b8e90;
        height: 300px;
    }
        
    
    .u_products::-webkit-scrollbar {
        width: 11px;
    }
    .u_products::-webkit-scrollbar-track {
        background-color: #8b8e90;
    }
    .u_products::-webkit-scrollbar-thumb {
        background-color: #181d22;
    }
    .u_products hr{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .titles{
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        flex-direction: row;
        padding: 10px 10px 10px 20px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 0px 15px #0000001c;
        width: 98%;
    }
    .id_title,.id{width: 15%;}
    .Product_title,.product{width: 24.5%;}
    .Quantity_title,.quantity{width: 8%;}
    .Price_title,.total_price{width: 17.5%;}
    .Date_title,.date{width: 17.5%;}
    .Status_title,.status{width: 17.5%;}
    .id{
        font-size: 12px;
        font-weight: 700;
    }
    .product{
        display: flex;
        justify-content: center;
        text-align: left;
    }

    .color_size{
        display: flex;
        flex-direction: row;
        }
    
    .status{
            color: white;
            border-radius:15px;
            padding: 8px;
    }
    .p_img {
        background-color: white;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 18px rgba(21,29,34, 0.15);
        border-radius: 15px;
        margin-right: 15px;
    }
      .p_img img {
        width: 60px;
    }
    .p_info .p_title {
        font-size: 13px;
        font-weight: 700;
    }
    .p_content_creator{
        font-size: 12px;
        font-weight: 700;
        color: #33333378;
    }
    .single_product {
        border-radius: 10px; 
        cursor: pointer;
        user-select: none;
        padding: 10px 5px 10px 5px;
        box-shadow: 0px 0px 15px #0000001c;
        text-align: center;
        width: 98%;
    }/*
    .single_product:hover{
        box-shadow: 0px 0px 15px #000000b5;
        color: white;
        background-color: #181d22;
    }*/
    .single_product:active{
        box-shadow: 0px 0px 15px #000000b5;
        color: white;
        background-color: #181d22;
    }
    .left_part{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    .right_part{
        display: none;
    }

  
    .cartBtns div img {
        width: 25px;
        filter: invert(100%) sepia(0%) saturate(7428%) hue-rotate(68deg)
            brightness(101%) contrast(87%);
        margin: 5px 0px 5px 0px;
        cursor: pointer;
    }
   

    /******************end Budget slider******************/
    .product_container{
        width: 100%;
    }
 
    .reference{
        display: none;
    }
    .u-spin-area {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        
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
        .hr_to_remove {
            display: none;
        }
    }
    @media only screen and (max-width: 800px) {
        .u_products {
            grid-template-columns: 1fr;
            flex: 0 0 100%;
        }
        .single_product{
            display: flex;
            flex-direction: row;
        }
        
        .right_part{
            display: flex;
            align-items: center;
            width: 40%;
        }
        .right_part a {
            width: max-content;
            height: max-content;
        }
        .right_part a img {
            width: 100%;
            max-width: 200px;
        }
        .left_part{
            flex-direction: column;
            justify-content: center;
            margin-left: 10%;
        }
        .left_part .product a{
            display: none
        }
        .titles{
            display:none;
        }
        .id,.product,.quantity,.total_price,.date,.status{
            margin-left: 0px;
            text-align: left;
            width: max-content;
            margin-bottom: 3px;
            }
        .quantity,.total_price,.date{
            display: flex;
            flex-direction: row;
        }
        .status{
            width: 100%;
            text-align: center;
            margin-top: 15px;
            
        } 

     
        .single_product:hover{
        box-shadow: none !important;
         color: #333333;
        background-color: transparent !important;
        }
        .single_product:active{
        box-shadow: none !important;
        color: #333333;
        background-color: transparent !important;
        }
        .u_products {
            overflow-y: hidden;
            height: 100%;
        }
        .reference{
            display: block;
            margin-right: 10px;
        }
    }
</style>

<div class="profile_container">
    <div class="big_title">
        {{
            'fr': 'Mes Commandes',
            'en': 'My Orders'
        }[$lang]}
        </div>
    <hr class="hr_to_remove"/>

    {#if initialized == false}
    <div class="product_container">
        <div class="titles">
            <div class="id_title">ID</div>
            <div class="Product_title">Product</div>
            <div class="Quantity_title">Quantity</div>
            <div class="Price_title">Price</div>
            <div class="Date_title">Date</div>
            <div class="Status_title">Status</div>
        </div>
        <hr class="hr_to_remove" />
        <div class="u_products u-spin-area">

            <MaterialSpinner height="75px" width="75px" />
        </div>
    </div>
    {:else if initialized && displayProducts.length == 0}
        <div>No Products</div>
    {:else if initialized && displayProducts.length > 0}
    <div class="product_container">
        <div class="titles">
            <div class="id_title">ID</div>
            <div class="Product_title">Product</div>
            <div class="Quantity_title">Quantity</div>
            <div class="Price_title">Price</div>
            <div class="Date_title">Date</div>
            <div class="Status_title">Status</div>
        </div>
        <hr class="hr_to_remove" />
        <div class="u_products">
                 {#each displayProducts as product}
                 
                <div class="single_product">
                    <div class="right_part">
                        <a use:link href={'/' + params.userid + '/merch/' + product.id} class="p_img">
                            <img class="product_img" src={product.img} alt="product" />
                        </a>
                    </div>
                    <div class="left_part">
                        <div class="id">#{product.cartID}</div>

                    <div class="product">
                        <a use:link href={'/' + params.userid + '/merch/' + product.id} class="p_img">
                            <img class="product_img" src={product.img} alt="product" />
                        </a>
                        <div class="p_info">
                            <div class="p_title" >{product.name.length > 15 ? product.name.substr(0,10)+"..." :product.name}{"#" + product.id}</div>
                            <div class="p_content_creator">{product.creator}</div>
                            <div class="color_size">
                                <div class="color">
                                    Color:
                                    <div class="shape" style="background-color:{colors[product.color.toLowerCase()]}" />
                                </div>
                                <div class="size">
                                    Size:
                                    <div class="shape">{product.size}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div class="quantity"><div class="reference">Quantity: </div>{product.quantity}</div>

                    <div class="total_price"><div class="reference">Price: </div>{product.price} TND</div>

                    <div class="date"><div class="reference">Date: </div>{formatTimestampToDate(product.timestamp)}</div><!--Order Date-->

                <div class="status" style="background-color:#{statusColors[product.status]}">{product.status}</div><!--Order Status-->
                    </div>
                    
                
                    
            </div>
            <hr />
            {/each}
        </div>
    </div>
    {/if}
</div>
