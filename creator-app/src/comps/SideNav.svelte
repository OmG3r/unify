<style>
    nav {
        width: 350px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #dce4fa;
        padding: 20px 16px;
    }
    .user-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 8px;
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
        border: 1px solid #4A5AED;
        background-color: #7682ec;
        color: white;
        border-radius: 3px;
    }

    .u-unify {
        width: 100%;
        text-align: center;
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
        background-color: #E6E8F7;
        color: #3748CC;
    }
    .nav-item-img {
        display: block;
        max-height: 32px;
        margin-right: 12px;
    }

    .signout {
        width: 100%;
        padding: 4px;
        border-radius: 3px;
        text-align: center;
        background-color: #4A5AED;
        margin-top: auto;
        color: white;
    }
</style>

<script>
    import {link} from 'svelte-routing'
    export let activeURI
    const navItems = [
        {name: "Overview", path: "/", img: '/imgs/misc/nav/dashboard.png'},
        {name: "Profile", path: "/profile", img: '/imgs/misc/nav/profile.png'},
        {name: "Merch", path: "/merch", img: '/imgs/misc/nav/merch.png'}
    ]

</script>

{#if !["/login", "/register"].includes(activeURI)}
    <nav>
        <div class="user-card">
            <div class="u-info">
                <div class="u-profile-pic">
                    <img src="/imgs/misc/ti3leh.jpg" alt="user">

                </div>
                <div class="u-name">
                    Ti 3leh
                </div>
            </div>

            <a use:link href="/profile" class="u-profile-button">
                Modify
            </a>
        </div>
        <div class="u-unify">
            UNIFY
        </div>
        <div class="navs">
            {#each navItems as item}
                <a class:active={activeURI == item.path} use:link href={item.path} class="u-nav-item">
                    <img class="nav-item-img" src={item.img} alt="item img">
                    <div class="nav-item-name">{item.name}</div>

                </a>
            {/each}

        </div>

        <div class="signout">
            Logout
        </div>
    </nav>
{/if}