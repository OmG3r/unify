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
        text-align: center;
        max-width: 80%;
    }

    h1 {
        text-align: center;
        max-width: 80%;
    }
    .h3{
        font-size: 25px;
        font-weight: 600;
        color:black;
        margin-left: 15px;
        
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
            border-radius: 0px;
            padding: 50px 20px;
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
    <h1>Conseils pour laver et sécher les t-shirts imprimés</h1>
    <div class="lastUpdate">Last Updated on February 14, 2021</div>
    <div class="u-container">
    
    
        
        <div  class="body">
            Si vous avez déjà possédé un t-shirt imprimé, vous avez sans doute vu les résultats du lavage et du séchage constants sur l'encre imprimée. La surutilisation et les années de lavage et de séchage ont fait pâlir et craqueler les t-shirts préférés de nombreuses personnes.
        </div>
        <div class="h4">Comment laver et entretenir vos vêtements personnalisés ?</div>
        
            <div class="h5">
                1) Retournez le t-shirt à l'envers lors du lavage et du séchage. En retournant le vêtement, l'encre imprimée frotte moins sur les matériaux lors du passage dans la machine à laver ou le sèche-linge. Cette simple mesure peut vraiment prolonger la durée de vie d'un t-shirt imprimé.
            </div>
            <div class="h5">
                2) Utilisez des réglages de lavage à basse température ou à froid (max 30°C). Il serait également judicieux de séparer les chemises sombres et colorées des chemises blanches, au cas où !
            </div>
            <div class="h5">
                3) Utilisez un détergent doux.
            </div>
            <div class="h5">
                4) Séchez-le par culbutage à basse température ou suspendez-le pour le faire sécher.

            </div>
        
        
        
    
</div>

</div>
