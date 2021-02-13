<style>
    .u-filters {
        width: 100%;
        padding: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .u-filter {
        width: 340px;
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
    export let filters
    import Select from 'svelte-select';
    const statuses = [
        'In Progress',
        'Printing',
        'In Delivery',
        'Delivered',
        'Returned',
        'Cancelled'
    ]
    const handleStatus = (event) => {
        console.log('selected status:');
        console.log(event.detail)
        $filters = {
            ...$filters,
            statuses: event.detail.map((i) => i.value)
        }
    }
    const handleCreator = (event) => {
        console.log('selected creators')
        console.log(event.detail)
        $filters = {
            ...$filters,
            creators: event.detail.map((i) => i.value)
        }
    }
    
    
    const handleStart = (event) => {
        console.log('selected start date')
        console.log(event.target.value)
        
        let fdata = {}
        if (event.target.value) {
            var [year, month, day] = event.target.value.split("-")
        }
        
        fdata = {year, month, day}
        console.log(fdata)
        $filters = {
            ...$filters,
            date: {
                ...$filters.date,
                start: fdata
            }
        }
    }
    const handleEnd = (event) => {
        console.log('selected end date')
        console.log(event.target.value)
        let fdata = {}
        if (event.target.value) {
            var [year, month, day] = event.target.value.split("-")
        }
        
        fdata = {year, month, day}
        console.log(fdata)
        $filters = {
            ...$filters,
            date: {
                ...$filters.date,
                end: fdata
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
    
</script>


<div class="u-filters">
    <div class="u-filter">
        <div class="u-filter-title">Status</div>
        <Select items={statuses} on:select={handleStatus} isMulti={true}/>
    </div>
    <div class="u-filter">
        <div class="u-filter-title">Creators</div>
        <Select items={['testuser', 'ahmedbm']} on:select={handleCreator} isMulti={true}/>
    </div>
    <div class="u-filter">
        
        <div class="date-parts">
            <div class="date-part">
                <div class="date-part-title">Date Start</div>
                <input on:change={handleStart} class="u-input" type="date">
            </div>
            <div class="date-part">
                <div class="date-part-title">Date End</div>
                <input on:change={handleEnd} class="u-input" type="date">
            </div>
        </div>
        
    </div>
    <div class="u-filter">
        <div class="u-filter-title">Search</div>
        <input on:input={handleSearch} class="u-input" type="text">
    </div>


</div>