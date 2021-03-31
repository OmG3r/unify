<style>
    .u-drop-down-container {
        width: 100%;
        
        border-bottom: 1px solid #E1E5EA;
        padding: 6px 0;
    }

    .u-drop-down-title {
        padding: 8px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        font-weight: bold;
    }

    .u-drop-down-title:hover {
        background-color: #F2F2F2;
    }
    .u-drop-down-title img {
        display: block;
        width: 18px;
        margin-right: 4px;
        transform: rotate(-90deg);
        transition: all 0.2s ease-in;
    }

    .u-drop-down-title img.collapsed {
        transform: none;
    }

    .u-drop-down-item {
        font-weight: bold;
        display: block;
        width: 100%;
        padding: 5px 0 5px 12px;
    }

    .u-dropdown-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        


        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
    }
</style>


<script>
    export let dropdownTitle
    export let links
    let collapsed = true
    const toggle = () => {
        if (collapsed) {
            hider.style.maxHeight = hider.scrollHeight + "px";
            collapsed = false
        } else {
            hider.style.maxHeight = null
            collapsed = true
        }
    }
    let hider;
</script>

<div class="u-drop-down-container">
    <div on:click={toggle} class="u-drop-down-title">
        <span>{dropdownTitle}</span>
        <img class:collapsed={collapsed} src="/imgs/caret.png" alt="caret">
    </div>
    <div bind:this={hider} class="u-dropdown-content">
        {#each Object.entries(links) as [title, slug]}
            <a href={"/faq/" + slug} class="u-drop-down-item">
                {title}
            </a>
        {/each}
    </div>
</div>