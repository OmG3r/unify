<style>
    .app-container {
        display: flex;
        min-height: 100vh;
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

    import VerifyLogin from './comps/VerifyLogin.svelte'
    import SideNav from './comps/SideNav.svelte'

    export let url = "";
    
    let activeRoute

    onMount(() => {
        activeRoute.subscribe((v) => {
            console.log(v)
        })
    })
</script>

<div class="app-container">
    <SideNav />
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
    
        <Route path="/login">
            
            <Login />
        
        </Route>
        
    
    
    
        <Route path="*">
            
            <NotFound />
        
        </Route>
    </Router>

</div>

