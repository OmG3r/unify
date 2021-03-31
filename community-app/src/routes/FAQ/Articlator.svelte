<style>
    .u-view {
        width: 100%;
        min-height: 100vh;

        display: flex;
    }
    .u-content-area {
        padding: 30px;
        width: 100%;
    }
</style>

<script>
    import {router, meta} from 'tinro'
    import {onDestroy} from 'svelte'
    import {faqs} from '../../store'
    import SideNav from './SideNav.svelte'
    const route = meta()
    let article = ""
    let content = ""
    const unsubscribeRoute = route.subscribe(async (v) => {
        
        
        article = v?.params?.article
        content = "no article"
        if (article) {
            let resp = await fetch('/articles/' + article + ".md")
            if (resp.ok) {
                content = await resp.text()
            }
        }
    })
    onDestroy(() => {
        unsubscribeRoute()
    })
</script>
<div class="u-view">
    <SideNav />

    <div class="u-content-area">

        {@html marked(content)}
    </div>

</div>

