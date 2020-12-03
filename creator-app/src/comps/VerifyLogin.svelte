<style>
      .u-loading {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }


</style>
<script>
    import {user} from '../firebase.js'
    import {navigate} from 'svelte-routing'
    import {onDestroy} from 'svelte'
    import MaterialSpinner from './MaterialSpinner.svelte'
    let verified = false;

    const unsubscribe = user.subscribe((v) => {
        if (v === "init" ) {
            return
        }
        if (v === 0) {
            console.error("unauthorized")
            setTimeout(() => {
                navigate("/login")
            }, 100)
            
        } else {
            verified = true
        }
    })
    onDestroy(() => {
        unsubscribe()
    })

</script>
{#if verified}
    <slot>

    </slot>

{:else}
    <div class="u-loading">

        <MaterialSpinner height={"100px"} width={"100px"} />

    </div>

{/if}