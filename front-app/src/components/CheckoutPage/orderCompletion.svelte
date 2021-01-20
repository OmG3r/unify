<script>
    import {cart} from '../../store.js'
    import {onMount, onDestroy} from 'svelte'
    let AccentColor = getComputedStyle(document.body).getPropertyValue(
        "--AccentColor"
    );
    let userColor = getComputedStyle(document.body).getPropertyValue(
        "--userColor"
    );
    let popup=false;

    let removeScroll = () =>{
    popup ? document.body.style.overflow="hidden" : document.body.style.overflow="scroll";
    }

   
    
    let normalTotal = 0;
    let unsubscribeCart = () => {};
    unsubscribeCart = cart.subscribe((data) => {
        normalTotal = Object.entries(data).reduce((acc, [key, value]) => {
            acc += value.price * (value.quantity ? value.quantity : 1);
            return acc;
        }, 0);
    });

    onDestroy(() => {
        unsubscribeCart()
    })
</script>

<style>
    .title {
        font-size: 25px;
        font-weight: 700;
        color: rgb(var(--userColor));
    }
    .container{
        padding-right: 50px;
        width: 79%;
    }
    .Accent_color{
        color:rgb(var(--AccentColor));
        font-weight: 600;
    }
    button{
        background-color:rgb(var(--AccentColor));
        border: none;
        color: white;
    }
    hr{
        border-top: 1px solid rgba(var(--userColor),0.3);
    }
    .address{
        padding: 10px 5px 10px 5px;
         display: grid;
        grid-template-columns: 80% 20%;
       grid-template-rows: 0.7fr 1fr;
    }
    .delivery,.payment{
        padding: 10px 5px 10px 5px;
    }
    .address_title,.delivery_title,.payment_title{
        font-size: 18px;
        font-weight: 700;
        display: flex;
        flex-direction: row;
        grid-row-start: 1;
       grid-row-end: 2;
       grid-column-start: 1;
       grid-column-end: 3;
    }
    .check{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgb(var(--AccentColor));
        display:flex;
        justify-content: center;
        align-items: center;
         margin-right: 10px;
    }
    .check i{
        color:white;
        font-size: 14px;
    }

   .address_info,.delivery_methods,.payment_methods{
       margin: 0 0 0 37px;
        grid-row-start: 2;
       grid-row-end: 3;
       grid-column-start: 1;
       grid-column-end: 2;
   }
   .address_info .name,.delivery_method .method_title,.payment_methods .method_title{
       font-size: 16px;
       font-weight: 700;
       cursor: pointer;
       width:max-content;
   }
   .address_info .address_location,
   .address_info .phone_num,
   .payment_methods .method_desc,
   .delivery_method .method_desc,
   .delivery_method .method_fees,
   .coupon_desc {
       color:rgba(var(--userColor),0.5);
   }
   .method_desc,.method_fees{
       margin-left:35px
   }
   .method_desc  {
       margin-bottom: 6px;
   }
   .coupon_desc{
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
   }
   .edit{
       font-size: 18px;
       font-weight: 700;
       cursor: pointer;
   }
   .edit i{
       font-weight: 500;
   }
    button {
    cursor: pointer;
  }
  input:focus,
  button:focus {
    outline: none;
  }
  .continue_btn{
      margin-left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      border-radius: 12px;
  }
  .continue_btn:active{
      background-color: rgba(var(--AccentColor),0.8);
  }
  .delivery_methods,.payment_methods{
      margin-top: 18px;
  }
  .method_title{
      display: flex;
      flex-direction: row;
  }
  .method_title .shape{
      width: 15px;
      height: 15px;
      background-color: rgba(var(--AccentColor),1);
      border-radius: 50%;
  }
  .shape_border{
      width: 25px;
      height: 25px;
      border:2px solid rgba(var(--AccentColor),1);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items:center;
      margin-right: 10px;
  }
  .coupon_title{
      font-size: 18px;
      font-weight: 700;
      margin-left: 37px;
  }
  .input_coupon {
      width: 70%;
      height: 50px;
      border-radius: 15px 0 0 15px;
      border:1px solid rgba(var(--userColor),0.3);
      padding-left: 15px;
      font-weight: 600;
      font-size: 18px;
  }
  .Apply_btn {
      width: 15%;
      height: 50px;
      border-radius: 0 15px 15px 0;
  }
  .coupon .input{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 15px 0 15px 0;
  }
  .payment hr{
      width: 84%;
  }
.final_total {
    margin: 20px 0 20px 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 84%;
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
    color: rgb(var(--AccentColor));
  }
  .total {
    display: flex;
    justify-content: flex-end;
    color: rgb(var(--userColor));
    font-size: 15px;
    font-weight: 700;
    margin: 15px 0 15px 0;
    width: 92%;
  }
  .finilize_btn { 
    margin-top: 15px;;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 12px;
  }
.bg_edit_address_popup{
    display: block; /* Hidden by default */
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    overflow-y: hidden;
    display: none;
}
.edit_address_popup{
    background-color: #fefefe;
    width: 60%; /* Could be more or less, depending on screen size */
    padding: 0px 0 20px 0;
    position: relative;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: black gray;
    height: 500px;
}

.edit_address_popup::-webkit-scrollbar {
    width: 11px;
}
.edit_address_popup::-webkit-scrollbar-track {
    background-color: #8b8e90;
}
.edit_address_popup::-webkit-scrollbar-thumb {
    background-color: #181d22;
    border-radius: 10px;
}
.popup_title{
    width: 60%;
    background-color: white;
    border-radius: 10px 10px 0 0;
    background-color: #fefefe;
}
.popup_title .popup_title_text{
    font-size: 20px;
    font-weight: 600;
    margin: 15px 0px 15px 20px;
    position: relative;
}
hr{
    margin: 0px;
    width: 100%;
}
.Save_btn{
    width: 60%;
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Save_btn button{
    width: 95%;
    height: 50px;
    border-radius: 5px;
    margin: 15px 20px 15px 20px;
}
.Save_btn button:active{
    background-color: rgba(var(--AccentColor),.8);
}
.name_lastname{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:20px;
}
.name_lastname .first_name,.name_lastname .last_name{
    display:flex;
    flex-direction: column;
    width: 50%;
}
.name_lastname .first_name{
    margin-right: 15px;
}
.first_name_input,.last_name_input{
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
}
.phone_num{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:20px;
}
.phone_num .inputs{
    width: 100%;
    display:flex;
    flex-direction: row;
}
.inputs .country_num{
    width: 50px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
    margin-right: 8px;
}
.inputs .num{
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
}
.address{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
}
.address_input{
    width: 100%;
    margin-top: 10px;
    height: 120px;
    border-radius: 8px;
    border: 1px solid #ababab;
}
.region,.city{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
}
.region #region_id,.city #city_id{
   margin-top: 10px;
   width: 100%;
   border-radius: 8px;
   border: 1px solid #ababab;
   height: 40px;
}
.address .section2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.exit_button{
    position: absolute;
    font-size: 25px;
    font-weight: 600;
    top: -5px;
    right: 25px;
    cursor: pointer;
}

   @media only screen and (max-width: 1000px) {

        .container {
            width: 100%;
            padding-right: 0px;
        }
    }
</style>

<div class="container">
    <span class="title">Order Completion</span>

    <hr />
    <div class="address">
        <div class="address_title">
            <div class="check"><i class="fas fa-check" /></div>
            Address
        </div>

        <div class="section2">

            <div class="address_info">
                <div class="name">Ahmed Ben Mahmoud</div>
                <div class="address_location">
                    Residence sandra,El mourouj 6 Ben Arous
                </div>
                <div class="phone_num">+216 26 612 708</div>
            </div>

            <div class="edit" on:click="{()=>{
                popup=true;
                removeScroll();
            }}"><i class="far fa-edit" />Edit</div>

            </div>
        
       
        
    </div>
    <hr />
    <div class="delivery">
        <div class="delivery_title">
            <div class="check"><i class="fas fa-check" /></div>
            Delivery Method
        </div>
        
        <div class="delivery_methods">
            <div class="delivery_method">
                <div class="method_title"><div class="shape_border"><div class="shape" /></div> Standard</div>
                <div class="method_desc">
                    Your delivery will arrive between the
                    <span class="Accent_color">1st of january</span>
                    and the
                    <span class="Accent_color">4th of january</span>
                </div>
                <div class="method_fees">
                    Delivery fees:
                    <span class="Accent_color">Free</span>
                </div>
            </div>
        </div>
        {#if false}
        <div class="coupon_desc">You can use the coupon in the next step</div>
        <button class="continue_btn">Continue</button>
         {/if}
        
    </div>
    <hr />

    <div class="payment">
        <div class="payment_title">
            <div class="check"><i class="fas fa-check" /></div>
            Payment Method
        </div>
        <div class="payment_methods">
            <div class="payment_method">
                <div class="method_title">
                    <div class="shape_border"><div class="shape" /></div>Cash on delivery
                </div>
                <div class="method_desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud .
                </div>
            </div>
        </div>
        <div class="coupon">
            {#if false}
            <div class="coupon_title">Do You have a coupon ?</div>
            <div class="input">
                <input
                type="text"
                class="input_coupon"
                placeholder="Enter your coupon code" />
                <button class="Apply_btn">Apply</button>
            </div>
            {/if}
            
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

        <button class="finilize_btn">Finalize Your Order</button>
    </div>

</div>


<div class="bg_edit_address_popup" style="display:{popup ? "flex" : "none"}">

    <div class="popup_title">
            <div class="popup_title_text">
                Modifier l'adresse
                <div class="exit_button" 
        on:click="{()=>{
            popup=false;
            removeScroll();
        }}">
        X
    </div>
            </div> 
            <hr>
    </div>
    <div class="edit_address_popup">
        <div class="name_lastname">
            <div class="first_name">
                First Name *:
                <input type="text" value="Ahmed" class="first_name_input">
            </div>
            <div class="last_name">
                Last Name *:
                <input type="text" value="Ben Mahmoud" class="last_name_input">
            </div>
            
        </div>

        <div class="phone_num">
            <div class="phone_num_text">Phone Number *:</div>
            <div class="inputs">
                <input type="text" value="+216" class="country_num" disabled>
                <input type="text" value="26612708" class="num" >  
            </div>
            
        </div>
        <div class="address">
            Adress *:
            <textarea type="text"  class="address_input">Appartemant B01 Residence Sandra</textarea>
        </div>

        <div class="region">
            Region *:
            <select name="region" id="region_id">
                <option value="Nabeul">Nabeul</option>
                <option value="Nabeul">Ariana</option>
                <option value="Nabeul">Kef</option>
                <option value="Nabeul">Gabes</option>
            </select>
        </div>
        <div class="city">
            City *:
            <select name="city" id="city_id">
                <option value="Nabeul">kelibia</option>
                <option value="Nabeul">el mourouj</option>
                <option value="Nabeul">rades</option>
                <option value="Nabeul">test</option>
            </select>
        </div>
        

    </div>

    <div class="Save_btn">
        <hr>
        <button >Save</button>
    </div>


</div>

