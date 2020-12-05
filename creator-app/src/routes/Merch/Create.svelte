<style>
    .u-view  {
        width: 100%;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: auto;
    }

    header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #D8DAE0;
        padding: 8px 12px;
        height: 54px;
    }
    .u-categories {
        padding: 32px 80px;
    }
    .view-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 40px;
        margin-left: 16px;
    }
    .cat-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px 0;
        
    }
    .cat-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 12px; 
        margin-left: 16px;
    }
    .u-items {
        display: flex;
        flex-wrap: wrap;
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
        cursor: pointer;
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
        background-color: #f6f6f9;
        padding: 16px;
        color: #6a6f72;
        border-top: 1px solid #dddddd;
    }
    .u-name  {
        width: 100%;
        text-align: center;
        font-size: 18px;
        margin-bottom: 8px;
        color: black;
    }
    .u-informations p {
        font-size: 14px;
    }

</style>


<script>
    import ImageBackground from '../../comps/ImageBackground.svelte'

    import {nanoid, textToHex} from '../../utils.js'

    import {link} from 'svelte-routing'
    const categories = {
        "hoodie": {
            title: "Hoodies",
            items: {
                
            }
        },
        "long-tee": {
            title: "Long Sleeve Tee",
            items: {

            }
        },
        "sweatshirt": {
            title: "Sweatshirts",
            items: {}
        }
    }


    const creations = {
        [nanoid()]: {
            type: "hoodie",
            name: 'Eco Unisex Hoodie',
            cost: 32,
            material: '80% Certified Organic Cotton, 20% Recycled Polyester',
            sizes: 'S - 4XLT',
            imgs: {
                front: '/imgs/clothes/hoodies/normal-front.png',
                back: '/imgs/clothes/hoodies/normal-back.png'
            },
            colors: ["Black", "Red", "Green", "White"]
        },
        [nanoid()]: {
            type: "hoodie",
            name: 'Premium Pullover Hoodie',
            cost: 29,
            material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
            sizes: 'S - 2XL',
            imgs: {
                front: '/imgs/clothes/hoodies/premium-front.png',
                back: '/imgs/clothes/hoodies/premium-back.png'
            },
            colors: [ "Red", "Green"]
        },
        [nanoid()]: {
            type: "long-tee",
            name: 'Classic Long Sleeve Tee',
            cost: 14,
            material: 'Regular fit, 100% cotton, unisex',
            sizes: 'S - 2XL',
            imgs: {
                front: '/imgs/clothes/hoodies/premium-front.png',
                back: '/imgs/clothes/hoodies/premium-back.png'
            },
            colors: ["Black", "White", "Green"]
        },
        [nanoid()]: {
            type: "long-tee",
            name: 'Premium Long Sleeve Tee',
            cost: 17,
            material: 'Slim fit, premium soft cotton, unisex',
            sizes: 'S - XL',
            imgs: {
                front: '/imgs/clothes/long-tee/premium-front.png',
                back: '/imgs/clothes/long-tee/premium-back.png'
            },
            colors: ["Black", "Red", "Green", "White"]
        },
        [nanoid()]: {
            type: "sweatshirt",
            name: 'Premium Long Sleeve Tee',
            cost: 17,
            material: 'Slim fit, premium soft cotton, unisex',
            sizes: 'S - XL',
            imgs: {
                front: '/imgs/clothes/sweatshirts/normal-front.png',
                back: '/imgs/clothes/sweatshirts/normal-back.png'
            },
            colors: ["Black", "Red", "Green", "White"]
        },
    }

    Object.entries(creations).reduce((acc, [key, curr]) => {
        curr.id = key
        categories[curr.type].items[key] = curr
    }, {})

    console.log(categories)
</script>

<div class="u-view">
    <header>
        

    </header>
    <div class="u-categories">
        <div class="view-title">Select a product to design</div>
        {#each Object.entries(categories) as [key, cat]} 
            <section id={key} class="cat-section">
                <div class="cat-title">{cat.title}</div>
                <div class="u-items">
                    {#each Object.entries(cat.items) as [key, item]}
                    <a use:link href={"/merch/create/" + key} id={key} class="prod-card">
                        <div class="u-image-area">
                            <ImageBackground
                            img={item.imgs.front} 
                            bgColor={textToHex(item.colors[0])} />
        
                        </div>
                        <div class="u-informations">
                            <div class="u-name">
                                {item.name}
        
                            </div>
                            <p class="u-price">
                                Base Cost: {item.cost} TND

                            </p>
                            <p>{item.material}</p>
                            <p>{item.sizes}</p>
                        </div>
        
                        
                    </a>
                    {/each}
                </div>
            </section>

        {/each}

    </div>

</div>