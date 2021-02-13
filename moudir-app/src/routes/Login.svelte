<style>

    .u-view {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--PrimaryBlack);
        position: relative;
        overflow: hidden;
    }
    .login-form {
        display: block;
        padding: 24px;
        border-radius: 4px;
        background-color: white;
        width: 100%;
        max-width: 350px;

    }

    .title {
        text-align: center;
    }

    .circle-bottom {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        transform: rotate(-145deg);
        position: absolute;
        background-color: var(--AccentColor);
        bottom: -150px;
        left: -150px;
    }
    .upper-circle {
        background-color: #273441;
        top: -150px;
        right: -150px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        transform: rotate(-145deg);
        position: absolute;
        background-color: var(--SecondaryBlack);
    }
    .u-input-container {
        margin-bottom: 8px;
    }
    .u-input-container input {
        outline: none;
        width: 100%;
        height: 40px;
        padding: 10px;
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 8px;
        border: 1px solid var(--PrimaryBlack);
        background-color: #f4f8f7;
        color: #4f83bb;
        font-size: 20px;
        font-weight: 600;
    }
    .u-input-container div {
        margin-bottom: 4px;
    }


    .submit {
        width: 50%;
        background-color: var(--AccentColor);
        text-align: center;
        color: white;
        border: none;
        padding: 8px;
        margin: auto;
        display: block;
        border-radius: 4px;
        height: 40px;
        outline: none;
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
    }
</style>
<script>
    import {auth, user} from '../firebase.js'
    import MaterialSpinner from '../comps/misc/MaterialSpinner.svelte'
    import {onDestroy} from 'svelte'
    import {navigate} from 'svelte-routing'
    let unsubscribeUser = user.subscribe((v) => {
        if (v == 0) {
            
        } else if (v == undefined) {

        } else {
            navigate('/', {replace: true}) 
        }
    })

    onDestroy(() => {
        unsubscribeUser()
    })

    let email;
    let password
    let errorMessage = ""
    let submitting = false;
    const doLogin = async () => {
        if (submitting) {
            return
        }
        submitting = true
        await auth.signInWithEmailAndPassword(email.value, password.value).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            errorMessage = error.message;
            // ...
            submitting = false
        });
        submitting = false
    }
</script>

<div class="u-view">
    <form class="login-form" on:submit|preventDefault={doLogin}>
        <h2 class="title">Unify Moudir</h2>
        {#if errorMessage}
            <div class="notification is-danger">
                {errorMessage}
            </div>
        {/if}
        <div class="u-input-container">
            <div>Email</div>
            <input bind:this={email} type="email">
        </div>
        <div class="u-input-container">
            <div>Password</div>
            <input bind:this={password} type="password">
        </div>
        <button class="submit" type="submit">
            {#if submitting}
                <MaterialSpinner />
            {:else}
                Login
            {/if}
        </button>
    </form>
    <div class="upper-circle"></div>
    <div class="circle-bottom"></div>
</div>