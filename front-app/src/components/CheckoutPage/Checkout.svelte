<script>
import Completion from './orderCompletion.svelte';
import Summary from './orderSummary.svelte';

</script>

<style>
.container{
    display: flex;
    padding: 20px 80px 20px 80px;
}

@media only screen and (max-width: 1000px) {
    .container {
        flex-direction: column-reverse;
        overflow: hidden;
    }
}
</style>
<div class="container">
<Completion/>
<Summary/>
</div>
