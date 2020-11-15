<style>
    header {
        position: fixed;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 8px 24px;

        box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0,.5);
        background-color: #1c1c1e;
        color: white;
        transform: translate(0,calc(-100% - 1rem));
        transition: transform 0.2s;
    }

    header.visible {
        transform: none;
    }
    nav {
        display: flex;
        align-items: center;
    }
    nav a {
        margin: 0 8px;
    }
    .u-logo {
        max-width: 34px;
    }
    .u-logo img {
        max-width: 100%;
        
    }
    .basket {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
        width: 26px;
    }
</style>


<script>
    let headerVisible = true
    let oldscroll = 0
    window.onscroll = () => {
        let currentScroll = window.scrollY
        console.log(currentScroll)
            if (currentScroll > oldscroll ) {
                if (headerVisible != false) {
                    headerVisible = false
                } 
            } else {
                if (headerVisible != true) {
                    headerVisible = true
                }
            }



        oldscroll = currentScroll
    }

</script>


<header class:visible={headerVisible}>
    <div class="u-logo">

        <img src="/img/logo.png" alt="logo">
    </div>

    <nav>
        <a href="#">Tip</a>
        <a href="#">Donation</a>
        <a href="#">Merch</a>
        <a href="#">
            <img class="basket" src="/img/misc/shopping-basket.svg" alt="shopping basket">

        </a>
    </nav>



</header>