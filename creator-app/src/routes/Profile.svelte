<style>
    .banner-logo-area {
        position: relative;
        width: 100%;
        height: 300px;
    }
    .banner {
        width: 100%;
        height: 300px;
        border: 1px dashed black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .banner-text {
        margin-top: 150px;
    }

    .logo {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        border: 1px dashed black;
        width: 150px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>


<script>
    let profile = {
        banner: "",
        logo: ""
    }

    const handleBanner = (event) => {
        console.log("got banner")
        profile.banner = event.dataTransfer.files[0]
    }

    const handleLogo = (event) => {
        profile.logo = event.dataTransfer.files[0]
    }


</script>


<section class="banner-logo-area">
    <div on:drop|preventDefault={handleBanner}
    on:dragover|preventDefault|stopPropagation class="banner">
    
        
        {#if profile.banner}
            <img class="banner-image" src={URL.createObjectURL(profile.banner)} alt="logo">
        {:else}
            <p class="banner-text">Drop banner here</p>
        {/if}
    </div>

    <div on:drop|preventDefault={handleLogo}
    on:dragover|preventDefault|stopPropagation class="logo">
        {#if profile.logo}
            <img class="logo-image" src={URL.createObjectURL(profile.logo)} alt="logo">
        {:else}
            <p>Drop logo here</p>
        {/if}
    </div>

</section>