<style>
    nav {
        width: 300px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .user-card {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .u-info {
        width: 100%;
        display: flex;
        align-items: center;
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
        border: 1px solid black;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
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
    }
    .nav-item-img {
        display: block;
        max-height: 32px;
        margin-right: 12px;
    }
</style>

<script>
    import {link} from 'svelte-routing'
    const navItems = [
        {name: "Overview", path: "/", img: '/imgs/misc/nav/dashboard.png'},
        {name: "Profile", path: "/profile", img: '/imgs/misc/nav/profile.png'},
        {name: "Merch", path: "/merch", img: '/imgs/misc/nav/merch.png'}
    ]

</script>


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
            <a use:link href={item.path} class="u-nav-item">
                <img class="nav-item-img" src={item.img} alt="item img">
            <div class="nav-item-name">{item.name}</div>

            </a>
        {/each}

    </div>

    

</nav>