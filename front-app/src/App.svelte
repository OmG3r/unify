<script>
    import { Router, Link, Route } from "svelte-routing";

    import NotFound from './routes/NotFound.svelte'

    import LandingPage from './routes/LandingPage.svelte'
    import ProfilePage from './routes/ProfilePage.svelte'
    import MerchPage from './routes/MerchPage.svelte'
    import SingleProductPage from './routes/SingleProductPage.svelte'
    import Navbar from "./components/newNavbar.svelte";
    import Cart from "./routes/CartPage.svelte";
    import Checkout from "./routes/CheckoutPage.svelte";
    export let url = "";
</script>
<Navbar/>
<Router url="{url}">
    <Route path="/">
        
        <LandingPage />
    
    </Route>
    <Route let:params path="/checkout">  
        <Checkout/>
    </Route>
    <Route let:params path="/cart">  
        <Cart/>
    </Route>

    <Route let:params path="/:userid">
        
        <ProfilePage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch">
        
        <MerchPage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch/:itemid">
        
        <SingleProductPage {params} />
    
    </Route>
    <Route let:params path="/:userid/cart/">
        
        <SingleProductPage {params} />
    
    </Route>


    <Route path="*">
        
        <NotFound />
    
    </Route>
</Router>