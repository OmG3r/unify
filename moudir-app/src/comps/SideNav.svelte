<style>
    nav {
        width: 80px;
        padding: 16px 8px;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .u-logo  {
        width: 50px;
    }
    .u-logo img {
        display: block;
        max-width: 100%;
    }
    .u-nav-items {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .u-nav-item {
        width: 42px;
        display: block;
    }
    .u-nav-item img {
        max-width: 100%;
        display: block;
    }
    .u-nav-item abbr {
        display: block;
    }
    .separator {
        width: 100%;
        height: 3px;
        background-color: #dce4fa;
        margin: 8px 0;
    }
</style>

<script>
    import {link} from 'svelte-routing'
    export let activeURI
    

    const routes = [
        {
            name: 'Orders',
            path: '/orders',
            img: '/imgs/nav/orders.png'
        }
    ]
</script>

{#if !['/login'].includes(activeURI)}
<nav>
    <div class="u-logo">
        <img src="/imgs/logo.png" alt="logo">
    </div>
    <div class="separator"></div>
    <div class="u-nav-items">
        {#each routes as route}
            
                <a use:link class="u-nav-item"  href={route.path}>
                    <abbr  title={route.name}>
                        <img src={route.img} alt={route.name}>
                    </abbr>
                </a>
            
            
        {/each}
    </div>
</nav>

{/if}