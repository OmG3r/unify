<style>
    header {
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px;
        height: 54px;
        align-items: center;
        position:absolute;
        right: 30px;
        top: 20px;
        z-index: 1;
    }

    .u-button {
        padding: 6px 12px;
        background-color: #46b978;
        color: white;
        cursor: pointer;
        font-weight: bold;
        border-radius: 3px;
        height: 55px;
        width: 185px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .u-button:hover {
        background-color: #77ca9b;
    }
    .u-button img {
        margin-right: 10px;
        width: 25px;
        height: 25px;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }


    
</style>


<script>
    import {link} from 'svelte-routing'

</script>

<header>
    <a use:link href="/merch/create" class="u-button"> <img src="/imgs/misc/merch.png" alt=""> Create a Merch</a>
</header>