<script>
import Profile from "./Profile.svelte"


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
     .profile_nav .title{
        font-size: 30px;
        font-weight: 600;
    
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
     hr{
         width: 100%;
     }
</style>

<div class="layout">

    <div class="profile_pic">
        <img src="./img/ti3leh.jpg" alt="profilepic">
        <div class="u_name">Ahmed Ben Mahmoud</div>
        <div class="nav">
            <a href="#" class="active">Profile</a>
            <a href="#">My Wishlist</a>
            <a href="#">My Orders</a>
        </div>
    </div>
    <div class="profile_nav">
        <div class="title">My Account</div>
        <hr>
        <Profile/>

    </div>
    
</div>
