<style>
    :global(:root) {
        --navBarHeight: 56px
    }
    .navbar-placeholder {
        height: var(--navBarHeight);
        width: 100%;
        background-color: #1c1c1e;
    }
    header {
        height: var(--navBarHeight);
        position: fixed;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 8px 24px;

        box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0,.5);
        background-color: #1c1c1e;
        color: white;
        transform: translate(0,calc(-100% - 1rem));
        transition: transform 0.3s;
    }

    header.visible {
        transform: none;
    }
    nav {
        display: flex;
        align-items: center;
    }
    nav a {
        margin: 0 8px;
    }
    .u-logo {
        max-width: 34px;
    }
    .u-logo img {
        max-width: 100%;
        
    }
    .basket {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
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
</style>


<script>
    import {lang} from '../store.js'

    let headerVisible = true
    let oldscroll = 0
    window.onscroll = () => {
        let currentScroll = window.scrollY

        if (Math.abs(currentScroll - oldscroll) > 1) {
            if (currentScroll > oldscroll ) {
                if (headerVisible != false) {
                    headerVisible = false
                } 
            } else {
                if (headerVisible != true) {
                    headerVisible = true
                }
            }
            oldscroll = currentScroll
        }

        



        
    }

</script>


<header class:visible={headerVisible}>
    <div class="u-logo">

        <img src="/img/logo.png" alt="logo">
    </div>

    <nav>
        <a href="#">
            {
                {
                    "en": "Donation",
                    "fr": "Don"
                }[$lang]
            }

        </a>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#">Merch</a>
        <div class="nav-lang">
            {#if $lang == "fr"}
                <img on:click={() => {$lang = "en"}} src="/img/misc/france-circle.png" alt="fr">
            {:else if $lang == "en"}
                <img on:click={() => {$lang = "fr"}} src="/img/misc/uk-circle.png" alt="en">
            {/if}

        </div>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#">
            <img class="basket" src="/img/misc/shopping-basket.svg" alt="shopping basket">

        </a>
    </nav>



</header>
<div class="navbar-placeholder"></div>