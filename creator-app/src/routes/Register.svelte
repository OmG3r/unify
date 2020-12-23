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
</style>


<script>
    import {user, db} from '../firebase.js'
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
    let email = ""
    let errorMessage = ""
    let doSubmit = async () => {

        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            db.doc("/creators/" + username).set({
                username,
                email
            })
        })
        
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
                    <input bind:value={email} class="input"  name="username" type="text">
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
{:else}
    <div class="u-loading">

        <MaterialSpinner height={"100px"} width={"100px"} />

    </div>

{/if}

