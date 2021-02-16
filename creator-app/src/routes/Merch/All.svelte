<script>
    import { db, user } from "../../firebase.js";
    import { link } from "svelte-routing";
    import { textToHex, uuidToImageLink } from "../../utils.js";
    import ImageBackground from "../../comps/ImageBackground.svelte";
    import ViewNav from "../../comps/ViewNav.svelte";
    import { onDestroy } from "svelte";

    let format = "article-color-random5LettersCode";
    let products = [];
    let loaded = false;
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
    let listener = () => {};
    listener = db
        .doc("/creators/" + $user.claims.username + "/merch/all")
        .onSnapshot((doc) => {
            loaded = true;
            let data = doc.data();
            console.log(data);
            if (data == undefined) {
                products = [];
                return;
            }
            for (let [key, value] of Object.entries(data)) {
                console.log(value);
                for (let [col, facades] of Object.entries(value.imgs)) {
                    console.log(facades);
                    for (let [facade, id] of Object.entries(facades)) {
                        let path =
                            "creators/" +
                            $user.claims.username +
                            "/merch/" +
                            key +
                            "/" +
                            facade +
                            "-" +
                            col;
                        value.imgs[col][facade] = uuidToImageLink(id, path);
                        console.log(value.imgs[col][facade]);
                    }
                }
            }
            products = data;
            console.log(products);
            console.log(products.length);
        });
    onDestroy(() => {
        listener();
    });
</script>

<style>
    .u-view {
        width: 100%;
        min-height: 100vh;
        
        
        padding-top: 75px;
    }

    .active-section {
        padding: 32px 80px;
    }

    .active-products {
        display: flex;
        flex-wrap: wrap;
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
        background-color: #46b978;
        border-radius: 0 0 20px 20px;
    }
    .u-name {
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
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
        flex-direction: column;
    }

    .u-price {
        padding: 6px 12px;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: 700;
        font-size: 25px;
    }

    .u-modify {
        padding: 10px 40px;
        border-radius: 8px;
        background-color: #181d22;
        color: white;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
    }
    .u-modify:hover {
        color: #181d22;
        background-color: white;
    }

    @media only screen and (max-width: 1180px) {

        .active-products{
            justify-content: center;
        }
    }
</style>

<div class="u-view">
    <ViewNav />

    <section class="active-section">
        {#if loaded}
            {#if Object.keys(products).length > 0}
                <div class="u-section-title">Your current active merch</div>

                <div class="active-products">
                    {#each Object.entries(products) as [key, product]}
                        <div class="prod-card">
                            <div class="u-image-area">
                                <ImageBackground
                                    img={product.imgs[product.featuredColor][product.featuredFace]}
                                    bgColor={textToHex(product.color)} />
                            </div>
                            <div class="u-informations">
                                <div class="u-name">{product.name}</div>

                                <div class="actions">
                                    <div class="u-price">
                                        {product.price}
                                        TND
                                    </div>

                                    <a
                                        use:link
                                        href={'/merch/modify/' + key}
                                        class="u-modify">
                                        Modify
                                    </a>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="u-empty">No merch</div>
            {/if}
        {/if}
    </section>
</div>
