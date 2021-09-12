<style>
    .u-container {
        background-color: #f8fafd;
        width: 100;
        min-height: 100vh;
    }

</style>

<script>
    import {onDestroy} from 'svelte'
    import {user,  analytics} from '../firebase.js'
    import {notification} from '../utils.js'
    import {navigate} from 'svelte-routing'
    const unsubUser = user.subscribe((v) => {
        if (v) {
            if (v.docData?.storeEnabled == false) {
                notification.set({
                    accentColor: "alert",
                    title: "Error",
                    content: "Your Account must be enabled to organize events" 
                })
                analytics.logEvent('event-blocked')
                navigate('/', {replace: true})
            }
        }
    })
    onDestroy(() => {
        unsubUser() 
    })
</script>

<div class="u-container">


    <img style="width: 100%;" src="/imgs/events-page.png" alt="event">
</div>
