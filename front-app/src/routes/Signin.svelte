<script>
    import {link, navigate} from 'svelte-routing'
    import {auth, user} from '../firebase.js'
    import {onMount, onDestroy} from 'svelte'
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    import SignInProviders from '../components/misc/SigninProviders.svelte'
    let unsubscribeUser = () => {} ;
    let sub = false
    onMount(() => {
        document.title = "Unify - Signin"
        unsubscribeUser = user.subscribe((v) => {
            if (v == 0) {
                console.log("uninited")
            } else if (v) {
                navigate("/")
            }
        })
    })

    onDestroy(() => {
        unsubscribeUser()
    })

    const doSubmit = async () => {
        if (sub) {
            return
        }
        sub = true
        let lform = Object.fromEntries(Object.entries(form).map(([key, el]) => [key, el.value]))
        await firebase.auth().signInWithEmailAndPassword(lform.email, lform.password)
        .then((user) => {
            sub = false
        })
        .catch((error) => {

            errorMessage = error.message;
            sub = false
        });
        sub = false
    }

    const form = {}
    let errorMessage = undefined

    
    

    let subgoogle = false
    const googleSignIn = async () => {
        if (subgoogle) {
            return
        }

        subgoogle = true
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth
        .signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
        subgoogle = false
    }
    let subfb = false
    const facebookSignIn = async () => {
        if (subfb) {
            return
        }
        subfb = true
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        await auth
        .signInWithPopup(facebookProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
        subfb = false
    }
</script>

<style>
  
    .error-container {
        padding: 16px;
        border-radius: 4px;
        background-color: #ee5353;
        color: white;
        margin: 12px 0;
        width: 300px;
        text-align: center;
    }
    .no-have-acc {
        text-align: center;
        margin-bottom: 16px;
    }
    .no-have-acc a {
        text-decoration: underline;
        color: #1aa3e9
    }
    .signUp_container{
        display: flex;
        flex-direction: row;
        background-color: #eeeeee;
        min-height: 100vh;
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
        background-image: url("/img/back_mobile.png");
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
        background-color: #46b978;
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
         background-color:  #46b978;
         border:none;
         width: 200px;
         height: 40px;
         color: white;
         font-size: 18px;
         font-weight: 700;
         border-radius: 30px;
         cursor: pointer;
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
      }
    }

</style>

<div class="container">
    <div class="signUp_container">
        <div class="left_side">
            <a use:link href="/" class="u_logo">
                <img src="./img/logo.png" alt="logo" />Unify
            </a>
            <div class="title">Welcom Back To Our Website</div>
            <div class="desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae maxime provident rerum dolorum,
            </div>
           <!--  <div class="circle_top"></div>
            <div class="circle_bottom"></div> -->
        </div>

        <div class="right_side" >
            <div class="title">Sign in to Unify</div>
            <SignInProviders bind:errorMessage />
            <div class="orEmailText">Or use your email account</div>
            <div class="no-have-acc">Don't have an account ? <a use:link href="/signup">Sign up here</a></div>
            <form on:submit|preventDefault={doSubmit} class="inputContainer">
               {#if errorMessage}
                    <div class="error-container">
                        {errorMessage}
                    </div>
                {/if}
                <div class="input">
                    <i class="fas fa-envelope"></i>
                <input bind:this={form.email} type="email" class="email" placeholder="Email">
                </div>
               
                <div class="input">
                    <i class="fas fa-unlock-alt"></i>
                <input bind:this={form.password} type="password" class="password" placeholder="Password">
                </div>
                
                <div class="forget"><a use:link href="/forgotpassword">Forget Your Password?</a> </div>
                <div class="signup">
                    <button type="submit" class="signup_btn">
                        {#if sub}
                            <MaterialSpinner />
                        {:else}
                            Sign in
                        {/if}
                    </button>
                </div>
                
                
                
                
            </form>
            
        </div>
    </div>
</div>
