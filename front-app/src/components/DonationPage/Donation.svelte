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


    .donationForm{
        display: flex;
        width: 100%;
        flex-direction: column;
    }
    input{
        border: none;
    }
   
    .amount{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin:20px 0;
    }
    .selectAmounts{
        display: flex;
        flex-direction: row;
        margin: 0 10px 0 0;
        padding: 15px 0 0 0;
    }
   .amountBtn input{
        display: none;
    }
    .amountBtn label{
        border-radius: 15px;
        border:1px solid #181d22;
        padding: 8px 15px;
        margin:0 5px;
        cursor:pointer;
    }
    .amountBtn label:hover{
        border:1px solid rgba(var(--AccentColor),1);
    }

    .amountBtn input:checked + label{
        background-color: rgba(var(--AccentColor),1);
        border:none;
        color: white;
    }
    

    
  

    /************/

    .form__group {
	 position: relative;
	 padding: 15px 0 0;
	 margin-top: 10px;
	 width: 100%;
}
 .input_field {
	 font-family: inherit;
	 width: 100%;
	 border: 0;
	 border-bottom: 2px solid #9b9b9b;
	 outline: 0;
	 font-size: 18px;
	 color: #fff;
	 padding: 7px 0;
	 background: transparent;
	 transition: border-color 0.2s;
}
 .input_field::placeholder {
	 color: transparent;
}
 .input_field:placeholder-shown ~ .input_label {
	 font-size: 1.3rem;
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
/* demo */

 .amount .form__group{
     padding: 15px 0 0 0;
     margin: 0 0 0 10px;
     width: 30%;
 }

.paymentMethods{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.paymentMethods .method{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}


   
    @media only screen and (max-width: 1180px) {
      
        .container {
            grid-template-columns: none;
            padding: 20px;
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
export let params = {};
export let creatorData = {};
document.documentElement.style.setProperty('--AccentColor', hexToRgb(creatorData.accentColor));

let filter = convert(creatorData.accentColor).replace('filter:','').replace(";","");
document.documentElement.style.setProperty('--AccentColorFilter', filter);


let amount =0;
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
            <div class="form__group field">
                <input type="input" class="input_field" placeholder="Name" name="name" id='name' required />
                <label for="name" class="input_label">Your Name</label>
            </div>

            <div class="amount">

                <div class="selectAmounts">
                    <div class="amountBtn">
                    <input type="radio" name="amounts" id="amount-1" >
                        <label for="amount-1" class="amount_label">
                            5.000 TND
                        </label>
                    </div>
                    <div class="amountBtn">
                        <input type="radio" name="amounts" id="amount-2">
                        <label for="amount-2" class="amount_label">
                            10.000 TND
                        </label>
                    </div>
                    <div class="amountBtn">
                        <input type="radio" name="amounts" id="amount-3">
                        <label for="amount-3" class="amount_label">
                            15.000 TND
                        </label>
                    </div>
                    <div class="amountBtn">
                        <input type="radio" name="amounts" id="amount-4">
                        <label for="amount-4" class="amount_label">
                            20.000 TND
                        </label>
                    </div>
                    <div class="amountBtn">
                        <input type="radio" name="amounts" id="amount-5">
                        <label for="amount-5" class="amount_label">
                            50.000 TND
                        </label>
                    </div>
                </div>

                <div class="form__group field">
                    <input type="input" class="input_field" placeholder="amount" name="amount" id='amount' required />
                    <label for="amount" class="input_label">{amount == 0 ?  "Minimum Amount 1.000 TND" : amount}</label>
                </div>

            </div>
            
            <textarea name="tipMessage" id="tipMessageID" cols="30" rows="10" class="topMessage"></textarea>

            <div class="paymentMethods">


                <input type="radio" name="amounts" id="method1">
                <label for="method1" class="method" >
                    <img src="/img/misc/paypal.png" alt="paypal">
                    PayPal
                </label>
                
                <div class="method">
                    <img src="/img/misc/paymee.png" alt="Paymee">
                    Paymee
                </div>
                <div class="method">
                    <img src="/img/misc/flouci.png" alt="Flouci">
                    Flouci
                </div>
            </div>

            <div class="submit_button">
                Tip The Vmaker
            </div>

        </div>

    </div>


</div>
