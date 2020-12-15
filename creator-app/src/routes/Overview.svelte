<style>
    .u-view {
        flex-grow: 1;
        min-height: 100vh;
    }

    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #D8DAE0;
        padding: 8px 12px;
        height: 54px;
        align-items: center;
    }
    .u-button {
        padding: 6px 12px;
        background-color: #4a5aed;
        color: white;
        font-weight: bold;
        border-radius: 3px;
    }

    .kpi-section {
        width: 100%;
    }
    .kpi-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
    }
    .kpi-header-title {
        font-weight: bold;
        font-size: 18px;
    }
    .analytics-filter {
        padding: 8px 6px;
    }
    .kpi-cards {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .kpi-card {
        padding: 16px 16px;
        border-radius: 3px;
        display: flex;
        width: 250px;
        background-color: white;
        margin: 0 16px;
    }
    .kpi-card .u-image {
        
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;

    }
    .kpi-card .u-image img {
        display: block;
        max-width: 32px;
    }

    .kpi-card .u-number {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 8px;
    }

    .kpi-card .u-description {
        font-size: 14px;
        opacity: 0.8;
    }
</style>


<script>
    import {link} from 'svelte-routing'
    const kpis = {
        "orders": {
            img: '/imgs/misc/receipt.png',
            value: (async () => {
                return '42'
            })(),
            desc: 'Number of orders'
        },
        "profit": {
            img: '/imgs/misc/profit.png',
            value: (async () => {
                return 'TND 142'
            })(),
            desc: 'Profit'
        },
        "pay": {
            img: 'imgs/misc/pay.png',
            value: (async () => {
                return 'TND 31'
            })(),
            desc: 'Money to be paid out'
        }
    }


</script>


<div class="u-view">
    <header>
        <a use:link href="/merch/create" class="u-button">
            Create Merch
        </a>
    </header>
    <section class="kpi-section">
        <div class="kpi-header">
            <div class="kpi-header-title">Analytics Overview</div>
            <select class="analytics-filter">
                <option>Active</option>
                <option>Past week</option>
                <option>Past Month</option>
                <option>Past Year</option>
            </select>
        </div>
        <div class="kpi-cards">
        
            {#each Object.entries(kpis) as [key, kpi]}
                <div class="kpi-card">
                    <div class="u-image">
                        <img src={kpi.img} alt={key}>
                    </div>
                    <div class="u-content">
                        <div class="u-number">
                            {#await kpi.value}
                                <!-- promise is pending -->
                                loading...
                            {:then value}
                                <!-- promise was fulfilled -->
                                <p>{value}</p>
                            {:catch error}
                                <!-- promise was rejected -->
                                <p>XXXX</p>
                            {/await}
                        </div>
                        <div class="u-description">
                            {kpi.desc}
                        </div>
                    </div> 
                </div>
            {/each}
             
        </div>
    </section>
    
    
</div>