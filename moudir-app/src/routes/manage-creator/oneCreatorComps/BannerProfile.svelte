<style>

    .u-banner-x-profile {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        
        position: relative;
        height: 300px;

        overflow: hidden;
    }
    .u-banner {
        max-width: 100%;
        width: 100%;
    }

    .u-banner.default {
        height: 100%;
    }

    .u-profile {
        position: absolute;

        display: block;

        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        height: 80px;

        margin: auto;
    }

    .u-overlay {
        width: 100%;
        height: 100%;

        position: absolute;

        display: block;

        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        
    }

</style>


<script>
    import {hexToRgb, uuidToImageLink} from '../../../utils'
    export let data = {
        banner: {
            path: '',
            uuid: ''
        },
        logo: {
            path: '',
            uuid: ''
        },
        accent: ''
    }
</script>



<div class="u-banner-x-profile">
    {#if data.banner.uuid != '' && data.banner.uuid != undefined}
        <img class="u-banner" src={uuidToImageLink(data.banner.uuid, data.banner.path)} alt="banner">
    {:else}
        <img class="u-banner default" src="/imgs/defaultbanner.png" alt="banner">
    {/if}
    <div style={'background-color: rgba(' + hexToRgb(data.accent) + ', 0.35)' } class="u-overlay"></div>
    <img class="u-profile" src="{uuidToImageLink(data.logo.uuid, data.logo.path)}" alt="pic">
</div>