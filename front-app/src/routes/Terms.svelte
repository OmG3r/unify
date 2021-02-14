<style>
    .u-view {
        width: 100%;
        min-height: 100vh;
        padding: 24px;
    }
</style>


<script>
    import Accordion from '../components/Accordion.svelte'


</script>


<div class="u-view">
    <Accordion >
        <div slot="head">I am ahmed</div>
        <div slot="body">Iam 23 years old</div>
        
    </Accordion>


    <Accordion >
        <div slot="head">I am Adam</div>
        <div slot="body">guy</div>
        
    </Accordion>

</div>