<script>
    import {Route} from 'tinro'; 
    import Articlator from './Articlator.svelte'
</script>


<Route path="/">
    main faq

</Route>

<Route path="/:article">
    <Articlator />

</Route>