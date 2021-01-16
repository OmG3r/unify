<script>
    import { Router, Link, Route } from "svelte-routing";

    import NotFound from './routes/NotFound.svelte'

    import LandingPage from './routes/LandingPage.svelte'
    import ProfilePage from './routes/ProfilePage.svelte'
    import MerchPage from './routes/MerchPage.svelte'
    import SingleProductPage from './routes/SingleProductPage.svelte'
    import NavbarCC from "./components/NavbarCC.svelte";
    import NavbarUnify from "./components/NavbarUnify.svelte";
    import NavbarCheckout from "./components/NavbarCheckout.svelte";
    import Cart from "./routes/CartPage.svelte";
    import Checkout from "./routes/CheckoutPage.svelte";
    import Signup from "./routes/Signup.svelte";
    import Signin from "./routes/Signin.svelte";
    import PhoneVerification from "./routes/PhoneVerification.svelte";
    import UserProfile from "./routes/UserProfile.svelte";
    export let url = "";
</script>

<Router url="{url}">
    <Route path="/">
        <NavbarUnify/> 
        <LandingPage />
    
    </Route>
    <Route  path="/checkout">
        <NavbarCheckout/>   
        <Checkout/>
    </Route>
    <Route  path="/cart">
        <NavbarUnify/> 
        <Cart/>
    </Route>
    <Route  path="/signup">  
        <Signup/>
    </Route>
    <Route  path="/signin">  
        <Signin/>
    </Route>
    <Route  path="/myaccount">
        <NavbarUnify /> 
        <UserProfile />
    </Route>
    <Route  let:params path="/myaccount/:type/">
        <NavbarUnify/> 
        <UserProfile {params}/>
    </Route>
    <Route  path="/phoneverification">  
        <PhoneVerification/>
    </Route>

    <Route let:params path="/:userid">
        <NavbarCC/>
        <ProfilePage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch">
        
        <MerchPage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch/:itemid">
        <NavbarCC/>
        <SingleProductPage {params} />
    
    </Route>



    <Route path="*">
        
        <NotFound />
    
    </Route>
</Router>