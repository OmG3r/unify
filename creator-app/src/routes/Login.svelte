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
    form {
        width: 500px;
        border-radius: 4px;
        margin: auto;
        padding: 30px;
    }

    input.input {
        margin-bottom: 8px;
        width: 100%;
        padding: 14px 8px;
        background-color: #e5e7eb;
        line-height: 1.25;
        height: 50px;
    }
    .separator {
        width: 100%;
        height: 24px;
    }
    .title.is-6 {
        margin-bottom: 8px;
    }
    .title.is-4 {
        text-align: center
    }

    .button.is-primary {
        width: 100%;
    }

</style>


<script>
    import {user} from '../firebase.js'
    import {onDestroy} from 'svelte'
    import { navigate } from "svelte-routing";
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
    let doSubmit = async () => {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            errorMessage = error.message;
            // ...
        });
    }

</script>
{#if verified}
    <div class="u-view">
        <div class="u-banner">
            <div class="logo">
                UNIFY
            </div>

        </div>
        <div class="u-form-area">
            <form on:submit|preventDefault={doSubmit}>
                <h3 class="title is-4">Unify - Log in</h3>
                {#if errorMessage}
                    <div class="notification is-danger">
                        {errorMessage}
                    </div>
                {/if}
                <h4 class="title is-6">Username</h4>
                <input bind:value={username} class="input"  name="username" type="text">
                <div class="separator"></div>
                <h4 class="title is-6">Password</h4>
                <input bind:value={password} class="input"  name="password" type="password">
                <div class="separator"></div>
                <button type="submit" class="button is-primary">Login</button>
            </form>

        </div>
    

    </div>
{:else}
    <div class="u-loading">

        <MaterialSpinner height={"100px"} width={"100px"} />

    </div>

{/if}

