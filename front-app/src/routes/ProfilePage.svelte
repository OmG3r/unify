<style>


</style>

<script>
    import {navigate} from 'svelte-routing'
    import {onMount} from 'svelte'
    import {dbWrapper} from '../firebase.js'

    export let params
    onMount(async () => {
        console.log("mounted")
        let data = await dbWrapper.get('/creators/' + params.userid)
        if (Object.keys(data).length == 0) {
            console.log("homepage send")
            navigate('/')
        } else {
            console.log("sending")
            navigate('/' + params.userid + '/merch', { replace: true })
        }

        

        
    })



</script>