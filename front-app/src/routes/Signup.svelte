<script>
    import {auth, user} from '../firebase.js'
    import {navigate, link} from 'svelte-routing'
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    import SignInProviders from '../components/misc/SigninProviders.svelte'
    import {onMount, onDestroy} from 'svelte'
import { lang } from '../store.js';
    let unsubscribeUser = () => {} ;
    let backurl = "";
    let params
    onMount(() => {
        document.title = "Unify - Signup"
        params = new URLSearchParams(location.search)
        backurl = params.get('backurl') || ''
        unsubscribeUser = user.subscribe((v) => {
            if (v == 0) {
                console.log("uninited")
            } else if (v) {
                if (params.get('backurl') != null) {
                    navigate(params.get('backurl'), {replace:true} )
                } else {
                    navigate("/myaccount", {replace:true} )
                }
            }
        })
    })

    onDestroy(() => {
        unsubscribeUser()
    })

    let sub = false
    const doSubmit = async () => {
        sub = true
        errorMessage = undefined
        let lform = Object.fromEntries(Object.entries(form).map(([key, el]) => [key, el.value]))
        if (lform.repassword != lform.password) {
            errorMessage = "Passwords do not match"
            sub = false
            return
        }

        await auth.createUserWithEmailAndPassword(lform.email, lform.password)
        .then(async (result) => {
            console.log(result.user)
            await result.user.updateProfile({
                displayName: lform.name
            })
             let params = new URLSearchParams(location.search)
           
            setTimeout(() => {
                if (params.get('backurl')) {
                    navigate('/phoneverification?backurl='+params.get('backurl'),{replace:true})
                } else {
                    navigate('/phoneverification', {replace:true})
                }
                
                sub = false
            },300)
           
        })
        .catch((error) => {
            errorMessage = error.message
            sub = false
        })
        sub = false
    };
    const form = {}
    let errorMessage = undefined
</script>

<div class="container">
    <div class="signUp_container">
        <div class="left_side">
            <a href="/" use:link class="u_logo">
                <img src="./img/logo.png" alt="logo" />Unify
            </a>
            <div class="title">Did you know ?</div>
            <div class="desc">
                When you buy a merch of a creator , you're supporting a dream
            </div>
            <!-- <div class="circle_top" />
            <div class="circle_bottom" /> -->
        </div>

        <div class="right_side">
            <div class="title">{{
            en: 'Sign up to Unify',
            fr: 'Inscrivez-vous à Unify'
            }[$lang]}</div>
            <SignInProviders bind:errorMessage />
            <div class="orEmailText">{{
            en: 'Or sign up using your email',
            fr: 'Ou inscrivez-vous en utilisant votre email'
            }[$lang]}</div>
            <div class="have-acc">{{
            en: 'Already have an account ? ',
            fr: 'Vous avez déjà un compte? '
            }[$lang]}<a use:link href={"/signin" + (backurl ? ("?backurl=" + backurl) : "" )}>
            {{
            en: 'Sign in here ',
            fr: 'Se connecter ici'
            }[$lang]}
            </a></div>
            <form on:submit|preventDefault={doSubmit} class="inputContainer">
                {#if errorMessage}
                    <div class="error-container">
                        {errorMessage}
                    </div>
                {/if}
                <div class="input">
                    <i class="fas fa-user" />
                    <input required bind:this={form.name} type="text" class="name" 
                    placeholder="{{
                            en: 'Name',
                            fr: 'Nom'
                        }[$lang]}" />
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
                    <i class="fas fa-envelope" />
                    <input required bind:this={form.email} type="email" class="email" 
                    placeholder="{{
                        en: 'Email',
                        fr: 'Email'
                        }[$lang]}" />
                </div>

                <div class="input">
                    <i class="fas fa-unlock-alt" />
                    <input
                        required bind:this={form.password}
                        type="password"
                        class="password"
                        placeholder="{{
                        en: 'Password',
                        fr: 'Mot de passe'
                        }[$lang]}"
                    />
                </div>
                <div class="input">
                    <i class="fas fa-unlock-alt" />
                    <input
                        required bind:this={form.repassword}
                        type="password"
                        class="re_password"
                        placeholder="{{
                            en: 'Confirm Password',
                            fr: 'Confirmez le mot de passe'
                        }[$lang]}"
                    />
                </div>
                
                <div class="signup">
                    <button type="submit" class="signup_btn">
                        {#if sub}
                            <MaterialSpinner />
                        {:else}
                            {{
                            en: 'Sign Up',
                            fr: "S'inscrire"
                            }[$lang]}
                            
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
  
    .have-acc {
        text-align: center;
        margin-bottom: 16px;
    }
    .have-acc a {
        text-decoration: underline;
        color: #1aa3e9
    }
    .error-container {
        padding: 16px;
        border-radius: 4px;
        background-color: #ee5353;
        color: white;
        margin: 12px 0;
        width: 300px;
        max-width: 80vw;
        text-align: center;
    }
    .signUp_container {
        display: flex;
        flex-direction: row;
        background-color: #eeeeee;
        min-height: 100vh;
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
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        background-image: url("/img/back_mobile.png");
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
        width: 50px;
        height: 50px;
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
        background-color:  #46b978;
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
    .inputContainer i {
        position: absolute;
        padding: 15px;
        min-width: 40px;
        color: rgba(var(--userColor), 0.2);
    }
    .inputContainer input {
        width: 300px;
        height: 40px;
        padding: 10px;
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
        background-color:  #46b978;
        border: none;
        width: 200px;
        height: 40px;
        padding: 4px 0;
        color: white;
        font-size: 18px;
        font-weight: 700;
        border-radius: 30px;
        cursor: pointer;
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
        }
    }
</style>
