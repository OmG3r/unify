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
    import Signup from "./routes/Signup.svelte";
    export let url = "";
</script>

<Router url="{url}">
    <Route path="/">
        
        <LandingPage />
    
    </Route>
    <Route  path="/checkout">  
        <Checkout/>
    </Route>
    <Route  path="/cart">  
        <Cart/>
    </Route>
    <Route  path="/signup">  
        <Signup/>
    </Route>

    <Route let:params path="/:userid">
        <Navbar/>
        <ProfilePage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch">
        
        <MerchPage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch/:itemid">
        <Navbar/>
        <SingleProductPage {params} />
    
    </Route>



    <Route path="*">
        
        <NotFound />
    
    </Route>
</Router>