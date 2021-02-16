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

</script>

<div class="u-view">
    <h1>{{en: 'Shipping & Delivery', fr: 'Expédition & Livraison' }[$lang]}</h1>
    <div class="lastUpdate">{{en: 'Last Updated on February 14, 2021', fr: 'Dernière mise à jour le 14 février 2021' }[$lang]}</div>
    <div class="u-container">
    
    
        <div  class="head">{{en: 'Shipping & Delivery', fr: 'Expédition & Livraison' }[$lang]}</div>
        <div  class="body">{{
            en: '-Our delivery costs are indicated on the Unify website and concern the whole Tunisian territory.',
            fr: '-Nos frais de livraisons sont indiqués sur le site sur le site internet Unify et concerne tout le territoire Tunisien.'
            }[$lang]}  
        </div><br>

        <div  class="body">{{
            en: '-The costs and delivery times for items made available on unify.tn may vary. The delivery costs will be indicated on the summary of your order just before validating it.',
            fr: '-Les frais et délais de livraison des articles mis à disposition sur unify.tn peuvent varier. Les frais de livraison seront indiqués sur le récapitulatif de votre commande juste avant de la valider.'
            }[$lang]}  
        </div><br>
        <div  class="body">{{
            en: '-The delivery method and delivery time may vary according to the characteristics of the article (dimensions, weight, size...) and the quantity of the orders on our website.',
            fr: '-Le mode et le délai de livraison peuvent varier en fonction des caractéristiques de l’article (Dimensions, poids, taille…) et la quantité des commandes.'
            }[$lang]}  
        </div><br>
        <div  class="body">{{
            en: '-Standard delivery (5 to 8 working days).',
            fr: '-Livraison standard (5 à 8 jours ouvrables).'
            }[$lang]}  
        </div>
        
        </div>
        
    
</div>


