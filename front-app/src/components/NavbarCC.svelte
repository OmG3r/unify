<script>
    import { lang } from "../store.js";
    import { socialMedias } from "../utils.js";
    import {link,navigate} from 'svelte-routing'
    import Cart from './misc/Cart.svelte'
    import {user} from '../firebase.js'
    import { onMount } from "svelte";
    

    $: signedin = $user;
     let myAccount = false;
    

    let mobileMenuColor = "#FFFFFF";

    let isActive = false; // for mobile menu
    let isActiveReverse = false;
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1180) {
            isActiveReverse = false;
        }
    });


    
    
    /**************OnScroll***********/
    let isScroll = false;
    let oldscroll = 0;
    window.onscroll = () => {
        let currentScroll = window.scrollY;
        if (Math.abs(currentScroll) > 165) {
            if (currentScroll > oldscroll) {
                if (isScroll != true) {
                    isScroll = true;
                }
            }
            oldscroll = currentScroll;
        } else if (Math.abs(currentScroll) < 100) {
            if (isScroll != false) {
                isScroll = false;
            }
            oldscroll = currentScroll;
        }
    };
    /**************END OnScroll***********/

    export let creatorData = {};
</script>

<style>
    :global(:root) {
        --navBarHeight: 70px;
        --headerHeight: 400px;
        --userColor: 24, 29, 34; /*its an RGB code color*/
        --AccentColor: 70, 185, 120;
    }
    nav {
        display: grid;
        color: white;
        padding: 8px 24px;
        width: 100%;
        background-color: transparent;
        position: fixed;
        z-index: 5000;
        border-bottom: 1px solid #ffffff24;
        height: var(--navBarHeight);
    }
    nav a {
        margin: 0 8px;
    }
    nav .menuBtn {
        justify-self: end;
        align-items: center;
        width: 30px;
        height: 100%;
        fill: white;
        cursor: pointer;
        display: none;
        position: absolute;
        right: 20px;
        z-index: 5003;
    }
    nav .menuBtn.isActive {
        display: none;
    }
    .unify-logo {
        max-width: 42px;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
    }
    .unify-logo img {
        max-width: 100%;
    }
    .unify-plus {
        font-size: 25px;
        position: absolute;
        left: 50%;
        top: 94.35%;
        transform: translate(-50%, -50%);
    }
    .menu-items {
        justify-self: end;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .closeMobileMenu {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
        display: none;
        cursor: pointer;
    }

    .basket {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
            brightness(102%) contrast(102%);
        width: 26px;
    }

    .nav-lang {
        width: 26px;
        margin: 0 8px;
        
    }

    .nav-lang img {
        display: block;
        max-width: 100%;
    }

    .u-logo {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: var(--headerHeight);
        width: 100%;
        z-index: 500;
    }
    .u-logo img {
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 120px;
        height: 120px;
    }
    .u-logo span {
        font-size: 30px;
        font-weight: 600;
        color: white;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    }

    .u-pattern {
        height: var(--headerHeight);
        width: 100%;
        background: linear-gradient(
                to bottom,
                rgba(var(--userColor), 0.9),
                rgba(var(--userColor), 0.9)
            ),
            url(/../img/patterns.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        position: absolute;
        top: 0;
        z-index: 500;
    }
    .u-layer {
        height: var(--headerHeight);
        width: 100%;
        position: absolute;
        background: url(/../img/banner.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
    }
    .header {
        height: var(--headerHeight);
    }
    /*--isScroll animation*/
    .header.isScroll .u-layer {
        animation: scrollAnim 0.5s ease;
        height: 0px;
        opacity: 0;
    }
    .header.isScroll .u-pattern {
        animation: scrollAnim2 0.5s ease;
        height: 70px;
        background: linear-gradient(
            to bottom,
            rgba(var(--userColor), 1) 0,
            rgba(var(--userColor), 1) 100%
        );
        position: fixed;
    }
    .header.isScroll .u-logo {
        animation: scrollAnim2 0.6s ease;
        height: 70px;
        position: fixed;
    }

    .header.isScroll .u-logo img {
        animation: scalein 0.5s ease-in-out forwards;
    }
    .header.isScroll .u-logo span {
        animation: scalein 0.5s ease-in-out forwards;
        display: none;
    }
    .header.isScroll .userSocial {
        animation: scalein 0.5s ease-in-out forwards;
        display: none !important;
    }

    nav.isScroll {
        border: none;
    }
    nav.isScroll .unify-plus {
        display: none;
    }
    nav.isScroll .unify-logo {
        animation: fadeout 0.5s ease-out;
        opacity: 0;
    }

    @keyframes fadeout {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes scrollAnim2 {
        from {
            height: var(--headerHeight);
        }
        to {
            height: 70px;
        }
    }
    @keyframes scrollAnim {
        0% {
            height: var(--headerHeight);
            opacity: 1;
        }
        to {
            height: 0px;
            opacity: 0;
        }
    }
    @keyframes scalein {
        to {
            transform: scale(0.3);
        }
    }
    /*--isScroll Reverse animation*/

    .header.isScrollReverse .u-layer {
        animation: scrollAnimReverse 0.6s ease;
        height: var(--headerHeight);
        opacity: 1;
    }
    .header.isScrollReverse .u-pattern {
        animation: scrollAnim2Reverse 0.5s ease;
        height: var(--headerHeight);
    }
    .header.isScrollReverse .u-logo {
        animation: scrollAnim2Reverse 0.5s ease;
        height: var(--headerHeight);
    }
    .header.isScrollReverse .u-logo img {
        animation: scaleout 0.5s ease-in-out forwards;
    }
    .header.isScrollReverse .u-logo span {
        display: block;
    }
    .header.isScroll .userSocial {
        display: block;
    }

    nav.isScrollReverse .unify-plus {
        display: block;
    }
    nav.isScrollReverse .unify-logo {
        animation: fadein 0.5s ease-out;
        opacity: 1;
    }

    @keyframes scaleout {
        to {
            transform: scale(1);
        }
    }
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes scrollAnim2Reverse {
        from {
            height: 70px;
        }
        to {
            height: var(--headerHeight);
        }
    }
    @keyframes scrollAnimReverse {
        from {
            height: 0px;
            opacity: 0;
        }
        to {
            height: var(--headerHeight);
            opacity: 1;
        }
    }

    .userSocial {
        margin-top: 20px;
        position: absolute;
        top: 72%;
    }
    .userSocial i {
        font-size: 22px;
        color: white;
        margin: 0 3px;
    }
    .userSocial i:hover {
        color: rgb(var(--AccentColor));
        cursor: pointer;
    }

    @media only screen and (max-width: 1180px) {
        .menu-items {
            opacity: 0;
            flex-direction: column !important;
            height: 100vh;
            margin-top: -8px;
            margin-right: -24px;
            background-color: #181d22;
            padding-top: 50px;
            font-size: 20px !important;
            z-index: 5001;
            width: 0px;
        }

        .menu-items.isActive {
            display: flex;
            animation: mobileMenu 0.3s ease-out;
            width: 350px;
            opacity: 1;
        }

        .menu-items.isActiveReverse {
            animation: mobileMenuReverse 0.3s ease-out;
            opacity: 0;
            width: 0px;
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

        .menu-items.isActive .nav-lang,
        .menu-items.isActive a {
            margin-top: 18px;
        }
        .closeMobileMenu.isActive {
            display: block;
        }

        nav .menuBtn {
            display: block;
            opacity: 1;
        }
    }





.my_account{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

    .menu_item {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 5px;   
    }
    .menu_item:active {
        background-color: #46b978;
        color: white;
        height: 45px;
        border-radius: 5px;
    }
  .menu_item{
         width: 100%;
        display: flex;
        justify-content: center;
    }
    .menu_item.myAccount {
        background-color: #46b978;
        color: white;
        height: 45px;
        border-radius: 5px;
    }
    
    .user_avatar img {
        width: 30px;
        border-radius: 50%;
        margin: 5px 0px 0px 4px;
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
    }
    .popup_myaccount.myAccount {
        display: block !important;
    }

    .popup_myaccount{
            position: absolute;
            box-shadow: none;
            width: 180px;
        }
        .first_part {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
   
     .user_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .u_name {
        text-align: center;
        color:#181d22;
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
    }
    .edit_btn .btn:active {
        background-color: #46b978c7;
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
     .second_part .help,.second_part .logout{
        display: block;
        color:#181d22
    }
    .help_logout{
        display: none !important;
    }
    @media only screen and (max-width: 1180px) {
    .help_logout{
            display: block !important;
            font-size:15px;
            font-weight: 400;
        }
    .popup_myaccount{
        position: static;
        color:#181d22;
    }
    .second_part .help,.second_part .logout{
        display: none;
        color:#181d22
    }
     .first_part img {display: none;}
    }
</style>

<nav class={isScroll ? 'isScroll' : 'isScrollReverse'}>
    <a href="/" use:link class="unify-logo"><img src="/img/logo.png" alt="logo" /></a>
    <div class="unify-plus">+</div>

    <div
        class="menu-items {window.innerWidth <= 1180 ? (isActive ? 'isActive' : isActiveReverse ? 'isActiveReverse' : '') : ''}">
        <a href="#">{{ en: 'Home', fr: 'Accueil' }[$lang]}</a>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#">{{ en: 'Merch', fr: 'Merch' }[$lang]}</a>
        <a href="#">{{ en: 'donation', fr: 'don' }[$lang]}</a>
        {#if signedin}
            <div
                
                class="my_account"
                id="myAccount"
                on:click={() => (myAccount = !myAccount)}>
                <div class="menu_item" class:myAccount>
                    {{ en: 'My Account', fr: 'Mon Compte' }[$lang]}
                    <div class="user_avatar">
                        <img src="/img/misc/user-white.png" alt="avatar" />
                    </div>
                </div>

                <div class="popup_myaccount" class:myAccount style="background-color:{mobileMenuColor}">
                    <div class="first_part">
                        <img src="/img/misc/user.png" alt="avatar" />
                        <div class="user_info">
                        <div class="u_name" >{$user && $user.displayName ? $user.displayName : "User"}</div>
                            <div class="edit_btn">
                            <button class="btn" on:click="{()=>{navigate("/myaccount")}}">
                                    {{ en: 'Edit Profile', fr: 'Modifier votre profil' }[$lang]}
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="second_part">
                        <div class="help" >Help & Support</div>
                        <div on:click={() => {firebase.auth().signOut()}} class="logout" >Logout</div>
                    </div>
                </div>
            </div>
            <div class="help_logout">
                <div class="help" >Help & Support</div>
                <div on:click={() => {firebase.auth().signOut()}} class="logout" >Logout</div>
            </div>
            
        {/if}
        {#if !signedin}
        <a use:link href="/signin">{{ en: 'Sign in', fr: 'Se connecter' }[$lang]}</a>
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
        <!-- svelte-ignore a11y-invalid-attribute -->
        <Cart />
            <!--
            <a href="/checkout">
                <img
                    class="basket"
                    src="/img/misc/shopping-basket.svg"
                    alt="shopping basket" />
            </a>
            -->
        <div
            class="closeMobileMenu"
            class:isActive
            on:click={() => {
                isActive = false;
                isActiveReverse = true;
            }}>
            X
        </div>
    </div>
    <svg
        class="menuBtn"
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
<div class="header {isScroll ? 'isScroll' : 'isScrollReverse'}">
    <!--u-layer contains content creator BG + BG choosen color (0.9 opacity)-->
    <div class="u-layer" style={'background-image: url(' + creatorData.banner + ");"} />
    <!-- u-pattern contains "khtout" it is for all users-->
    <div class="u-pattern" />

    <div class="u-logo">
        <img crossorigin="anonymous" src={creatorData.logo ? creatorData.logo : '/img/Logo.svg'} alt="u-logo" />
        <span>{creatorData.name ? creatorData.name : (creatorData.username + "' store")}</span>

        <div class="userSocial">
            <!--
        <i class="fab fa-youtube" />
        <i class="fab fa-facebook" />
        <i class="fab fa-instagram" />
        <i class="fab fa-twitch" />
        -->
            {#each socialMedias as media}
                {#if creatorData[media.type] && creatorData[media.type].length > 0}
                    <a href={media.link + '/' + creatorData[media.type]}>
                        <i class="fab fa-{media.type}" />
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</div>
