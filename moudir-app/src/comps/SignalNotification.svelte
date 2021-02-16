<style>


</style>

<script>
    import {onMount, onDestroy} from 'svelte'

    export let listener
    export let first
    export let countable = ""
    export let indexKey = 'cartID'
    let originalDocTitle = document.title

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

    const unsubscribeCart = listener.subscribe((v) => {
        if (!first) {
                console.log(v)
                console.log(lastcart)
            let diff = v.filter((item) => !lastcart.some((x) => x[indexKey] == item[indexKey]))
            if (diff.length  == 0) {
                return
            }
            console.log("ended")
            document.title = "(" + String(diff.length) + ") " + countable
            if (Notification.permission == "granted") {
                const greeting = new Notification('Unify',{
                    body: "New " + "(" + String(diff.length) + ") " + countable,
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
                        document.title = "(" + String(diff.length) + ") " + countable
                    }, 2000);  
                }, 1000);
                
                if (orderInter) {
                    clearInterval(orderInter)
                }
                orderInter = setInterval(() => {
                    document.title = originalDocTitle
                }, 2000);   
            }
        } else {
            lastcart = $listener
        }
    })

    const handleVisibilityChange = () => {
        if (document[hidden]) {
            lastcart = $listener
        } else {
            console.log(document.title)
            if (document.title.includes(') ' + countable)) {
                document.title = originalDocTitle
                
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