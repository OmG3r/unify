<script>
 import { lang } from "../store.js";
 
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
    }else if (Math.abs(currentScroll) <100) {
        if (isScroll != false) {
          isScroll = false;
        }
        oldscroll = currentScroll;
      }
  };
</script>

<style>
 :global(:root) {
    --navBarHeight: 70px;
    --headerHeight: 400px;
    --userColor: 24,29,34; /*its an RGB code color*/
    --AccentColor: 70,185,120
  }
nav {
    display: grid;
    grid-template-columns: [col1] 1fr [col2] 1fr [col3] 1fr;
    color: white;
    padding: 8px 24px;
    width: 100%;
    background-color: transparent;
    position: fixed;
    z-index: 5000;
    border-bottom: 1px solid #ffffff24;
    height:var(--navBarHeight);
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
  .unify-plus{
       font-size: 25px;
 
    position: absolute;
    left: 50%;
    top: 94.35%;
    transform: translate(-50%,-50%);
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



.u-banner{
    position: relative;
    height: var(--headerHeight);
    
}
.u-logo{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: var(--headerHeight);
    width:100%;
    z-index: 500;
   }
.u-logo img{
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
.u-logo span{
    font-size: 30px;
    font-weight: 600;
    color:white;
    top: 70%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
}


.u-pattern{
    height: var(--headerHeight);
    width: 100%;
    background: linear-gradient(to bottom,rgba(var(--userColor), 0.9),rgba(var(--userColor), 0.9)),url(/../img/patterns.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    position: absolute;
    top: 0;
    z-index: 500;

}
.u-layer{
    height: var(--headerHeight);
    width: 100%;
    position: absolute;
    background: url(/../img/banner.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;

}
.header{
  height: var(--headerHeight);
}
/*--isScroll animation*/
 .header.isScroll .u-layer {
    animation: scrollAnim 0.3s ease-out;
    height: 0px;
    opacity: 0;
  }
  .header.isScroll .u-pattern {
    animation: scrollAnim2 0.3s ease-out;
    height: 70px;
    background: linear-gradient(to bottom,rgba(var(--userColor), 1) 0,rgba(var(--userColor), 1) 100%);
    position: fixed;
   
  }
  .header.isScroll .u-logo {
    animation: scrollAnim2 0.3s ease-out;
    height: 70px;
     position: fixed;
  }
   .header.isScroll .u-logo img {
    animation: scalein 0.3s ease-in-out forwards;
  }
   .header.isScroll .u-logo span {
    animation: scalein 0.3s ease-in-out forwards;
    display: none;
  }
  
nav.isScroll{
    border:none;
}
nav.isScroll .unify-plus{
display:none;
}
nav.isScroll .unify-logo{
animation: fadeout 0.3s ease-out;
opacity: 0;
}

 
@keyframes fadeout {
        0% {opacity:1}
        100% {opacity: 0}
    }
  @keyframes scrollAnim2{
        from{height:var(--headerHeight);}
        to {height: 70px}
    }
    @keyframes scrollAnim {
        0%{height:var(--headerHeight);opacity: 1}
        to {height: 0px;opacity: 0;}
    }
    @keyframes scalein {
        to {transform: scale(0.3);}
    }
/*--isScroll Reverse animation*/

 .header.isScrollReverse .u-layer {
    animation: scrollAnimReverse 0.4s ease-out;
    height:var(--headerHeight);
    opacity: 1
  }
  .header.isScrollReverse .u-pattern {
    animation: scrollAnim2Reverse 0.4s ease-out;
    height: var(--headerHeight);
   
  }
  .header.isScrollReverse .u-logo {
    animation: scrollAnim2Reverse 0.4s ease-out;
    height: var(--headerHeight);
   
  }
   .header.isScrollReverse .u-logo img {
    animation: scaleout 0.4s ease-in-out forwards;

  }
   .header.isScrollReverse .u-logo span {
    display: block;
  }
  

nav.isScrollReverse .unify-plus{
display:block;
}
nav.isScrollReverse .unify-logo{
animation: fadein 0.3s ease-out;
opacity: 1;
}




     @keyframes scaleout {
        to{transform: scale(1);}
    }
    @keyframes fadein {
        from{opacity:0}
        to{opacity: 1}
    }
  @keyframes scrollAnim2Reverse{
        from{height:70px}
        to {height:var(--headerHeight);}
    }
    @keyframes scrollAnimReverse {
        from{height:0px;opacity: 0}
        to {height:var(--headerHeight);opacity: 1}
    }
</style>




  <nav class="{isScroll ? 'isScroll' : 'isScrollReverse'}">
    <div class="unify-logo">
      <img src="/img/logo.png" alt="logo" />
    </div>
    <div class="unify-plus">
     +
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
<div  class="header {isScroll ? 'isScroll' : 'isScrollReverse'}">
<!--u-layer contains content creator BG + BG choosen color (0.9 opacity)-->
<div class="u-layer"/>
<!-- u-pattern contains "khtout" it is for all users-->
<div class="u-pattern"/>

   
    <div class="u-logo">
        <img  src="/img/ti3leh.jpg" alt="u-logo" />
        <span>Ti 3leh</span>
    </div>

</div>




