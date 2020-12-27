<script>
import Completion from './orderCompletion.svelte';
import Summary from './orderSummary.svelte';

</script>

<style>
.container{
    display: grid;
    grid-template-columns: 80% 20%;
    padding: 20px 80px 20px 80px;
}
</style>
<div class="container">
<Completion/>
<Summary/>
</div>
