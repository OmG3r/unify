<script>
  import { lang } from "../store.js";

  let headerVisible = true;
  let oldscroll = 0;
  window.onscroll = () => {
    let currentScroll = window.scrollY;

    if (Math.abs(currentScroll - oldscroll) > 1) {
      if (currentScroll > oldscroll) {
        if (headerVisible != false) {
          headerVisible = false;
        }
      } else {
        if (headerVisible != true) {
          headerVisible = true;
        }
      }
      oldscroll = currentScroll;
    }
  };
</script>

<style>
  :global(:root) {
    --navBarHeight: 400px;
  }
  .navbar-placeholder {
    height: var(--navBarHeight);
    width: 100%;
  }
  header {
    height: var(--navBarHeight);
    z-index: 100;
    width: 100%;
    position: relative;
    color: black;
    transform: translate(0, calc(-100% - 1rem));
    transition: transform 0.3s;
  }

  header.visible {
    transform: none;
  }
  nav {
    display: grid;
    grid-template-columns: [col1] 1fr [col2] 1fr [col3] 1fr;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    padding: 8px 24px;
    position: fixed;
    width: 100%;
  }
  nav a {
    margin: 0 8px;
  }
  .unify-logo {
    max-width: 42px;
    grid-column-start: col2;
    justify-self: center;
  }
  .unify-logo img {
    max-width: 100%;
  }
  .menu-items {
    grid-column-start: col3;
    justify-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
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
    width: 79px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
</style>

<header class:visible={headerVisible}>

  <nav>
    <div class="unify-logo">

      <img src="/img/logo.png" alt="logo" />
    </div>
    <div class="menu-items">
      <a href="#">
        {{ en: 'Home', fr: 'Accueil' }[$lang]}
      </a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#">
        {{ en: 'Merch', fr: 'Merch' }[$lang]}
      </a>
      <a href="#">
        {{ en: 'donation', fr: 'don' }[$lang]}
      </a>
      <a href="#">
        {{ en: 'Sign in', fr: 'Se connecter' }[$lang]}
      </a>
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
      <a href="#">
        <img
          class="basket"
          src="/img/misc/shopping-basket.svg"
          alt="shopping basket" />

      </a>
    </div>

  </nav>
</header>
  <div class="u-banner">
    <img src="/img/banner.jpg" alt="u-BG" class="u-BG" />
    <img class="u-logo" src="/img/ti3leh.jpg" alt="u-logo" />
    
  </div>
  
<!--<div class="navbar-placeholder"></div>-->
