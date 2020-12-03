<style>
    .u-view {
        flex-grow: 1;
    }

    header {
        padding: 12px 8px;
        min-height: 100vh;
    }

    .kpi-card {
        padding: 8px;
        border-radius: 3px;
        display: flex;
        width: 250px;
    }

    .kpi-card .u-number {
        font-weight: bold;
        font-size: 18px;
    }
</style>


<script>
    const kpis = {
        "orders": {
            img: '/imgs/misc/receipt.png',
            value: '42',
            desc: 'Number of orders'
        },
        "profit": {
            img: '/imgs/misc/profit.png',
            value: 'TND 124',
            desc: 'Profit'
        },
        "pay": {
            img: 'imgs/misc/pay.png',
            value: 'TND 65'
        }
    }


</script>


<div class="u-view">
    <header>


    </header>

    <div class="kpi-cards">
        <div class="kpi-card">
            <div class="u-image">

            </div>
            <div class="u-content">
                <div class="u-number">
                    $50
                </div>
                <div class="u-description">

                </div>
            </div>  

        </div>

    </div>
    
</div>