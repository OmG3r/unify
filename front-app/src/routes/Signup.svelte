<script>
</script>

<style>
    .signUp_container{
        display: flex;
        flex-direction: row;
        width: 60%;
        height: 500px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #eeeeee;
        border-radius: 15px;
        margin: auto;
    }
    .left_side{
        width: 40%;
        background-color: rgb(var(--userColor));
        color: white;
        padding: 10px 20px 10px 20px;
        border-radius: 15px 0 0 15px;
    }
    .right_side{
        width: 60%;
    }
    .u_logo{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
    }
    .left_side .u_logo img{
        width: 50px;
        height:50px;
    }
    .left_side .title{
        margin-top: 150px;
        font-size: 25px;
        font-weight: 700;
        width: 60%;
    }
    .left_side .desc{
        margin-top: 20px;
        font-size: 15px;
        font-weight: 600;
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
                <div class="googleBtn"></div>
                <div class="fbBtn"></div>
            </div>
            <div class="orEmailText">Or sign up using your email</div>
            <div class="inputContainer">
                <i class="fas fa-user"></i>
                <input type="text" class="name" placeholder="Name">
                <i class="fas fa-phone"></i>
                <input type="text" class="phone" placeholder="Phone Number">
                <i class="fas fa-envelope"></i>
                <input type="text" class="email" placeholder="Email">
                <i class="fas fa-unlock-alt"></i>
                <input type="text" class="password" placeholder="Password">
                <i class="fas fa-unlock-alt"></i>
                <input type="text" class="re_password" placeholder="Confirm password">
            </div>
            <div class="forget">Forget Your Password?</div>
            <div class="signun"><button class="signun_btn">Sign up</button></div>
        </div>
    </div>
</div>
