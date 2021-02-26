<style>
 .container {
        padding: 50px;
        min-height: 50vh;
        display: grid;
        grid-template-columns: 20% 80%;
    }
.social_icons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .social_icons a {
        padding: 5px;
    }
    .social_icons img {
        width: 35px;
        margin-right: 15px;
    }
    .social_icons img:hover {
        filter:var(--AccentColorFilter);
        cursor: pointer;
    }
    .u_info {
        padding: 30px;
        color: #181d22;
    }
    .u_desc {
        color:#7b7f84;
        line-break: anywhere;
    }

    .donationContainer{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .donationForm{
        display: flex;
        width: 100%;
        flex-direction: column;
        padding: 10px 50px 0 0;

    }
    input{
        border: none;
    }
   
    .amount{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin:30px 0;
        justify-content: space-between;
    }
    .selectAmounts{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    .amountBtn{
        border-radius: 15px;
        border: 1px solid #181d22;
        padding: 8px 15px;
        margin:5px;
        cursor:pointer;
    }

    

    
  

    /************/
.currencyName{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}
.currencyName select{
    width: 20%;
    height: 40px;
    border:0;
    background:none;
    -webkit-appearance: none;
    border-bottom: 2px solid  #9b9b9b;
    cursor: pointer;
    text-align: center;
}
.currencyName select:focus{
    border-bottom: 2px solid  rgba(var(--AccentColor),1);
    background-color: rgba(var(--AccentColor),0.2);
}
.currencyName select:hover{
    border-bottom: 2px solid  rgba(var(--AccentColor),1);
}
.form__group {
    position: relative;
}
 .input_field {
	 font-family: inherit;
	 width: 100%;
	 border: 0;
	 border-bottom: 2px solid #9b9b9b;
	 outline: 0;
	 font-size: 18px;
	 color: #181d22;
	 padding: 7px 0;
	 background: transparent;
	 transition: border-color 0.2s;
}
 .input_field::placeholder {
	 color: transparent;
}
 .input_field:placeholder-shown ~ .input_label {
	 font-size: 18px;
	 cursor: text;
	 top: 20px;
}
 .input_label {
	 position: absolute;
	 top: 0;
	 display: block;
	 transition: 0.2s;
	 font-size: 1rem;
	 color: #9b9b9b;
}
 .input_field:focus {
	 padding-bottom: 6px;
	 font-weight: 700;
	 border-width: 3px;
	 border-image: linear-gradient(to right, rgba(var(--AccentColor),1), rgba(var(--AccentColor),0.8));
	 border-image-slice: 1;
}
 .input_field:focus ~ .input_label {
	 position: absolute;
	 top: 0;
	 display: block;
	 transition: 0.2s;
	 font-size: 1rem;
	 color:  rgb(201, 24, 24);
	 font-weight: 700;
}
/* reset input */
 .input_field:required, .input_field:invalid {
	 box-shadow: none;
}

.currencyName .form__group{
    padding: 15px 0 0;
    margin: 10px 25px 0 0;
    width: 100%;
}
 .amount .form__group{
     padding: 15px 0 0 0;
     margin: 0 0 0 10px;
     width: 20%;
 }

.amount .minimumAmount{
    font-size: 15px;
}

.paymentMethods{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}
.paymentMethods .method{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    border-radius: 5px;
    border: 2px solid  rgba(var(--AccentColor),1);
    padding: 12px 24px;
    cursor: pointer;
    font-weight: 400;

}
.paymentMethods .method img{
    width: 80px;
    margin-bottom: 15px;
}

.paymentMethods{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
    align-items: stretch;
}
 


.paymentMethods input{
    display: none;
}

.paymentMethods input:checked + label{
    background-color: rgba(var(--AccentColor),0.2);
}
.submit_button{
  margin:auto;
  padding: 12px 24px;
  background-color: rgba(var(--AccentColor),1);
  border-radius: 18px;
  color: white;
  font-weight: 600;
  margin-top: 30px;
  cursor: pointer;
}
.donationInfo{
    width: 40%;
}
.topMessage{
    height: 180px;
    width: 100%;
}


.donationInfo{
    margin-top: 40px;
}
.preview{
    padding: 40px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    color: #181d22;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}
.preview .message{
    margin-top: 15px;
}
.preview .top span{
 color:rgba(var(--AccentColor))
}
   
    @media only screen and (max-width: 1180px) {
        
        .u_info{
            display: none;
        }
        .container {
            grid-template-columns: none;
            padding: 20px;
        }
        .topMessage{
            width: 90vw;
        }
        .donationContainer {
            flex-direction: column;
        }
        .donationForm{
            padding: 0;
        }
        .donationInfo{
            width: 100%;
        }
       
    }
    @media only screen and (max-width: 800px) {
      
    }

    
  
</style>


<script>
import {hexToRgb,convert} from "../../filter.js"
import { lang, cart } from "../../store.js";
import {
    uuidToImageLink,
    socialMedias,
    notification,
    colors,
} from "../../utils.js";
import { link, navigate } from "svelte-routing";
import {onMount} from "svelte";
import Tabs from "./Tabs.svelte"
import Week from "./Week.svelte"
import Month from "./Month.svelte"
import Year from "./Year.svelte"

export let params = {};
export let creatorData = {};

document.documentElement.style.setProperty('--AccentColor', hexToRgb(creatorData.accentColor));

let filter = convert(creatorData.accentColor).replace('filter:','').replace(";","");
document.documentElement.style.setProperty('--AccentColorFilter', filter);




//add 3 zeros after ,
let  addZeroes = (num) => {   
    let value = Number(num);
// Split the input string into two arrays containing integers/decimals
    let  res = num.split(".");     
// If there is no decimal point or only one decimal place found.
    if(res.length == 1 || res[1].length < 4) { 
// Set the number to two decimal places
        value = value.toFixed(3);
    }
// Return updated or original number.
return value;
}

let donator = {
    name: "",
    currency: "",
    amount: addZeroes("1"),
    message: "",
    method: "",
}


onMount(async () =>{
donator.currency=document.getElementById("currency").value;
});
//default amounts are selected by user in creator app
let amounts=["5","10","15","20","50"]


let onInput  = (e) =>{
    
    let selectedIndex = amounts.indexOf(Number(e.currentTarget.value).toFixed(0));
    if (  selectedIndex == -1){
        let els = document.querySelectorAll('.amountBtn');
        els.forEach((e) =>{
            e.style.background ='transparent';
            e.style.color = "black";
        });

    }else{
        let els = document.querySelectorAll('.amountBtn');
        els.forEach((e) =>{
            e.style.background ='transparent';
            e.style.color = "black";
        });
        document.querySelectorAll('.amountBtn')[selectedIndex].style.background=creatorData.accentColor
        document.querySelectorAll('.amountBtn')[selectedIndex].style.color="white"
    } 
    
}
 let onClick  = (amount,index) =>{
    donator.amount = addZeroes(amount);
    document.querySelectorAll('.amountBtn').forEach((e)=>{
        e.style.background ='transparent';
        e.style.color = "black";
    })
    document.querySelectorAll('.amountBtn')[index].style.background=creatorData.accentColor
    document.querySelectorAll('.amountBtn')[index].style.color="white"
 }

 let items = [
    { label: "1 Week",
		 value: 1,
		 component: Week
		},
    { label: "1 Month",
		 value: 2,
		 component: Month
		},
    { label: "1 Year",
		 value: 3,
		 component: Year
		}
  ];


</script>

<div class="container">


    <div class="u_info">
            <div class="info">
                <h2 class="info_title">{{ en: 'Info', fr: 'Info' }[$lang]}</h2>
                <hr />
                <p class="u_desc">
                    {creatorData.description ? creatorData.description : {en: "This user did not write anything about themselves", fr: "Cet utilisateur n'a rien écrit sur lui-même "}[$lang]}
                </p>
            </div>

            <div class="socialMedia">
                <h2 class="social_title">
                    {{ en: 'Social Media', fr: 'Réseau Socieaux' }[$lang]}
                </h2>
                <hr />
                <!-- svelte-ignore a11y-no-onchange -->
                <div class="social_icons">
                    {#each socialMedias as media}
                        {#if creatorData[media.type] && creatorData[media.type].length > 0}
                            <a target="_blank" href={creatorData[media.type].includes("http") ? creatorData[media.type] : "https://" + creatorData[media.type]}>
                                <img
                            style="width:{media.type == "baaz" ? "50px" :" 30px"}"
                                    src="/img/socialMedia/{media.type}.svg"
                                    alt="" />
                            </a>
                        {/if}
                    {:else}
                            <div>none</div>
                    {/each}
                </div>
            </div>
    </div>


    <div class="donationContainer">

        <div class="donationForm">
            <div class="currencyName">

                <div class="form__group field">
                <input 
                    bind:value={donator.name}
                    maxlength="15" 
                    type="input" 
                    class="input_field" 
                    placeholder="Name" 
                    name="name" id='name' 
                    required 
                />
                <label for="name" class="input_label">Your Name</label>
            </div>
            <select bind:value={donator.currency} name="currency" id="currency" required>
                <option value="TND">TND</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
            </select>
            </div>
            

            <div class="amount">

                <div class="selectAmounts">
                     {#each amounts as amount,index}
                        <div 
                        on:click={() => onClick(amount,index)}
                        class="amountBtn">
                            {amount} {donator.currency} 
                        </div>
                    {/each}
                    
                </div>

                <div class="form__group field">
                <input
                    
                    on:change={(e) =>donator.amount = addZeroes(e.currentTarget.value)}
                    on:input={onInput} 
                    value:bind="{donator.amount}" 
                    value="{donator.amount}" 
                    type="input" 
                    class="input_field" 
                    placeholder="amount" 
                    name="amount" 
                    id='amount' 
                    required />
                    <div class="minimumAmount">Minimum 1.000 {donator.currency}</div>
                </div>

            </div>
            
        <textarea bind:value={donator.message} name="tipMessage" id="tipMessageID" maxlength='250' class="topMessage"></textarea>

            <div class="paymentMethods">


                
                <input type="radio" name="amounts" id="method1" >
                <label for="method1" class="method" >
                    <img src="/img/misc/paypal.png" alt="paypal">
                    PayPal
                </label>
                
                <input type="radio" name="amounts" id="method2">
                <label for="method2" class="method" >
                    <img src="/img/misc/Paymee.png" alt="paymee">
                    Paymee
                </label>
                <input type="radio" name="amounts" id="method3">
                <label for="method3" class="method" >
                    <img src="/img/misc/Flouci.png" alt="flouci">
                    Flouci
                </label>
            </div>

            <div class="submit_button">
                Donate To {creatorData.name}
            </div>

        </div>

        <div class="donationInfo">

            <div class="preview">
                <div class="top">
                    <span class="name">{donator.name == "" ? "{Name}" : donator.name}</span> 
                    Donated 
                <span class="tipAmount">{donator.amount == "" ? "{0.000}" : donator.amount} {donator.currency}</span> 
                </div>
                <div class="message">
                    {donator.message == "" ? "{Message}" : donator.message}
                </div>
            </div>

            <div class="donatorsInfo">
                <Tabs {items} />
            </div>

        </div>

    </div>


</div>
