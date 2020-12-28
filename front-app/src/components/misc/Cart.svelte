<style>
    .basket {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
            brightness(102%) contrast(102%);
        width: 26px;
    }
    .basket-container {
        position: relative;
    }
    .number {
        position: absolute;
        font-size: 12px;
        bottom: 0;
        right: 0;
        background-color: #46b978;
        width: 13px;
        height: 13px;

        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
</style>


<script>
    import {crat} from '../../store.js'
    import {link} from 'svelte-routing'

</script>


<a class="basket-container" use:link href="/checkout">
    <img
        class="basket"
        src="/img/misc/shopping-basket.svg"
        alt="shopping basket" />
    {#if $crat && Object.keys($crat).length > 0}
        <div class="number">{Object.keys($crat).length}</div>
    {/if}
</a>