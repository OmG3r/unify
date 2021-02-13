<style>
    .u-table {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .u-table-head {
        width: 100%;
        display: flex;
        padding: 10px 10px 10px 20px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 0px 15px #0000001c;
        background-color: white;
    }

    .u-table-body {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .u-item {
        width: 100%;
        display: flex;
        margin: 10px 0;
        height: 140px;
        max-height: 140px;
        padding: 10px 5px 10px 5px;
        box-shadow: 0px 0px 15px #0000001c;
        background-color: white;
    }
    .u-table-head > div {
        text-align: center;
       
    }

    .t-head-cart-session-id, .t-body-cart-session-id {
        width: 20%;
    }
    .t-head-item-info, .t-body-item-info {
        width: 30%
    }

    .t-head-client-info, .t-body-client-info {
        width: 30%
    }
    .t-head-date, .t-body-date {
        width: 10%;
    }
    .t-head-status, .t-body-status {
        width: 10%;
    }
    .t-body-cart-session-id {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .t-body-item-info {
        display: flex;
    }
    .u-item-image {
        width: 50%;
        display: flex;
        justify-content: center;
    }
    .u-item-image img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        box-shadow: 0px 0px 15px #0000001c;
        border-radius: 4px;
    }
    .u-item-info-data {
        width: 50%;
        height: 100%;
    }
    
    .u-item-quantity-price {
        display: flex;
        justify-content: space-between;

    }
    .u-item-name {
        font-weight: bold;
        font-size: 20px;
    }
    .u-item-color-size {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    .u-item-size, .u-item-color {
        display: flex;
        align-items: center;
        
    }
    .color-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 8px;
    }
    .u-size {
        width: 15px;
        height: 15px;
        background-color: #181D22;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        margin-left: 12px;
    }
    .u-item-price {
        font-weight: bold;
        font-size: 18px;
        color: var(--AccentColor)
    }
    .u-item-creator {
        font-size: 12px;
        font-weight: 700;
        color: #33333378;
        margin-bottom: 8px;
    }
    .bold {
        font-weight: bold;
    }
</style>


<script>
    import {colors} from '../../utils.js'
    const carts = [
        {
            address:"sdfsf",
            cartID :"AERV5WNDG",
            city:"Tunis",
            items: {
                'ahmed2-BSJAPW': {
                    color:"Black",
                    creator:"ahmed2",
                    id:"BSJAPW",
                    price:"71",
                    profit:21,
                    quantity:1,
                    size:"M",
                    img: 'https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/creators%2Fahmed2%2Fmerch%2FBSJAPW%2Ffront-Black?alt=media&token=7275f991-2bea-4fd3-af72-4804f04cc72a'
                },
                'ahmed2-QWXON7': {
                    color:"Red",
                    creator:"ahmed2",
                    id:"QWXON7",
                    price:"500",
                    profit:1,
                    quantity:13,
                    size:"M",
                    img: 'https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/creators%2Fahmed2%2Fmerch%2FA23ASM%2Ffront-Red?alt=media&token=5dc8d739-dc98-4781-9987-a66889c78e1a'
                }
            },
            name:"ahmed",
            phoneNumber:"+21655775975",
            postal:"1000",
            state:"Tunis",
            timestamp: {seconds: +Date.now() / 1000},
            useruid:"wy0pT7BkKeV0HdcieQxqnZZoIFj1"

        }
    ]
        
    const formatTimestampToDate = (t) => {
        const a = new Date(t* 1000);
        const year = a.getFullYear();
        const month = a.getMonth() + 1;
        const date = a.getDate() + 1;
        return date + "/" + month + "/" + year
    }

           

</script>

<div class="u-table">

    <div class="u-table-head">
        <div class="t-head-cart-session-id">
            <abbr title="Cart & Session ID">C/S ID</abbr>
        </div>
        <div class="t-head-item-info">
            <abbr title="Item Info"> Item Info</abbr>
        </div>
        <div class="t-head-client-info">
            <abbr title="Client Info">Client Info</abbr>
        </div>
        <div class="t-head-date">
            <abbr title="Date">Date</abbr>
        </div>
        <div class="t-head-status">
            <abbr title="Status">Status</abbr>
        </div>
    </div>
    <div class="u-table-body">
        {#each carts as cart}
            <div class="u-cart">
                {#each Object.entries(cart.items) as [key, item]}
                    <div class="u-item">
                        <div class="t-body-cart-session-id">
                            <div class="u-cart-id">CartID: <span class="bold">#{cart.cartID}</span> </div>
                            <div class="u-session-id">Session: {cart.sessionID  ? cart.sessionID : "-"}</div>
                        </div>
                        <div class="t-body-item-info">
                            <div class="u-item-image">
                                <img src={item.img} alt={item.name}>
                            </div>
                            <div class="u-item-info-data">
                                <div class="u-item-name">{item.name}</div>
                                <div class="u-item-creator">{item.creator}</div>
                                <div class="u-item-color-size">
                                    <div class="u-item-color">Color: <div style={"background-color:" + colors[item.color.toLowerCase()] + ";"} class="color-circle"></div></div>
                                    <div class="u-item-size">Size: <span class="u-size">{item.size}</span> </div>
                                </div>
                                
                                <div class="u-item-quantity-price">
                                    <div class="u-item-quantity">
                                        Qty: {item.quantity}
                                    </div>
                                    <div class="u-item-price">
                                        Price: {item.price} TND
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="t-body-client-info">
                            <div class="u-client-name"></div>
                            <div class="u-client-phone-number"></div>
                            <p class="u-client-address"></p>
                        </div>
                        <div class="t-body-date">
                
                        </div>
                        <div class="t-body-status">
                
                        </div>
            
                    </div>
                {/each}


            </div>
        {/each}
        
    </div>
</div>