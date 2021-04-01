<script>
import { onMount } from "svelte";
import {hexToRgb,convert} from "../filter.js"
import { lang } from "../store";


export let creatorData = {};

if (creatorData.accentColor == undefined || creatorData.accentColor == null || creatorData.accentColor == "") {
        creatorData.accentColor = '#45b877'
}



</script>

<style>

.container{
    color: white;
    z-index: 5000;
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding: 8px 0 8px 0;
    bottom: 0;
}

@media only screen and (max-width:800px){
    .container{
        font-size: 15px;
    }
    
}

</style>


<div class="container" style="background-color:{creatorData.accentColor}">
    {{ 
        en: 'Free Delivery for All Products.', 
        fr: 'Livraison Gratuite sur tous les produits.' 
    }[$lang]}
</div>
