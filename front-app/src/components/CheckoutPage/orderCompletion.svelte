<script>
    import {cart} from '../../store.js'
    import {onMount, onDestroy} from 'svelte'
    import {user} from '../../firebase.js'
    import {link, navigate} from 'svelte-routing'
    import MaterialSpinner from '../misc/MaterialSpinner.svelte'
    import Popup from './Popup.svelte'
    import {writable} from 'svelte/store'
    import {urlPostReq, notification, generateDeliveryDate} from '../../utils.js'
    let [minDdate, maxdDate] = generateDeliveryDate()
    
    let popup= writable(false);

    let unsubscribePopup = popup.subscribe((v) =>{
        v ? document.body.style.overflowY="hidden" : document.body.style.overflowY="scroll";
    })

    onMount(() => {
        document.title = "Unify - Checkout"
    })
    
    let normalTotal = 0;
    let unsubscribeCart = () => {};
    unsubscribeCart = cart.subscribe((data) => {
        normalTotal = Object.entries(data.items).reduce((acc, [key, value]) => {
            acc += value.price * (value.quantity ? value.quantity : 1);
            return acc;
        }, 0);
    });

    onDestroy(() => {
        document.body.style.overflowY ="scroll"
        unsubscribeCart()
        unsubscribePopup()
    })
    console.log(Object.fromEntries(Object.entries($cart.items).map(([key, values]) => [key, [values.id, values.creator, values.quantity, values.size]])))
    let form = {
        cart: {
            cartID: $cart.cartID,
            items: Object.fromEntries(Object.entries($cart.items).map(([key, values]) => [key, {id: values.id, creator: values.creator, quantity: values.quantity, size: values.size, color: values.color}]))
        },
        info: {
            name: $user.displayName ? $user.displayName : '',
            address: '',
            state: 'Tunis',
            city: 'Tunis',
            postal: '1000',
        },
        
    }
    console.log(form)
    let submitting = false;
    let addressError = false
    const finalizeOrder = async () => {
        console.log("finalizing")
        if (submitting == true) {
            return
        }

        console.log("after if")
        submitting = true
        if (['address', 'state', 'city', 'postal'].some((item) => {console.log(form.info[item]); return form.info[item].length == 0;})) {
            addressError = true
            document.querySelector('.address-notification').scrollIntoView({block: "center"});
            notification.set({
                accentColor: 'alert',
                title: 'Alert',
                content: 'Fill out your Address'
            })
            submitting = false
            return
        }
        console.log("doing new form")
        form = {
            ...form,
            token: await $user.getIdToken(true)
        }
        //
        let rep = await urlPostReq('https://api.unify.tn/.netlify/functions/express/addOrder', form)
        
        navigate('/completed?orderid=' + $cart.cartID + "&backurl=/myaccount/orders" )
        cart.reset()
        submitting = false;
    }
</script>

<style>
    .address-error {
        color: #ca4235
    }
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
        color: #46b978;
        font-weight: 600;
    }
    button{
        background-color: #46b978;
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
        background-color:  #46b978;
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
      background-color: #6bc793;
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
      background-color:  #46b978;
      border-radius: 50%;
  }
  .shape_border{
      width: 25px;
      height: 25px;
      border:2px solid  #46b978;
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
    color:  #46b978;
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
    padding: 8px 0;
  }

hr{
    margin: 0px;
    width: 100%;
}

.phone_num{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:20px;
}

.address{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
}

.address .section2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
                <div class="name">{form.info.name}</div>
                <div class="address_location">
                    {#if ['address', 'state', 'city', 'postal'].some((item) => {return form.info[item].length == 0;})}
                        <span class="address-notification" class:address-error={addressError}>Please press Edit and input your address</span> 
                    {:else}
                        {form.info.address}, {form.info.state != "Other" ? form.info.state: ""}, {form.info.city != form.info.state ? (form.info.city + ", ") : ""}{form.info.postal != "Other" ? form.info.postal : ""}
                    {/if}
                </div>
                <div class="phone_num">{$user.phoneNumber}</div>
            </div>

            <div class="edit" on:click="{()=>{
                addressError = false;
                $popup=true;
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
                    <span class="Accent_color">{minDdate}</span>
                    and the
                    <span class="Accent_color">{maxdDate}</span>
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

        <button on:click={finalizeOrder} class="finilize_btn">
            {#if submitting}
                <MaterialSpinner />
            {:else}
                Finalize Your Order
            {/if}
        </button>
    </div>

</div>
{#if $popup}
    <Popup bind:form bind:popup />
{/if}


