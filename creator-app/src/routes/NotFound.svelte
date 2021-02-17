<script>
    import {user} from '../firebase.js'
    import {navigate} from 'svelte-routing'
    import {onMount} from 'svelte'
    import MaterialSpinner from '../comps/MaterialSpinner.svelte'
    
    onMount(() => {
        navigate('/', {replace: true})
    })
    
</script>

<style>
    .u-center-area  {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-self: center;
        align-items: center;
    }

</style>


<div class="u-center-area">
    <MaterialSpinner width="75px" height="75px" />

</div>


