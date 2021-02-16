<script>
    import {link} from 'svelte-routing'

</script>


<div class="footer">
    <a use:link href="/">
        <div class="poweredContainer">
            <img src="/img/logo_transaprent.png" alt="logo" />
            <div class="powered">
                Powered By <span class="unify">Unify</span>
            </div>
        </div>
    </a>
    <div class="copyright">@2021 All Right Reserved</div>
</div>

<style>
    .footer {
        
        padding: 50px;
    }
    .poweredContainer {
        width: 180px;
        height: 60px;
        background-color: #181d22;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 15px;
        font-weight: 600;
        margin: 0 auto 0 auto;
        padding: 5px 10px;
    }
    .poweredContainer img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .powered {
        font-weight: 400;
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    .powered .unify {
        font-weight: 600;
        font-size: 18px;
    }
    .copyright {
        margin: 0 auto 0 auto;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin: 15px 0 15px 0;
    }
</style>
