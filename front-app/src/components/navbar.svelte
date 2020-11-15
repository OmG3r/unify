<script>
  /* When the user scrolls down, navbar -> background white */
  let isScroll = false;
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    currentScrollPos < 200 ? (isScroll = false) : (isScroll = true);
  };
  let isActive =false;
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 0.5fr [col-start] 4fr [col-start]0.5fr [col-start];
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 55px;
    padding: 10px 0 10px 0;
    text-decoration: none;
    justify-items: start;
    z-index: 2000000;
  }
  #navbar.isScroll {
    animation: scrollAnim 0.3s ease-out;
    background-color: white;
    position: fixed;
    height: 55px;
  }
  .isScroll .menuItemsContainer ul li a {
    color: black !important;
    font-weight: 600;
  }
  .isScroll .menuItemsContainer ul li a svg {
    fill: black !important;
  }
  .isScroll .menuItemsContainer ul li a svg:hover {
    fill: #0e80f6 !important;
  }
  .isScroll .menuItemsContainer ul li a:hover {
    color: #0e80f6 !important;
  }
  .isScroll .unifyLogo span {
    color: black !important;

  }
  .unifyLogo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
  }
  .unifyLogo img {
    width: 40px;
    height: 45px;
    margin-right: 10px;
  }
  .unifyLogo span {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }

  .menuItemsContainer {
    grid-column-start: col-start 2;
    display: flex;
    justify-content: flex-end;
  }

  .menuItems {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin-bottom: 0px !important;
    margin-top: 0px;
    align-items: center;
    margin-right: 50px;
  }
  .navItem {
    margin-right: 20px;
  }
  .navItemLink {
    color: white;
    text-decoration: none;
    font-weight: 400;
  }
  .navItemLink.cartItem {
    position: relative;
  }
  .navItemLink.cartItem svg {
    width: 30px;
    height: 30px;
    fill: white;
  }
  .cart_orders_number {
    position: absolute;
    background-color: #0e80f6;
    color: white;
    font-size: 12px;
    text-align: center;
    top: -16px;
    right: -7px;
    padding: 2px 6px;
    border-radius: 50%;
  }
  .mobileBtn {
    color: white;
    display:none;
    cursor: pointer;
  }
  @keyframes scrollAnim {
    0% {
      background-color: transparent;
      position: fixed;
      height: 0px;
    }

    100% {
      background-color: white;
      position: fixed;
      height: 55px;
    }
  }

  @keyframes NotscrollAnim {
    0% {
      height: 55px;
    }
    100% {
      height: 0px;
      background-color: transparent;
    }
  }

  @media only screen and (max-width: 1106px) {
    .mobileBtn  {
      grid-column-start: col-start 3;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 40px;
      margin: 0px !important;
      border-radius: 3px;
      border: 1px solid black;
      outline: inherit;
    }
    .fas.fa-bars {
      font-size: 25px !important;
      color: black;
      font-weight: 600;
    }
    .menuItemsContainer {
      grid-column-start: col-start 1;
      grid-row-start: row-start 3;
      opacity: 0;
      height: 0px;
    }
    .container {
      background-color: white;
    }
    .unifyLogo span {
      color: black !important;
    }
    .menuItems {
      flex-direction: column;
      margin-top: 15px;
    }
    .menuItems li {
      margin-bottom: 15px;
    }
    .menuItems li a {
      color: black;
    }
    .menuItems li a svg{
      color: black;
    }
    .menuItems li a:hover {
      color: #f4623a !important;
    }

.container{
height: initial;
}
    .menuItemsContainer.isActive {
    animation: fallDown 0.3s ease;
      opacity: 1;
      height: 100%;
    }
    
@keyframes fallDown {
  
 0% {
   opacity: 0;
   height:0%;
  }
  25% {
   opacity: 0.25;
   height:25%;
  }
  
  100% {
    height: 100%;
    opacity: 1;
  }
}

  }
</style>

<div class="container" class:isScroll id="navbar" class:isActive>

  <div class="unifyLogo">
    <img src="../img/logo.png" alt="logo" />
    <span>Unify.tn</span>
  </div>
  <div class="menuItemsContainer" class:isActive>
    <ul class="menuItems" class:isActive>
      <li class="navItem">
        <a class="navItemLink" href="#about">Home</a>
      </li>
      <li class="navItem">
        <a class="navItemLink" href="#rechargegsm">Tip</a>
      </li>
      <li class="navItem">
        <a class="navItemLink" href="#bureautique">Merch</a>
      </li>
      <li class="navItem">
        <a class="navItemLink cartItem" href="#bureautique">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m504.399
              185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592
              3.315-11.059 12.158-7.743 19.75l48.225
              110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749
              7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83
              13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677
              16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216
              34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487
              256.652h-335.824c-2.547
              0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764
              1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151
              16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0
              11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462
              5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315
              11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281
              4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528
              2.301-2.76 3.971-5.307 3.971z" />
            <path
              d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z" />
            <path
              d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z" />
            <path
              d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z" />
          </svg>
          <span class="cart_orders_number">4</span>
        </a>
      </li>
    </ul>
  </div>

  <button type="button" class="mobileBtn" on:click={()=>isActive=!isActive}>
    <i class="fas fa-bars" />
  </button>

</div>
