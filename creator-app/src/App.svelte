<style>
    .app-container {
        display: flex;
        min-height: 100vh;
        justify-content: flex-start;
        align-items: flex-start;
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

    import NotFound from './routes/NotFound.svelte'
    import Overview from './routes/Overview.svelte'
    import Login from './routes/Login.svelte'
    import Merch from './routes/Merch.svelte'
    import Profile from './routes/Profile.svelte'
    import Test from './routes/Test.svelte'
    import Register from './routes/Register.svelte'
    import PhoneVerification from './routes/PhoneVerification.svelte'
    import Design from  './routes/Design.svelte'
    


    import VerifyLogin from './comps/VerifyLogin.svelte'
    import SideNav from './comps/SideNav.svelte'
    import Notifications from './comps/Notifications.svelte'
    import PopUpOverlay from './comps/PopupOverlay.svelte'
    export let url = "";
    
    let activeRoute
    let activeURI;
    onMount(() => {
        activeRoute.subscribe((v) => {
            activeURI = v.uri
            console.log(activeURI)
        })
    })
</script>
<Notifications />
<PopUpOverlay />
<div class="app-container">
    <SideNav {activeURI} />
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
    
    
    
        <Route path="*">
            
            <NotFound />
        
        </Route>
        
    </Router>

</div>

