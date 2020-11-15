<script>
  let products = [1, 2, 3, 4, 5];
  let budgetMin = 0;
  let budgetMax = 300;
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 20% 80%;
  }
  .u_filters {
    background-color: #1c1c1c;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .u_products {
    padding: 20px;
    background-color: #232426;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    row-gap: 50px;
  }

  .single_product {
    background-color: white;
    border-radius: 20px;
    margin: 25px 15px 25px 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
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
  }
  .price_slider {
    width: 80%;
  }
  .price_inputs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
  }
  .max,
  .min {
    border: none;
    background-color: #333333;
    color: white;
    width: 49%;
    height: 35px;
    margin: 0 5px 0 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .minMaxCurrency {
    color: #0e80f6;
    margin-left: 5px;
  }

  .slider_inputs {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .type_filter{
    width:100%;
  }
  /****************Budget slider**************************/
  [slider] > div > [inverse-left] {
    position: absolute;
    left: 0;
    height: 8px;
    border-radius: 10px;
    background-color: #333333;
    margin: 0 7px;
  }
  [slider] > div > [inverse-right] {
    position: absolute;
    right: 0;
    height: 8px;
    border-radius: 10px;
    background-color: #333333;
    margin: 0 7px;
  }
  [slider] > div > [range] {
    position: absolute;
    left: 0;
    height: 8px;
    border-radius: 14px;
    background-color: #0e80f6;
  }
  [slider] > div > [thumb] {
    position: absolute;
    top: -7px;
    z-index: 2;
    height: 18px;
    width: 18px;
    text-align: left;
    margin-left: -11px;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    background-color: #0e80f6;
    border: 3px solid white;
    border-radius: 50%;
    outline: none;
  }

  div[slider] > input[type="range"]::-ms-thumb {
    pointer-events: all;
    width: 25px;
    height: 25px;
    border-radius: 0px;
    border: 0 none;
    background: red;
    cursor: pointer;
    border: 3px solid white;
  }
  div[slider] > input[type="range"]::-moz-range-thumb {
    pointer-events: all;
    width: 25px;
    height: 25px;
    border-radius: 0px;
    border: 0 none;
    background: red;
    cursor: pointer;
    border: 2px solid white;
  }
  div[slider] > input[type="range"]::-webkit-slider-thumb {
    pointer-events: all;
    width: 25px;
    height: 25px;
    border-radius: 0px;
    border: 0 none;
    background: red;
    -webkit-appearance: none;
    cursor: pointer;
  }

  div[slider] > input[type="range"]::-ms-fill-lower {
    background: transparent;
    border: 0 none;
  }
  div[slider] > input[type="range"]::-ms-fill-upper {
    background: transparent;
    border: 0 none;
  }
  [slider] > input[type="range"] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 3;
    height: 14px;
    top: -2px;
    width: 120%;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
  }

  div[slider] > input[type="range"]::-ms-track {
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  div[slider] > input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    background: transparent;
    color: transparent;
  }
  div[slider] > input[type="range"]:focus::-webkit-slider-runnable-track {
    background: transparent;
    border: transparent;
  }
  div[slider] > input[type="range"]:focus {
    outline: none;
  }

  div[slider] > input[type="range"]::-ms-tooltip {
    display: none;
  }
  [slider] > div > [sign] {
    opacity: 0;
    position: absolute;
    margin-left: -11px;
    top: -39px;
    z-index: 3;
    background-color: #1abc9c;
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 28px;
    -webkit-border-radius: 28px;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-align: center;
  }
  [slider] > div > [sign]:after {
    position: absolute;
    content: "";
    left: 0;
    border-radius: 16px;
    top: 19px;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top-width: 16px;
    border-top-style: solid;
    border-top-color: #1abc9c;
  }
  [slider] > div > [sign] > span {
    font-size: 12px;
    font-weight: 700;
    line-height: 28px;
  }
  [slider]:hover > div > [sign] {
    opacity: 1;
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
    
    .u_filters{
      flex-direction: row;
      padding: 0 0 50px 0px;
    }
    input[type=range]{
      width:110% !important;
    }
  }
  @media only screen and (max-width: 800px) {
     .u_products {
      grid-template-columns: 1fr;
      flex: 0 0 100%;
    } 

    input[type=range]{
      width:120% !important;
    }
  }
</style>

<div class="container">

  <div class="u_filters">

    <div class="budget_filter">
      <h2 class="title">Budget</h2>

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

    </div>

    <div class="type_filter">
      <h2 class="title">Type</h2>
    </div>

  </div>

  <div class="second_view">
    <div class="u_products">
      {#each products as product}
        <div class="single_product">
          <img src="/img/tshirt.png" alt="product" />
          <div class="likebtn">
            <i class="far fa-heart" />
          </div>
          <div class="productInfo">
            <div class="product_price">
              <span class="old_price" />
              <span class="current_price">
                70
                <sup class="currency">DT</sup>
              </span>
            </div>
            <div class="cartBtns">
              <button type="button" class="buyNow">Buy Now</button>
              <button type="button" class="addCart">Add to cart</button>
            </div>

          </div>
        </div>
      {/each}
    </div>
  </div>

</div>
