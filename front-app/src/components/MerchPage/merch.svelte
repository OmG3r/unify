<script>
    import { writable } from 'svelte/store';
    import {lang} from '../../store.js'
    import {onMount} from 'svelte';
     import Single from '../SingleProductPage/singleProduct.svelte'

    

    let products = [
        {
            name: "Product XYZ",
            img: "/img/tshirt.png",
            price: 50,
            type: "T-shirt"
        },
        {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt"
        },
        {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt"
        },
        {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt"
        },
        {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt"
        }
    ];
    let budgetMin = 0;
    let budgetMax = 300;

    
    let slider;
    
    const filters = writable({
        type: [],
        minPrice: 0,
        maxPrice: 300
    })
    onMount(() => {
        const refSlide = noUiSlider.create(slider, {
            start: [0, 300],
            connect: true,
            range: {
                'min': 0,
                'max': 300
            }
        });
        refSlide.on('update', () => {
            let data = refSlide.get().map((i) => Math.round(Number(i)))
            data.sort
            
            $filters = {
                ...$filters,
                minPrice: data[0],
                maxPrice: data[1]
            }
        })
    })
    let displayProducts = products
    filters.subscribe((currentValue) => {
        displayProducts = JSON.parse(JSON.stringify(products))
        if (currentValue.type.length > 0) {
            displayProducts = displayProducts.filter((item) => currentValue.type.some((x) => x == item.type))
        }
        
        displayProducts = displayProducts.filter((item) => {

            if ((currentValue.minPrice <= item.price) && (item.price <= currentValue.maxPrice)) {
                return true
            }
            return false
        })

    })

    const handleTypeChange = (event) => {
        let value = [event.target.value]
        if (value[0] == "none") {
            value = []
        }
        $filters = {
            ...$filters,
            type: value
        }
    }
    let show = false;
    const openModal = ()=>{
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        show=true;
    }
    const closeModel = ()=>{
        let modal = document.getElementById("myModal");
        show=false;
        modal.style.display = "none";
        
        
    }

 
    
</script>

<style>
    .container {
        min-height: 50vh;
        display: grid;
        grid-template-columns: 20% 80%;
    }

    
    .u_filters {
        background-color: #1c1c1c;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100%;
    }

    .u_products {
        min-height: 100%;
        padding: 20px;
        background-color: #232426;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-items: center;
        row-gap: 50px;
    }

    .single_product {
        background-color: #312f30;
        border-radius: 20px;
        margin: 25px 15px 25px 15px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 300px;
        cursor: pointer;
    }
    .single_product img {
        width: 65%;
    }
    .likebtn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #1c1c1c;
        color: #0e80f6;
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
    .productInfo {
        position: absolute;
        bottom: -30px;
        background-color: #1c1c1c;
        width: 90%;
        border-radius: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 70px;
        justify-content: flex-end;
    }
    .buyNow {
        color: white;
        background-color: #0e80f6;
        border-radius: 10px;
        border: none;
        padding: 8px;
        width: 45%;
        cursor: pointer;
    }
    .addCart {
        color: #0e80f6;
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
        background-color: #0e80f6;
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
    .budget_filter {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #312f30;
        border-top: 1px solid #312f30;
    }
    .filter-title {
        margin: 4px 0;
    }

    .type_filter {
        width: 94%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .type-select {
        background: #312f30;
        color: white;
        padding: 6px;
        width: 100%;
        border-radius: 3px;
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

    .price-slider {
        width: 70%;
        margin: 18px 10px;
    }
    .price-container {
        
        display: flex;
        width: 94%;
        align-items: center;
        justify-content: space-between;
    }
    .price-container .minprice, .price-container .maxprice {
        width: 65px;
        text-align: center;
    }
    :global(.noUi-connect) {
        background-color: #0e80f6 !important;
    }

    .modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: fit-content; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #1e1e20;
  margin: 8% auto; /* 15% from the top and centered */
  border-radius:30px;
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

 .show{
animation: FadeIn 0.3s ease-out;
  }
  @keyframes FadeIn {
    0%{
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
</style>

<div class="container">
    <div class="u_filters">
        <div class="budget_filter">
            <h2 class="filter-title">
                {
                    {
                        "en": "Price",
                        "fr": "Prix"
                    }[$lang]
                }

            </h2>
            <div class="price-container">
                <div class="minprice">
                    {$filters.minPrice}

                </div>
                <div class="price-slider" bind:this={slider}></div>

                <div class="maxprice">
                    {$filters.maxPrice}

                </div>

            </div>

            
                <!--
            <div class="price_slider">
                <div class="price_inputs">
                    <span class="min">
                        {budgetMin}
                        <span class="minMaxCurrency">TND</span>
                    </span>
                    <span class="max">
                        {budgetMax}
                        <span class="minMaxCurrency">TND</span>
                    </span>
                </div>

                <div slider class="slider_inputs">
                    <div>
                        <div inverse-left style="width:70%;" />
                        <div inverse-right style="width:70%;" />
                        <div
                            range
                            style="left:{(budgetMin / 300) * 100}%;right:{100 - (budgetMax / 300) * 100}%;" />
                        <span thumb style="left:{(budgetMin / 300) * 100}%;" />
                        <span thumb style="left:{(budgetMax / 300) * 100}%;" />
                        <div sign style="left:{(budgetMin / 300) * 100}%;">
                            <span id="value">{budgetMin}</span>
                        </div>
                        <div sign style="left:{(budgetMax / 300) * 100}%;">
                            <span id="value">{budgetMax}</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        bind:value={budgetMin}
                        max="300"
                        min="0"
                        step="10" />
                    <input
                        type="range"
                        bind:value={budgetMax}
                        max="300"
                        min="0"
                        step="10" />
                </div>
            </div>
            -->
        </div>

        <div class="type_filter">
            <h2 class="title">Type</h2>
            <!-- svelte-ignore a11y-no-onchange -->
            <select class="type-select" on:change={handleTypeChange}>
                <option value="none">

                    {
                        {
                            "en": "All",
                            "fr": "Tous"
                        }[$lang]
                    }


                </option>
                <option value="T-shirt">
                    {
                        {
                            "en": "T-shirt",
                            "fr": "T-shirt"
                        }[$lang]
                    }
                </option>
                <option value="Hoodie">
                    {
                        {
                            "en": "Hoodies",
                            "fr": "Hoodies"
                        }[$lang]
                    }
                </option>

            </select>
        </div>
    </div>

    <div class="u_products">
        {#each displayProducts as product}
            <div class="single_product" on:click={openModal}>
                <img src={product.img} alt="product" />
                <div class="likebtn"><i class="far fa-heart" /></div>
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
                            {
                                {
                                    "en": "Buy Now",
                                    "fr": "Acheter"
                                }[$lang]
                            }

                        </button>
                        <button type="button" class="addCart">
                            {
                                {
                                    "en": "Add to Cart",
                                    "fr": "Au Panier"
                                }[$lang]
                            }

                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content" class:show>
    <span class="close" on:click={closeModel}>&times;</span>
    <Single/>
  </div>

</div>

</div>
