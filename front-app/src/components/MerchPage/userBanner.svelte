<style>
  .container {
    display: grid;
    grid-template-columns: 20% 80%;
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1c1c1c;
  }
  .userInfo img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
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
  }

  .banner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 400px;
    background: linear-gradient(
        to bottom,
        rgba(35, 36, 38, 0.8) 0,
        rgba(35, 36, 38, 0.8) 100%
      ),
      url(../img/banner.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
  }

  .TextInfo {
    width: 75%;
    margin-left: 70px;
    margin-top: 50px;
  }
  .title {
    font-size: 45px;
    color: white;
  }
  .sub_title {
    font-size: 40px;
    color: #505c61;
  }
  .title,
  .sub_title {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .sub_title span {
    color: #0e80f6;
  }
  .shoping_btn {
    background-color: #0e80f6;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    padding: 12px 25px 12px 25px;
    margin-top: 40px;
    cursor: pointer;
    width: 180px;
  }
  .merch svg {
    fill: white;
    width: 40px;
    height: fit-content;
  }

  .merch img {
    width: 30%;
  }
  .arrow_left {
    transform: rotate(180deg);
  }
  .arrow_left,
  .arrow_right {
    cursor: pointer;
  }
  .merch {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-right: 80px;
    width: 100%;
  }
  .product {
    width: fit-content;
  }
  .product img {
    width: 40%;
    margin-left: 50%;
    transform: translateX(-50%);
    -webkit-filter: drop-shadow(5px 5px 15px #222);
    filter: drop-shadow(5px 5px 15px #222);
  }
  @media only screen and (max-width: 1180px) {
    .container {
      grid-template-columns: none;
    }
    .product img {
      width: 60%;
    }
    .userInfo{
        padding-top: 50px;
        padding-bottom: 50px;
    }
  }
  @media only screen and (max-width: 800px) {
    .merch {
      display: none;
    }
    .TextInfo {
      width: 100%;
      margin-left: 70px;
      margin-top: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<div class="container">

  <!--left Side User info-->
  <div class="userInfo">
    <img src="../img/ti3leh.jpg" alt="userLogo" />

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
  <!--right Side User Banner-->
  <div class="banner">
    <div class="TextInfo">
      <h1 class="title">Online Store</h1>
      <h2 class="sub_title">
        Create Your
        <span>Store Now</span>
      </h2>

      <button type="button" class="shoping_btn">Start Shopping</button>
    </div>
    <div class="merch">

      <!--Arrow left-->
      <svg
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

      <!--Product image-->
      <div class="product">
        <img src="/img/tshirt.png" alt="Product" />
      </div>

      <!--Arrow right-->
      <svg
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

</div>
