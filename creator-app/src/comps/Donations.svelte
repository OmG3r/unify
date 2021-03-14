<script>
    //import { dbWrapper } from "../../firebase.js";
    //import { uuidToImageLink, socialMedias } from "../../utils.js";
    import { link } from "svelte-routing";
    import {db} from '../firebase.js'
    import {onMount, onDestroy} from 'svelte'
    import MaterialSpinner from '../comps/misc/MaterialSpinner.svelte'
    import {statusColors} from '../utils.js'
    //export let carts = []
    //export let params = {};
    export let first = true;
    let loaded = false;
    let donations = [
        {
            "donationID" : "ZHSGSV",
            "name" : "hmed",
            "amount" : "15",
            "pmtMethod" : "paypal",
            "currency" : "EUR",
            "timestamp" : "1614694072",
            "message" : "Hello ahmed I love you so much Hello ahmed I love you so much Hello ahmed I love you so much Hello ahmed I love you so much Hello ahmed I love you so much Hello ahmed I love you so much Hello ahmed I love you so muchHello ahmed I love you so much sdf"
        },
    ]
    
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
        let name =""
  
    
    const formatTimestampToDate = (t) => {
        const a = new Date(t* 1000);
        const year = a.getFullYear();
        const month = a.getMonth() + 1;
        const date = a.getDate() + 1;
        return date + "/" + month + "/" + year
    }
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
        
        color: #46B978;
    }
    .quantity {
        margin-left: 0px;
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
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        flex-direction: row;
        padding: 10px 10px 10px 20px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 0px 15px #0000001c;
        width: 98%;
    }
    .id_title,.id{width: 10%;}
    .name-area_title, .name-area {width: 15%}
    .Quantity_title,.quantity{width: 10%;}
    .Price_title,.total_price{width: 15%;}
    .Date_title,.date{width: 15%;}
    .Status_title,.status{width: 35%;}
    .id_title, .Quantity_title, .Date_title, .Status_title, .id_title {
        display: flex;
        justify-content: center;
    }
    .name-area {
        font-size: 14px;
        text-overflow: ellipsis;
    overflow: hidden; 
    
    max-width: 15%;
    white-space: nowrap;
    }
    .id{
        font-size: 12px;
        font-weight: 700;
    }
    
    .status{

            border-radius:15px;
            padding: 8px;
    }
  
    .single_product {
        border-radius: 10px; 
        cursor: pointer;
        user-select: none;
        padding: 10px 5px 10px 5px;
        box-shadow: 0px 0px 15px #0000001c;
        text-align: center;
        width: 98%;
    }
    .single_product:hover{
        box-shadow: 0px 0px 15px #000000b5;
        color: white;
        background-color: #181d22;
    }
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
  
   

    /******************end Budget slider******************/
    .product_container{
        width: 100%;
    }
 
    .reference{
        display: none;
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

    .u-center-area {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
</style>

<div class="profile_container">
    <div class="big_title">My Orders</div>
    <hr class="hr_to_remove"/>

    <div class="product_container">
        <div class="titles">
            <div class="id_title">ID</div>
            <div class="name-area_title">Donator</div>
            <div class="Quantity_title">Amount</div>
            <div class="Price_title">Payment Method</div>
            <div class="Date_title">Date</div>
            <div class="Status_title">Message</div>
        </div>
        <hr class="hr_to_remove" />
        <div class="u_products">
            {#if first}
                <div class="u-center-area">
                    <MaterialSpinner width="75px" height="75px" />

                </div>
                
            {:else}
                {#each donations as donation}

                    
                    
                    <div class="single_product">
                       
                        <div class="left_part">
                            <div class="id">#{donation.donationID}</div>
                            <div class="name-area">{donation.name}</div>
                        

                            <div class="quantity">{donation.amount}  {donation.currency}</div>

                            <div class="total_price">{donation.pmtMethod}</div>

                            <div class="date">{formatTimestampToDate(donation.timestamp)}</div><!--Order Date-->

                            <div class="status" >{donation.message}</div><!--Order Status-->
                        </div>
                          
                    </div>
                    
                    
                {:else}

                    <div class="u-center-area">
                        No orders

                    </div>
                {/each}
            {/if}
            
            <hr />
        </div>
    </div>
</div>
