<style>
    .app-container {
        display: flex;
        min-height: 100vh;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .u-view-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        max-height: 100vh;
        overflow-y: scroll;
    }
@media only screen and (max-width: 1180px) {
    .app-container {
        position: relative;
        overflow-x: hidden;
    }
}

</style>

<script>
    import { Router, Link, Route, link } from "svelte-routing";
    import {onMount} from 'svelte'
    import {user} from './firebase.js'
    import NotFound from './routes/NotFound.svelte'
    import Overview from './routes/Overview.svelte'
    import Login from './routes/Login.svelte'
    import Merch from './routes/Merch.svelte'
    import Profile from './routes/Profile.svelte'
    import Test from './routes/Test.svelte'
    import Register from './routes/Register.svelte'
    import PhoneVerification from './routes/PhoneVerification.svelte'
    import Design from  './routes/Design.svelte'
    import Donation from './routes/Donation.svelte'
    import Events from './routes/Events.svelte'
    import Mentorship from './routes/Mentorship.svelte'
    import ForgotPassword from './routes/ForgotPassword.svelte'


    import VerifyLogin from './comps/VerifyLogin.svelte'
    import SideNav from './comps/SideNav.svelte'
    import Notifications from './comps/Notifications.svelte'
    import PopUpOverlay from './comps/PopupOverlay.svelte'
    import NotificationBanner from './comps/NotificationBanner.svelte'

    export let url = "";
    
    let activeRoute
    let activeURI;
    let notifText = ''
    let closed = false;
    onMount(() => {
        user.subscribe((v) => {
            if (v == 0 || v == 'init') {

            } else {
                console.log(v.docData?.storeEnabled)
                console.log(closed)
                if (v.docData?.storeEnabled == false && closed === false) {
                    console.log("inside")
                    notifText = 'This store is currently disabled, if this is your first time using our service this will be resolved shortly. Otherwise <a class="underlined" href="mailto:contact@unify.tn">contact us</a> for more information.'
                }
            }
        })
        activeRoute.subscribe((v) => {
            activeURI = v.uri
            console.log(activeURI)
        })

        setTimeout(() => {
            let ref = document.getElementById('logo-loader')
            ref.parentNode.removeChild(ref)
        }, 1000)
    })

</script>
<Notifications />
<PopUpOverlay />

<div class="app-container">
    <SideNav {activeURI} />
    <div class="u-view-container">
        {#if notifText}
            <NotificationBanner bind:closed text={notifText} />
        {/if}
        <Router bind:activeRoute  url="{url}">
            <Route path="/">
                <VerifyLogin >
                    <Overview />
                </VerifyLogin>
            </Route>
        
            <Route path="/profile">
                <VerifyLogin >
                    <Profile />
                </VerifyLogin>
            </Route>
        
            <Route path="/merch/*">
                <VerifyLogin >
                   <Merch />
                </VerifyLogin>
            </Route>
            <Route path="/design">
                <VerifyLogin >
                   <Design />
                </VerifyLogin>
            </Route>
            <Route path="/donation">
                <VerifyLogin >
                   <Donation />
                </VerifyLogin>
            </Route>
            <Route path="/events">
                <VerifyLogin >
                   <Events />
                </VerifyLogin>
            </Route>
            <Route path="/mentorship">
                <VerifyLogin >
                   <Mentorship />
                </VerifyLogin>
            </Route>
            <Route path="/test">
                
                <Test />
            
            </Route>
        
            <Route path="/register">
                
                <Register />
            
            </Route>
            <Route path="/login">
                
                <Login />
            
            </Route>
            <Route  path="/phoneverification">  
                <PhoneVerification/>
            </Route>
            
            <Route  path="/forgotpassword">  
                <ForgotPassword/>
            </Route>
        
            <Route path="*">
                
                <NotFound />
            
            </Route>
            
        </Router>
    

    </div>
    
</div>

