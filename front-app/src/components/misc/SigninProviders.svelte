<style>
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
        padding : 4px 0;
    }
    .fbBtn{
        background-color: #3B5998;
        position: relative;
        cursor: pointer;
        padding : 4px 0;
    }
    .googleBtn i,.fbBtn i {
       position: absolute;
       left: 15px;
    }
</style>

<script>
    import {auth} from '../../firebase.js'
    import MaterialSpinner from './MaterialSpinner.svelte'
    export let errorMessage
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




<div class="signupAlternatives">
  <div on:click={googleSignIn} class="googleBtn">
    <i class="fab fa-google-plus-g" />
    <div class="text">
        {#if subgoogle}
            <MaterialSpinner />
        {:else}
            Google
        {/if}
    </div>
  </div>
  <div on:click={facebookSignIn} class="fbBtn">
    <i class="fab fa-facebook-f" />
    <div class="text">
        {#if subfb}
            <MaterialSpinner />
        {:else}
            Facebook
        {/if}
    </div>
  </div>
</div>
