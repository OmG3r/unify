<style>


    .u-view {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
    }

    .banner-logo-area {
        position: relative;
        width: 100%;
    }
    .banner {
        width: 100%;
        height: 300px;
        border: 1px dashed black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .banner.filled {
        border: none;
        height: auto;
    }
    .banner-text {
        margin-top: 150px;
        z-index: 1;
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
        background-color: white;
    }

    .logo.filled  {
        background-color: transparent;
        border: none;
    }

    #logo-upload, #banner-upload {
        visibility: hidden;
        position: absolute;
    }

    .u-info-area {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 50px 40px;
    }
    .u-section-title {
        font-size: 20px;
        font-weight: bold;
    }
    .u-information-box {
        width: 100%;
        max-width: 600px;
        border-bottom: 1px solid #dce4fa;
    margin-bottom: 12px;
    }

    .save-btn {
  
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 1rem;
        border-radius: .25rem;
        font-weight: 600;
        white-space: nowrap;
        text-transform: capitalize;
        color: inherit;
        color: grey;
        display: inline-block;
        -webkit-transition: background-color .15s ease-in-out;
        transition: background-color .15s ease-in-out;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
        background-color: #2dc770;

        text-shadow: none;
        box-shadow: none;
        outline: none;
        border: none;
        color: white;

        width: 60%;
        max-width: 400px;
    }
    .save-btn:hover {
        background-color: rgb(87,210,141);
    }

</style>


<script>
    import {link} from 'svelte-routing'
    import Input from '../comps/InputField.svelte'
    import InputColor from '../comps/InputColor.svelte'
    import ViewNav from '../comps/ViewNav.svelte'
    let profile = {
        banner: "",
        logo: ""
    }

    const handleDropBanner = (event) => {
        console.log("got banner")
        profile.banner = event.dataTransfer.files[0]
    }

    const handleDropLogo = (event) => {
        profile.logo = event.dataTransfer.files[0]
    }

    const handleExplorerBanner = (event) => {
        profile.banner = event.target.files[0]
    }

    const handleExplorerLogo = (event) => {
        profile.logo = event.target.files[0]
    }

</script>

<div class="u-view">
    <ViewNav />


    <section class="banner-logo-area">
        <label for="banner-upload"
        class:filled={profile.banner} 
        on:drop|preventDefault={handleDropBanner}
        on:dragover|preventDefault|stopPropagation class="banner">
            <input on:change={handleExplorerBanner} type="file" id="banner-upload">
            
            {#if profile.banner}
                <img class="banner-image" src={URL.createObjectURL(profile.banner)} alt="logo">
            {:else}
                <p class="banner-text">Drop banner here</p>
            {/if}
        </label>

        <label for="logo-upload"
        class:filled={profile.logo} 
        on:drop|preventDefault={handleDropLogo}
        on:dragover|preventDefault|stopPropagation class="logo">
            <input on:change={handleExplorerLogo} type="file"  id="logo-upload">
            {#if profile.logo}
                <img class="logo-image" src={URL.createObjectURL(profile.logo)} alt="logo">
            {:else}
                <p>Drop logo here</p>
            {/if}
        </label>

    </section>

    <section class="u-info-area">
        <div class="u-section-title">General Informations</div>
        <div class="u-information-box">
            <Input title="Profile Name" bind:text={profile.name} />
            <InputColor title="Accent Color"/>
        </div>

        <div class="u-section-title">Social Media</div>
        <div class="u-information-box">
            <Input title="Youtube" bind:text={profile.youtube} />
            <Input title="Facebook" bind:text={profile.facebook} />
            <Input title="Instagram" bind:text={profile.instagram} />
            <Input title="Twitch" bind:text={profile.twitch} />
        </div>
        
        <button class="save-btn">
            Save
        </button>
    </section>
</div>