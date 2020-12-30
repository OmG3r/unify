<script>
import Profile from "./Profile.svelte"
import Wishlist from "./Wishlist.svelte"
let currentPage="profile";
let handlepage = (page) =>{
    currentPage=page;
}
</script>
<style>
     .layout{
         display: flex;
         flex-direction: row;
     }
     .profile_pic{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: rgb(var(--userColor));
        max-width:250px ;
        width: 100%;
     }
     .u_name{
         margin-top: 10px;
             text-align: center;
     }
     .profile_pic img{
        width: 100px;
        border-radius: 50%;;
     }
     .profile_nav{
        display: flex;
        flex-direction: column;
        margin-left: 100px;
        width: 85%;
     }
   
     .nav{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
     }
     .nav a{
        margin: 5px 0px 5px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(var(--userColor));
     }
     .nav a.active{
         background-color: rgb(var(--AccentColor));
         color: white;
         border-radius: 10px;
         padding: 0 5px 0 5px;
          height: 35px;;
     }
    
</style>

<div class="layout">

    <div class="profile_pic">
        <img src="./img/ti3leh.jpg" alt="profilepic">
        <div class="u_name">Ahmed Ben Mahmoud</div>
        <div class="nav">
        <a href="#" class="{currentPage=="profile" ? "active":""}" on:click="{()=>{handlepage("profile")}}">Profile</a>
            <a href="#" class="{currentPage=="wishlist" ? "active":""}" on:click="{()=>{handlepage("wishlist")}}">My Wishlist</a>
            <a href="#" class="{currentPage=="orders" ? "active":""}" on:click="{()=>{handlepage("orders")}}">My Orders</a>
        </div>
    </div>
    <div class="profile_nav">
        {#if currentPage=="profile"}
        <Profile/>
        {:else if currentPage=="wishlist"}
        <Wishlist/>
        {/if}

    </div>
    
</div>
