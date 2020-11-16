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
  }

  .p_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    justify-content: center;
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
      <span class="p_title">
        T-Shirt
        <span class="p_price">50 TND</span>
      </span>
      <span class="p_subTitle">Best T-shirts quality</span>
      <hr />
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
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
        </span>
        <span class="rate">4 (75)</span>
      </div>

      <div class="p_colors">
        <span class="title">Colors:</span>
        <span class="colors">
          <span class="color" />
          <span class="color" />
          <span class="color" />
          <span class="color" />
          <span class="color" />
        </span>
      </div>

      <div class="p_size">
        <span class="title">Size:</span>
        <span class="sizes">
          <span class="size">XS</span>
          <span class="size">S</span>
          <span class="size">M</span>
          <span class="size">L</span>
          <span class="size">XL</span>
          <span class="size">XXL</span>
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
