<script>
import Layout from "../components/UserProfile/Layout.svelte";
import {onMount} from 'svelte'
import {navigate} from "svelte-routing";

export let params = {}
onMount(async () => {
 navigate("/myaccount/profile");
});
</script>

<style>
.User_profile{
    padding: 100px 50px 30px 50px;
}
 @media only screen and (max-width: 1180px) {
     .User_profile{
    padding: 100px 10px 30px 10px;
}
 }
</style>
<div class="User_profile">
    <Layout {params}/>
</div>


