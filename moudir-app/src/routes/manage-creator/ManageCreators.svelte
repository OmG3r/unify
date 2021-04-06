<style>
    .u-view {
        height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        width: 100%;
        background-color: #f2f8f1;
        padding-bottom: 50px;
        padding: 20px 0;
    }
    .u-table {
        width: 90%;
        margin: auto;
    }

    

    .u-head-username, .u-body-username {
        width: 15%;
        
    }
    .u-head-email, .u-body-email {
        width: 30%
    }
    .u-head-phone, .u-body-phone {
        width: 10%
    }
    .u-head-date-join, .u-body-date-join {
        width: 20%;
    }
    .u-head-store-status, .u-body-store-status {
        width: 160px
    }

    .u-head-contacted, .u-body-contacted {
        width: 160px
    }
    .u-table-head {
        width: 100%;
        padding: 8px 0px 8px 10px;
        display: flex;
        background-color: white;
        border-bottom: 1px solid #dce4fa;
    }
    .u-table-head div {
        text-align: center;
    }

    .u-item {
        padding: 8px 0px 8px 10px;
        display: flex;
        border-bottom: 1px solid #dce4fa;
        background-color: white;
    }
    .u-item div {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
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

</style>


<script>
    import {writable} from 'svelte/store'
    import {formatTimestampToDateTime} from '../../utils.js'
    import {db, user} from '../../firebase.js'
    import {onMount, onDestroy} from 'svelte'
    import SignalNotification from '../../comps/SignalNotification.svelte'
    let users = writable([])
    let first = true
    document.title = "Unify Moudir - Manage Creators"
    let unsubscribeDB = db.doc('admin/collections/creators/all').onSnapshot((doc) => {
        first = false
        let data = doc.data()
        if (data == undefined) {
            $users = []
            return
        }
        let arrayed = Object.entries(data).map(([username, data]) => {
            data.username = username
            return data
        })
        console.log(arrayed)
        arrayed.sort((a, b) => {
            let aTime = a.timestamp.seconds + (a.timestamp.nanoseconds /( 10 ** 9))
            let bTime = b.timestamp.seconds + (b.timestamp.nanoseconds /( 10 ** 9))
            return bTime - aTime
        })
        $users = arrayed
    })
    const handleStoreStatus = async (user) => {
        let batch = db.batch();
        if (user.storeEnabled == true) {
            console.log("1 false")
            batch.set(db.doc('admin/collections/creators/all'), {[user.username]: {storeEnabled: false} }, {merge: true})
            console.log("2 false")
            batch.set(db.doc('/creators/' + user.username), {storeEnabled: false}, {merge: true})
            console.log("3 false")
            user.storeEnabled = false
        } else {
            console.log("1 true")
            batch.set(db.doc('admin/collections/creators/all'), {[user.username]: {storeEnabled: true} }, {merge: true})
            console.log("2 true")
            batch.set(db.doc('/creators/' + user.username), {storeEnabled: true}, {merge: true})
            console.log("3 true")
            user.storeEnabled = true
        }
        await batch.commit()
    }

    const handleContacted = async (user) => {
        if (user.contacted == true) {
            await db.doc('admin/collections/creators/all').set({
                [user.username]: {
                    contacted: false
                }
            }, {merge: true})
        } else {
            await db.doc('admin/collections/creators/all').set({
                [user.username]: {
                    contacted: true
                }
            }, {merge: true})
        }
    }
    onDestroy(() => {
        unsubscribeDB()
    })
    let mores = []
    const addMore = (username) => {
        mores = [...mores, username]
    }
    const removeMore = (username) => {
        mores = mores.filter((item) => item != username)
    }
</script>
<SignalNotification indexKey={'username'} {first} listener={users} countable={'Creators'} />

<div class="u-view">
    <div class="u-table">
        <div class="u-table-head">
            <div class="u-head-username">

                Username
            </div>
            <div class="u-head-email">
                Email
            </div>
            <div class="u-head-phone">
                Phone
            </div>
            <div class="u-head-date-join">
                Date Join

            </div>
            <div class="u-head-store-status">
                Store Status
            </div>
            <div class="u-head-contacted">
                Contacted
            </div>
        </div>
        <div class="u-table-body">
            {#each $users as user}
                <div class="u-item">
                    <div class="u-body-username">
                        {user.username}
                    </div>
                    <div class="u-body-email">
                        {user.email}
                    </div>
                    <div class="u-body-phone">
                        {user.phoneNumber ? user.phoneNumber : "None"}
                    </div>
                    <div class="u-body-date-join">
                        {#if user.timestamp?.seconds}
                            {formatTimestampToDateTime(user.timestamp.seconds)}
                        {:else}
                            -
                        {/if}
                    </div>
                    <div class="u-body-store-status">
                        <div  on:click={() => {handleStoreStatus(user)}} class="noselect u-toggle-container">
                            <div
                            class:disabled={!user.storeEnabled}
                            class:enabled={user.storeEnabled} class="u-toggler">
                                {user.storeEnabled ? 'Enabled' : 'Disabled'}
                            </div>

                        </div>
                    </div>
                    <div class="u-body-contacted">
                        <div  on:click={() => {handleContacted(user)}} class="noselect u-toggle-container">
                            <div
                            class:disabled={!user.contacted}
                            class:enabled={user.contacted} class="u-toggler">
                                {user.contacted ? 'Yes' : 'No'}
                            </div>

                        </div>
                    </div>
                </div>
                
            {/each}
        </div>

    </div>

</div>