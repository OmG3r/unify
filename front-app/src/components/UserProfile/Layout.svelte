<script>
//import Profile from "../components/UserProfile/Profile.svelte"


</script>
<style>
     .layout{
         display: flex;
         flex-direction: row;
     }
     .profile_pic{
          display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         font-size: 18px;
         font-weight: 600;
         color: rgb(var(--userColor));
   
     }
     .profile_pic img{
        width: 90px;
        border-radius: 50%;;
     }
     .profile_nav{
        display: flex;
        flex-direction: column; 
     }
     .nav{
        display: flex;
        flex-direction: row
     }
     hr{
         width: 100%;
     }
</style>

<div class="layout">

    <div class="profile_pic">
        <img src="./img/ti3leh.jpg" alt="profilepic">
        <div class="u_name">Ahmed Ben Mahmoud</div>
    </div>
    <div class="profile_nav">
        <div class="title">My Account</div>
        <div class="nav">
            <a href="#">Profile</a>
            <a href="#">My Wishlist</a>
            <a href="#">My Orders</a>
        </div>
    </div>
    
</div>
<hr>