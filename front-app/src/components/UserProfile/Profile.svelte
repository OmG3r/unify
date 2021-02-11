<script>
    import {user, db} from '../../firebase.js'
    import {notification} from '../../utils.js'
    import {lang} from '../../store.js'
    import {onMount, onDestroy} from 'svelte'
    import MaterialSpinner from '../misc/MaterialSpinner.svelte'
    let varname = "";
    let varbirth = "";
    let providers = []
    user.subscribe((v) => {
        if (v == 0 || v == undefined) {
            return
        }
        providers = v.providerData.map((item) => item.providerId)

    })

    const doUpdate = async () => {
        let updated = false
        if (varname.value != $user.displayName) {
            await $user.updateProfile({
                displayName: varname.value
            })
            
            $user = $user
            updated = true
        }
        if ($user?.docData?.birthdate == undefined || $user?.docData?.birthdate != varbirth.value) {
            await db.collection('users').doc($user.uid).set({birthdate: varbirth.value}, {merge:true})
            $user  = {
                ...$user,
                docData: {
                    ...$user.docData,
                    birthdate: varbirth.value
                }
            }
            updated = true
        }

        if (updated) {
            notification.set({
                accentColor: 'success',
                title: 'Success',
                content: 'Profile Updated'
            })
        }
    }

    let handlingGoogle = false
    const handleGoogle = async () => {
        if (handlingGoogle) {
            return
        }
        handlingGoogle = true
   
        if (providers.includes('google.com')) {
            await $user.unlink('google.com')
            providers = providers.filter((item) => item != "google.com")
            console.log(providers)
        } else {
            let provider = new firebase.auth.GoogleAuthProvider();
            await $user.linkWithPopup(provider).then(function(result) {
                // Accounts successfully linked.
                var credential = result.credential;
                var user = result.user;
                console.log(result)
                providers = [...providers, 'google.com']
            }).catch(function(error) {
                console.log(error)
            });
        }
        handlingGoogle = false
    }
    let handlingFacebook = false
    const handleFacebook = async () => {
        if ( handlingFacebook ) {
            return
        }
        handlingFacebook  = true
        
        if (providers.includes('facebook.com')) {
            await $user.unlink('facebook.com')
            providers = providers.filter((item) => item != "facebook.com")
            console.log(providers)
        } else {
            let provider = new firebase.auth.FacebookAuthProvider();
            await $user.linkWithPopup(provider).then(function(result) {
                // Accounts successfully linked.
                var credential = result.credential;
                var user = result.user;
                console.log(result)
                providers = [...providers, 'facebook.com']
            }).catch(function(error) {
                console.log(error)
                
                // Handle Errors here.
                // ...
            });
        }  
         handlingFacebook  = false
    }
    let newPassvar
    let renewPassvar
    let oldPassvar
    const doPassword = async () => {
        if (newPassvar.value != renewPassvar.value) {
            notification.set({
                accentColor: 'alert',
                title: 'Alert',
                content: 'Password do not match'
            })
            return
        }

        await $user.updatePassword(newPassvar.value).then(function() {
        // Update successful.
        }).catch(async function(error) {
        // An error happened.
            if (error.code == "auth/requires-recent-login") {

                
                var credentials = firebase.auth.EmailAuthProvider.credential(
                    $user.email,
                    oldPassvar.value
                );
                await $user.reauthenticateWithCredential(credentials);
                await $user.updatePassword(newPassvar.value)
            }
        });
        notification.set({
            accentColor: 'success',
            title: 'Success',
            content: 'Password Updated'
        })
    }
</script>

<style>
    .profile_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        align-items: center;
    }
    .user_data {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .account_data,
    .personal_data,
    .pwd_change {
        display: flex;
        flex-direction: column;
        margin: 20px 20px 20px 20px;
        align-items: center;
    }
    .account_data .title,
    .personal_data .title,
    .pwd_change .title {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
    }
    .input {
        position: relative;
        margin: 15px 0 15px 0;
    }
    .input input {
        width: 300px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #b9bbbc;
        padding-left: 15px;
        font-size: 15px;
        font-weight: 600;
    }
    .input .title {
        font-size: 18px;
        font-weight: 600;
        position: absolute;
        top: -12px;
        left: 30px;
        color: #46c092;
        background-color: white;
        padding: 0 5px 0 5px;
        height: 13px;
    }
    input:focus,
    button:focus {
        outline: none;
    }
    .save_btn {
        width: 50%;
        background-color: #46b978;
        height: 50px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        border-radius: 10px;
    }
    .save_btn:active {
        background-color: #46b978de;
    }
    .link_social_media {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 20px;
    }
    .fb,
    .youtube,
    .twitch {
        width: 60%;
        height: 40px;
        color: white;
        background-color: #46b978;
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
    }
    .fb {
        background-color: #3b5998;
    }
    .youtube {
        background-color: #d2504d;
    }
    .twitch {
        background-color: #9146ff;
    }
    .fb:active {
        background-color: #3b5998cf;
    }
    .youtube:active {
        background-color: #d2504dde;
    }
    .twitch:active {
        background-color: #9146ffe8;
    }
    .link_social_media div i {
        position: absolute;
        left: 15px;
    }
    .pwd_change {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pwd_change .input input {
        width: 500px;
    }
    .profile_container .big_title {
        font-size: 30px;
        font-weight: 600;
        width: 100%;
        text-align: left;
    }
    hr {
        width: 100%;
    }
    @media only screen and (max-width: 1180px) {
        .big_title {
            margin-left: 25px;
        }
        hr {
            display: none;
        }
        .user_data {
            flex-direction: column;
            width: 100%;
        }
        .input {
            width: 90%;
            display: flex;
            justify-content: center;
        }
        .input .title{left: 10%;}
        input {
            width: 90% !important;
        }
        .pwd_change {
            width: 100%;
        }
         .fb,
    .youtube,
    .twitch{
        width: 90%;
    }
    }
</style>

<div class="profile_container">
    <div class="big_title">My Account</div>
    <hr />
    <div class="user_data">
        <div class="account_data">
            <div class="title">Account Data</div>
            <div class="input">
                <div class="title">Email</div>
                <input
                    type="email"
                    class="email"
                    disabled
                    value={$user.email ? $user.email : ""} />
            </div>
            <div class="input">
                <div class="title">Phone Number</div>
                <input
                    type="phone"
                    class="phone_num"
                    disabled
                    value={$user.phoneNumber ? $user.phoneNumber : ""} />
            </div>
        </div>
        <div class="personal_data">
            <div class="title">Personal Data</div>
            <div class="input">
                <div class="title">Name</div>
                <input bind:this={varname} type="text" class="name" value={$user.displayName ? $user.displayName : ""} />
            </div>
            <div class="input">
                <div class="title">Date of Birth</div>
                <input bind:this={varbirth} type="date" value={$user.docData?.birthdate ? $user.docData?.birthdate : ""} class="birth_date" />
            </div>
        </div>
    </div>
    <button on:click={doUpdate} class="save_btn">Save</button>
    <div class="link_social_media">
        <div class="title">Link Your Accounts</div>
        <div on:click={handleFacebook} class="fb">
            {#if !handlingFacebook}
                <i class="fab fa-facebook-f svelte-1l2nsjq" aria-hidden="true" />
                {#if providers.includes('facebook.com')}
                        {
                            {
                                'fr': 'Dissocier Facebook',
                                'en': 'Unlink Facebook'
                            }[$lang]
                        }
                    {:else}
                        {
                            {
                                'fr': 'Connecter avec Facebook',
                                'en': 'Connect with Facebook'
                            }[$lang]
                        }
                    {/if}
            {:else}
                <MaterialSpinner/>
            {/if}
        </div>
        <div on:click={handleGoogle} class="youtube">
            {#if !handlingGoogle}
                <i class="fab fa-google-plus-g svelte-1l2nsjq" aria-hidden="true" />
                
                    {#if providers.includes('google.com')}
                        {
                            {
                                'fr': 'Dissocier Google',
                                'en': 'Unlink Google'
                            }[$lang]
                        }
                    {:else}
                        {
                            {
                                'fr': 'Connecter avec Google',
                                'en': 'Connect with Google'
                            }[$lang]
                        }
                    {/if}
            {:else}
                <MaterialSpinner/>
            {/if}
        </div>
        <!--
        <div class="twitch">
            <i class="fab fa-twitch" />
            Connect Your Twitch Account
        </div>
        -->
    </div>

    <form on:submit|preventDefault={doPassword} class="pwd_change">
        <div class="title">Change Password</div>
        <div class="input">
            <div class="title">Old Password</div>
            <input bind:this={oldPassvar} autocomplete="off" type="password" class="new_pwd" />
        </div>
        <div class="input">
            <div class="title">New Password</div>
            <input bind:this={newPassvar} autocomplete="off" type="password" class="new_pwd" />
        </div>
        <div class="input">
            <div class="title">Confirm Password</div>
            <input bind:this={renewPassvar} autocomplete="off" type="password" class="confirm_pwd" />
        </div>
        <button type="submit" class="save_btn">Save</button>
    </form>
    
</div>
