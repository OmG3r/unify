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
</style>


<script>
    export let params
    import {navigate} from 'svelte-routing'
    import  {onMount} from 'svelte'
    import {db} from '../../firebase.js'
    import BannerProfile from './oneCreatorComps/BannerProfile.svelte'

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
            admin: data[params.username.toLowerCase()],
            profile: (await db.doc('/creators/' + params.username ).get()).data() || {},
            //merch: (await db.doc('/creators/' + params.username + '/merch/all')).data() || {}
        }
        //merch = (await db.doc('/creators/' + params.username + '/merch/all')).data()
        console.log(userData)
        verified = true
    })
    
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

        </section>
    {/if}
    
</div>
