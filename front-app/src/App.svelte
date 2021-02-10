<script>
    import { Router, Link, Route } from "svelte-routing";

    import NotFound from './routes/NotFound.svelte'

    import LandingPage from './routes/LandingPage.svelte'
    import ProfilePage from './routes/ProfilePage.svelte'
    import MerchPage from './routes/MerchPage.svelte'
    import SingleProductPage from './routes/SingleProductPage.svelte'
    
    import NavbarUnify from "./components/NavbarUnify.svelte";
    import NavbarCheckout from "./components/NavbarCheckout.svelte";
    import Cart from "./routes/CartPage.svelte";
    import Checkout from "./routes/CheckoutPage.svelte";
    import Signup from "./routes/Signup.svelte";
    import Signin from "./routes/Signin.svelte";
    import PhoneVerification from "./routes/PhoneVerification.svelte";
    import UserProfile from "./routes/UserProfile.svelte";
    import ForgotPassword from './routes/ForgotPassword.svelte'
    import EmailVerification from './routes/EmailVerification.svelte'
    import Footer from "./components/Footer.svelte"
    import InProgress from "./routes/InProgress.svelte"
    export let url = "";
</script>

<Router url="{url}">
    <Route path="/">
        <NavbarUnify/> 
        <LandingPage />
        <Footer/>
    
    </Route>
    
    <Route  path="/inprogress">
        <InProgress/>   
    </Route>
    <Route  path="/checkout">
        <NavbarCheckout/>   
        <Checkout/>
        <Footer/>
    </Route>
    <Route  path="/cart">
        <NavbarUnify/> 
        <Cart/>
        <Footer/>
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
        <Footer/>
    </Route>
    <Route  let:params path="/myaccount/*">
        <NavbarUnify/> 
        <UserProfile {params}/>
        <Footer/>
    </Route>
    <Route  path="/phoneverification">  
        <PhoneVerification/>
    </Route>
    <Route  path="/emailverification">  
        <EmailVerification/>
    </Route>
    <Route  path="/forgotpassword">  
        <ForgotPassword/>
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



    <Route path="*">
        
        <NotFound />
    
    </Route>
</Router>