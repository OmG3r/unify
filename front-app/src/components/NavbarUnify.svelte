<script>
    import { lang } from "../store.js";

    let headerVisible = false;
    let oldscroll = 0;
    /* When the user scrolls down, navbar -> background white */
   /* let isScroll = false;
    window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        currentScrollPos < 150 ? (isScroll = false) : (isScroll = true);
    };
    let isActive = false;
    */
</script>

<style>
    :global(:root) {
        --navBarHeight: 70px;
        --headerHeight: 400px;
        --userColor: 24, 29, 34; /*its an RGB code color*/
        --AccentColor: 70, 185, 120;
    }
    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 50px 10px 50px;
        background-color: rgb(var(--userColor));
        height: 70px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        width: 100%;
        position:fixed;
        top: 0;
        z-index: 500;
    }
    .u_logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .u_logo img {
        width: 35px;
        margin-right: 10px;
    }
    .menuItems {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
    .menuItems a {
        margin: 0 5px 0 5px;
    }
    .menuItems a:hover {
        color: rgb(var(--AccentColor));
    }
    .nav-lang {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav-lang img {
        width: 30px;
        margin: 0 5px 0 5px;
    }
    .join_btn {
        background-color: rgb(var(--AccentColor));
        width: 160px;
        height: 35px;
        border-radius: 10px;
        margin-right: 15px;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
    }
    .join_btn:hover {
        color: white !important;
    }
    .join_btn:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
   /* .isScroll {
        animation: scrollAnim 0.3s ease-out;
        height: 70px;
        position: fixed;
    }
    @keyframes scrollAnim {
        0% {
            position: fixed;
            height: 0px;
        }

        100% {
            position: fixed;
            height: 70px;
        }
    }*/
    @media only screen and (max-width: 1180px) {
        .menuItems{display: none;}
      }
</style>

<nav >
    <div class="u_logo">
        <img src="./img/logo_transaprent.png" alt="logo" />
        Unify
    </div>

    <div class="menuItems">
        <a href="#">{{ en: 'Home', fr: 'Acceuil' }[$lang]}</a>
        <a href="#">{{ en: 'Merch', fr: 'Merch' }[$lang]}</a>
        <a href="#">{{ en: 'Donations', fr: 'don' }[$lang]}</a>
        <a href="#">{{ en: 'Login', fr: 'Se Connecter' }[$lang]}</a>
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
        <a
            href="#"
            class="join_btn">{{ en: 'Join Us', fr: 'Rejoignez-nous' }[$lang]}</a>
    </div>
</nav>
