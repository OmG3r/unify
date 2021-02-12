<script>
    import {onMount} from 'svelte'
    import {user, auth} from '../firebase.js'
    import MaterialSpinner from  '../comps/misc/MaterialSpinner.svelte'
    import {navigate, link} from 'svelte-routing'

    user.subscribe((v) => {
        if (v == 0) {
            console.log("initng")
        } else if (v == undefined) {
            console.log('no user')
            navigate("/signup")
        }
    })
    let phone
    let code
    let confResInitied = false
    let errorMessage = undefined


    let sendingCode = false;

    onMount(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                (() => {
                    console.log('solved')
                })();
            }
        });
        console.log(location.search)
        let params = new URLSearchParams(location.search)
        console.log(params.get('backurl'))
        document.title = "Unify Creator - Phone Verification"
    })
    const SendCode = async () => {
        if (sendingCode) {
            return
        }
        errorMessage = undefined
        sendingCode = true

        let lphone = phone.value
        console.log(lphone)
        if (!lphone.includes('+216')) {
            lphone = '+216' + lphone
        }


        if ($user && $user.phoneNumber && lphone == $user.phoneNumber) {
            errorMessage = "To update your phone number you need to input an new one"
            sendingCode = false
            return
        }
        console.log(lphone)
        await auth.signInWithPhoneNumber(lphone, window.recaptchaVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            console.log(confirmationResult)
            window.confirmationResult = confirmationResult;
            console.log(window.confirmationResult)
            confResInitied = true
            sendingCode = false
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
            })
            errorMessage = "An error occured while sending SMS please try again"
            sendingCode = false
        });
        sendingCode = false
    }
    let succOperation = false
    const verifyCode = async () => {
        console.log("first")
        let erx = false
        
        var credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code.value)
        console.log("second")
        console.log(credential)
        if ($user) {
            console.log('4')
            try {
                await $user.updatePhoneNumber(credential)
                console.log($user)
                succOperation = true
            } catch (error) {
                console.log(error)
                if (error.code == "auth/invalid-verification-code") {
                    errorMessage = "The code is incorrect, please verify it."
                    succOperation = false
                } else if (error.code == "auth/credential-already-in-use") {
                    errorMessage = "Phone number already in use by another account"
                    succOperation = false
                }
            }
            
            
        }

        let params = new URLSearchParams(location.search)
        if (params.get('backurl') != null) {
            navigate(params.get('backurl'))
        }
        return
        window.confirmationResult.confirm(code.value).then((result) => {
        // User signed in successfully.
        console.log(result)
        const user = result.user;
        // ...
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        if (error.code == "auth/invalid-verification-code") {
            errorMessage = "The code is incorrect, please verify it."
        }
            
        });
    }

    

</script>

<div class="left_side">
    <a use:link href="/" class="u_logo">
        <img src="/imgs/logo.png" alt="logo" />Unify
    </a>
    {#if succOperation == false}
    <div class="title">
        {#if $user && $user.phoneNumber}
            Update your phone number
        {:else}
            Verify your phone number
        {/if}
    </div>
    {#if errorMessage}
        <div class="error-container">
            {errorMessage}
        </div>
    {/if}
    <div class="inputContainer">
        <form on:submit|preventDefault={SendCode} class="input">
            <i class="fas fa-phone" />
            <input
                bind:this={phone}
                type="text"
                class="verification"
                placeholder="Phone Number"
                value={$user && $user.phoneNumber ? $user.phoneNumber : ''}
            />
        </form>
        {#if confResInitied}
            <form on:submit|preventDefault={verifyCode} class="input">
                <i class="fas fa-key" />
                <input
                bind:this={code}
                    type="text"
                    class="verification"
                    placeholder="Verification Code"
                />
            </form>
        {/if}
    </div>
    <div class="verification_btns">
        {#if confResInitied}
            <div class="send"><button on:click={verifyCode}  class="send_btn">Verify</button></div>
        {/if}
        <div class="resend">
            <button on:click={SendCode} id="sign-in-button" class="resend_btn">
                {#if sendingCode}
                    <MaterialSpinner />
                {:else}
                    Send
                {/if}
            </button>
        </div>
    </div>
    {:else}
        <div class="title">
            Success: Phone Updated.
        </div>

    {/if}

    <div class="circle_top" />
    <div class="circle_bottom" />
</div>

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
    .fas.fa-key {
        transform: rotate(270deg);
    }
    .left_side {
        width: 100%;
        height: 100vh;
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
        width: 50px;
        height: 50px;
    }
    .left_side .title {
        font-size: 30px;
        font-weight: 700;
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
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
    .inputContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inputContainer i {
        position: absolute;
        padding: 18px;
        min-width: 50px;
        color: rgba(var(--userColor), 0.2);
        font-size: 25px;
        transform: rotate(90deg);
    }
    .inputContainer input {
        width: 350px;
        height: 50px;
        padding: 10px;
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 8px;
        border: none;
        background-color: #f4f8f7;
        color: rgba(var(--userColor), 0.8);
        font-size: 20px;
        font-weight: 600;
    }
    .inputContainer input:focus {
        outline: none !important;
        border-color: #719ece;
        border: 1px solid rgba(var(--userColor), 0.5);
    }
    .verification_btns {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 15px;
    }
    .verification_btns div button {
        width: 150px;
        height: 35px;
        color: white;
        background-color: rgb(var(--AccentColor));
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        border: none;
        margin: 0 7px 0 7px;
        cursor: pointer;
    }
    button:focus {
        outline: none;
    }
    .resend_btn:active {
        background-color: rgba(255, 255, 255, 0.8) !important;
    }
    .resend_btn {
        background-color: white !important;
        color: rgb(var(--userColor)) !important;
        padding: 4px 0;
    }
    .send_btn:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
</style>
