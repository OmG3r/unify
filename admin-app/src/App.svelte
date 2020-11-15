<script>
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import NotFound from './routes/NotFound.svelte'
    export let url = "";
</script>

<Router url="{url}">
    <Route path="/start"><Home /></Route>

    <Route path="*"><NotFound /></Route>
</Router>