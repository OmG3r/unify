<script>
</script>

<style>
    .signUp_container{
        display: flex;
        flex-direction: row;
        background-color: #eeeeee;
        height: 100vh;
    }
    .left_side{
        width: 40%;
        background-color: rgb(var(--userColor));
        color: white;
        padding: 10px 60px 10px 60px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .u_logo{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        font-weight: 700;
        position: absolute;
        top:10px;
        left: 10px;;
    }
    .left_side .u_logo img{
        width: 50px;
        height:50px;
    }
    .left_side .title{
        font-size: 40px;
        font-weight: 700;
        width: 100%;
        max-width: 400px;
    }
    .left_side .desc{
        margin-top: 20px;
        font-size: 20px;
        font-weight: 600;
        width: 100%;
        max-width: 400px;
    }
    .circle_top,.circle_bottom{
    width: 300px;
    height: 300px;
    border-radius: 50%;
    transform: rotate(-145deg);
    position: absolute;
    }
    .circle_bottom{
        background-color: rgb(var(--AccentColor));
        bottom: -150px;
        left: -150px;
    }
    .circle_top{
        background-color: #273441;
        top: -150px;
        right: -150px;
        width: 400px;
        height: 400px;
    }
    .right_side{
        width: 60%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .right_side .title{
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color:#273441;
    }
    .signupAlternatives{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 25px 0 25px 0;
    }
    .signupAlternatives div{
        width: 200px;
        height: 35px;
        color:white;
        font-size: 15px;
        font-weight: 700;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0 5px 0;
    }
    .googleBtn{
        background-color:#D2504D;
        position: relative;
    }
    .fbBtn{
        background-color: #3B5998;
        position: relative;
    }
    .googleBtn i,.fbBtn i {
       position: absolute;
       left: 15px;
    }
    .orEmailText,.forget{
        color: rgba(var(--userColor),0.4);
        text-align: center;
        margin-bottom: 15px;
        font-size: 13px;
    }
    .forget{
        margin-top: 15px;
        font-weight: 700;
    }
    .inputContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inputContainer i{
        position: absolute;
        padding: 15px; 
        min-width: 40px;
        color:rgba(var(--userColor),0.2);
    }
    .inputContainer input{
        width: 300px; 
        height: 40px;;
        padding: 10px; 
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 8px;
        border: none;
        background-color: #F4F8F7;
        color:rgba(var(--userColor),0.8);
        font-size: 17px;
        font-weight: 600;
    }
    .inputContainer input:focus{
        outline: none !important;
        border-color: #719ECE;
        border: 1px solid rgba(var(--userColor),0.5);;
    }
    .signup_btn{
         background-color: rgba(var(--AccentColor),1);
         border:none;
         width: 200px;
         height: 40px;
         color: white;
         font-size: 18px;
         font-weight: 700;
         border-radius: 30px;
    }
    .signup{
       
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 900px) {
      .left_side,.right_side {
          width: 100%;
      }
      .left_side{
          height: 350px;
          align-items: center;
      }
      .left_side .title,.left_side .desc{
          z-index: 5;
      }
      .signUp_container{
          flex-direction: column;
          height: max-content;
      }
    }

</style>

<div class="container">
    <div class="signUp_container">
        <div class="left_side">
            <div class="u_logo">
                <img src="./img/logo.png" alt="logo" />Unify
            </div>
            <div class="title">Welcom to Our Website</div>
            <div class="desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae maxime provident rerum dolorum,
            </div>
            <div class="circle_top"></div>
            <div class="circle_bottom"></div>
        </div>

        <div class="right_side" >
            <div class="title">Sign up to Unify</div>
            <div class="signupAlternatives">
                <div class="googleBtn"><i class="fab fa-google-plus-g"></i><div class="text">Google</div> </div>
                <div class="fbBtn"><i class="fab fa-facebook-f"></i> <div class="text">Facebook</div> </div>
            </div>
            <div class="orEmailText">Or sign up using your email</div>
            <div class="inputContainer">
                <div class="input">
                    <i class="fas fa-user"></i>
                <input type="text" class="name" placeholder="Name">
                </div>
                <div class="input">
                    <i class="fas fa-phone"></i>
                <input type="phone" class="phone" placeholder="Phone Number">
                </div>
                <div class="input">
                    <i class="fas fa-envelope"></i>
                <input type="email" class="email" placeholder="Email">
                </div>
                
                <div class="input">
                    <i class="fas fa-unlock-alt"></i>
                <input type="password" class="password" placeholder="Password">
                </div>
                <div class="input">
                    <i class="fas fa-unlock-alt"></i>
                <input type="password" class="re_password" placeholder="Confirm password">
                </div>
                
            </div>
            <div class="forget"><a href="#">You already have an account?</a> </div>
            <div class="signup"><button class="signup_btn">Sign up</button></div>
        </div>
    </div>
</div>
