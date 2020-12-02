<style>


</style>


<script>
    import { Router, Link, Route, link } from "svelte-routing";
    import VerifyLogin from '../comps/VerifyLogin.svelte'
    import All from './Merch/All.svelte'
    import Create from './Merch/Create.svelte'
</script>

merch

<Router>

    <Route path="/all">
        <VerifyLogin >
            <All />
        </VerifyLogin>
    </Route>
    <Route path="/create">
        <VerifyLogin >
            <Create />
        </VerifyLogin>
    </Route>
</Router>