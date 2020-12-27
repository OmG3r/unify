<style>


</style>

<script>
    import {navigate} from 'svelte-routing'
    import {onMount} from 'svelte'
    import {dbWrapper} from '../firebase.js'

    export let params
    onMount(async () => {
        let data = await dbWrapper.get('/creators/' + params.userid)
        if (Object.keys(data).length == 0) {
            navigate('/')
        } else {
            navigate('/' + params.userid + '/merch')
        }

        

        
    })



</script>