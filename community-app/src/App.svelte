<script>
    import {Route} from 'tinro'; 
	import Home from './routes/Home.svelte'
	import FAQ from './routes/FAQ/FAQ.svelte'
</script>


<Route path="/*" firstmatch>
	<Route path="/">
		<Home />
	</Route>
	<Route path="/faq/*" firstmatch>

		<FAQ />
	</Route>
	<Route path="/*">
		nothing
	</Route>
	
</Route>


