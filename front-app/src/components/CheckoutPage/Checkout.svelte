<script>
import Completion from './orderCompletion.svelte';
import Summary from './orderSummary.svelte';
    import {onDestroy, onMount} from 'svelte'
    import {user} from '../../firebase.js'
    import {navigate} from 'svelte-routing'
    import MaterialSpinner from '../misc/MaterialSpinner.svelte'
    import {cart} from '../../store.js'
    let validated = false;
    let unsubscribeUser = () => {};
    onMount(() => {
        console.log($user)
       
        unsubscribeUser = user.subscribe((v) => {
            console.log(v)
            if (v == 0) {
                return
            }
            if (v == undefined) {
                console.log("sending sign up")
                navigate("/signup")
                return
            }


            if (!v.phoneNumber) {
                console.log("sending to phone verification")
                navigate('/phoneverification')
            } else if (!v.emailVerified) {
                console.log("sending to email verification")
                navigate('/emailverification')
            }
            validated = true
        })

        if (Object.keys($cart.items.length == 0)) {
            navigate("/")
        }
    })
    onDestroy(() => {
        unsubscribeUser()
    })
</script>

<style>
.container{
    display: flex;
    padding: 100px 80px 20px 80px;
}

.u-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
    }

@media only screen and (max-width: 1000px) {
    .container {
        flex-direction: column-reverse;
        overflow: hidden;
        padding: 100px 20px 20px 20px;
    }
}
</style>
{#if validated}
    <div class="container">
        <Completion />
        <Summary />
    </div>
{:else}
    <div class="u-view">
        <MaterialSpinner width="80px" height="80px" />

    </div>

{/if}
