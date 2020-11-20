<script>
  let colors = ["0e80f6", "d40019", "ffffff", "737372"];
  let show = false;
  let quantity = 1;
  let rotateLeft = false;
  let rotateRight = false;
  let rotating= false;
  let rotate = type => {
    let img = document.querySelector(".p_main_img .product_img");
    if (type == "left") {
      rotateLeft = true;
      img.src = "/img/tshirt.png";
      rotating=true;
    } else {
      rotateRight = true;
      img.src = "/img/hoodie.png";
      rotating=true;
    }

    console.log(rotateLeft, rotateRight);

    setTimeout(() => {
      rotateLeft = false;
      rotateRight = false;
      rotating = false;
    }, 1000);
  };
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
    grid-template-columns: 0.5fr[col] 1fr[col] 1fr [col]1fr [col] 0.5fr[col];
    padding: 0 30px 0 30px;
  }

  .p_info {
    display: flex;
    flex-direction: column;
    margin: 150px 0 0 0;
    grid-column-start: col 1;
  }

  .p_imgs {
    display: flex;
    flex-direction: column;
        grid-column-start: col 2;
  }

  .p_imgs .p_main_img {
    width: 500px;
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
    grid-column-start: col 3;
  }
  .circle_border {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
  .starts i {
    color: #4f595a;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 15px;
    column-gap: 5px;
  }
  .size {
    background-color: #a4a6a9;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    color: white;
    margin: 0 5px 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 700;
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
  .p_order_details > div {
    margin: 15px 0 15px 35px;
  }
  .p_quantity input[type="number"]::-webkit-outer-spin-button,
  .p_quantity input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .p_quantity {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .p_quantity .input_number {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #a6a6a6;
    border-radius: 15px;
    height: 40px;
    width: max-content;
  }
  .input_number .arrow_left,
  .input_number .arrow_right {
    width: 25px;
    fill: #a6a6a6;
    cursor: pointer;
    height: 100%;
  }
  .input_number .arrow_left:active {
    border-radius: 0 14px 14px 0;
    background-color: #0e80f6;
    fill: white;
  }
  .input_number .arrow_right:active {
    border-radius: 0 14px 14px 0;
    background-color: #0e80f6;
    fill: white;
  }
  .input_number .arrow_left {
    transform: rotate(180deg);
  }

  .input_number input[type="number"] {
    width: 80px;
    background-color: transparent;
    height: 100%;
    border: none;
    text-align: center;
    color: #a6a6a6;
    font-size: 20px;
    font-weight: 700;
  }
  .input_number input[type="number"]:focus {
    outline: none;
  }
  .wishlist_btn {
    position: relative;
    cursor: pointer;
  }
  .popuptext {
    visibility: hidden;
    width: 160px;
    height: 35px;
    background-color: #0e80f6;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    bottom: 50%;
    z-index: 1;
    left: 50%;
    margin-left: -80px;
  }
  .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #0e80f6 transparent transparent transparent;
  }

  .show {
    visibility: visible;
    animation: popup 0.5s ease-out;
    transform: translateY(-75%);
  }
  @keyframes popup {
    0% {
      transform: translateY(-50%);
      opacity: 0;
    }
    100% {
      transform: translateY(-75%);
      opacity: 1;
    }
  }

  .wishlist_btn {
    background-color: white;
    color: black;
    border-radius: 50%;
    border: none;
    height: 40px;
    width: 40px;
    margin-left: 15px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wishlist_btn:focus {
    outline: none;
  }
  .add_cart_btn {
    background-color: #0e80f6;
    color: white;
    border-radius: 15px;
    width: 150px;
    height: 40px;
    border: none;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
  }
  .add_cart_btn:focus {
    outline: none;
  }
  .add_cart_btn svg {
    fill: white;
    width: 20px;
    height: 20px;
  }

  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .rotateLeft {
    animation: rotateLeft 1s ease-out;
  }

  @keyframes rotateLeft {
    100% {
      transform: rotate(-360deg);
    }
  }

  .rotateRight {
    animation: rotateRight 1s ease-out;
  }

  @keyframes rotateRight {
    100% {
      transform: rotate(360deg);
    }
  }
  .rotating{
animation: FadeIn 1s ease-out;
  }
  @keyframes FadeIn {
    0%{
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }

  .p_slider .arrow_left{
    transform:rotate(180deg);
  }
  .p_slider .arrow_left,.p_slider .arrow_right{
    fill:#a6a6a6;
    width:25px;
    cursor: pointer
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
          class="circle_border"
          class:rotateLeft
          class:rotateRight />
        <div class="p_back_circle" />
        <img src="/img/tshirt.png" alt="product" class="product_img" class:rotating />
      </div>

      <div class="p_slider">
      <!--Arrow left-->
          <svg
            on:click={() => {
            rotate('left');
          }}
            version="1.1"
            id="Layer_1"
            class="arrow_left"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            style="enable-background:new 0 0 492.004 492.004;"
            xml:space="preserve">
            <path
              d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
          </svg>
        
        <img src="/img/tshirt.png" alt="product" />
        <img src="/img/tshirt.png" alt="product" />
        <img src="/img/tshirt.png" alt="product" />

        <!--Arrow right-->
          <svg
           on:click={() => {
            rotate('right');
          }}
            version="1.1"
            id="Layer_1"
            class="arrow_right"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            style="enable-background:new 0 0 492.004 492.004;"
            xml:space="preserve">
            <path
              d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
          </svg>

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
        <div class="input_number">
          <!--Arrow left-->
          <svg
            on:click={() => {
              quantity <= 1 ? (quantity = 1) : (quantity -= 1);
            }}
            version="1.1"
            id="Layer_1"
            class="arrow_left"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            style="enable-background:new 0 0 492.004 492.004;"
            xml:space="preserve">
            <path
              d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
          </svg>
          <input type="number" value:bind={quantity} value={quantity} />
          <!--Arrow right-->
          <svg
            on:click={() => {
              quantity += 1;
             
            }}
            version="1.1"
            id="Layer_1"
            class="arrow_right"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            style="enable-background:new 0 0 492.004 492.004;"
            xml:space="preserve">
            <path
              d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
          </svg>
        </div>

      </div>

      <div class="btns">
        <button type="button" class="add_cart_btn">
          Add to cart
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
        </button>
        <button
          type="button"
          class="wishlist_btn"
          on:mouseenter={() => {
            show = true;
          }}
          on:mouseleave={() => {
            show = false;
          }}>
          <i class="far fa-heart" />
          <span class="popuptext" class:show id="myPopup">Add to wishlist</span>
        </button>
      </div>

    </div>

  </div>
</div>
