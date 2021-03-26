<style>
    .u-side-nav {
        width: 300px;
        display: flex;
        flex-direction: column;
        padding: 10px 10px 10px 20px;

        max-height: 100vh;
        min-height: 100vh;
        height: 100%;
        position: sticky;
        top: 0;

        overflow-y: scroll;
    }
    
</style>

<script>
    import {faqs} from '../../store'
    import AccordionItem from './AccordionItem.svelte'
</script>

<div class="u-side-nav">
    {#each Object.entries(faqs) as [dropdownTitle, links]}
        <AccordionItem {dropdownTitle} {links}  />
    {/each}
</div>