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
    .banner-image {
        max-width: 100%;
    }
</style>


<script>
    import {link} from 'svelte-routing'
    import Input from '../comps/InputField.svelte'
    import InputColor from '../comps/InputColor.svelte'
    import ViewNav from '../comps/ViewNav.svelte'
    import {db, user, storage} from '../firebase.js'
    import {notification, uuidToImageLink} from '../utils.js'
    import MaterialSpinner from '../comps/MaterialSpinner.svelte'


    let profile = {
        
        banner: "",
        logo: "",
        ...$user.docData,
    }

    const MAX_BANNER_SIZE = 1
    const MAX_PROFIL_PIC_SIZE = 0.5

    const handleDropBanner = (event) => {
        console.log("got banner")
        let f = event.dataTransfer.files[0]
        if (f.size > 1024 * 1024 * MAX_BANNER_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content: "Banner size should not exceed " + MAX_BANNER_SIZE + " MB",
            })
            return
        }
        profile.banner = f
    }

    const handleDropLogo = (event) => {
        let f = event.dataTransfer.files[0]
        if (f.size > 1024 * 1024 * MAX_PROFIL_PIC_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content: "Profile picture size should not exceed " + MAX_PROFIL_PIC_SIZE + " MB",
            })
            return
        }

        profile.logo = f
    }

    const handleExplorerBanner = (event) => {
        let f = event.target.files[0]
        if (f.size > 1024 * 1024 * MAX_BANNER_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content: "Banner size should not exceed " + MAX_BANNER_SIZE + " MB",
            })
            return
        }
        profile.banner = f


    }

    const handleExplorerLogo = (event) => {
        let f = event.target.files[0]

        if (f.size > 1024 * 1024 * MAX_PROFIL_PIC_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content: "Profile picture size should not exceed " + MAX_PROFIL_PIC_SIZE + " MB",
            })
            return
        }
        profile.logo = f
    }

    const uploadImage = (f, npath) => {
            return new Promise(async (resolve, reject) => {
                let path = 'creators/' + npath
                let create = storage.ref().child(path);
                let upping = undefined
                if (typeof f == "string") {
                    upping = create.putString(f, "data_url")
                } else {
                    upping = create.put(f)
                }
                
                let listen = (snapshot) => {
                    let uploadPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                }
                let errfunc = (er) => {
                    console.log(er)
                    reject(er)
                }
                let successfunc = async () => {
                    resolve(await upping.snapshot.ref.getDownloadURL())
                }
                upping.on('state_changed', listen, errfunc, successfunc)
            })
        }

    let updating = false
    const doUpdate = async () => {
        if (updating == true) {
            return
        }
        updating = true
        if (typeof profile.logo != "string") {
            profile.logo = (await uploadImage(profile.logo, $user.docData.username + "/logo" )).split('token=', 2)[1]
        }

        if (typeof profile.banner != "string") {
            profile.banner = (await uploadImage(profile.banner, $user.docData.username + "/banner" )).split('token=', 2)[1]
        }
        let modification = false
        for (let key of Object.keys($user.docData)) {
            if ($user.docData[key] != profile[key]) {
                modification = true
            }
        }
        let docKeys = Object.keys($user.docData)
        let profileKeys = Object.keys(profile)

        if (!(docKeys.every((item) => profileKeys.includes(item)) && docKeys.length == profileKeys.length)) {
            modification = true
        }

        for (let media of ['facebook', 'twitch', 'youtube', 'instagram']) {
            if (profile[media].includes('/')) {
                let sp = profile[media].split("/")
                profile[media] = sp[sp.length - 1]
            }
        }
        if (modification == true) {
            await db.doc('/creators/' + $user.docData.username).update(profile)
            notification.set(
            {
                accentColor: "success",
                title: "Success",
                content: "Profile updated",
            })
        }
        
        $user = {
            ...$user,
            docData: {
                ...$user.docData,
                ...profile
            }
        }
        updating = false
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
            
            {#if typeof profile.banner == "string" && profile.banner.length > 0}
                <img crossorigin="anonymous" class="banner-image" src={uuidToImageLink(profile.logo, 'creators/' + $user.docData.username + "/banner")} alt="baaner">
            {:else if typeof profile.banner != "string"}
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
            {#if typeof profile.logo == "string" && profile.logo.length > 0}
                <img crossorigin="anonymous" class="logo-image" src={uuidToImageLink(profile.logo, 'creators/' + $user.docData.username + "/logo")} alt="logo">
            {:else if typeof profile.logo != "string" }
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
            <InputColor title="Accent Color" bind:text={profile.accentColor} />
        </div>

        <div class="u-section-title">Social Media</div>
        <div class="u-information-box">
            <Input placeholder={"Username"} title="Youtube" bind:text={profile.youtube} />
            <Input placeholder={"Username"} title="Facebook" bind:text={profile.facebook} />
            <Input placeholder={"Username"} title="Instagram" bind:text={profile.instagram} />
            <Input placeholder={"Username"} title="Twitch" bind:text={profile.twitch} />
        </div>
        
        <button on:click={doUpdate} class="save-btn">
            {#if updating}
                <MaterialSpinner />
            {:else}
                Save
            {/if}
        </button>
    </section>
</div>