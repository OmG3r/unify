<script>
    import {navigate} from 'svelte-routing'
    import {onMount} from 'svelte'
    export let path = ""
    onMount(() => {
        
        navigate(path, {replace: true})
    })

</script>