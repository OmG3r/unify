
<style>
    .app-container {
        display: flex;
        width: 100vw;
        height: 100vh;
    }


</style>
<script>
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./routes/Home.svelte";
    
    import Orders from './routes/orders/Orders.svelte'
    import Login from './routes/Login.svelte'
    import NotFound from './routes/NotFound.svelte'

    import Notifications from './comps/Notifications.svelte'
    import PopupOverlay from './comps/PopupOverlay.svelte'
    import Redirector from './comps/misc/Redirector.svelte'

    import SideNav from './comps/SideNav.svelte'
    export let url = "";
    import {onMount} from 'svelte'

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
<PopupOverlay />
<div class="app-container">
    <SideNav {activeURI} />
    <Router  bind:activeRoute url="{url}">
        
        <Route path="/">
            <Redirector path={"orders"} />
        </Route>
        <Route path="/orders">
            <Orders/>

        </Route>

        <Route path="/login">
            <Login />
        </Route>
    
        <Route path="*"><NotFound /></Route>
    </Router>

</div>
