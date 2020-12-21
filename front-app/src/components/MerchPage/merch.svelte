<script>
  import { writable } from "svelte/store";
  import { lang } from "../../store.js";
  import { onMount } from "svelte";
  import Single from "../SingleProductPage/singleProduct.svelte";

  let hashedproducts = {
    FM8748: {
      name: "Ahmed Shirt",
      img: "/img/tshirt.png",
      price: 90,
      type: "T-shirt"
    },
    MMX8E7: {
      name: "Ahmed Shirt",
      img: "/img/tshirt.png",
      price: 90,
      type: "T-shirt"
    },
    MX9E7C: {
      name: "Product XYZ",
      img: "/img/tshirt.png",
      price: 50,
      type: "T-shirt"
    },
    MOE7CZ: {
      name: "Product XYZ",
      img: "/img/tshirt.png",
      price: 50,
      type: "T-shirt"
    },
    MOE7fZ: {
      name: "Product XYZ",
      img: "/img/tshirt.png",
      price: 50,
      type: "T-shirt"
    }
  };

  let products = Object.entries(hashedproducts).map(([key, value]) => {
    value.id = key;
    return value;
  });

  let activeModalProduct = writable(undefined);
  let unsubscribeActiveModal = activeModalProduct.subscribe(v => {
    if (v == undefined) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  });
  
  /*let budgetMin = 0;
  let budgetMax = 300;

  let slider;
const filters = writable({
    type: [],
    minPrice: 0,
    maxPrice: 300
  });*/
  /*onMount(() => {
    const refSlide = noUiSlider.create(slider, {
      start: [0, 300],
      connect: true,
      range: {
        min: 0,
        max: 300
      }
    });
    refSlide.on("update", () => {
      let data = refSlide.get().map(i => Math.round(Number(i)));
      data.sort;

      $filters = {
        ...$filters,
        minPrice: data[0],
        maxPrice: data[1]
      };
    });
  });*/
  let displayProducts = products;
  /*filters.subscribe(currentValue => {
    displayProducts = JSON.parse(JSON.stringify(products));
    if (currentValue.type.length > 0) {
      displayProducts = displayProducts.filter(item =>
        currentValue.type.some(x => x == item.type)
      );
    }

    displayProducts = displayProducts.filter(item => {
      if (
        currentValue.minPrice <= item.price &&
        item.price <= currentValue.maxPrice
      ) {
        return true;
      }
      return false;
    });
  });

  const handleTypeChange = event => {
    let value = [event.target.value];
    if (value[0] == "none") {
      value = [];
    }
    $filters = {
      ...$filters,
      type: value
    };
  };*/
  let show = false;
  const openModal = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    show = true;
  };
  const closeModel = () => {
    let modal = document.getElementById("myModal");
    show = false;
    modal.style.display = "none";
  };
</script>

<style>
  .container {
    padding:50px;
    min-height: 50vh;
    display: grid;
    grid-template-columns: 20% 80%;
  }

 
  .u_products {
    min-height: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    row-gap: 50px;
  }

  .single_product {
    background-color: #EEEEEE;
    border-radius: 20px;
    margin: 25px 15px 25px 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 240px;
    cursor: pointer;
  }
  .single_product img {
    width: 65%;
  }
  .likebtn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #181d22;
    color: rgba(var(--AccentColor), 1);
    border-radius: 10px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .likebtn i {
    font-size: 20px;
  }
  .cartBtns{
      margin-block: 6px;
  }
  .productInfo {
    position: absolute;
    bottom: -30px;
    background-color: #181d22;
    width: 90%;
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: flex-end;
  }
  .buyNow {
    color: white;
    background-color: rgba(var(--AccentColor), 1);
    border-radius: 10px;
    border: none;
    padding: 8px;
    width: 45%;
    cursor: pointer;
  }
  .addCart {
    color: rgba(var(--AccentColor), 1);
    background-color: white;
    border-radius: 10px;
    border: none;
    padding: 8px;
    width: 45%;
    cursor: pointer;
  }
  .product_price {
    position: absolute;
    color: white;
    background-color: rgba(var(--AccentColor), 1);
    width: 30%;
    margin-left: 50%;
    font-weight: 700;
    padding: 8px;
    border-radius: 9px;
    transform: translateX(-50%);
    top: -20px;
  }
  .currency {
    font-size: 10px;
  }

  

  /******************end Budget slider******************/

  @media only screen and (max-width: 1550px) {
    .u_products {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media only screen and (max-width: 1180px) {
    .u_products {
      grid-template-columns: 1fr 1fr;
      flex: 0 0 45%;
    }
    .container {
      grid-template-columns: none;
    }

    .u_filters {
      flex-direction: row;
      padding: 0 0 50px 0px;
    }
  }
  @media only screen and (max-width: 800px) {
    .u_products {
      grid-template-columns: 1fr;
      flex: 0 0 100%;
    }
  }

 

 

  .modal {
    /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 100vh;
    width: 100%; /* Full width */
    height: fit-content; /* Full height */
    overflow-y: scroll; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #1e1e20;
    margin: 8% auto; /* 15% from the top and centered */
    border-radius: 30px;
    padding: 20px;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .show {
    animation: FadeIn 0.3s ease-out;
  }
  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .social_icons {
      display:flex;
      flex-direction:row;
      justify-content: center;
  }
  .social_icons i {
    font-size: 30px;
    margin-right:15px;
  }
  .u_info{
      padding:30px;
      color:#181d22;
  }
  .u_desc{
      color:rgba(0, 0, 0, 0.5)
  }
  .title_container{
      position: relative;
  }
  .title{
      background-color:rgba(var(--AccentColor), 1);
      width: max-content;
      height:55px;
      border-radius:15px 15px 0px 15px;
      color:white;
      display: flex;
      justify-content: center;
      padding:10px;
      align-items: center;
      font-size: 25px;
      font-weight:600;
  }
  .title_border{
      margin-left:15px;
    border-top: 1px solid rgba(var(--AccentColor), 1);
    width: 95%;
    position: absolute;
    top: 83%;
  }
 
</style>

<div class="container">
  <div class="u_info">
    <div class="info">
      <h2 class="info_title">{{ en: 'Info', fr: 'Info' }[$lang]}</h2>
      <hr/>
      <p class="u_desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
    </div>

    <div class="socialMedia">
      <h2 class="social_title">
        {{ en: 'Social Media', fr: 'Réseau Socieaux' }[$lang]}
      </h2>
      <hr/>
      <!-- svelte-ignore a11y-no-onchange -->
      <div class="social_icons">
        <i class="fab fa-youtube" />
        <i class="fab fa-facebook" />
        <i class="fab fa-instagram" />
        <i class="fab fa-twitch" />
      </div>
    </div>
  </div>

<div class="products_container">
    <div class="title_container">
        <div class="title">
            Available Now
        </div>
        <hr class="title_border"/>
    </div>
  
    
 
  <div class="u_products">
    {#each displayProducts as product}
      <div
        class="single_product"
        on:click={() => {
          $activeModalProduct = product;
        }}>
        <img src={product.img} alt="product" />
        <div class="likebtn">
          <i class="far fa-heart" />
        </div>
        <div class="productInfo">
          <div class="product_price">
            <span class="old_price" />
            <span class="current_price">
              {product.price}
              <sup class="currency">DT</sup>
            </span>
          </div>
          <div class="cartBtns">
            <button type="button" class="buyNow">
              {{ en: 'Buy Now', fr: 'Acheter' }[$lang]}
            </button>
            <button type="button" class="addCart">
              {{ en: 'Add to Cart', fr: 'Au Panier' }[$lang]}
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
  {#if $activeModalProduct}
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content" class:show>
        <span
          class="close"
          on:click={() => {
            $activeModalProduct = undefined;
          }}>
          &times;
        </span>
        <Single />
      </div>

    </div>
  {/if}

</div>
