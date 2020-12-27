<script>
  let quantity = 1;
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: 0 50px 0 50px;
  }
  .container .title {
    font-size: 30px;
    font-weight: 700;
    color: rgb(var(--userColor));
  }
  .container .sub_title {
    font-size: 20px;
    color: rgba(var(--userColor), 0.5);
  }
  .single_order {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    grid-column-start: 1;
    grid-column-end: 5;
    margin: 15px 0 15px 0;
  }
  .orders_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  hr {
    grid-column-start: 1;
    grid-column-end: 5;
    color: rgba(var(--userColor), 0.5);
  }
  .article_title {
    grid-column-start: 1;
    grid-column-end: 2;
    color: rgba(var(--userColor), 0.5);
    justify-self: center;
  }
  .quantity_title {
    grid-column-start: 2;
    grid-column-end: 3;
    color: rgba(var(--userColor), 0.5);
    justify-self: center;
  }
  .unit_price_title {
    grid-column-start: 3;
    grid-column-end: 4;
    color: rgba(var(--userColor), 0.5);
    justify-self: center;
  }
  .total_price_title {
    grid-column-start: 4;
    grid-column-end: 5;
    color: rgba(var(--userColor), 0.5);
    justify-self: center;
  }
  hr {
    width: 100%;
    color: rgb(var(--userColor));
  }
  .article {
    grid-column-start: 1;
    grid-column-end: 2;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .quantity {
    grid-column-start: 2;
    grid-column-end: 3;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .quantity .qty_btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #181d22;
    border-radius: 25px;
    height: 40px;
    width: max-content;
    width: 150px;
    background-color: rgb(var(--userColor));
    border: none;
  }
  .quantity .qty_btn div {
    width: 33.33%;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
  }
  .quantity .qty_btn .minus {
    color: white;
    font-size: 25px;
    border-radius: 25px 0 0 25px;
    cursor: pointer;
    height: 100%;
    user-select: none;
  }
  .quantity .qty_btn .minus:active {
    background-color: rgba(var(--AccentColor), 0.8);
  }
  .quantity .qty_btn .plus {
    color: white;
    font-size: 25px;
    height: 100%;
    user-select: none;
    border-radius: 0 25px 25px 0px;
    cursor: pointer;
  }
  .quantity .qty_btn .plus:active {
    background-color: rgba(var(--AccentColor), 0.8);
  }
  .quantity .qty_btn .qty {
    font-size: 20px;
  }
  .qty::-webkit-outer-spin-button,
 .qty::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .qty{
      width: 33.33%;
      background-color: rgba(var(--userColor),1);
      border: none;
      color:white;
      text-align: center;
  }
  .unit_price {
    grid-column-start: 3;
    grid-column-end: 4;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 18px;
    font-weight: 700;
  }
  .unit_price .old_price{
      text-decoration: line-through solid rgba(var(--userColor), 0.5);
      color: rgba(var(--userColor), 0.5);
  }
    .unit_price .economie{
        color: rgb(var(--AccentColor))
    }
  .single_order .total_price {
    grid-column-start: 4;
    grid-column-end: 5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
  }

  .single_order .total_price .btns {
    margin-top: 15px;
    display: flex;
    width: 50px;
    justify-content: space-between;
    cursor: pointer;
  }
   .single_order .total_price .btns i:active {
    color: rgb(var(--AccentColor))
  }

  .article .info {
    display: flex;
    flex-direction: column;
  }
  .article .info .p_title {
    display: flex;
    flex-direction: column;
  }
  .article .info .p_title .title {
    font-size: 25px;
    color: rgb(var(--userColor));
  }
  .article .info .p_title .sub_title {
    font-size: 15px;
    color: rgb(var(--userColor));
    font-weight: 600;
  }
  .article .info .color {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    font-weight: 600;
    align-items: center;
  }
  .article .info .color .shape {
    margin-left: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
  }

  .article .info .size {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    font-weight: 600;
    align-items: center;
  }
  .article .info .size .shape {
    margin-left: 15px;
    width: 30px;
    height: 30px;
    background-color: rgb(var(--userColor));
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .article .p_img img {
    width: 80px;
  }
  .article .p_img {
    background-color: white;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 18px rgba(var(--userColor), 0.15);
    border-radius: 15px;
    margin-right: 15px;
  }
  .discount_container {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  .discount_container .title {
    margin-right: 15px;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .discount_container .promo_code {
    border-radius: 15px 0 0 15px;
    border: 1px solid rgba(var(--userColor), 0.5);
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
  }
  .discount_container .apply_btn {
    background-color: rgb(var(--AccentColor));
    color: white;
    width: 80px;
    border-radius: 0 15px 15px 0;
    border: none;
    font-size: 15px;
    font-weight: 600;
  }
  .discount_container .apply_btn:active {
    background-color: rgba(var(--AccentColor), 0.8);
  }
  button {
    cursor: pointer;
  }
  input:focus,
  button:focus {
    outline: none;
  }
  .final_total {
    margin: 20px 0 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .final_total .titles,
  .final_total .prices {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 700;
  }
  .final_total .prices {
    align-items: flex-end;
  }
  .final_total .titles {
    align-items: flex-start;
  }
  .final_total .prices span,
  .final_total .titles span {
    margin: 5px 0 5px 0;
  }
  .promotional_code .code {
    color: rgba(var(--userColor), 0.5);
    font-size: 15px;
    font-weight: 600;
  }
  .final_total .prices .shipping {
    color: rgb(var(--AccentColor));
  }
  .total {
    display: flex;
    justify-content: flex-end;
    color: rgb(var(--userColor));
    font-size: 18px;
    font-weight: 700;
    margin: 15px 0 15px 0;
  }
  .continue_finilize {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0 15px 0;
  }
  .continue_finilize .continue,
  .continue_finilize .finilize {
    width: 300px;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    margin: 0 10px 0 10px;
  }
  .continue_finilize .continue {
    background-color: rgb(var(--userColor));
  }
  .continue_finilize .continue:active {
    background-color: rgba(var(--userColor), 0.8);
  }
  .continue_finilize .finilize {
    background-color: rgb(var(--AccentColor));
  }
  .continue_finilize .finilize:active {
    background-color: rgba(var(--AccentColor), 0.8);
  }
</style>

<div class="container">
  <span class="title">Shopping cart (2 Articles )</span>
  <span class="sub_title">Free Delivery</span>

  <div class="orders_container">

    <span class="article_title">Article</span>
    <span class="quantity_title">Quantity</span>
    <span class="unit_price_title">Unit Price</span>
    <span class="total_price_title">Total price</span>
    <hr />
    <div class="single_order">
      <!--********-->
      <div class="article">
        <div class="p_img">
          <img src="./img/tshirt.png" alt="order" />
        </div>
        <div class="info">
          <div class="p_title">
            <span class="title">T-Shirt</span>
            <span class="sub_title">Best T-shirt quality</span>
          </div>
          <div class="color">
            Color:
            <div class="shape" />
          </div>
          <div class="size">
            Size:
            <div class="shape">S</div>
          </div>

        </div>
      </div>
      <!--********-->
      <div class="quantity">
        <div class="qty_btn">
          <div
            class="minus"
            on:click={() => {
              quantity <= 1 ? (quantity = 1) : (quantity -= 1);
            }}>
            -
          </div>
          <input class="qty" value:bind={quantity} value={quantity}/>
          <div class="plus"
          on:click={() => {
              quantity += 1;
            }}
          >+</div>
        </div>
      </div>
      <!--********-->
      <div class="unit_price">
        <div class="price">45 DT</div>
        <div class="old_price">52 DT</div>
        <div class="economie">Economie: 7 DT</div>
      </div>
      <!--********-->
      <div class="total_price">
        <div class="price">90DT</div>
        <div class="btns">
          <i class="far fa-heart" />
          <i class="fas fa-minus" />
        </div>
      </div>
      <!--********-->
    </div>
    <hr />
  </div>

  <div class="discount_container">
    <span class="title">Promo code:</span>
    <input type="text" class="promo_code" placeholder="Enter promo code" />
    <button type="button" class="apply_btn">Apply</button>
  </div>

  <div class="final_total">
    <div class="titles">
      <span class="subtotal">Subtotal</span>
      <span class="shipping">Shipping</span>
      <span class="promotional_code">
        Promotional Code
        <span class="code">ti3leh10</span>
      </span>
    </div>
    <div class="prices">
      <span class="subtotal">157 DT</span>
      <span class="shipping">Free</span>
      <span class="promotional_code">- 15.7 DT</span>
    </div>
  </div>
  <hr />
  <span class="total">Total: 141.3 DT</span>

  <div class="continue_finilize">
    <button class="continue">Continue Shopping</button>
    <button class="finilize">Finilize Your Order</button>
  </div>
</div>
