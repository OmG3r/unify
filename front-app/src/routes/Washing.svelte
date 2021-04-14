<script>
    import WashingEN from './WashingEN.svelte'

    import {lang} from '../store.js'    
    import WashingFR from './WashingFR.svelte'

</script>

{#if $lang == "fr"}
    <WashingFR/>

{:else}
    <WashingEN/>
{/if}

