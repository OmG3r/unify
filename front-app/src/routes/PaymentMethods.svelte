<style>
    
    .u-view {
        width: 100%;
        min-height: 100vh;
        padding: 90px 0;
        background-color: #181d22;
        color:white
    }
    h1{
        margin: 25px auto;
        width: max-content;
        color:white; 
    }
    .lastUpdate{
        color:white;
        width: max-content;
        margin: 25px auto;
    }
    .h3{
        font-size: 25px;
        font-weight: 600;
        color:black;
        margin-left: 15px;
        margin-bottom: 15px;
    }
    .h4{
        margin-left: 32px;
        color:black;
        font-weight: 500;
        margin-bottom: 15px;
    }
    .h5{
        margin-left: 55px;
        color:black;
        font-weight: 400;
        margin-bottom: 15px;
    }
    .h6{
        font-weight: 400;
        margin-left: 70px;
        color:black;
        margin-bottom: 10px;
    }
    
    .u-container{
        width: 100%;
        max-width: 70%;
        margin: auto;
        background-color:white;
        padding: 50px;
        border-radius: 10px;
        margin-top: 60px;
    }
    .head{
        font-size: 22px;
        font-weight: 800;
        margin: 25px 0 15px 0;
        color:black
    }
    .body{
        color:black;
        margin-left: 15px;
        margin-bottom: 15px;
        
    }

    @media only screen and (max-width: 1180px) {
        .u-container{
            max-width: 100%;
            padding: 50px 20px;
         border-radius: 0;
        }
    }
    
</style>


<script>
import { lang } from "../store.js";
import {onMount} from "svelte"
onMount(() => {
    window.scrollTo({ top: 0 });
})
</script>

<div class="u-view">
    <h1>{{en: 'Methods of payment', fr: 'Méthodes de paiement' }[$lang]}</h1>
    <div class="lastUpdate">{{en: 'Last Updated on February 14, 2021', fr: 'Dernière mise à jour le 14 février 2021' }[$lang]}</div>
    <div class="u-container">
    
    
        <div  class="head">{{en: 'Methods of payment', fr: 'Méthodes de paiement' }[$lang]}</div>
        <div  class="body">{{
            en: 'When finalising the order, you can view the total amount of your order.',
            fr: 'Lors de la finalisation de la commande, vous pouvez visualiser le montant total de votre commande.'
            }[$lang]}  
        </div>
        <div class="h4">{{en: '1) Payment in cash on delivery: ', fr: '1) Paiement en espèces à la livraison:' }[$lang]}</div>
            <div class="h5">{{
                    en: 'A- Make sure to prepare the exact amount of the order. The delivery people do not always have cash on hand to give you change', 
                    fr: "A- Assurez-vous de préparer le montant exact de la commande. Les livreurs ne disposent pas toujours d'espèces pour vous rendre la monnaie." 
                    }[$lang]}  
            </div>
            <div class="h5">{{
                    en: 'B- We only accept payment in Tunisian Dinar.', 
                    fr: 'B- Nous acceptons uniquement le paiement en Dinar Tunisien.' 
                }[$lang]}  
            </div>


        <div class="h4">{{en: '2) Secure payment by national and international credit cards (coming soon): ', fr: '2) Paiement sécurisé par carte bancaire nationales et internationales (prochainement):' }[$lang]}</div>
            <div class="h4">{{
                    en: 'A- Once you have placed your order, simply select the online credit card payment option.', 
                    fr: "A- Après avoir procédé à la passation de commande, sélectionnez simplement l'option de paiement par carte bancaire en ligne." 
                    }[$lang]}  
            </div>
            <div class="h5">{{
                    en: 'B- Enter your card details such as:', 
                    fr: 'B- Entrez les détails de votre carte tels que:' 
                }[$lang]}  
            </div>
                <div class="h6">{{
                        en: '- Card number', 
                        fr: '- Numéro de carte' 
                    }[$lang]}  
                </div>
                <div class="h6">{{
                        en: '- Expiry date', 
                        fr: "- Date d'expiration" 
                    }[$lang]}  
                </div>
                <div class="h6">{{
                        en: '- Security code', 
                        fr: '- Code de sécurité' 
                    }[$lang]}  
                </div>
        <div  class="body">{{
            en: 'Then complete your order. To secure your payment, some banks will ask you for a security code, sent to your phone.',
            fr: 'Ensuite, complétez votre commande. Pour sécuriser votre paiement, certaines banques vous demanderont un code de sécurité, envoyé à votre téléphone.'
            }[$lang]}
            <!-- {{
            en: 'For more information on online payment',
            fr: "Pour plus d'information sur le paiement en ligne"
            }[$lang]}
            <span><a href="/gigi">
                {{
                en: 'HERE',
                fr: "ICI"
                }[$lang]}
            </a></span>  -->
        </div>
        
    
</div>

</div>
