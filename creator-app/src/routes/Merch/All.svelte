<style>
    .u-view  {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: auto;
    }

    .active-section {
        padding: 32px 80px;
    }


    .active-products {
        display: flex;
        
    }

    .u-section-title {
        margin-left: 16px;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 40px;
    }

    .prod-card {
        width: 300px;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 3px;
        margin: 16px;
        box-shadow: 0 0 0 1px #ddd;
        border-radius: 4px;
        overflow: hidden;

    }

    .u-image-area {
        width: 100%;
        max-height: 300px;
        border-bottom: 1px solid #ddd;
    }
    .u-informations {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #4a5aed;
    }
    .u-name  {
        width: 100%;
        text-align: center;
        font-size: 18px;
        padding: 6px;
        color: white;
    }
    .actions {
        width: 80%;
        display: flex;
        margin: 0 auto;
        justify-content: space-evenly;
        align-items: center;
        padding: 8px 0;
    }

   

    .u-price {
        padding: 6px 12px;
        border-radius: 8px;
        background-color: white;
        color: #4a5aed;
    }

    .u-modify {
        padding: 6px 12px;
        border-radius: 8px;
        background-color: white;
        color: #4a5aed;
        cursor: pointer;
    }
</style>


<script>
    import {db, user} from '../../firebase.js'
    import {link} from 'svelte-routing'
    import {textToHex, uuidToImageLink} from '../../utils.js'
    import ImageBackground from '../../comps/ImageBackground.svelte'
    import ViewNav from '../../comps/ViewNav.svelte'
    let format = "article-color-random5LettersCode"
    let products = []
    /*
    let products = {
        "H-B-5e8c7": {
            name: "The showdown",
            color: "Black",
            price: 28,
            imgs: {
                front: '/imgs/clothes/hoodies/normal-front.png',
                back: '/imgs/clothes/hoodies/normal-back.png'
            }
        },
        "H-G-287tc": {
            name: "Lolesprts",
            color: "Grey",
            price: 38,
            imgs: {
                front: '/imgs/clothes/hoodies/normal-front.png',
                back: '/imgs/clothes/hoodies/normal-back.png'
            }
        }
    }
    */
    db.doc("/creators/" + $user.docData.username + "/merch/all").onSnapshot((doc) => {
        let data = doc.data()
        console.log(data)
        if ( data == undefined) {
            products = []
            return
        }
        for (let [key, value] of Object.entries(data)) {
            for (let x of ['front','back']) {
                let path = 'creators/' + $user.docData.username + "/merch/" + key + "/" + x
                console.log(path)
                value.imgs[x] = uuidToImageLink(value.imgs[x], path)
                console.log(value.imgs[x])
            } 
        }
        products = data
        console.log(products)
        console.log(products.length)
    })
</script>

<div class="u-view">
    <ViewNav />


    <section class="active-section">
        {#if Object.keys(products).length > 0}
            <div class="u-section-title">
                Your current active merch
            </div>
        
            <div class="active-products">
                {#each Object.entries(products) as [key, product]}
                    <div class="prod-card">
                        <div class="u-image-area">
                            <ImageBackground
                            img={product.imgs.front} 
                            bgColor={textToHex(product.color)} />

                        </div>
                        <div class="u-informations">
                            <div class="u-name">
                                {product.name}

                            </div>

                            <div class="actions">
                                <div class="u-price">
                                    {product.price} TND
            
                                </div>
            
                                <div class="u-modify">
                                    Modify
            
                                </div>
            
                            </div>

                        </div>

                        
                    </div>
                {/each}
            </div>
        {:else}
            <div class="u-empty">
                No merch 
            </div>
        {/if}
        
    </section>

</div>
