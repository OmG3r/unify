<style>
    .u-view  {
        width: 100%;
        min-height: 100vh;
        
        
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
        background-color: #f6f6f8;
        border-radius: 3px;
        margin: 16px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        border-radius: 20px;
    }
  

    .u-image-area {
        width: 100%;
        max-height: 300px;
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

    import {textToHex} from '../../utils.js'
    import {creations} from '../../mockupdata.js'
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
            {#if Object.keys(cat.items).length != 0} 
                <section id={key} class="cat-section">
                    <div class="cat-title">{cat.title}</div>
                    <hr style='width: 100%;'>
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
                                <p>{item.sizes[0]} - {item.sizes[item.sizes.length - 1]}</p>
                            </div>
            
                            
                        </a>
                        {/each}
                    </div>
                </section>
            {/if}
        {/each}

    </div>

</div>