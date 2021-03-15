<script>
    import {hexToRgb,convert} from "../../filter.js"
    import { writable } from "svelte/store";
    import { lang, cart } from "../../store.js";
    import { onMount } from "svelte";
    import Single from "../SingleProductPage/singleProduct.svelte";
    import { db, dbWrapper, user } from "../../firebase.js";
    import {
        uuidToImageLink,
        socialMedias,
        notification,
        colors,
    } from "../../utils.js";
    import { link, navigate } from "svelte-routing";
    export let params = {};
    export let creatorData = {};
    let loaded = false;
    let displayProducts = [];
    if (creatorData.accentColor == undefined || creatorData.accentColor == null || creatorData.accentColor == "") {
        creatorData.accentColor = '#45b877'
    }

  
    //change the global(:root) var of css
   
    let filter = convert(creatorData.accentColor).replace('filter:','').replace(";","");
    
	
    console.log(filter);
    
    dbWrapper.get("/creators/" + params.userid + "/merch/all").then((data) => {
        console.log(data)
        if (data == undefined) {
            displayProducts = [];
            loaded = true;
            return;
        }

        displayProducts = Object.entries(data).map(([key, value]) => {
            value.id = key;
            for (let [col, facades] of Object.entries(value.imgs)) {
                for (let [facade, id] of Object.entries(facades)) {
                    let path =
                        "creators/" +
                        params.userid +
                        "/merch/" +
                        key +
                        "/" +
                        facade +
                        "-" +
                        col;
                    value.imgs[col][facade] = uuidToImageLink(id, path);
                }
            }
            return value;
        });

        let loaded = true;
    });

    const addWishlist = (nid) => {
        if ($user == 0 || $user == undefined) {
            navigate("/signin?backurl=/" + params.userid + "/merch");
            return;
        }

        if (
            $user.docData.wishlist &&
            Object.keys($user.docData.wishlist).includes(nid)
        ) {
            // remove it
            db.collection("users")
                .doc($user.uid)
                .update({
                    ["wishlist." + nid]: firebase.firestore.FieldValue.delete(),
                });
            delete $user.docData.wishlist[nid];
            $user = $user;
        } else {
            notification.set({
                accentColor: "success",
                title: "success",
                content: "Article Added to WishList",
            });
            db.collection("users")
                .doc($user.uid)
                .set({ wishlist: { [nid]: true } }, { merge: true });
            $user = {
                ...$user,
                docData: {
                    ...$user.docData,
                    wishlist: {
                        ...$user.docData.wishlist,
                        [nid]: true,
                    },
                },
            };
        }
    };

  
    
    
    
</script>

<style>
    
    .container {
        padding: 50px;
        min-height: 50vh;
        display: grid;
        grid-template-columns: 20% 80%;
    }

    .u_products {
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-items: center;
        row-gap: 50px;
    }

    .single_product {
        background-color: #f6f6f8;
        border-radius: 20px;
        margin: 25px 15px 25px 15px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 240px;
        cursor: pointer;
        user-select: none;
        padding-bottom: 15px;
    }
    .single_product img {
        max-width: 100%;
    }
    .single_product .product_img {
        border-radius: 20px;
    }
    .likebtn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #181d22;
        color: rgba(var(--AccentColor), 1);
        border-radius: 10px;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cartBtns {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 0px;
        background-color: #181d22;
        border-radius: 0 20px 0 20px;
        justify-content: center;
        width: 45px;
        height: 90px;
    }
    .cartBtns .icon1 img {
        width: 25px;
        filter: invert(100%) sepia(0%) saturate(7428%) hue-rotate(68deg)
            brightness(101%) contrast(87%);
        margin: 5px 0px 5px 0px;
        cursor: pointer;
    }
    .cartBtns .icon2 img {
        width: 25px;
        margin: 5px 0px 5px 0px;
        cursor: pointer;
    }
    .cartBtns div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .cartBtns .icon1:active {
        background-color: rgba(var(--AccentColor));
        border-radius: 0 17px 0 0;
    }
    .cartBtns .icon2:active {
        background-color: rgba(var(--AccentColor));
        border-radius: 0 0px 0 17px;
    } 
    .productInfo {
        width: 100%;
        padding: 0px 20px 0px 20px;
    }

    .productInfo .product_title {
        font-size: 20px;
        font-weight: 600;
    }
    .productInfo .product_price {
        font-weight: 700;
        display: flex;
        flex-direction: column;
    }
    .product_price .current_price {
        font-size: 20px;
        margin: 10px 0 10px 0;
    }
    .product_price .old_price .price {
        text-decoration: line-through;
        color: #c8c9ca;
        font-weight: 600;
        margin-right: 10px;
    }
    .product_price .old_price .percentage_discount {
        background-color: #181d22;
        color: white;
        padding: 4px;
        border-radius: 5px;
        font-weight: 600;
    }
    .buyNow {
        color: white;
        background-color: rgba(var(--AccentColor), 1);
        border-radius: 10px;
        border: none;
        padding: 8px;
        width: 45%;
        cursor: pointer;
    }
    .addCart {
        color: rgba(var(--AccentColor), 1);
        background-color: white;
        border-radius: 10px;
        border: none;
        padding: 8px;
        width: 45%;
        cursor: pointer;
    }

    .currency {
        font-size: 10px;
    }

    /******************end Budget slider******************/

    @media only screen and (max-width: 1550px) {
        .u_products {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media only screen and (max-width: 1180px) {
        .u_products {
            grid-template-columns: 1fr 1fr;
            flex: 0 0 45%;
            padding: 0px;
        }
        .container {
            grid-template-columns: none;
            padding: 20px;
        }

        .u_filters {
            flex-direction: row;
            padding: 0 0 50px 0px;
        }
    }
    @media only screen and (max-width: 800px) {
        .u_products {
            grid-template-columns: 1fr;
            flex: 0 0 100%;
        }
    }

    .social_icons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .social_icons a {
        padding: 5px;
    }
    .social_icons img {
        width: 35px;
        margin-right: 15px;
    }
    .social_icons img:hover {
        filter:var(--AccentColorFilter);
        cursor: pointer;
    }
    .u_info {
        padding: 30px;
        color: #181d22;
    }
    .u_desc {
        color:#7b7f84;
        line-break: anywhere;
    }
    .title_container {
        position: relative;
    }
    .title {
        background-color: rgba(var(--AccentColor), 1);
        width: max-content;
        height: 55px;
        border-radius: 15px 15px 0px 15px;
        color: white;
        display: flex;
        justify-content: center;
        padding: 10px;
        align-items: center;
        font-size: 25px;
        font-weight: 600;
    }
    .title_border {
        margin-left: 15px;
        border-top: 1px solid rgba(var(--AccentColor), 1);
        width: 95%;
        position: absolute;
        top: 83%;
    }
    .colors {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        margin-top: 15px;
        padding: 0px 20px 0px 20px;
    }

    .color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    .color_border {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
    }
    .color_border:hover,
    .color_border.active {
        border-width: 2px !important;
    }
</style>

<div class="container">
    <div class="u_info">
        <div class="info">
            <h2 class="info_title">{{ en: 'Info', fr: 'Info' }[$lang]}</h2>
            <hr />
            <p class="u_desc">
                 {creatorData.description ? creatorData.description : {en: "This user did not write anything about themselves", fr: "Cet utilisateur n'a rien écrit sur lui-même "}[$lang]}
            </p>
        </div>

        <div class="socialMedia">
            <h2 class="social_title">
                {{ en: 'Social Media', fr: 'Réseau Socieaux' }[$lang]}
            </h2>
            <hr />
            <!-- svelte-ignore a11y-no-onchange -->
            <div class="social_icons">
                {#each socialMedias as media}
                    {#if creatorData[media.type] && creatorData[media.type].length > 0}
                        <a target="_blank" href={creatorData[media.type].includes("http") ? creatorData[media.type] : "https://" + creatorData[media.type]}>
                            <img
                        style="width:{media.type == "baaz" ? "50px" :" 30px"}"
                                src="/img/socialMedia/{media.type}.svg"
                                alt="" />
                        </a>
                    {/if}
                {:else}
                        <div>none</div>
                {/each}
            </div>
        </div>
    </div>

    <div class="products_container">
        <div class="title_container">
        <div class="title" style="background-color : {creatorData.accentColor}">
            {{ en: 'Available Now', fr: 'Disponible maintenant' }[$lang]}
        </div>
            <hr class="title_border" style="border-top: 1px solid {creatorData.accentColor};"/>
        </div>

        <div class="u_products">
            {#each displayProducts as product}
                <div class="single_product">
                    <a use:link href="/{params.userid}/merch/{product.id}">
                        <img
                            class="product_img"
                            src={product.imgs[product.color ? product.color : product.featuredColor][product.featuredFace]}
                            alt="product" />
                    </a>

                    <div class="cartBtns" >
                    <div class="icon1" >
                            <img
                                src="/img/misc/cart.png"
                                alt="cart"
                                on:click={() => {
                                    cart.add({
                                        [params.userid + '-' + product.id]: {
                                            ...product,
                                            quantity: 1,
                                        },
                                    });
                                    notification.set({
                                        accentColor: 'success',
                                        title: 'success',
                                        content: 'Article Added to Cart',
                                    });
                                    navigate("/cart");
                                }} />
                        </div>
                        <div
                            on:click={() => {
                                addWishlist(params.userid + '-' + product.id);
                            }}
                            class="icon2">
                            <img
                                src={$user && $user.docData && $user.docData.wishlist && $user.docData?.wishlist[params.userid + '-' + product.id] ? '/img/misc/filled-heart-1.png' : '/img/misc/heart.png'}
                                style="{$user && $user.docData && $user.docData.wishlist && $user.docData?.wishlist[params.userid + '-' + product.id] ? 'filter:none' : 'filter:invert(100%) sepia(0%) saturate(7428%) hue-rotate(68deg) brightness(101%) contrast(87%);'}"
                                alt="heart" />
                        </div>
                    </div>
                    <a use:link href="/{params.userid}/merch/{product.id}" class="productInfo">
                        <span class="product_title">{product.name}</span>
                        <div class="product_price">
                            {#if product.discount}
                                <span
                                    class="current_price">{product.price * (1 - product.discount)}
                                    TND</span>
                                <span class="old_price">
                                    <span class="price">{product.price}</span>
                                    <span
                                        class="percentage_discount">-{product.discount * 100}%</span>
                                </span>
                            {:else}
                                <span class="current_price">{product.price}
                                    TND</span>
                            {/if}
                        </div>
                    </a>
                    <div class="colors">
                        {#each product.colors as color}
                            <div
                                class="color_border"
                                class:active={product.color == color}
                                on:click={() => {
                                    product.color = color;
                                }}
                                style="border:0px solid black;">
                                <div
                                    class="color"
                                    style="background-color:{colors[color.toLowerCase()]}" />
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
