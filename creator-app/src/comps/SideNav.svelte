<script>
  import { navCollapse, navCollapsable } from "../store.js";
  import {user} from '../firebase.js'
  import { link } from "svelte-routing";
  import {uuidToImageLink} from '../utils.js'
  import {accentColor} from "../store.js"
  import {hexToRgb} from "../filter.js"
  import { onMount } from 'svelte';
  export let activeURI;
  console.log($user)
   
 
  const navItems = [
    {
      name: "Merch Overview",
      routerLink: "/",
      path: "/",
      img: "/imgs/misc/nav/dashboard.svg"
    },
    /*
    {
      name: "Donation Overview",
      routerLink: "/donation",
      path: "/donation",
      img: "/imgs/misc/nav/donation.png"
    },
    */
    {
      name: "Store",
      routerLink: "/merch",
      path: "/merch/all",
      img: "/imgs/misc/nav/store.svg"
    },
    {
      name: "Design",
      routerLink: "/design",
      path: "/design",
      img: "/imgs/misc/nav/design.svg"
    },
    {
      name: "Events",
      routerLink: "/events",
      path: "/events",
      img: "/imgs/misc/nav/events.svg"
    },
    {
      name: "Mentorship",
      routerLink: "/mentorship",
      path: "/mentorship",
      img: "/imgs/misc/nav/mentorship.svg"
    }

  ];
    
  const mobileNav = [
    {
      name: "Overview",
      routerLink: "/",
      path: "/",
      img: "/imgs/misc/nav/dashboard.png"
    },
    {
      name: "Design",
      routerLink: "/design",
      path: "/design",
      img: "/imgs/misc/nav/design.svg"
    },
    {
      name: "events",
      routerLink: "/events",
      path: "/events",
      img: "/imgs/misc/nav/events.svg"
    },
    {
      name: "mentorship",
      routerLink: "/mentorship",
      path: "/mentorship",
      img: "/imgs/misc/nav/mentorship.svg"
    }
  ];


  let activeNav = window.innerWidth < 1180 ? mobileNav : navItems
  const switchSideNav = () => {
    console.log($navCollapse);
    $navCollapse = !$navCollapse;
  };

  window.onresize = () => {
    activeNav = window.innerWidth < 1180 ? mobileNav : navItems
  }
  const ascertainImage = () => {
    if ($user.docData && $user.docData.logo && $user.docData.logo.length > 0) {
      return uuidToImageLink($user.docData.logo, 'creators/' + $user.claims.username +"/logo" )
    } else {
      return '/imgs/misc/nav/user.png'
    }
  }

</script>

<style>
 @keyframes noCollapse {
    0% {
      width: 80px;

      min-width: 80px;
      max-width: 80px;
    }

    100% {
      width: 320px;
      min-width: 320px;
      max-width: 320px;
    }
  }
  nav.noCollapse{
    animation-name: noCollapse;
    animation-duration: 0.5s;
    min-width: 350px;
    width: 350px;
    max-width: 320px;
  }
  nav {
    position: relative;
    min-width: 350px;
    width: 350px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 16px;
    box-shadow: 0 0px 60px 0px rgba(0, 0, 0, 0.15);
    background-color: white;
  }

  .resize-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0; 
    width: 45px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    z-index: 10;
  }

  .reverse.resize-button {
    right: -45px;
  }

  .u-profile-pic {
        display: block;
        max-height: 40px;
        max-width: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 12px;
    }
    .u-profile-pic img {
        max-width: 100%;
    }
    .u-profile-button {
        padding: 8px 12px;
        border: 1px solid #46b978;
        background-color: #46b978;
        color: white;
        border-radius: 3px;
    }

  .resize-button img {
    display: block;
    max-width: 22px;
    transform: rotate(180deg);
  }
  .resize-button img.reverse {
    transform: none;
  }
  @keyframes Collapse {
    0% {
      width: 320px;

      min-width: 320px;
      max-width: 320px;
    }

    100% {
      width: 80px;
      min-width: 80px;
      max-width: 80px;
    }
  }
  nav.collapse {
    animation-name: Collapse;
    animation-duration: 0.5s;
    min-width: 80px;
    max-width: 80px;
    width: 80px;
  }

  .user-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    border-bottom: 1px solid #dce4fa;
  }
  .user-card a{
    width: 90%;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 8px;
  }
  .u-info {
    width: 100%;
    display: flex;
    align-items: center;
    color: white;
  }
  .u-info .u-name {
    font-weight: bold;
  }

  .u-profile-pic {
    display: block;
    max-height: 40px;
    max-width: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
  }
  .u-profile-button {
    padding: 8px 12px;
    background-color: #46b978;
    color: white;
    border-radius: 40%;
  }

  .u-unify {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 12px;
    border-bottom: 1px solid #dce4fa;
    margin-bottom: 8px;
  }

  .unify-logo {
    max-width: 35px;
  }

    .u-nav-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 3px;
        font-weight: bold;
        color: #283341 !important;
        width: 90%;
    }
    .u-nav-item.active {
        background-color: #DFFFE8;
        color:#283341 ;
        
    }
    .nav-item-name {
        margin-left: 12px;   
    }
    .nav-item-img {
        display: block;
        max-width: 28px;
        width: 28px;
        
    }
  .unify-text {
    margin-left: 16px;
    font-weight: 700;
  }

  .navs {
    margin-top: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    
  }

 
  .nav-item-img {
    display: block;
    max-height: 32px;
    margin-right: 12px;
  }

  .signout {
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    text-align: center;
    background-color: #46b978;
    margin-top: auto;
    color: white;
    position: relative;
    display: flex;
    align-items: center;
  }

  .logout-text {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logout-icon {
    max-width: 23px;
  }
  .hidden {
    display: none;
  }
  .justify-center {
    justify-content: center;
  }
  .no-margin {
    margin: 0;
  }
  .no-padding {
    padding: 0;
  }
  @media only screen and (max-width: 1180px) {
      nav{
          min-height: 80px;
          height: 80px;
          position: fixed;
            bottom: 0;
            z-index: 5;
      }
    nav.collapse{
        max-width: 100vw;
        width: 100vw;
        padding:0;
        max-width: 100%;
    }
    .user-card,.u-unify,.signout,.resize-button{
        display: none;
    }
    .navs{
        flex-direction: row; 
        justify-content: center;
        
        height: 100%;
    }
    .navs a{
        
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .navs a img{
        min-height: 32px;
        margin: 0;
    }
    .navs a .nav-item-name{
        display: block;
        margin-left: 0px;
    }
    .u-nav-item.active{
        height: 100%;
    }

      nav.noCollapse{
      
      width: 100%;
      max-width: 100vw;
    }

    nav {
      padding : 0;
    }

  }

</style>

{#if !['/login', '/register', '/forgotpassword', '/phoneverification'].includes(activeURI)}
  <nav class:collapse={$navCollapse}  class:noCollapse={!$navCollapse}>
    {#if $navCollapsable}
      <div
        on:click={switchSideNav}
        class="resize-button"
        class:reverse={$navCollapse}>

        <img
          class:reverse={$navCollapse}
          src="/imgs/misc/nav/caret.png"
          alt="caret" />
      </div>
    {/if}
    <div class:justify-center={$navCollapse} class="u-unify">
      <img class="unify-logo" src="/logo.png" alt="unify-logo" />
      <div class:hidden={$navCollapse} class="unify-text">UNIFY</div>
    </div>
    <div class:justify-center={$navCollapse} class:no-padding={$navCollapse} class="user-card" >
      <a use:link href="/profile" style="background-color:{$accentColor}">
        <div class:justify-center={$navCollapse} class="u-info">

          <div class:no-margin={$navCollapse} class="u-profile-pic">
            <img src={ascertainImage($user)} alt="user" />

          </div>
          <div class="u-name" class:hidden={$navCollapse}>
            {#if $user.docData && $user.docData.name}
              {$user.docData.name}
            {:else}
              Update Name
            {/if}
          </div>

        </div>
      </a>

      <!-- <a use:link href="/profile" class="u-profile-button" class:hidden={$navCollapse}>
                <i class="fas fa-user-edit"></i>
            </a>-->
    </div>
    
    <div class="navs">
      {#each activeNav as item}
        <a
          class:justify-center={$navCollapse}
          class:active={activeURI == item.routerLink}
          use:link
          href={item.path}
    style="color:{$accentColor};background-color:{activeURI == item.routerLink ? "rgba("+hexToRgb($accentColor)+",0.4)":"" }"
          class="u-nav-item">
          <img class:no-margin={$navCollapse} class="nav-item-img" src={item.img} alt="item img" />
          <div class="nav-item-name" class:hidden={$navCollapse}>
            {item.name}
          </div>

        </a>
      {/each}

    </div>

    <div on:click={() => {firebase.auth().signOut()}} class:justify-center={$navCollapse} style="background:{$accentColor}"class="signout">
      <img class="logout-icon" src="/imgs/misc/nav/logout.png" alt="logout" />
      <div class:hidden={$navCollapse} class="logout-text" style="background:{$accentColor}">Logout</div>
    </div>
  </nav>
{/if}
