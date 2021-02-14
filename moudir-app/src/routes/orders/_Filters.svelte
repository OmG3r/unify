<style>
    .u-filters {
        width: 100%;
        padding: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .u-filter {
        min-width: 340px;
        margin: 20px;
    }
    .u-filter-title {
        text-align: center;
        margin-bottom: 8px;
    }
    .u-input {
        height: 42px;
        border: 1px solid #d8dbdf;
        padding: 6px 10px;
        width: 100%;
        outline: none;
    }
    .u-input:focus {
        border: 1px solid #006fe8;
        
    }

    .date-parts {
        display: flex;
    }
    .date-part {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .date-part-title {
        margin-bottom: 8px;
    }
</style>


<script>
    import {states} from '../../states.js'
    export let filters
    import Select from 'svelte-select';
    export let carts
    export let statusData
    import {onDestroy} from 'svelte'
    const handleStatus = (event) => {
        console.log('selected status:');
        console.log(event.detail)
        if (event.detail) {
            $filters = {
                ...$filters,
                statuses: event.detail.map((i) => i.value)
            }
        } else {
            $filters = {
                ...$filters,
                statuses: []
            }
        }
       
    }
  
    let generateCreatorsList = (carts) => {
        let creators = []
        for (let cart of Object.values(carts)) {
            for ( let item of Object.values(cart.items)) {
                if (!creators.includes(item.creator)) {
                    creators.push(item.creator)
                }
                
            }
        }
        return creators
    }
    let creatorsList = []

    let allModels = []
    let unsubscribeCart = carts.subscribe((v) => {
        allModels = v.reduce((acc, curr) => {
            for( let model of Object.keys(curr.items)) {
                if (!acc.includes(model)) {
                    acc.push(model)
                }
            }
            return acc
        },[])
        creatorsList = generateCreatorsList(v)
    })

    onDestroy(() => {
        unsubscribeCart()
    })
    const handleCreator = (event) => {
        console.log('selected creators')
        console.log(event.detail)
        allModels = $carts.reduce((acc, curr) => {
            for( let model of Object.keys(curr.items)) {
                if (!acc.includes(model)) {
                    acc.push(model)
                }
            }
            return acc
        },[])

        let filteredModels = $filters.models.filter((item) => allModels.includes(item))

        if (event.detail) {
            $filters = {
                ...$filters,
                creators: event.detail.map((i) => i.value),
                models: filteredModels
            }
        } else {
            $filters = {
                ...$filters,
                creators: [],
                models: []
            }
        }
    }
    
    const handleModel = (event) => {
        if (event.detail) {
            $filters = {
                ...$filters,
                models: event.detail.map((i) => i.value)
            }
        } else {
            $filters = {
                ...$filters,
                models: []
            }
        }
    }
    const handleStart = (event) => {
        console.log('selected start date')
        console.log(event.target.value)
        
        let todayUnix = 0
        if (event.target.value) {
            let [year, month, day] = event.target.value.split("-")
            const date = new Date(Number(year), Number(month - 1), Number(day), 0, 0, 0);
            todayUnix = date.getTime() / 1000
        }
        $filters = {
            ...$filters,
            date: {
                ...$filters.date,
                start: todayUnix
            }
        }
    }
    const handleEnd = (event) => {
        console.log('selected end date')
        console.log(event.target.value)
        let todayUnix = 0
        if (event.target.value) {
            let [year, month, day] = event.target.value.split("-")
            const date = new Date(Number(year), Number(month - 1), Number(day), 0, 0, 0);
            todayUnix = date.getTime() / 1000
        }
        
        
        $filters = {
            ...$filters,
            date: {
                ...$filters.date,
                end: todayUnix
            }
        }
    }
    let debouncer = undefined
    const handleSearch = (event) => {
        
        if (debouncer) {
            clearTimeout(debouncer)
        }
        debouncer = setTimeout(() => {
            console.log('selected search')
            console.log(event.target.value)
            $filters = {
                ...$filters,
                search: event.target.value
            }
        }, 500)
    }
    let selectStatuses = Object.entries(statusData).map(([key, value]) => {
        return {label: value.text, value: key}
    })
    const getMinMaxDate = () => {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        let day = String(firstDay.getDate())
        if (String(day).length == 1) {
            day = "0" + day
        }
        console.log(day)
        let month = String(date.getMonth() + 1 )
        if (String(month).length == 1) {
            month = "0" + month
        }
        let lastDayString = String(lastDay.getDate())
        if (lastDayString.length == 1) {
            lastDayString = "0" + lastDayString
        }
        let min =date.getFullYear() + "-" + month + "-" + day
        let max = date.getFullYear() + "-" + month + "-" + lastDayString
        let resp = [min, max]
        
        return  resp
    }
    let [minDate, maxDate] = getMinMaxDate()

    let acceptedCitiesPostals = {cities: [], postals: []}
    const handleSelectState = (event) => {
        let v = ''
        if (event.detail) {
            v = event.detail
            console.log(event.detail)
            acceptedCitiesPostals = v.reduce((acc, curr) => {
                acc.cities.push(...states[curr.value].cities)
                acc.postals.push(...states[curr.value].postals)
                return acc
            }, {cities: [], postals: []})
            console.log('test')
            console.log($filters.address.cities)
            console.log(acceptedCitiesPostals.cities)
            let newCities =  $filters.address.cities.filter((item) => acceptedCitiesPostals.cities.includes(item))
            let newPostals = $filters.address.postals.filter((item) => acceptedCitiesPostals.postals.includes(item))
            $filters = {
                ...$filters,
                address: {
                    ...$filters.address,
                    states: v.map((i) => i.value),
                    cities: newCities,
                    postals: newPostals
                }
            }
        
        } else {
            $filters = {
                ...$filters,
                address: {
                    ...$filters.address,
                    states: [],
                    cities: [],
                    postals: []
                }
            }
        }
        
        

        
        
    }

    const handleSelectCity = (event) => {
        let v = []
        if (event.detail) {
            v = event.detail.map((i) => i.value)
        }
        $filters = {
            ...$filters,
            address: {
                ...$filters.address,
                cities: v,
            }
        }
    }
    const handleSelectPostal = (event) => {
        let v = []
        if (event.detail) {
            v = event.detail.map((i) => i.value)
        }
        console.log(v)
        $filters = {
            ...$filters,
            address: {
                ...$filters.address,
                postals: v,
            }
        }
    }

    
    
</script>


<div class="u-filters">
    <div class="u-filter">
        <div class="u-filter-title">Status</div>
        <Select items={selectStatuses} on:select={handleStatus} isMulti={true}/>
    </div>
    <div class="u-filter">
        <div class="u-filter-title">Creators</div>
        <Select items={creatorsList} on:select={handleCreator} isMulti={true}/>
    </div>
    <div class="u-filter">
        <div class="u-filter-title">Models</div>
        <Select items={allModels} selectedValue={$filters.models} on:select={handleModel} isMulti={true}/>
    </div>
    <div class="u-filter">
        <div class="date-parts">
            <div class="date-part">
                <div class="date-part-title">State</div>
                <Select items={Object.keys(states)} on:select={handleSelectState} isMulti={true}/>
            </div>
            <div class="date-part">
                <div class="date-part-title">City</div>
                <Select
                items={acceptedCitiesPostals.cities} 
                selectedValue={$filters.address.cities}
                on:select={handleSelectCity} isMulti={true}/>
            </div>
            <div class="date-part">
                <div class="date-part-title">Postal</div>
                <Select
                items={acceptedCitiesPostals.postals}
                selectedValue={$filters.address.postals}
                on:select={handleSelectPostal} isMulti={true}/>
            </div>
        </div>

    </div>
    
    <div class="u-filter">
        
        <div class="date-parts">
            <div class="date-part">
                <div class="date-part-title">Date Start</div>
                <input min={minDate} max={maxDate} on:change={handleStart} class="u-input" type="date">
            </div>
            <div class="date-part">
                <div class="date-part-title">Date End</div>
                <input min={minDate} max={maxDate} on:change={handleEnd} class="u-input" type="date">
            </div>
        </div>
        
    </div>
    <div class="u-filter">
        <div class="u-filter-title">Search</div>
        <input placeholder="CartID,Client Name, Phone Number" on:input={handleSearch} class="u-input" type="text">
    </div>


</div>