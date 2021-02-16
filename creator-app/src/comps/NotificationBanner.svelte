<style>
    .u-notification-banner {
        width: 100%;
        background-color: #46b978;
        color: white;
        font-weight: bold;
        position: relative;
        padding: 8px 10px;
        text-align: center;
    }
    .u-close {
        position: absolute;
        right: 16px;
        top: 0;
        bottom: 0;
        max-width: 16px;
        display: block;
        margin: auto;
    }
</style>

<script>
    export let text = ""
    export let closed = false
    
</script>
{#if !closed}
    <div class="u-notification-banner">
        <span>{@html text}</span>
        <img on:click={() => {closed = true}} class="u-close" src="/imgs/misc/close-white-bold.png" alt="close">
    </div>
{/if}