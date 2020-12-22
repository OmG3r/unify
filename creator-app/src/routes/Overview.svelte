<script>
    import { link } from "svelte-routing";
    import ViewNav from '../comps/ViewNav.svelte'
    const kpis = {
        orders: {
            img: "/imgs/misc/receipt.png",
            value: (async () => {
                return "42";
            })(),
            desc: "Number of orders",
        },
        profit: {
            img: "/imgs/misc/profit.png",
            value: (async () => {
                return "TND 142";
            })(),
            desc: "Profit",
        },
        pay: {
            img: "imgs/misc/pay.png",
            value: (async () => {
                return "TND 31";
            })(),
            desc: "Money to be paid out",
        },
    };
</script>

<style>
    .u-view {
        width: 100%;
    }
    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #d8dae0;
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

    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        height: 69px;
        background-color: white;
        align-items: center;
    }
    .u-button {
        padding: 6px 12px;
        background-color: #46b978;
        border-color: #46b978;
        color: white;
        cursor: pointer;
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.34),
            0 0px 10px rgb(70 185 120 / 0.32);
        font-weight: bold;
        border-radius: 3px;
        height: 40px;
    }
    .u-button:hover {
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.5),
            0 0px 10px rgb(70 185 120 / 0.5);
    }

    .kpi-section {
        width: 100%;
    }
    .kpi-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px 70px;
    }
    .kpi-header-title {
        font-weight: bold;
        font-size: 30px;
        color: #495057;
        margin-bottom: 10px;
    }
    .analytics-filter {
        width: max-content;
        padding: 6px 10px;
        border-radius: 12px;
        background-color: #46b978;
        border-color: #46b978;
        color: white;
        cursor: pointer;
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.34),
            0 0px 10px rgb(70 185 120 / 0.32);
    }
    .analytics-filter:hover {
        box-shadow: 0 0px 10px rgb(70 185 120 / 0.5),
            0 0px 10px rgb(70 185 120 / 0.5);
    }

    .analytics-filter select {
        background-color: #46b978;
        border: none;
        color: white;
        font-weight: 600;
        appearance: none;
        outline: none;
        cursor: pointer;
    }

    .kpi-cards {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .kpi-card {
        padding: 30px 30px;
        border-radius: 3px;
        display: flex;
        width: 320px;
        background-color: white;
        margin: 0 16px;
        border-radius: 15px;
        box-shadow: 0 0px 40px -9px rgba(0, 0, 0, 0.15);
        cursor: pointer;
    }
    .kpi-card:hover {
        box-shadow: 0 0px 40px -9px rgba(0, 0, 0, 0.3);
    }

    .kpi-card .u-image {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
    }
    .kpi-card .u-image img {
        display: block;
        max-width: 50px;
    }

    .kpi-card .u-number {
        font-weight: bold;
        font-size: 35px;
        margin-bottom: 8px;
        color: #495057;
    }

    .kpi-card .u-description {
        font-size: 20px;
        opacity: 0.8;
    }
</style>

<div class="u-view">
    <ViewNav />
    <section class="kpi-section">
        <div class="kpi-header">
            <div class="kpi-header-title">Analytics Overview</div>
            <div class="analytics-filter">
                <i class="far fa-calendar-alt" />
                <select>
                    <option>Active</option>
                    <option>Past week</option>
                    <option>Past Month</option>
                    <option>Past Year</option>
                </select>
            </div>
        </div>
        <div class="kpi-cards">
            {#each Object.entries(kpis) as [key, kpi]}
                <div class="kpi-card">
                    <div class="u-image"><img src={kpi.img} alt={key} /></div>
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
                        <div class="u-description">{kpi.desc}</div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>
