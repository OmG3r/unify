<style>
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
    .success-container {
        padding: 16px;
        border-radius: 4px;
        background-color: #50C275;
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
        z-index: 2;
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
        z-index: 2;
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
   
    .send_btn:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
    .send_btn {
        padding: 8px 0;
    }
    .u-center-area {
        width: 100%;

        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p {
        margin: 4px 0;
    }
</style>

<script>
    import {auth, user} from '../firebase.js'
    import {onMount, onDestroy} from 'svelte'
    import {navigate, link} from 'svelte-routing'
    import MaterialSpinner from '../components/misc/MaterialSpinner.svelte'
    import {getBackurl} from '../utils.js'
    let unsubscribeUser = () => {};
    onMount(() => {
        document.title = "Unify - Email Verification"
        unsubscribeUser = user.subscribe((v) => {
            if (v === 0) {
                return
            
            
            } else if (v === undefined) {
                navigate("/signin")
            } else if ($user.emailVerified) {
                let params = new URLSearchParams(location.search)
                if (params.get('backurl') != null) {
                    navigate(params.get('backurl'))
                }else{
                    navigate("/")
                }
            }
        })

        
    })

    onDestroy(() => {
        unsubscribeUser()
    })

    let errorMessage
    let sent = false
    let submitting = false
    const sendEmail = async () => {
        if (submitting) {
            return
        }
        submitting = true
        errorMessage = ""
        if ($user) {
            let params = new URLSearchParams(location.search)
            let obj = {
                url: "https://unify.tn" + getBackurl()
            }
            console.log("sending email")
            await $user.sendEmailVerification(obj).then(function() {
                sent = true
                console.log("sent")
            }).catch(function(error) {
                sent = false
                errorMessage = error.message
                console.log(error)
                console.log("failed")
            // An error happened.
            });
        }
        submitting = false
    }

</script>



{#if $user === 0 || $user ===undefined}

    <div class="u-center-area">
        <MaterialSpinner width="75px" height="75px" />

    </div>

{:else if $user && $user.emailVerified == false}
<div class="left_side">
    <a href="/" use:link class="u_logo">
        <img src="./img/logo.png" alt="logo" />Unify
    </a>
    <div class="title">
        Send email verification link.
    </div>
    {#if errorMessage}
        <div class="error-container">
            {errorMessage}
        </div>
    {/if}
    {#if sent}
        <div class="success-container">
            <p>Check your email: {$user.email}.</p>
            <p><b>Check your junk emails</b></p>
            <p>You can safely close this tab</p>
        </div>
    {/if}

    <div class="verification_btns">

        <div class="send">
            <button on:click={sendEmail}  class="send_btn">
                {#if submitting}
                    <MaterialSpinner />
                {:else}
                    Send
                {/if}
            </button>
        </div>

        
    </div>

    <div class="circle_top" />
    <div class="circle_bottom" />
</div>
{/if}