<script>
    import { link } from "svelte-routing";
    import ViewNav from '../comps/ViewNav.svelte'
    import Orders from '../comps/orders.svelte'
    import {onMount, onDestroy} from 'svelte'
    import {auth, db, user} from '../firebase.js'
    import {uuidToImageLink} from '../utils.js'
    import { accentColor } from "../store.js";

    document.title = "Unify Creator - Overview"
    let kpis = {
        orders: {
            img: "/imgs/misc/receipt.png",
            value: "Loading...",
            desc: "Number of orders",
        },
        profit: {
            img: "/imgs/misc/profit.png",
            value: "Loading...",
            desc: "Profit",
        },
        pay: {
            img: "imgs/misc/pay.png",
            value: 0,
            desc: "Money to be paid out",
        },
    };
    let carts = []
    let first = true
    let unsubscribeDB = () => {};
    onMount(async () => {
        if (Notification.permission !== "denied" && Notification.permission != "granted") {
            Notification.requestPermission()
        }
        
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        let merchData =(await db.doc('/creators/' + $user.claims.username + "/merch/all").get()).data()
        unsubscribeDB = db.doc('creators/' + $user.claims.username + "/orders/all").onSnapshot((doc) => {
            first = false
            let data = doc.data()
            if (data == undefined) {
                carts = []
                kpis.profit.value = 0
                kpis.orders.value  = 0
                return
            }
            let orders = data.orders
            carts = Object.entries(orders).map(([cartID, cart]) => {
                cart.cartID = cartID
                cart.timestamp = cart.timestamp.seconds
                for( let [key, item] of Object.entries(cart.items)) {
                    let itemData = merchData[item.id]
                    let uuid = itemData.imgs[item.color][itemData.featuredFace]
                    let path = "creators/" + $user.claims.username + "/merch/" + item.id + "/" + itemData.featuredFace + "-" + item.color 
                    item.img = uuidToImageLink(uuid, path)
                    item.name = itemData.name
                    if (item.status == undefined) {
                        item.status = "In Progress"
                    }
                }
                return cart
            })
            carts.sort((a, b) => b.timestamp - a.timestamp)
            carts = carts
            
            let escrow = 0
            let secured = 0
            let kpiVaues = {
                orders : {
                    secured: 0,
                    escrow: 0
                },
                profit: {
                    secured: 0,
                    escrow: 0
                }
            }
            for (let cart of carts) {
                for (let [key, item] of Object.entries(cart.items)) {
                    if ([undefined, "In Progress", "Printig", "In Delivery"].some((i) => item.status == i)) {
                        kpiVaues.profit.escrow += (item.profit * item.quantity)
                        kpiVaues.orders.escrow += 1
                    } else if (item.status == "Delivered") {
                        kpiVaues.profit.secured += (item.profit * item.quantity)
                        kpiVaues.orders.secured + 1
                    }
                }
            }

            kpis.orders.value = String(kpiVaues.orders.secured) + " (" + kpiVaues.orders.escrow + ")"
            kpis.profit.value = String(kpiVaues.profit.secured) + " (" + kpiVaues.profit.escrow + ")"
            kpis = kpis
            if (!document[hidden]) {
                lastcart = carts
            } else {
                if (!first) {
                    
                    
                    let diff = carts.filter((item) => !lastcart.some((x) => x.cartID == item.cartID))
                    document.title = "(" + String(diff.length) + ") Orders"
                    
                    const greeting = new Notification('Unify',{
                        body: "(" + String(diff.length) + ") Orders",
                        icon: './imgs/icon.png'
                    });
                    
                    setTimeout(() => {
                        if (nameInter) {
                            clearInterval(nameInter)
                        }
                        nameInter = setInterval(() => {
                            document.title = "(" + String(diff.length) + ") Orders"
                        }, 2000);  
                    }, 1000);
                    
                    if (orderInter) {
                        clearInterval(orderInter)
                    }
                    orderInter = setInterval(() => {
                        document.title = "Unify Creator - Overview"
                    }, 2000);
                }
                   
                
                
            }
            console.log(carts)
            /*
            for (let [cartID, cart] of Object.entries(orders)) {
                for(let [itemSlug, value] of cart.items) {
                    value.cartID = cartID
                    value.name = cart.name
                    value.timestamp = cart.timestamp
                }
            } 
            */
           first = false
        })
    })
    let nameInter = undefined
    let orderInter = undefined
     var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    }
    let lastcart = []
    const handleVisibilityChange = () => {
        if (document[hidden]) {
            lastcart = carts
        } else {
            if (document.title.includes('Orders')) {
                document.title = "Unify Creator - Overview"
                
            }
            clearInterval(nameInter)
                clearInterval(orderInter)
        }
    }
   
    
    onDestroy(() => {
        unsubscribeDB()
        document.removeEventListener(visibilityChange, handleVisibilityChange)
    })
</script>

<style>
    .u-view {
        width: 100%;
        padding: 80px 80px 80px 80px;
        position: relative;
        
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
        
        border-radius: 12px;
        color: white;
        cursor: pointer;
        
    }
    

    .analytics-filter select {
        background-color: #46b978;
        border: none;
        color: white;
        font-weight: 600;
        appearance: none;
        outline: none;
        cursor: pointer;
            padding: 6px 10px;
    border-radius: 12px;
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
        width: 100%;
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
    @media only screen and (max-width: 1180px) {
        .kpi-cards{
            flex-direction: column;
        }
        .kpi-cards div{
            margin: 10px 0 10px 0;
            width: 100%;  
        }
        .u-view{
            padding: 80px 0 80px 0
        }
    }
</style>

<div class="u-view">
    <ViewNav />
    <section class="kpi-section">
        <div class="kpi-header">
            <div class="kpi-header-title">Analytics Overview</div>
            <div class="analytics-filter">
                <i class="far fa-calendar-alt" />
            <select style="background-color:{$accentColor};">
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

    <Orders {first} {carts}/>
</div>
