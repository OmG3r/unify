<script>
  let colors = ["0e80f6", "d40019", "ffffff", "737372"];
</script>

<style>
  .container {
    background-color: #1e1e20;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 100%;
  }

  .u_info {
    display: flex;
    flex-direction: row;
  }
  .u_info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .userName {
    margin-top: 12px;
  }
  .userName .Name {
    font-size: 25px;
    font-weight: 500;
    color: white;
  }
  .userName i {
    font-size: 20px;
    color: #0e80f6;
  }
  .userSocial {
    margin-top: 20px;
  }
  .userSocial i {
    font-size: 22px;
    color: white;
    margin: 0 3px;
  }

  .p_container {
    display: grid;
    grid-template-columns: 1fr[col_1] 1fr [col_2 ]1fr [col_3];
    padding: 0 30px 0 30px;
  }

  .p_info {
    display: flex;
    flex-direction: column;
    margin: 150px 0 0 0;
  }

  .p_imgs {
    display: flex;
    flex-direction: column;
  }

  .p_imgs .p_main_img {
    width: 100%;
    position: relative;
    height: 500px;
  }

  .p_main_img .product_img {
    width: 255px;
    margin-left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
  }
  .p_imgs .p_slider {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .p_imgs .p_slider img {
    width: 15%;
  }

  .p_order_details {
    display: flex;
    flex-direction: column;
    margin: 150px 0 0 0;
  }
  .circle_border {
    position: absolute;
    position: absolute;
    margin-left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .p_back_circle {
    background-color: #2c353a;
    width: 430px;
    height: 430px;
    border-radius: 50%;
    position: absolute;
    margin-left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .p_title {
    color: white;
    font-size: 35px;
    font-weight: 700;
  }
  .p_price {
    color: white;
    font-size: 35px;
    font-weight: 700;
  }
  .p_price span {
    color: #0e80f6;
  }
  .p_subTitle {
    color: #505c61;
    font-size: 35px;
    font-weight: 700;
  }
  .p_subTitle span {
    color: #0e80f6;
    margin-left: 8px;
  }
  .p_info hr {
    width: 40%;
    color: #505c61;
    border: solid 1px #505c61;
    margin: 5px 0 5px 0;
  }
  .p_desc {
    font-size: 20px;
    font-weight: 200;
    color: white;
  }
  .p_order_details .title {
    margin-right: 10px;
    font-size: 18px;
    font-weight: 600;
  }
  .starts i{
    color:#4f595a;
  }
  .starts .active {
    color: #ffc107;
  }
  .rate {
    font-size: 18px;
    font-weight: 600;
    margin-right: 5px;
  }

  .p_size {
    display: flex;
    flex-direction: row;
  }
  .sizes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .size {
    background-color: #a4a6a9;
    width: 30px;
    height: 30px;
    border-radius: 10px;
    color: white;
    margin: 0 5px 0 5px;
     display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .size:hover {
    background-color: #0e80f6;
  }
  .p_colors {
    display: flex;
    flex-direction: row;
  }
  .colors {
    display: flex;
    flex-direction: row;
  }
  .color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .color_border {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
  }
  .color_border:hover {
    border-width: 2px !important;
  }
  .p_order_details > div{
    margin: 15px 0 15px 35px;
  }
</style>

<div class="container">

  <div class="u_info">

    <img src="../../img/ti3leh.jpg" alt="userLogo" />

    <div class="userName">
      <span class="Name">Ti 3leh</span>
      <i class="fas fa-check-circle" />
    </div>

    <div class="userSocial">
      <i class="fab fa-youtube" />
      <i class="fab fa-facebook" />
      <i class="fab fa-instagram" />
      <i class="fab fa-twitch" />
    </div>

  </div>

  <!--P -> Product -->
  <div class="p_container">

    <div class="p_info">
      <span class="p_title">T-Shirt</span>
      <span class="p_subTitle">
        Best T-shirts
        <span>quality</span>
      </span>
      <hr />
      <span class="p_price">
        50
        <span>TND</span>
      </span>

      <div class="p_desc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        maxime provident rerum dolorum, quia accusantium cupiditate natus
        doloribus similique ullam voluptates omnis voluptatibus libero nulla
        totam recusandae corrupti laudantium exercitationem!
      </div>
    </div>

    <div class="p_imgs">

      <div class="p_main_img">
        <img
          src="/img/circle_border.png"
          alt="circle_border"
          class="circle_border" />
        <div class="p_back_circle" />
        <img src="/img/tshirt.png" alt="product" class="product_img" />
      </div>

      <div class="p_slider">
        <img src="/img/tshirt.png" alt="product" />
        <img src="/img/tshirt.png" alt="product" />
        <img src="/img/tshirt.png" alt="product" />
      </div>

    </div>

    <div class="p_order_details">

      <div class="p_review">
        <span class="title">Review:</span>
        <span class="starts">

          <i class="fas fa-star active" />
          <i class="fas fa-star active" />
          <i class="fas fa-star active" />
          <i class="fas fa-star active" />
          <i class="fas fa-star" />
        </span>
        <span class="rate">4 (75)</span>
      </div>

      <div class="p_colors">
        <span class="title">Colors:</span>
        <span class="colors">
          {#each colors as color}
            <div class="color_border" style="border:0px solid #{color};">
              <div class="color" style="background-color:#{color}" />
            </div>
          {/each}
        </span>
      </div>

      <div class="p_size">
        <span class="title">Size:</span>
        <span class="sizes">
          <div class="size">XS</div>
          <div class="size">S</div>
          <div class="size">M</div>
          <div class="size">L</div>
          <div class="size">XL</div>
          <div class="size">XXL</div>
        </span>
      </div>

      <div class="p_quantity">
        <span class="title">Quantity:</span>
        <input type="number" />
      </div>

      <button type="button">Order Now</button>

    </div>

  </div>
</div>
