<script>
  import { navCollapse, navCollapsable } from "../store.js";
  import { link } from "svelte-routing";
  export let activeURI;
  const navItems = [
    {
      name: "Overview",
      routerLink: "/",
      path: "/",
      img: "/imgs/misc/nav/dashboard.png"
    },
    {
      name: "Profile",
      routerLink: "/profile",
      path: "/profile",
      img: "/imgs/misc/nav/profile.png"
    },
    {
      name: "Merch",
      routerLink: "/merch",
      path: "/merch/all",
      img: "/imgs/misc/nav/merch.png"
    }
  ];
  const switchSideNav = () => {
    console.log($navCollapse);
    $navCollapse = !$navCollapse;
  };
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
    padding: 0 12px 0px 12px;
    border-bottom: 1px solid #dce4fa;
  }
  .u-info {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
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
    background-color: #0e80f6;
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

  .unify-text {
    margin-left: 16px;
    font-weight: 700;
  }

  .navs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .u-nav-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 3px;
    font-weight: bold;
  }
  .u-nav-item.active {
    background-color: #e6e8f7;
    color: #0e80f6;
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
    background-color: #0e80f6;
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
</style>

{#if !['/login', '/register'].includes(activeURI)}
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
    <div class:no-padding={$navCollapse} class="user-card">
      <a use:link href="/profile">
        <div class:justify-center={$navCollapse} class="u-info">

          <div class:no-margin={$navCollapse} class="u-profile-pic">
            <img src="/imgs/misc/ti3leh.jpg" alt="user" />

          </div>
          <div class="u-name" class:hidden={$navCollapse}>Ti 3leh</div>

        </div>
      </a>

      <!-- <a use:link href="/profile" class="u-profile-button" class:hidden={$navCollapse}>
                <i class="fas fa-user-edit"></i>
            </a>-->
    </div>
    <div class:justify-center={$navCollapse} class="u-unify">
      <img class="unify-logo" src="/logo.png" alt="unify-logo" />
      <div class:hidden={$navCollapse} class="unify-text">UNIFY</div>
    </div>
    <div class="navs">
      {#each navItems as item}
        <a
          class:active={activeURI == item.routerLink}
          use:link
          href={item.path}
          class="u-nav-item">
          <img class="nav-item-img" src={item.img} alt="item img" />
          <div class="nav-item-name" class:hidden={$navCollapse}>
            {item.name}
          </div>

        </a>
      {/each}

    </div>

    <div class:justify-center={$navCollapse} class="signout">
      <img class="logout-icon" src="/imgs/misc/nav/logout.png" alt="logout" />
      <div class:hidden={$navCollapse} class="logout-text">Logout</div>
    </div>
  </nav>
{/if}
