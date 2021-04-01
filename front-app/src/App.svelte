<script>
    import { Router, Link, Route } from "svelte-routing";

    import NotFound from './routes/NotFound.svelte'

    import LandingPage from './routes/LandingPage.svelte'
    import ProfilePage from './routes/ProfilePage.svelte'
    import MerchPage from './routes/Creator/MerchPage.svelte'
    import SingleProductPage from './routes/Creator/SingleProductPage.svelte'
    
    import RouteCreator from './routes/Creator/EntryCreator.svelte'

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
    import ContactUs from "./routes/ContactUs.svelte"
    import Notifications from './components/Notifications.svelte'
    import FooterCC from "./components/FooterCC.svelte"
    import OrderCompleted from "./components/CheckoutPage/OrderCompleted.svelte"
    import Terms from "./routes/Terms.svelte"
    import PaymentMethods from "./routes/PaymentMethods.svelte"
    import ShippingDelivery from "./routes/ShippingDelivery.svelte"
    import Policy from "./routes/Policy.svelte"
    export let url = "";

    //unfunct()
</script>
<Notifications />
<Router url="{url}">
    <Route path="/">
        <NavbarUnify/> 
        <LandingPage />
        <Footer/>
    </Route>
    <Route  path="/policy">
        <NavbarUnify/> 
        <Policy/> 
        <Footer/>  
    </Route>
    <Route  path="/shipping&delivery">
        <NavbarUnify/> 
        <ShippingDelivery/> 
        <Footer/>  
    </Route>
    <Route  path="/payment">
        <NavbarUnify/> 
        <PaymentMethods/> 
        <Footer/>  
    </Route>
    <Route  path="/terms">
        <NavbarUnify/> 
        <Terms/>
        <Footer/>  
    </Route>
    <Route  path="/completed">
        <OrderCompleted/>   
    </Route>
    <Route  path="/inprogress">
        <InProgress/>   
    </Route>
    <Route  path="/contactus">
        <ContactUs/>   
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
    
    <Route  let:params path="/myaccount/*">
        
        <UserProfile {params}/>
        
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
    <!--
    <Route let:params path="/:userid">
        
        <ProfilePage {params} />
    
    </Route>

    <Route let:params path="/:userid/merch">
        
        <MerchPage {params} />
        <FooterCC/>
    
    </Route>

    <Route let:params path="/:userid/merch/:itemid">
        
        <SingleProductPage {params} />
        <FooterCC/>
    
    </Route>
    -->
    <Route let:params path="/:userid/*">
        <RouteCreator  {params} />
        
    
    </Route>



    <Route path="*">
        
        <NotFound />
    
    </Route>
    <Route path="*/*">
            
        <NotFound />
    
    </Route>
    <Route path="**">
            
        <NotFound />
    
    </Route>
</Router>