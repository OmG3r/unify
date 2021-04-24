<style>
.u-view {
        height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        width: 100%;
        background-color: #f2f8f1;
        padding-bottom: 50px;
        
    }

    .u-nav-header {
        width: 100%;
        padding: 16px 8px;
        background-color: white;

        display: flex;

        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-bottom: 24px;
    }

    .u-return {
        display: block;
        height: 28px;
        margin-left: 12px;
    }
    .u-username {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: fit-content;
        width: fit-content;
    }

    .u-profile {
        max-width: 90%;
        width: 100%;
        margin: auto;
        background-color: white;
    }

    .u-info-box {
        display: flex;
        padding: 20px;
        justify-content: space-between;
    }

    .u-info {
        margin: 6px 0;
    }

    .u-info span {
        font-weight: bold;
        color: #46b978
    }
    .u-social {
        display: flex;
        width: 350px;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .u-social-button {
        width: 40%;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: bold;
        margin: 4px auto;
        text-align: center;
    }
    .u-switchs {
        width: 170px;
    }

    .u-switch {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        border-bottom: 1px solid black;
    }

    .u-switch-title {
        width: 100%;
        text-align: center;
        margin-bottom: 8px;
    }


    .u-toggle-container {
        width: 90%;
        margin: auto;
        height: 40px;
        background-color: #f4f4f4;
        border: 1px solid #bcc1cf;
        position: relative;
        cursor: pointer;
        
    }
    .u-toggler {
        height: 100%;
        width: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .u-toggler.enabled {
        background-color: #01bf75;
        color: white;
        
        right: 0;
    }
    .u-toggler.disabled {
        background-color: #f56356;
        color: white;
        
        left: 0;   
    }

    .u-note {
        display: flex;
        flex-direction: column;
    }

    .u-note textarea {
        height: 100%;
    }

    .u-save {
        width: 100%;
        background-color: #01bf75;
        color: white;
        text-align: center;
        padding: 8px 0;
        cursor: pointer;
    }
</style>


<script>
    export let params
    import {navigate} from 'svelte-routing'
    import  {onMount} from 'svelte'
    import {db} from '../../firebase.js'
    import BannerProfile from './oneCreatorComps/BannerProfile.svelte'
    import {formatTimestampToDateTime} from '../../utils.js'
    import MaterialSpinner from '../../comps/misc/MaterialSpinner.svelte'
    let verified = false;

    let userData = undefined
    onMount(async () => {
        let data = (await db.doc('/admin/collections/creators/all').get()).data()

        if (data[params.username.toLowerCase()] == undefined) {
            navigate('/manage-creators', {replace: true})
            return
        }
        let profile = 
        userData = {
            username: params.username,
            admin: {...data[params.username.toLowerCase()], username: params.username},
            profile: (await db.doc('/creators/' + params.username ).get()).data() || {},
            //merch: (await db.doc('/creators/' + params.username + '/merch/all')).data() || {}
        }
        //merch = (await db.doc('/creators/' + params.username + '/merch/all')).data()
        console.log(userData)
        verified = true
    })
    const socialMedia = {
        'Tiktok': {
            backgroundColor: '#000000',
            textColor: '#FFFFFF'
        },
        'pinterest': {
            backgroundColor: '#d61927',
            textColor: '#f5f5f5'
        },
        'instagram': {
           backgroundColor: '#e44753',
           textColor: '#FFFFFF' 
        },
        'facebook': {
            backgroundColor: '#4a68b5',
            textColor: '#f6f1f3'
        },
        'nimo': {
            backgroundColor: '#5f2cef',
            textColor: '#FFFFFF'
        },
        'baaz': {
            backgroundColor: '#f75757',
            textColor: '#f7f7f7'
        },
        'trovo': {
            backgroundColor: '#3bb06b',
            textColor: '#FFFFFF'
        },
        'twitter': {
            backgroundColor: '#52a7e7',
            textColor: '#f7f7f7'
        },
        'youtube': {
            backgroundColor: '#f70000',
            textColor: '#f7f7f7'
        },
        'twitch': {
            backgroundColor: '#8d44f7',
            textColor: '#f7f7f7'
        }
    }

    const handleStoreStatus = async (user) => {
        console.log(user)
        let batch = db.batch();

        if (user.storeEnabled == true) {

            batch.set(db.doc('admin/collections/creators/all'), {[user.username]: {storeEnabled: false} }, {merge: true})
            batch.set(db.doc('/creators/' + user.username), {storeEnabled: false}, {merge: true})
            await batch.commit()
            user.storeEnabled = false
        } else {
            batch.set(db.doc('admin/collections/creators/all'), {[user.username]: {storeEnabled: true} }, {merge: true})
            batch.set(db.doc('/creators/' + user.username), {storeEnabled: true}, {merge: true})
            await batch.commit()
            user.storeEnabled = true
        }
        userData.admin = user
        
    }


    const handleContacted = async (user) => {
        if (user.contacted == true) {
            await db.doc('admin/collections/creators/all').set({
                [user.username]: {
                    contacted: false
                }
            }, {merge: true})
            userData.admin.contacted = false
            userData = userData
        } else {
            await db.doc('admin/collections/creators/all').set({
                [user.username]: {
                    contacted: true
                }
            }, {merge: true})
            userData.admin.contacted = true
            userData = userData
        }
    }
    let noteInput
    let saving = false
    const saveNote = async () => {
        if (saving) {
            return
        }
        saving = true
        await db.doc('/admin/collections/creators/all').set({
            [userData.admin.username]: {
                note: noteInput.value
            }
        }, {merge: true})
        saving = false
    }
</script>

<div class="u-view">
    {#if verified}
        <div class="u-nav-header">
            
            <img class="u-return" src="/imgs/misc/back.png" alt="back">

            

            <div class="u-username">
                {params.username}

            </div>

        </div>

        <section class="u-profile">
            <BannerProfile data={{
                banner: {
                    path: 'creators/' + userData.username + '/banner',
                    uuid: userData.profile.banner
                },
                logo: {
                    path: 'creators/' + userData.username + '/logo',
                    uuid: userData.profile.logo 
                },
                accent: userData.profile.accentColor || "#ffffff"
            }} />
            <div class="u-info-box">
                <div class="u-information">
                    <div class="u-info"><span>Username:</span> {userData.username} </div>
                    <div class="u-info"><span>Name:</span> {userData.admin.persoName}</div>
                    <div class="u-info"><span>Phone:</span> {userData.admin.phoneNumber} </div>
                    <div class="u-info"><span>Email:</span> {userData.admin.email}</div>
                    <div class="u-info"><span>Registered:</span> {userData.admin?.timestamp?.seconds ? formatTimestampToDateTime(userData.admin.timestamp.seconds) : "-"}</div>
                </div>

                <div class="u-social">
                    {#each Object.entries(socialMedia) as [platform, data]}
                        {#if userData.profile[platform] != undefined && userData.profile[platform] != ''}
                            <a href={userData.profile[platform]}
                            style="background-color: {data.backgroundColor};color:{data.textColor} ;"
                             class="u-social-button">

                                {platform.capitalize()}

                            </a>

                        {/if}
                    {/each}

                </div>

                <div class="u-switchs">
                    <div class="u-switch">
                        <div class="u-switch-title">
                            Store Status
                        </div>
                        <div  on:click={() => {handleStoreStatus(userData.admin)}} class="noselect u-toggle-container">
                            <div
                            class:disabled={!userData.admin.storeEnabled}
                            class:enabled={userData.admin.storeEnabled} class="u-toggler">
                                {userData.admin.storeEnabled ? 'Enabled' : 'Disabled'}
                            </div>

                        </div>
                    </div>


                    <div class="u-switch">
                        <div class="u-switch-title">
                            Contacted
                        </div>
                        <div  on:click={() => {handleContacted(userData.admin)}} class="noselect u-toggle-container">
                            <div
                            class:disabled={!userData.admin.contacted}
                            class:enabled={userData.admin.contacted} class="u-toggler">
                                {userData.admin.contacted ? 'Yes' : 'No'}
                            </div>

                        </div>
                    </div>

                    
                </div>
                <div class="u-note">
                    <textarea bind:this={noteInput}>
                        
                        
                            {userData.admin.note ? userData.admin.note : ''}
                        
                    </textarea>
                    <div on:click={saveNote} class="u-save noselect">
                        {#if saving}
                            <MaterialSpinner />
                        {:else}
                            Save
                        {/if}
                    </div>
                </div>

            </div>
        </section>
    {/if}
    
</div>
