<style>


</style>

<script>
    import {onMount, onDestroy} from 'svelte'

    export let carts
    export let first

    

    let nameInter = undefined
    let orderInter = undefined
    var hidden, visibilityChange;
    let lastcart = []
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

    const unsubscribeCart = carts.subscribe((v) => {
        if (!first) {
                 
            let diff = $carts.filter((item) => !lastcart.some((x) => x.cartID == item.cartID))
            document.title = "(" + String(diff.length) + ") Orders"
            if (Notification.permission == "granted") {
                const greeting = new Notification('Unify',{
                    body: "(" + String(diff.length) + ") Orders",
                    icon: './imgs/icon.png'
                });
            }
            
            if (document[hidden]) {
                console.log("should notif")
               
                
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
                    document.title = "Unify Moudir - Orders"
                }, 2000);   
            }
        } else {
            lastcart = $carts
        }
    })

    const handleVisibilityChange = () => {
        if (document[hidden]) {
            lastcart = $carts
        } else {
            if (document.title.includes('Orders')) {
                document.title = "Unify Creator - Overview"
                
            }
            clearInterval(nameInter)
            clearInterval(orderInter)
        }
    }

    onMount(() => {
        if (Notification.permission !== "denied" && Notification.permission != "granted") {
            Notification.requestPermission()
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    })

    onDestroy(() => {
        document.removeEventListener(visibilityChange, handleVisibilityChange)
        unsubscribeCart()
    })

</script>