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

    .success-container {
        padding: 16px;
        border-radius: 4px;
        background-color: #50C275;
        color: white;
        margin: 12px 0;
        width: 300px;
        text-align: center;
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
    
    .send_btn:active {
        background-color: rgba(var(--AccentColor), 0.8);
    }
   
</style>

<script>
    import {auth} from '../firebase.js'
    import {link} from 'svelte-routing'
    import {onMount} from 'svelte'
    let errorMessage;
    let email;
    let sent = false

    onMount(() => {
        document.title = "Unify - Password Reset"
    })

    const sendRecovery = async () => {
        sent = false
        await auth.sendPasswordResetEmail(email.value)
        .then(() => {
            sent = true
        })
        .catch((error) => {
            errorMessage = error.message
            sent = false
        })
        
    }
</script>
<div class="left_side">
    <a href="/" use:link class="u_logo">
        <img src="./img/logo.png" alt="logo" />Unify
    </a>
    <div class="title">
        Write your email
    </div>
    {#if errorMessage}
        <div class="error-container">
            {errorMessage}
        </div>
    {/if}
    {#if sent}
        <div class="success-container">
            Email Sent
        </div>
    {/if}
    <div class="inputContainer">
        <div on:submit|preventDefault={sendRecovery} class="input">
            <i class="far fa-envelope" />
            <input
                bind:this={email}
                type="text"
                class="verification"
                placeholder="Email"
            />
        </div>
    </div>
    <div class="verification_btns">

        <div class="send"><button on:click={sendRecovery}  class="send_btn">Send</button></div>

        
    </div>

    <div class="circle_top" />
    <div class="circle_bottom" />
</div>