<style>

    .u-loading {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .u-view {
        width: 100%;
        min-height: 100vh;
        display: flex;

        
    }

    .u-banner {
        width: 33.33%;
        min-height: 100%;
        background-color: #21183c;
        display: flex;
    }

    .u-banner .logo  {
        margin: auto;
        color: #7edce2;
        font-size: 64px;
    }

    .u-form-area {
        width: 66.67%;
        min-height: 100%;
        display: flex;
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
    .separator {
        width: 100%;
        height: 24px;
    }
    .title.is-6 {
        margin-bottom: 8px;
    }
    
    .u-section-title {
        font-size: 24px;
        text-align: center;
    }

    
    .u-button {
        padding: 6px 0;
        width: 100%;
    }

    .switch-login-register {
        font-size: 14px;
        text-align: center;
    }
    .switch-login-register a {
        text-decoration: underline;
        color: #378ad3;
    }
    .container{
        width: 100%;
    }
    .have-acc {
        text-align: center;
        margin-bottom: 16px;
        color:rgba(var(--userColor), 0.4);
    }
    .have-acc a {
        text-decoration: underline;
        color: #46b978
    }
    .error-container {
        padding: 16px;
        border-radius: 4px;
        background-color: #ee5353;
        color: white;
        margin: 12px 0;
        width: 300px;
        text-align: center;
    }
    .signUp_container {
        display: flex;
        flex-direction: row;
        background-color: #eeeeee;
        height: 100vh;
    }
    .left_side {
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
    }
    .u_logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        font-weight: 700;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .left_side .u_logo img {
        width: 40px;
        margin-right: 10px;
    }
    .left_side .title {
        font-size: 40px;
        font-weight: 700;
        width: 100%;
        max-width: 400px;
    }
    .left_side .desc {
        margin-top: 20px;
        font-size: 20px;
        font-weight: 600;
        width: 100%;
        max-width: 400px;
    }
    .circle_top,
    .circle_bottom {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        transform: rotate(-145deg);
        position: absolute;
    }
    .circle_bottom {
        background-color: rgb(var(--AccentColor));
        bottom: -150px;
        left: -150px;
    }
    .circle_top {
        background-color: #273441;
        top: -150px;
        right: -150px;
        width: 400px;
        height: 400px;
    }
    .right_side {
        width: 60%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .right_side .title {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color: #273441;
    }
    .signupAlternatives {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 25px 0 25px 0;
    }
    .signupAlternatives div {
        width: 200px;
        height: 35px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0 5px 0;
    }
    .googleBtn {
        background-color: #d2504d;
        position: relative;
        cursor: pointer;
    }
    .fbBtn {
        background-color: #3b5998;
        position: relative;
        cursor: pointer;
    }
    .googleBtn:active{
        background-color: #d2504dc9;
    }
    .fbBtn:active{
        background-color: #3b5998d1;
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
    .orEmailText,
    .forget {
        color: rgba(var(--userColor), 0.4);
        text-align: center;
        margin-bottom: 15px;
        font-size: 13px;
    }
    .forget {
        margin-top: 15px;
        font-weight: 700;
    }
    .inputContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inputContainer img {
        position: absolute;
        padding: 15px;
        max-width: 50px;
         filter: invert(79%) sepia(18%) saturate(40%) hue-rotate(145deg) brightness(98%) contrast(97%);
    }
    .inputContainer input {
        width: 300px;
        height: 40px;
        padding: 10px 10px 10px 36px;
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 8px;
        border: none;
        background-color: #f4f8f7;
        color: rgba(var(--userColor), 0.8);
        font-size: 17px;
        font-weight: 600;
    }
    .inputContainer input:focus {
        outline: none !important;
        border-color: #719ece;
        border: 1px solid rgba(var(--userColor), 0.5);
    }
    .signup_btn {
        background-color: rgba(var(--AccentColor), 1);
        border: none;
        width: 200px;
        height: 40px;
        color: white;
        font-size: 18px;
        font-weight: 700;
        border-radius: 30px;
        cursor: pointer;
    }
    .signup_btn:focus{
        outline: none;
        box-shadow: none;
    }
    .signup_btn:active{
     
        background-color: rgba(var(--AccentColor),0.8);
    }
    .signup {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 900px) {
        .left_side,
        .right_side {
            width: 100%;
        }
        .left_side {
            height: 350px;
            align-items: center;
        }
        .left_side .title,
        .left_side .desc {
            z-index: 5;
        }
        .signUp_container {
            flex-direction: column;
            height: max-content;
        }
    }
</style>


<script>
    import {user,auth, db} from '../firebase.js'
    import {onDestroy} from 'svelte'
    import { navigate, link } from "svelte-routing";
    import {urlPostReq} from '../utils.js'
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
    
    let submitting = false
    let username = ""
    let name=""
    let password = ""
    let re_password =""
    let email = ""
    let errorMessage = ""
    let doSubmit = async () => {
        if (submitting) {
            return
        }
        submitting = true
        if (re_password.value != password.value) {
            errorMessage = "Password and Re-Password are different"
            submitting = false
            return
        }
        /*
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            db.doc("/creators/" + username).set({
                username,
                email
            })
        })
        */
        //http://localhost:3001
        //https://api.unify.tn/.netlify/functions/express/createCreator
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' ,                                                                                              
            "Access-Control-Origin": "*"
        }
        let resp = await urlPostReq('http://localhost:3001/createCreator', {
            email: email.value,
            password: password.value,
            username: username.value,
            persoName: name.value
        })

        let data = await resp.json()
        console.log(data)
        if (data.success == false) {
            errorMessage = data.error.message
        } else {
            auth.signInWithCustomToken(data.authToken)
        }
        submitting = false
        return
        
    }

</script>
{#if verified}
<!--
    <div class="u-view">
        <div class="u-banner">
            <div class="logo">
                UNIFY
            </div>

        </div>
        <div class="u-form-area">
            <form on:submit|preventDefault={doSubmit}>
                <h3 class="u-section-title">Unify - Register</h3>
                <p class="switch-login-register">
                    <span>Existing User ?</span>
                    <a use:link href="/register">Login here</a>
                </p>
                {#if errorMessage}
                    <div class="notification is-danger">
                        {errorMessage}
                    </div>
                {/if}
                <div class="input-container">
                    <h4 class="title is-6">Email</h4>
                    <input bind:value={email} class="input"  name="email" type="text">
                </div>

                <div class="separator"></div>

                <div class="input-container">
                    <h4 class="title is-6">Username</h4>
                    <input bind:value={username} class="input"  name="username" type="text">
                </div>

                <div class="separator"></div>

                <div class="input-container">
                    <h4 class="title is-6">Password</h4>
                    <input bind:value={password} class="input"  name="password" type="password">
                </div>
                
                
                <div class="separator"></div>
                <button type="submit" class="u-button">Register</button>
            </form>

        </div>
    

    </div>
-->


<div class="container">
    <div class="signUp_container">
        <div class="left_side">
            <a href="/" use:link class="u_logo">
                <img src="imgs/icons/logo_transaprent.png" alt="logo" />Unify
            </a>
            <div class="title">Dear creator,</div>
            <div class="desc">
                Are you ready to develop your merchandise platform? Start NOW.
            </div>
            <div class="circle_top" />
            <div class="circle_bottom" />
        </div>

        <div class="right_side">

            <div class="title">Sign up to Unify</div>
            <!--
            <div class="signupAlternatives">
                <div class="googleBtn">
                    <img src="/imgs/misc/google.png" alt="google">
                    <div class="text">Google</div>
                </div>
                <div class="fbBtn">
                    <img src="/imgs/misc/fb.png" alt="fb">
                    <div class="text">Facebook</div>
                </div>
            </div>
            -->
            <div class="orEmailText">sign up using your email</div>
            <div class="have-acc">Aready have an account ? <a use:link href="/login">Sign in here</a></div>
            <form on:submit|preventDefault={doSubmit} class="inputContainer">
                {#if errorMessage}
                    <div class="error-container">
                        {errorMessage}
                    </div>
                {/if}
                <div class="input">
                    <img src="/imgs/misc/login_register/name.png" alt="name">
                    <input required bind:this={name} type="text" class="name" placeholder="Full Name" />
                </div>
                <div class="input">
                    <img src="/imgs/misc/login_register/envelope.png" alt="email">
                    <input required bind:this={email} type="email" class="email" placeholder="Email" />
                </div>
                <!--                <div class="input">
                    <i class="fas fa-phone" />
                    <input
                        required bind:this={form.phone}
                        type="phone"
                        class="phone"
                        placeholder="Phone Number"
                    />
                </div>
                -->

                <div class="input">
                    <img src="/imgs/misc/login_register/user.png" alt="email">
                    <input required bind:this={username} type="text" class="username" placeholder="Username" />
                </div>

                <div class="input">
                    <img src="/imgs/misc/login_register/unlock.png" alt="email">
                    <input
                        required bind:this={password}
                        type="password"
                        class="password"
                        placeholder="Password"
                    />
                </div>
                <div class="input">
                    <img src="/imgs/misc/login_register/unlock.png" alt="email">
                    <input
                        required bind:this={re_password}
                        type="password"
                        class="re_password"
                        placeholder="Confirm password"
                    />
                </div>
                <div class="forget">
                    <a href="/signin">You already have an account?</a>
                </div>
                <div class="signup">
                    <button type="submit" class="signup_btn">
                        {#if submitting}
                            <MaterialSpinner />
                        {:else}
                            Register
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
{:else}
    <div class="u-loading">

        <MaterialSpinner height={"100px"} width={"100px"} />

    </div>

{/if}

