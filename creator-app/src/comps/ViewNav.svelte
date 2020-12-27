<style>
    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #D8DAE0;
        padding: 8px 12px;
        height: 54px;
        align-items: center;
        background-color: white;
    }

    .u-button {
        padding: 6px 12px;
        background-color: #46b978;
        border-color: #46b978;
        color: white;
        cursor: pointer;
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.34),
            0 0px 10px rgb(70 185 120 / 0.32);
        font-weight: bold;
        border-radius: 3px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .u-button:hover {
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.5),
            0 0px 10px rgb(70 185 120 / 0.5);
    }


    
</style>


<script>
    import {link} from 'svelte-routing'

</script>

<header>
    <a use:link href="/merch/create" class="u-button">Create Merch</a>
</header>