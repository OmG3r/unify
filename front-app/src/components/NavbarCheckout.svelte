<script>
    import Logo from "./misc/UnifyLogo.svelte";
    import { link } from "svelte-routing";
    import { onMount } from 'svelte';
    import {upColor,downColor} from "../store.js";
    $upColor = "#45B877";
    $downColor = "#181D22";
   
</script>

<style>
    nav {
        min-height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 5px #181d225c;
    }
    .help,
    .payment {
        display: flex;
        flex-direction: row;
        color: #ababab;
        align-items: center;
        font-size: 13px;
        font-weight: 600;
    }
    .help {
        margin-right: 35px;
    }
    .help img {
        margin-right: 13px;
        width: 20px;
        height: 20px;
    }
    .payment img {
        margin-right: 10px;
        width: 25px;
        height: 25px;
    }
    .help img,
    .payment img {
        filter: invert(71%) sepia(14%) saturate(10%) hue-rotate(332deg)
            brightness(95%) contrast(85%);
    }
   
    .payment_text {
        width: 100px;
    }
    .u_logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 18px;
        margin-right: 35px;
    }
    .logo_img {
        margin-right: 10px;
    }
    @media only screen and (max-width: 1180px) {
        nav {
            flex-direction: column;
        }
        .help{
            margin: 10px 30px;
        }
        
    }
</style>

<nav>
    <a use:link href="/" class="u_logo">
        <div class="logo_img">
            <Logo {upColor} {downColor} />
        </div>
        Unify
    </a>

    <div class="help">
        <img src="./img/misc/call.png" alt="call" />
        <div class="help_text">
            Besoin d'aide pour passer une commande? Appelez nous au: 31 320 903
        </div>
    </div>

    <div class="payment">
        <img src="./img/misc/secure.png" alt="call" />
        <div class="payment_text">Paiement Sécurisé</div>
    </div>
</nav>
