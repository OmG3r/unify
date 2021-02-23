<style>
    .u-view {
        height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        width: 100%;
        background-color: #f2f8f1;
        padding-bottom: 50px;
    }

</style>

<script>
    import Filters from './_Filters.svelte'
    import Table from './_Table.svelte'

    import {onMount, onDestroy} from 'svelte'
    import {user, db, dbWrapper} from '../../firebase.js'
    import {uuidToImageLink} from '../../utils.js'
    import {navigate} from 'svelte-routing'
    import {writable} from 'svelte/store'
    import SignalNotification from '../../comps/SignalNotification.svelte'
    import SelectItemsComp from './_SelectItemsComp.svelte'
    const selectedItems = writable([])

    let unsubscribeUser = user.subscribe((v) => {
        if (v === undefined) {
            navigate('/login', {replace: true})
        }
    })
    const merchData = {}

    let first = true
    

    

    
    let unsubscribeDB = () => {};
    onMount(() => {
        
        

        unsubscribeDB = db.doc('orders/all').onSnapshot(async (doc) => {
            let data = doc.data()
            let orders = data
            let allCreators =  Object.values(orders).reduce((acc, curr) => {
                for( let [model, item] of Object.entries(curr.items)) {
                    if (!acc.includes(item.creator)) {
                        acc.push(item.creator)
                    }
                }
                return acc
            },[])
            console.log(allCreators)
            for (let oneCreator of allCreators) {
                
                console.log(oneCreator)
                if (merchData[oneCreator] == undefined) {
                    merchData[oneCreator] = await dbWrapper.get('creators/' + oneCreator+ "/merch/all")
                }
            }
            console.log(merchData)
            
            $carts = Object.entries(orders).map( ([cartID, cart]) => {
                cart.cartID = cartID
                cart.timestamp = cart.timestamp.seconds
                for( let [key, item] of Object.entries(cart.items)) {
                    console.log(merchData)
                    console.log(item.creator)
                    console.log(item.id)
                    
                    let itemData = merchData[item.creator][item.id]
                    if (itemData == undefined) {
                        item.img = '/imgs/misc/not-found.png'
                        item.name = "NOT FOUND"
                        item.sizes = [item.size]
                        item.colors = [item.color]
                        continue
                    }
                    let uuid = itemData.imgs[item.color][itemData.featuredFace]
                    let path = "creators/" + item.creator + "/merch/" + item.id + "/" + itemData.featuredFace + "-" + item.color 
                    item.img = uuidToImageLink(uuid, path)
                    item.name = itemData.name
                    item.sizes = itemData.sizes
                    item.colors = itemData.colors
                    if (item.status == undefined) {
                        item.status = "in_progress"
                    }
                }
                return cart
            })
            console.log($carts)
            let copyCarts = $carts
            copyCarts.sort((a, b) => b.timestamp - a.timestamp)
            $carts = copyCarts
            first = false
        })
    })

    onDestroy(() => {
        unsubscribeUser()
        unsubscribeDB()
    })

    let filters = writable({
        search: '',
        creators: [],
        statuses: [],
        date: {
            start: 0,
            end: 0
        },
        address: {
            states: [],
            cities: [],
            postals: []
        },
        models: []
    })
    
    const statusData = {
        'in_progress': {
            color: '#26a65b',
            text: 'In Progress'
        },
        'printing': {
            color: '#836349',
            text: 'Printing'
        },
        'in_delivery': {
            color: '#34a1fd',
            text: 'In Delivery'
        },
        'delivered': {
            color: '#2fcb82',
            text: 'Delivered'
        },
        'cancelled': {
            color: '#f39c11',
            text: 'Cancelled'
        },
        'returned': {
            color: '#e84c3d',
            text: 'Returned'
        }
    }
    const carts = writable([])
    /*
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

        },
        {
            address:"sdfsf",
            cartID :"VVVEEEEEXFDG",
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
    */
    for ( let cart of $carts) {
        for ( let item of Object.values(cart.items)) {
            if (item.status == undefined) {
                item.status = "in_progress"
            }
        } 
    }
    const filterFunction = (item) => {
        return !lastcart.some((x) => x.cartID == item.cartID)
    }
</script>


<div class="u-view">
    <SignalNotification indexKey={'cartID'} {first} listener={carts} countable="Orders" />
    <Filters {statusData} {carts} {filters} />
    <Table {selectedItems} {first} {statusData} {carts} {filters} />
    <SelectItemsComp {carts}  {selectedItems} />
</div>