<style>

    .u-loading {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input.input {
        margin-bottom: 8px;
        width: 100%;
        padding: 8px 8px;
        background-color: #e5e7eb;
        line-height: 1.25;
        height: 45px;
        border: 1px solid grey;
        border-radius: 2px;
    }
    
    /*******************/
     :global(:root) {
        --navBarHeight: 70px;
        --headerHeight: 400px;
        --userColor: 24, 29, 34; /*its an RGB code color*/
        --AccentColor: 70, 185, 120;
    }
      .no-have-acc {
        text-align: center;
        margin-bottom: 16px;
        color:rgba(var(--userColor), 0.4);
    }
    .no-have-acc a {
        text-decoration: underline;
        color:#46b978
    }
    .signUp_container{
        display: flex;
        flex-direction: row;
        background-color: #eeeeee;
        min-height: 100vh;
    }
    .container{
        width: 100%;
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
        align-items: center;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        background-image: url("/imgs/back_mobile.png");
        text-align: center;
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
        width: 40px;
        margin-right: 10px;
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
        cursor: pointer;
    }
    .googleBtn:active{
        background-color: #d2504dc9;
    }
    .fbBtn:active{
        background-color: #3b5998d1;
    }
    .fbBtn{
        background-color: #3B5998;
        position: relative;
        cursor: pointer;
    }
    .googleBtn img {
       position: absolute;
       left: 15px;
       width: 25px;
       filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }
    .fbBtn img{
        position: absolute;
        left: 15px;
        width: 18px;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
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
    .inputContainer img{
        z-index: 2;
        position: absolute;
        padding: 15px; 
        max-width: 50px;
        filter: invert(79%) sepia(18%) saturate(40%) hue-rotate(145deg) brightness(98%) contrast(97%);
    }
    .inputContainer input{
        width: 300px; 
        height: 40px;;
        padding: 10px 10px 10px 36px;
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
         cursor: pointer;
         padding: 8px 0;
    }
    .signup_btn:focus{
        outline: none;
        box-shadow: none;
    }
    .signup_btn:active{
     
        background-color: rgba(var(--AccentColor),0.8);
    }
    .input {
        position: relative;
    }
    .signup{
       
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .notification.is-danger{
        background-color:#D2504D;
        width: max-content;
        padding: 0 15px 0 15px;
        height: 50px;
        color :white;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        max-width: 80vw;
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
      }
    }
</style>


<script>
    import {user} from '../firebase.js'
    import {onDestroy} from 'svelte'
    import { navigate, link } from "svelte-routing";
    import MaterialSpinner from '../comps/MaterialSpinner.svelte'
    let verified

    const unsubscribe = user.subscribe((value) => {
        if (value == "init") {
            return
        }
        
        if (value != 0) {
            navigate("/", { replace: false });
        }

        if (value == 0) {
            verified = true
        }
        
       
    })

    onDestroy(() => {
        unsubscribe()
    })
    

    let username = ""
    let password = ""

    let errorMessage = ""
    let submitting = false
    let doSubmit = async () => {
        if (submitting) {
            return
        }
        submitting = true
        await firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            errorMessage = error.message;
            // ...
        });
        submitting = false
    }

</script>
{#if verified}


    <div class="container">
    <div class="signUp_container">
        <div class="left_side">
            <a use:link href="/" class="u_logo">
                <img src="./imgs/icons/logo_transaprent.png" alt="logo" />Unify
            </a>
            <div class="title">Welcome Back 😀</div>
            <div class="desc">
                Your universe is waiting for you
            </div>
            <!-- <div class="circle_top"></div>
            <div class="circle_bottom"></div> -->
        </div>

        <div class="right_side" >
            <div class="title">Sign in to Unify</div>
            <!--
            <div class="signupAlternatives">
                <div class="googleBtn"><img src="/imgs/misc/google.png" alt="google"><div class="text">Google</div> </div>
                <div class="fbBtn"><img src="/imgs/misc/fb.png" alt="fb"> <div class="text">Facebook</div> </div>
            </div>
            -->
            <div class="orEmailText">use your email account</div>
            <div class="no-have-acc">Don't have an account ? <a use:link href="/register">Sign up here</a></div>
            <form on:submit|preventDefault={doSubmit}>
                 {#if errorMessage}
                    <div class="notification is-danger">
                        {errorMessage}
                    </div>
                {/if}
            <div class="inputContainer">
                    <div class="input">
                        <img src="/imgs/misc/login_register/envelope.png" alt="email">
                    <input bind:value={username} class="input email"  name="email" type="text" placeholder="Email">
                    </div>
                
                    <div class="input">
                        <img src="/imgs/misc/login_register/unlock.png" alt="password">
                        <input bind:value={password} class="input password"  name="password" type="password" placeholder="Password">
                    </div>
                
            </div>
            <div class="forget"><a use:link href="/forgotpassword">Forget Your Password?</a> </div>
            <div class="signup"><button class="signup_btn" type="submit">
                {#if submitting}
                    <MaterialSpinner />
                {:else}
                    Submit
                {/if}

            </button></div>
            </form>
        </div>
    </div>
</div>
{:else}
    <div class="u-loading">

        <MaterialSpinner height={"100px"} width={"100px"} />

    </div>

{/if}




