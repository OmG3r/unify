
<script>
    import { lang } from "../store.js";
    import Logo from "./misc/UnifyLogo.svelte";
    import {upColor,downColor} from "../store.js";
    import { link, navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import {user} from '../firebase.js'
    import Cart from '../components/misc/Cart.svelte'
    import {convert} from "../filter.js"
    $: signedin = $user;
    let isActive = false; // for mobile menu
    let isActiveReverse = false;
    let myAccount = false;
    
    
    $upColor = "#45B877";
    $downColor = "#181D22";
    let headerVisible = false;
    let oldscroll = 0;
    let mobileMenuColor = "#FFFFFF";
    let popup_myaccount = "#FFFFFF"
    onMount(async () => {
        document.getElementById("transparent").addEventListener("click", () => {
            myAccount = false;
        });
    
        let w = window.innerWidth
        if (w > 1180){
            mobileMenuColor ="transparent"
        }else{
            mobileMenuColor ="#FFFFFF"
        }
        
    });
    window.addEventListener("resize", () => {
            if (window.innerWidth > 1180) {
                isActiveReverse = false;
                mobileMenuColor ="transparent"
            }else{
                let currentScrollPos = window.pageYOffset;
                if (currentScrollPos <= 150) {
                    mobileMenuColor ="#FFFFFF"
                }
                 if (currentScrollPos > 180) {
                    mobileMenuColor ="#181D22"
                 }
            }
    });
    /* When the user scrolls down, navbar -> background white */
    let isScroll = false;
    let isScrollReverse = false;
    window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        let w = window.innerWidth
            if (currentScrollPos <= 150) {
                isScroll = false;
                isScrollReverse = true;
                $downColor = "#181D22";
                popup_myaccount ="#FFFFFF"
                if(w > 1180){
                mobileMenuColor ="transparent"
                }else{
                    mobileMenuColor ="#FFFFFF"
                }
                
            }
            if (currentScrollPos > 180) {
                isScroll = true;
                isScrollReverse = false;
                $downColor = "#FFFFFF";
                popup_myaccount ="#181D22"
                if(w > 1180){
                mobileMenuColor ="transparent"
                }else{
                    mobileMenuColor ="#181D22"
                }
            }
          
    };
let signoutFunc = () =>{
    firebase.auth().signOut()
    navigate("/")
}
</script>

<style>
    #transparent {
        width: 100vw;
        height: 100vh;
        position: absolute;
        background-color: transparent;
        z-index: 5;
        display: none;
    }
    #transparent.myAccount{
        display: block;
    }
    :global(:root) {
        --navBarHeight: 70px;
        --headerHeight: 350px;
        --userColor: 24, 29, 34; /*its an RGB code color*/
        --AccentColor: 70, 185, 120;
    }
    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 50px 0px 50px;
        background-color: white;
        height: 70px;
        color: #181d22;
        font-size: 18px;
        font-weight: 600;
        width: 100vw;
        position: absolute;
        top: 0;
        z-index: 500;
        box-shadow: 0px 0px 5px #181d225c;
    }
    nav .menuBtn {
        justify-self: end;
        align-items: center;
        width: 30px;
        height: 100%;
        cursor: pointer;
        display: none;
        position: absolute;
        right: 20px;
        z-index: 5003;
        margin-right: 14px;
    }
    .u_logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 700;
    }
    .u_logo .logo_img {
        width: 35px;
        margin-right: 10px;
    }
    .menuItems {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        background-color: transparent !important;
    }
    .menuItems a {
        margin: 0 14px 0 14px;
    }
   
    .menuItems a:hover {
        color: #46b978;
    }
    
    .nav-lang {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .nav-lang img {
        width: 30px;
        margin: 0 14px;
    }
    .join_btn {
        background-color: #46b978;
        border-radius: 4px;
        margin-right: 15px;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
        color: white;
        margin: 0 14px;
    }
    
    .join_btn a{
        margin: 0 !important;
        padding: 8px 18px;
        display: block; 
        border-radius:10px;
    }
    .join_btn a:hover {
        color: white !important;
    }
    .join_btn a:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .isScroll {
        animation: scrollAnim 0.3s ease-out;
        height: 70px;
        position: fixed;
        background-color: #181d22;
        color: white;
    }
    .isScrollReverse {
        animation: scrollAnimReverse 0.3s ease-out;
        height: 70px;
        position: absolute;
        background-color: white;
    }
    .closeMobileMenu {
        position: absolute;
        top: 15px;
        right: 25px;
        font-size: 25px;
        display: none;
        cursor: pointer;
        color: white;
        z-index: 5001;
    }
    @keyframes scrollAnim {
        0% {
            position: fixed;
            height: 0px;
            background-color: #181d22;
            color: white;
        }
        100% {
            position: fixed;
            height: 70px;
            background-color: #181d22;
            color: white;
        }
    }
    @keyframes scrollAnimReverse {
        0% {
            position: fixed;
            height: 70px;
            background-color: #181d22;
            opacity: 1;
        }
        100% {
            position: fixed;
            height: 0px;
            background-color: #181d22;
            opacity: 0;
        }
    }
    nav .menuBtn.isActive {
        display: none;
    }
    .menuItems.isActive {
        display: flex;
        animation: mobileMenu 0.3s ease-out;
        width: 350px;
        opacity: 1;
        justify-content: flex-end;
    }
    .menuItems.isActiveReverse {
        animation: mobileMenuReverse 0.3s ease-out;
        opacity: 0;
        width: 0px;
    }
.first_part {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .popup_myaccount .first_part img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .popup_myaccount {
        position: absolute;
        background-color: white;
        border-radius: 8px;
        padding: 15px;
        top: 70px;
        box-shadow: 0px 0px 5px #181d225c;
        display: none;
        width: max-content;
    }
    .user_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .u_name {
        text-align: center;
    }
    .edit_btn .btn {
        background-color: #46b978;
        color: white;
        border: none;
        border-radius: 7px;
        font-size: 12px;
        font-weight: 600;
        padding: 8px;
        margin-top: 10px;
        width: 100px;
        cursor: pointer;
        outline: none;
        display: block;
    text-align: center;
    }
    .edit_btn .btn:active {
        background-color: #46b978c7;
    }
    .menu_item {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 0 18px;
        user-select: none;
        
    }
    .menu_item:active {
        background-color: #46b978;
        color: white;
        border-radius: 5px;
    }
    .menu_item.myAccount {
        background-color: #46b978;
        color: white;
        height: 45px;
        border-radius: 5px;
        margin:0px !important; 
    }
    .user_avatar img {
        width: 30px;
        border-radius: 50%;
        margin: 5px 0px 0px 4px;
    }
    .second_part {
        font-weight: 400;
    }
    .second_part div {
        cursor: pointer;
    }
    .second_part div:active {
        color: #46b978;
    }
    .second_part .help img{
        width: 25px;
    }
    .second_part .help{
        display: flex !important;
        align-items: center;
        margin: 14px 0;
    }
     .second_part .help,.second_part .logout{
        display: block;
    }
    
    .popup_myaccount.myAccount {
        display: block !important;
    }
    .help_logout{
        display: none !important;
    }
    .edit_btn .btn:hover{
                color:white;
    }
    @media only screen and (max-width: 1180px) {
        .menuItems {
            display: none;
            opacity: 0;
            flex-direction: column !important;
            height: 100vh;
            padding-top: 50px;
            font-size: 20px !important;
            z-index: 5001;
            width: 0px;
            position: absolute;
            top: 0;
            right: 0;
            justify-content: flex-start;
            box-shadow: 0px 0px 5px #181d225c;
            background: white;
            overflow-y: scroll;
        }
        .menuItems.isActive {
            display: flex;
            animation: mobileMenu 0.3s ease-out;
            width: 350px;
            opacity: 1;
            justify-content:flex-start;
        }
        .menuItems.isActiveReverse {
            animation: mobileMenuReverse 0.3s ease-out;
            opacity: 0;
            width: 0px;
        }
        .menuItems > a{
            border-top: 1px solid;
            width: 100%;
            text-align: center;
            padding: 25px 0;
            margin: 0 !important;
        }
        .my_account{
            border-top: 1px solid;
            width: 100%;
            text-align: center;
            padding: 20px 0;
            margin: 0 !important;
        }
        .help_logout{
            width: 100%;
        }
        .help_logout div{
            border-top: 1px solid;
            width: 100%;
            text-align: center;
            padding: 25px 0;
            margin: 0 !important;
        }
        .nav-lang{
            border-top: 1px solid;
            width: 100%;
            padding: 25px 0;
            margin: 0 !important;
            display: flex;
            justify-content: center;
        }
        .popup_myaccount hr {
            display: none;
        }
        
        .menu-items a:hover,.help_logout div:hover{
            color:#46b978;
            cursor:pointer;
        }
        @keyframes mobileMenu {
            from {
                width: 0px;
                opacity: 0;
            }
            to {
                width: 350px;
                opacity: 1;
            }
        }
        @keyframes mobileMenuReverse {
            from {
                opacity: 1;
                width: 350px;
            }
            to {
                opacity: 0;
                width: 0px;
            }
        }
        .menuItems.isActive .nav-lang,
        .menuItems.isActive a {
            margin-top: 18px;
            margin:10px;
        }
        .closeMobileMenu.isActive {
            display: block;
        }
        nav .menuBtn {
            display: block;
            opacity: 1;
        }
        .join_btn {
            margin: 18px !important;
            height: 50px;
        }
       
        .my_account{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 0 14px;
        }
        .popup_myaccount{
            position: static;
            box-shadow: none;
            width: 80%;
        }
        .first_part img {display: none;}
        .second_part .help,.second_part .logout{
        display: none !important;
    }
    .help_logout{
        display: block !important;
        font-size:18px;
        font-weight: 600;
        text-align: center;
    }
    .help_logout div{
        margin:10px 0 10px 0;
    }
    }
    
    
    
</style>

<div id="transparent" class:myAccount />
<nav
    class:isScroll
    class="{isScroll ? 'isScroll' : ''} {isScrollReverse ? 'isScrollReverse' : ''}">
<a use:link href="/" class="u_logo" style="color:{$downColor}">
        <div  class="logo_img">
            <Logo />
        </div>
        Unify
    </a>

    <div
        class="menuItems {window.innerWidth <= 1180 ? (isActive ? 'isActive' : isActiveReverse ? 'isActiveReverse' : '') : ''}"
        style="background-color:{mobileMenuColor} !important">
        <a use:link href="/">{{ en: 'Home', fr: 'Accueil' }[$lang]}</a>
        <!--
        <a use:link href="/merch">{{ en: 'Merch', fr: 'Merch' }[$lang]}</a>
        <a use:link href="/tips">{{ en: 'Donations', fr: 'don' }[$lang]}</a>
        -->
        {#if signedin}
            <div
                
                class="my_account"
                id="myAccount"
                on:click={() => (myAccount = !myAccount)}>
                <div class="menu_item" class:myAccount>
                    {{ en: 'My Account', fr: 'Mon Compte' }[$lang]}
                    <div class="user_avatar">
                        <img src={isScroll ? "/img/misc/user-white.png" : "/img/misc/user.png"} alt="avatar" />
                    </div>
                </div>

                <div class="popup_myaccount" class:myAccount style="background-color:{popup_myaccount}">
                    <div class="first_part">
                        <img src="/img/misc/user.png" alt="avatar" style={convert($downColor)}/>
                        <div class="user_info">
                        <div class="u_name" >{$user && $user.displayName ? $user.displayName : "User"}</div>
                            <div class="edit_btn">
                            <a use:link href="/myaccount/profile" class="btn" >
                                    {{ en: 'Edit Profile', fr: 'Modifier votre profil' }[$lang]}
                            </a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="second_part" >
                    <div class="help" style="color:{$downColor}" >
                            <img src="/img/misc/wishlist.png" alt="wishlist" style={convert($downColor)}>
                            <a use:link href="/myaccount/wishlist" >{{en: 'Your Wishlist', fr: "Votre Liste d'envie" }[$lang]}</a> 
                        </div>
                        <div class="help" style="color:{$downColor}" >
                            <img src="/img/misc/order.png" alt="order" style={convert($downColor)}>
                            <a use:link href="/myaccount/orders" >{{en: 'Your Orders', fr: "Vos commandes" }[$lang]}</a>
                        </div>
                        <div on:click={() => {signoutFunc()}} class="logout" >Logout</div>
                    </div>
                </div>
            </div>
            <div class="help_logout">
                <div class="help" style="color:{$downColor}"><a use:link href="/myaccount/wishlist">{{en: 'Your Wishlist', fr: "Votre Liste d'envie" }[$lang]}</a> </div>
                <div class="help" style="color:{$downColor}"><a use:link href="/myaccount/orders">{{en: 'Your Orders', fr: "Vos commandes" }[$lang]}</a> </div>
                <div on:click={()=>{signoutFunc()}} class="logout"  style="color:{$downColor}">Logout</div>
            </div>
            
        {/if}
        {#if !signedin}
            <a
                use:link
                href="/signin">{{ en: 'Login', fr: 'Se Connecter' }[$lang]}
            </a>
            <a
                use:link
                href="/signup">{{ en: 'Register', fr: "S'inscrire" }[$lang]}
            </a>
        {/if} 
        <div class="nav-lang">
            {#if $lang == 'fr'}
                <img
                    on:click={() => {
                        $lang = 'en';
                    }}
                    src="/img/misc/france-circle.png"
                    alt="fr" />
            {:else if $lang == 'en'}
                <img
                    on:click={() => {
                        $lang = 'fr';
                    }}
                    src="/img/misc/uk-circle.png"
                    alt="en" />
            {/if}
        </div>
        {#if signedin}
            <Cart color={isScroll ? "#ffffff" : "#181d22"} />
        {/if}
        {#if !signedin}
        <Cart color={isScroll ? "#ffffff" : "#181d22"} />
            <div class="join_btn" target="_blank">
                <a href="https://creator.unify.tn">
                {{ en: 'Creator?', fr: 'Createur?' }[$lang]}
                </a>
                
            </div>
            
        {/if} 
    </div>
    <div
        class="closeMobileMenu"
        class:isActive
        style="color:{$downColor}"
        on:click={() => {
            isActive = false;
            isActiveReverse = true;
        }}>
        X
    </div>


    <svg
        class="menuBtn" 
        style="fill:{$downColor}"
        height="384pt"
        viewBox="0 -53 384 384"
        width="384pt"
        xmlns="http://www.w3.org/2000/svg"
        class:isActive
        on:click={() => {
            isActive = !isActive;
        }}>

        <path
            d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16
      16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        <path
            d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16
      16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        <path
            d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16
      16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
</svg>
    
    
    
</nav>
