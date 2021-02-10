<style>
    .exit_button{
    position: absolute;
    font-size: 25px;
    font-weight: 600;
    top: -5px;
    right: 25px;
    cursor: pointer;
    }
    .editphone {
        display: flex;
        flex-direction: row-reverse !important;
    }

    .address_input{
    width: 100%;
    margin-top: 10px;
    height: 120px;
    border-radius: 8px;
    border: 1px solid #ababab;
}
    hr  {
        border-top: 1px solid rgba(var(--userColor),0.3);
        margin: 0px;
        width: 100%;
    }

.region,.city{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
}
.selects {
   margin-top: 10px;
   width: 100%;
   border-radius: 8px;
   border: 1px solid #ababab;
   height: 40px;
}

.phone_num .inputs{
    width: 100%;
    display:flex;
    flex-direction: row;
}
.inputs .country_num{
    width: 50px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
    margin-left: 8px;
    padding: 8px 0;
    display: flex;
    justify-content: center;
    font-size: 16px;

}
.inputs .num{
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
}

.Save_btn{
    width: 60%;
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Save_btn button{
    width: 95%;
    height: 50px;
    border-radius: 5px;
    margin: 15px 20px 15px 20px;
}
.Save_btn button:active{
    background-color: rgba(var(--AccentColor),.8);
}
.name_lastname{
    display: flex;
    flex-direction: row;
   
    margin:20px;
}
.name_lastname .first_name,.name_lastname .last_name{
    display:flex;
    flex-direction: column;
    width: 50%;
}
.name_lastname .first_name{
    margin-right: 15px;
}
.first_name_input,.last_name_input{
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ababab;
    margin-top: 10px;
}

.phone_num{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:20px;
}
.address{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
}

.bg_edit_address_popup{
    display: block; /* Hidden by default */
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    overflow-y: hidden;
}
.edit_address_popup{
    background-color: #fefefe;
    width: 60%; /* Could be more or less, depending on screen size */
    padding: 0px 0 20px 0;
    position: relative;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: black gray;
    height: 500px;
}
.edit_address_popup input, .edit_address_popup select {
    padding: 0 16px;
}
.edit_address_popup textarea {
    padding: 16px;
}

.edit_address_popup::-webkit-scrollbar {
    width: 11px;
}
.edit_address_popup::-webkit-scrollbar-track {
    background-color: #8b8e90;
}
.edit_address_popup::-webkit-scrollbar-thumb {
    background-color: #181d22;
    border-radius: 10px;
}
.popup_title{
    width: 60%;
    background-color: white;
    border-radius: 10px 10px 0 0;
    background-color: #fefefe;
}
.popup_title .popup_title_text{
    font-size: 20px;
    font-weight: 600;
    margin: 15px 0px 15px 20px;
    position: relative;
}


</style>


<script>
    import {link} from 'svelte-routing'
    import {user} from '../../firebase.js'
    import {states} from '../../states.js'
    import Select from 'svelte-select';
    export let form = {
        info: {}
    }
    export let popup;
    console.log(form)

    const handleSelectState = (event) => {
        form.info.state = event.detail.value
        form.info.city = states[form.info.state].cities[0]
        form.info.postal = states[form.info.city].postals[0]
    }

    const handleSelectCity = (event) => {
        form.info.city = event.detail.value
    }
    const handleSelectPostal = (event) => {
        form.info.postal = event.detail.value
        console.log(form)
    }
</script>


<div class="bg_edit_address_popup">

    <div class="popup_title">
            <div class="popup_title_text">
                Modifier l'adresse
                <div class="exit_button" on:click={()=>{ $popup=false;}}>
        X
    </div>
            </div> 
            <hr>
    </div>
    <div class="edit_address_popup">
        <div class="name_lastname">
            <div class="first_name">
                Name *:
                <input type="text" bind:value={form.info.name} class="first_name_input">
            </div>
            
            
        </div>

        <div class="phone_num">
            <div class="phone_num_text">Phone Number *:</div>
            <div class="inputs editphone">
                <a href="/phoneverification?backurl=/checkout" use:link class="country_num">Edit</a>
                <input disabled type="text" value={$user.phoneNumber} class="num" >  
            </div>
            
        </div>
        <div class="address">
            Address *:
            <textarea bind:value={form.info.address} type="text"  class="address_input"></textarea>
        </div>

        <div class="region">
            Region *:
            <!--
            <select bind:value={form.info.state} class="selects" name="region" id="region_id">
                {#each Object.keys(states) as state, i}
                    <option selected={i==0}>{state}</option>
                {/each}
                
            </select>
            -->
            <Select items={Object.keys(states).map((i) => {return {value: i, label: i}})} selectedValue={{value: form.info.state, label: form.info.state}} on:select={handleSelectState}></Select>
        </div>
        <div class="city">
            City *:
            <!--<select bind:value={form.info.city} class="selects" name="city" id="city_id">
                {#each states[form.info.state ? form.info.state : "Tunis"].cities as city, i}
                    <option select={i == 0}>{city}</option>
                {/each}
            </select>-->
            <Select items={states[form.info.state ? form.info.state : "Tunis"].cities.map((i) => {return {value: i, label: i}})} selectedValue={{value: form.info.city, label: form.info.city}}  on:select={handleSelectCity}></Select>
        </div>
        <div class="city">
            Postal Code *:
            <!--<select bind:value={form.info.postal} class="selects" name="postal" id="postal_id">
                {#each states[form.info.state ? form.info.state : "Tunis"].postals as postal, i}
                    <option select={i == 0}>{postal}</option>
                {/each}
            </select>-->
            <Select items={states[form.info.state ? form.info.state : "Tunis"].postals.map((i) => {return {value: i, label: i}})} selectedValue={{value: form.info.postal, label: form.info.postal}}  on:select={handleSelectPostal}></Select>
        
        </div>
        

    </div>

    <div class="Save_btn">
        <hr>
        <button on:click={() => {$popup = false}} >Save</button>
    </div>


</div>
