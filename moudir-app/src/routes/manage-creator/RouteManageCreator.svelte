
<script>
    import { Router, Route } from "svelte-routing";
    import ManageCreators from './ManageCreators.svelte'
    import OneCreator from './OneCreator.svelte'
</script>



<Router >
        
    <Route path="/">
        <ManageCreators />
    </Route>

    <Route let:params path="/:username">

        <OneCreator {params} />
    </Route>

    
</Router>
