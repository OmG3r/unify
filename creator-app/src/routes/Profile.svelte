<script>
    import { link } from "svelte-routing";
    import Input from "../comps/InputField.svelte";
    import InputColor from "../comps/InputColor.svelte";
    import ViewNav from "../comps/ViewNav.svelte";
    import { db, user, storage } from "../firebase.js";
    import { notification, uuidToImageLink } from "../utils.js";
    import MaterialSpinner from "../comps/MaterialSpinner.svelte";
    import { lang } from "../store.js";
import { is_empty } from "svelte/internal";

    let profile = {
        banner: "",
        logo: "",
        ...$user.docData,
    };

    const MAX_BANNER_SIZE = 1;
    const MAX_PROFIL_PIC_SIZE = 0.5;

    const handleDropBanner = (event) => {
        console.log("got banner");
        let f = event.dataTransfer.files[0];
        if (f.size > 1024 * 1024 * MAX_BANNER_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content:
                    "Banner size should not exceed " + MAX_BANNER_SIZE + " MB",
            });
            return;
        }
        profile.banner = f;
    };
  /*   setInterval(() => {
        console.log(profile);
    }, 1500); */
    const handleDropLogo = (event) => {
        let f = event.dataTransfer.files[0];
        if (f.size > 1024 * 1024 * MAX_PROFIL_PIC_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content:
                    "Profile picture size should not exceed " +
                    MAX_PROFIL_PIC_SIZE +
                    " MB",
            });
            return;
        }

        profile.logo = f;
    };
    //$: console.log(profile.logo);
    const handleExplorerBanner = (event) => {
        let f = event.target.files[0];
        if (f.size > 1024 * 1024 * MAX_BANNER_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content:
                    "Banner size should not exceed " + MAX_BANNER_SIZE + " MB",
            });
            return;
        }
        profile.banner = f;
    };

    const handleExplorerLogo = (event) => {
        let f = event.target.files[0];

        if (f.size > 1024 * 1024 * MAX_PROFIL_PIC_SIZE) {
            notification.set({
                accentColor: "error",
                title: "Image Size",
                content:
                    "Profile picture size should not exceed " +
                    MAX_PROFIL_PIC_SIZE +
                    " MB",
            });
            return;
        }
        profile.logo = f;
    };

    const uploadImage = (f, npath) => {
        return new Promise(async (resolve, reject) => {
            let path = "creators/" + npath;
            let create = storage.ref().child(path);
            let upping = undefined;
            if (typeof f == "string") {
                upping = create.putString(f, "data_url");
            } else {
                upping = create.put(f);
            }

            let listen = (snapshot) => {
                let uploadPercentage = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            };
            let errfunc = (er) => {
                console.log(er);
                reject(er);
            };
            let successfunc = async () => {
                resolve(await upping.snapshot.ref.getDownloadURL());
            };
            upping.on("state_changed", listen, errfunc, successfunc);
        });
    };

    let updating = false;
    const doUpdate = async () => {
        if (updating == true) {
            return;
        }
        updating = true;
        if (typeof profile.logo != "string") {
            profile.logo = (
                await uploadImage(profile.logo, $user.claims.username + "/logo")
            ).split("token=", 2)[1];
        }

        if (typeof profile.banner != "string") {
            profile.banner = (
                await uploadImage(
                    profile.banner,
                    $user.claims.username + "/banner"
                )
            ).split("token=", 2)[1];
        }
        let modification = false;
        for (let key of Object.keys($user.docData)) {
            if ($user.docData[key] != profile[key]) {
                modification = true;
            }
        }
        let docKeys = Object.keys($user.docData);
        let profileKeys = Object.keys(profile);

        if (
            !(
                docKeys.every((item) => profileKeys.includes(item)) &&
                docKeys.length == profileKeys.length
            )
        ) {
            modification = true;
        }

        for (let media of ["youtube","facebook","instagram", "twitch", "nimo","twitter","baaz","Tiktok","pinterest"]) {
            if (!["facebook.com","twitch.tv","youtube.com","instagram.com","twitter.com","tiktok.com","baaz.com","nimo.tv","smart.link","pinterest.com",""].some((item)=>profile[media].includes(item))) {
                notification.set({
                    accentColor: "alert",
                    title: "Error",
                    content: media + " link is malformed",
                })
                modification  = false;
            }
            }
        if (modification == true) {
            await db
                .doc("/creators/" + $user.claims.username)
                .set(profile, { merge: true });
            notification.set({
                accentColor: "success",
                title: "Success",
                content: "Profile updated",
            });
        }

        $user = {
            ...$user,
            docData: {
                ...$user.docData,
                ...profile,
            },
        };
        updating = false;
    };

    let copyStore = () => {
        var copyText = document.getElementById("myStoreID");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        notification.set({
            accentColor: "success",
            title: "success",
            content: "Link copied to clipboard",
        });
    };
</script>

<style>
    .u-view {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        position: relative;
        padding: 0 0 100px 0;
    }

    .banner-logo-area {
        position: relative;
        width: 100%;
    }
    .banner {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .logo {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
    }
    .creator_name {
        font-size: 20px;
        font-weight: 600;
        color: white;
    }

    .logo.filled {
        background-color: transparent;
        border: none;
    }

    #logo-upload,
    #banner-upload {
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
        border-radius: 0.25rem;
        font-weight: 600;
        white-space: nowrap;
        text-transform: capitalize;
        color: inherit;
        color: grey;
        display: inline-block;
        -webkit-transition: background-color 0.15s ease-in-out;
        transition: background-color 0.15s ease-in-out;
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
        background-color: #46b978;

        text-shadow: none;
        box-shadow: none;
        outline: none;
        border: none;
        color: white;

        width: 60%;
        max-width: 400px;
    }
    .save-btn:hover {
        background-color: rgb(87, 210, 141);
    }
    .banner-image {
        max-width: 100%;
    }
    .logo-image {
        width: 150px;
  
    }
    .banner-image {
        background-image: url("/imgs/defaultBanner.png");
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        width: 100%;
        height: 100%;
    }

    /*************/
    .profile_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        align-items: center;
    }
    .user_data {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        max-width: 600px;
        width: 100%;
    }
    .account_data,
    .personal_data,
    .pwd_change {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
    .account_data .title,
    .personal_data .title,
    .pwd_change .title {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
    }
    .input {
        position: relative;
        margin: 15px 0 15px 0;
        width: 100%;
    }
    .input input,
    .input textarea {
        width: 180px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #b9bbbc;
        padding-left: 15px;
        font-size: 15px;
        font-weight: 600;
        width: 100%;
    }
    .input textarea{
        height: 300px !important;
        padding: 15px;
    }
    .input .title {
        font-size: 18px;
        font-weight: 600;
        position: absolute;
        top: -12px;
        left: 30px;
        color: #46c092;
        background-color: white;
        padding: 0 5px 0 5px;
        
    }
    input:focus,
    button:focus {
        outline: none;
    }
    .save_btn {
        width: 50%;
        background-color: #46b978;
        height: 50px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        border-radius: 10px;
    }
    .save_btn:active {
        background-color: #46b978de;
    }
    .link_social_media {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 20px;
    }
    .fb,
    .youtube,
    .twitch {
        width: 60%;
        height: 40px;
        color: white;
        background-color: #46b978;
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
    }
    .fb {
        background-color: #3b5998;
    }
    .youtube {
        background-color: #d2504d;
    }
    .twitch {
        background-color: #9146ff;
    }
    .fb:active {
        background-color: #3b5998cf;
    }
    .youtube:active {
        background-color: #d2504dde;
    }
    .twitch:active {
        background-color: #9146ffe8;
    }
    .link_social_media div i {
        position: absolute;
        left: 15px;
    }
    .pwd_change {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pwd_change .input input {
        width: 500px;
    }
    .profile_container .big_title {
        font-size: 30px;
        font-weight: 600;
        width: 100%;
        text-align: left;
    }
    hr {
        width: 100%;
    }
    .signout {
        font-size: 18px;
        font-weight: 600;
        color: white;
        background-color: #46b978;
        width: 60%;
        margin-top: 10px;
        border-radius: 4px;
        max-width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .signout:hover {
        background-color: rgb(87, 210, 141);
    }
    .myStore {
        display: flex;
        justify-content: center;
    }
    .inputContainer {
        position: relative;
        width: 100%;
        max-width: 600px;
        cursor: pointer;
        font-size: 18px !important;
    }
    .inputContainer img {
        filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(194deg)
            brightness(108%) contrast(101%);
        width: 50%;
    }
    .copyimg {
        background-color: #181d22;
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 100%;
        border-radius: 0 8px 8px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .copyimg:hover {
        background-color: #485058;
    }
    .copyimg:active {
        background-color: #181d22;
    }
    .banner .camera_container{
            position: absolute;
            bottom: 15px;
            right: 50px;
            width: max-content;
            display: flex;
            padding: 4px 12px;
            background: #e4e6eb;
            border-radius: 15px;
            justify-content: center;
            align-items: center;
            font-weight: 600;
    }
    .banner .camera_container:hover{
            background: #d7d9de;
    }
    .banner .camera_container img{
        width: 25px;
        margin-right: 15px;
    }
    .logo .camera_container{
        z-index: 5000;
        width: max-content;
        background: #e4e6eb;
        position: absolute;
        padding: 2px 6px;
        border-radius: 8px;
        bottom: -px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logo .camera_container img{
        width: 20px;
    }
    .logo_container{
        position: relative;
        padding: 4px 12px;
    }
</style>

<div class="u-view">
    <ViewNav />

    <section class="banner-logo-area">
        <label
            for="banner-upload"
            class:filled={profile.banner}
            on:drop|preventDefault={handleDropBanner}
            on:dragover|preventDefault|stopPropagation
            class="banner">
            <input
                on:change={handleExplorerBanner}
                type="file"
                id="banner-upload" />

            {#if typeof profile.banner == 'string' && profile.banner.length > 0}
                <div
                    crossorigin="anonymous"
                    class="banner-image"
                    style="background-image:url({uuidToImageLink(profile.logo, 'creators/' + $user.claims.username + '/banner')})"
                     />
            {:else if typeof profile.banner != 'string'}
                <div
                    class="banner-image"
                    style="background-image:url({URL.createObjectURL(profile.banner)})" />
            {:else}
                <div class="banner-image" />
            {/if}

            <div class="camera_container">
                <img src="/imgs/misc/camera.svg" alt="camera" class="camera">
                Edit Cover Photo
            </div>
        </label>

        <label
            for="logo-upload"
            class:filled={profile.logo}
            class="logo">
            <input
                on:change={handleExplorerLogo}
                type="file"
                id="logo-upload" />
            <div 
            class="logo_container"
            on:drop|preventDefault={handleDropLogo}
            on:dragover|preventDefault|stopPropagation
            >
            {#if typeof profile.logo == 'string' && profile.logo.length > 0}
                <img
                    crossorigin="anonymous"
                    class="logo-image"
                    src={uuidToImageLink(profile.logo, 'creators/' + $user.claims.username + '/logo')}
                    alt="logo" />                                         
            {:else if typeof profile.logo != 'string'}
                <img
                    class="logo-image"
                    src={URL.createObjectURL(profile.logo)}
                    alt="logo" />  
            {:else}
                <img
                    class="logo-image"
                    src="/imgs/defaultUser.png"
                    alt={profile.logo} > 
            {/if}
                <div 
                class="camera_container"
                on:drop|preventDefault={handleDropLogo}
                on:dragover|preventDefault|stopPropagation
                >
                    <img src="/imgs/misc/camera.svg" alt="camera" class="camera">
                </div>
            </div>
        {#if profile.name ==""}
            <div class="creator_name" contenteditable="true">{$user.claims.username}</div>
        {:else}
            <div class="creator_name" contenteditable="true">{profile.name}</div>
        {/if}
            
            
        </label>
    </section>

    <section class="u-info-area">
        <div class="input myStore">
            <div class="inputContainer">
                <input
                    type="text"
                    class="name"
                    id="myStoreID"
                    value={'https://unify.tn/' + $user.claims.username + '/merch'} />
                <div class="copyimg" on:click={copyStore}>
                    <img src="/imgs/misc/copy.png" alt="copy" />
                </div>
            </div>
        </div>
        <div class="user_data">
            <div class="account_data">
                <div class="title">
                    Account Data
                </div>
                <div class="input">
                    <div class="title">
                        Email
                    </div>
                    <input
                        type="email"
                        class="email"
                        value={$user.email ? $user.email : ''} />
                </div>
                <div class="input">
                    <div class="title">
                        Phone Number
                    </div>
                    <input
                        type="phone"
                        class="phone_num"
                        value={$user.phoneNumber ? $user.phoneNumber : ''} />
                </div>
            </div>
            <div class="personal_data">
                <div class="title">
                    Personal Data
                </div>
                <div class="input">
                    <div class="title">
                        Name
                    </div>
                    <input
                        type="text"
                        class="name"
                        value={$user.displayName ? $user.displayName : ''} />
                </div>
                <div class="input">
                    <div class="title">
                        Date of Birth
                    </div>
                    <input type="date" class="birth_date" />
                </div>
            </div>
        </div>

        <div class="u-information-box">
        <Input title="Profile Name" bind:value={profile.name} bind:text={profile.name} />
            <InputColor title="Accent Color" bind:text={profile.accentColor} />
            <div class="input">
                <div class="title">
                    Description
                </div>
            <textarea class="description" name="description"  maxlength="350" bind:value ={profile.description} />
            </div>
        </div>

        <div class="u-section-title">
            Social Media
        </div>
        <div class="u-information-box">
            <Input
                placeholder={'Link'}
                title="Youtube"
                bind:text={profile.youtube} />
            <Input
                placeholder={'Link'}
                title="Facebook"
                bind:text={profile.facebook} />
            <Input
                placeholder={'Link'}
                title="Instagram"
                bind:text={profile.instagram} />
            <Input
                placeholder={'Link'}
                title="Twitch"
                bind:text={profile.twitch} />
                <Input
                placeholder={'Link'}
                title="Nimo"
                bind:text={profile.nimo} />
            <Input
                placeholder={'Link'}
                title="Twitter"
                bind:text={profile.twitter} />
            <Input
                placeholder={'Link'}
                title="Baaz"
                bind:text={profile.baaz} />
            <Input
                placeholder={'Link'}
                title="Tiktok"
                bind:text={profile.Tiktok} />
            <Input
                placeholder={'Link'}
                title="pinterest"
                bind:text={profile.pinterest} />    
        </div>

        <button on:click={doUpdate} class="save-btn">
            {#if updating}
                <MaterialSpinner />
            {:else}
                Save
            {/if}
        </button>
        <div
            on:click={() => {
                firebase.auth().signOut();
            }}
            class="signout">
            Logout
        </div>
    </section>
</div>
