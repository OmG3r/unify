<script>
import Layout from "../components/UserProfile/Layout.svelte";
import {onMount} from 'svelte'
import {navigate} from "svelte-routing";
import { Router, Link, Route, link} from "svelte-routing";
import {user} from '../firebase.js'
import Profile from "../components/UserProfile/Profile.svelte";
import Orders from "../components/UserProfile/Orders.svelte";
import Wishlist from "../components/UserProfile/Wishlist.svelte";
import Redirector from '../components/misc/Redirector.svelte'
export let params = {}
console.log(params)
export let url;
$: currentPage = params['*']
</script>

<style>
     .layout {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .profile_pic {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: rgb(var(--userColor));
        max-width: 250px;
        width: 50%;
    }
    .u_name {
        margin-top: 10px;
        text-align: center;
    }
    .profile_pic img {
        width: 100px;
        border-radius: 50%;
    }
    .profile_nav {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
        width: 60%;
    }

    .nav {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }
    .nav a {
        margin: 5px 0px 5px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(var(--userColor));
    }
    .nav a.active {
        background-color: rgb(var(--AccentColor));
        color: white;
        border-radius: 10px;
        padding: 0 5px 0 5px;
        height: 35px;
    }
    .mobilehr {
        display: none;
    }
    @media only screen and (max-width: 1180px) {
        .layout {
            flex-direction: column;
        }

        .profile_pic {
            max-width: 100%;
            width: 100%;
            align-items: start;
        }
        .profile_pic img,
        .u_name {
            margin-left: 50%;
            transform: translateX(-50%);
        }
        .u_name {
            font-size: 22px;
        }
        .nav {
            flex-direction: row;
        }
        .nav a {
            margin: 0 5px 0 5px;
        }
        .mobilehr {
            display: block;
            width: 100%;
        }
        .profile_nav {
            margin-left: 0px;
            width: 100%;
        }
    }
.User_profile{
    padding: 100px 50px 30px 50px;
}
 @media only screen and (max-width: 1180px) {
     .User_profile{
    padding: 100px 10px 30px 10px;
}
 }
</style>

<Router url="{url}">
    <div class="layout User_profile">
        <div class="profile_pic">
            <img src="/img/misc/user.png" alt="profilepic" />
            <div class="u_name">{$user.displayName ? $user.displayName : "User"}</div>
            <div class="nav">
                <a class={currentPage == 'profile' ? 'active' : ''} href="/myaccount/profile" use:link>Profile</a>
                <a class={currentPage == 'wishlist' ? 'active' : ''} href="/myaccount/wishlist" use:link>Wishlist</a>
                <a class={currentPage == 'orders' ? 'active' : ''} href="/myaccount/orders" use:link>Orders</a>
            </div>
            <hr class="mobilehr" />
        </div>
        <div class="profile_nav">
                <Route  path="/">
                    <Redirector path="/myaccount/profile" />
                </Route>
                
                <Route  path="/profile">
                    <Profile /> 
                </Route>
                <Route  path="/wishlist">
                    <Wishlist />
                </Route>
                <Route  path="/orders">
                    <Orders />
                </Route>
                
            
                
            
        </div>
    </div>
</Router>



