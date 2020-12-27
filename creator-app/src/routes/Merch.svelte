<style>


</style>


<script>
    import { Router, Link, Route, link } from "svelte-routing";
    import VerifyLogin from '../comps/VerifyLogin.svelte'
    import All from './Merch/All.svelte'
    import Create from './Merch/Create.svelte'
    import Designer from './Merch/Designer.svelte'
    import Modify from './Merch/Modify.svelte'
</script>


<Router>

    <Route path="/all">
            <All />
    </Route>
    <Route path="/create">
            <Create />
    </Route>
    <Route let:params path="/create/:itemid">
        <Designer {params} />
    </Route>
    <Route let:params path="/modify/:itemid">
        <Modify {params} />
    </Route>


</Router>