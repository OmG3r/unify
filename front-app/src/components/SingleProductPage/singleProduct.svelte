<script>
    export let activeItem;
    export let params
    import { lang, cart } from "../../store.js";
    import { onMount } from "svelte";
    import { dbWrapper } from "../../firebase.js";
    import { uuidToImageLink, colors } from '../../utils.js'
    import {navigate} from 'svelte-routing'
    import {writable} from 'svelte/store'
    if (activeItem == undefined) {
        activeItem = {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt",
            id: "MMX8E7",
        };
    }
    let validated = false
    onMount(async () => {
        console.log("mounted");
        let data = await dbWrapper.get(
            "/creators/" + params.userid + "/merch/all"
        );
        if (data[params.itemid] == undefined) {
            navigate("/" + params.userid);
        } else {
            validated = true;
            activeItem  = data[params.itemid]
            $activeColor = activeItem.featuredColor
            $activeFacade = activeItem.featuredFace
            
            for (let [col, facades]  of Object.entries(activeItem.imgs)) {
                console.log(facades)
                for (let [facade, id] of Object.entries(facades)) {
                    let path = 'creators/' + params.userid + "/merch/" + params.itemid + "/" + facade + "-" + col
                    console.log(id)
                    let link = uuidToImageLink(id, path)
                    console.log(link)
                    activeItem.imgs[col][facade] = link
                    console.log(activeItem.imgs[col][facade])
                } 
            }
                
            
            activeItem = activeItem
            console.log(activeItem)
        }
    });

    const addToCart = () => {

    }
    let show = false;
    let quantity = 1;
    let rotateLeft = false;
    let rotateRight = false;
    let rotating = false;
    const activeColor = writable('Black')
    const activeFacade = writable('front')
    const activeSize = writable('')
    const activeQuantity = writable(1)
    let rotate = (type) => {
        
        $activeFacade == 'front' ? $activeFacade = 'back' : $activeFacade = 'front'
        if (type == "left") {
            rotateLeft = true;
            
            rotating = true;
        } else {
            rotateRight = true;
            
            rotating = true;
        }

        console.log(rotateLeft, rotateRight);

        setTimeout(() => {
            rotateLeft = false;
            rotateRight = false;
            rotating = false;
        }, 1000);
    };
</script>

<div class="container">
    <!--P -> Product -->
    <div class="p_container">
        <div class="p_imgs">
            <div class="p_main_img">
                <!--start-->
                <svg
                    class="circle_border"
                    class:rotateLeft
                    class:rotateRight
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="734"
                    height="734"
                    viewBox="0 0 734 734"
                >
                    <defs>
                        <style>
                            .cls-1 {
                                fill: #bcbcbc;
                                stroke-linejoin: round;
                                stroke-width: 4px;
                                stroke: url(#linear-gradient);
                                filter: url(#filter);
                            }
                        </style>
                        <linearGradient
                            id="linear-gradient"
                            x1="367"
                            y1="728"
                            x2="367"
                            y2="6"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stop-color="#0e80f6" />
                            <stop
                                offset="0.093"
                                stop-color="#0e80f6"
                                stop-opacity="0"
                            />
                            <stop
                                offset="0.729"
                                stop-color="#0e80f6"
                                stop-opacity="0"
                            />
                            <stop offset="0.918" stop-color="#0e80f6" />
                            <stop offset="1" stop-color="#0e80f6" />
                        </linearGradient>
                        <filter
                            id="filter"
                            x="0"
                            y="0"
                            width="734"
                            height="734"
                            filterUnits="userSpaceOnUse"
                        >
                            <feFlood result="flood" flood-color="#f7f7f7" />
                            <feComposite
                                result="composite"
                                operator="in"
                                in2="SourceGraphic"
                            />
                            <feBlend result="blend" in2="SourceGraphic" />
                        </filter>
                    </defs>
                    <g
                        class="inside_color"
                        style="fill: #bcbcbc; filter: url(#filter)"
                    >
                        <circle
                            id="Ellipse_1_copie"
                            data-name="Ellipse 1 copie"
                            class="cls-1"
                            cx="367"
                            cy="367"
                            r="361"
                            style="stroke: inherit; filter: none; fill: inherit"
                        />
                    </g>
                    <use
                        xlink:href="#Ellipse_1_copie"
                        style="stroke: url(#linear-gradient); filter: none; fill: none"
                    />
                </svg>
                <!--end-->

                <div class="p_back_circle" />
                {#if activeItem && activeItem.imgs}
                    <img
                        src={activeItem.imgs[$activeColor][$activeFacade]}
                        alt="product"
                        class="product_img"
                        class:rotating
                    />
                {/if}
            </div>

            <div class="p_slider">
                <!--Arrow left-->
                <svg
                    on:click={() => {
                        rotate("left");
                    }}
                    version="1.1"
                    id="Layer_1"
                    class="arrow_left"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                >
                    <path
                        d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                    />
                </svg>
                {#if activeItem && activeItem.imgs && activeItem.imgs[$activeColor]}
                    
                        {#each Object.entries(activeItem.imgs[$activeColor]) as [facade, link]}
                            <img on:click={() => {$activeFacade = facade}} crossorigin="anonymous" src={link} alt="product" />
                        
                        {/each}
                    
                {/if}

                <!--Arrow right-->
                <svg
                    on:click={() => {
                        rotate("right");
                    }}
                    version="1.1"
                    id="Layer_1"
                    class="arrow_right"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                >
                    <path
                        d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                    />
                </svg>
            </div>
        </div>
        <div class="all_info">
            <div class="p_info">
                <span class="p_title">{activeItem.name}</span>
                <span class="p_subTitle">
                    
                    <span>{activeItem.creator}</span>
                </span>
                <hr />
                <span class="p_price">
                    {activeItem.price}
                    <span>TND</span>
                </span>
            </div>

            <div class="p_order_details">
                <div class="p_colors">
                    <span class="title"
                        >{{ en: "Colors", fr: "couleurs" }[$lang]}:</span
                    >
                    <span class="colors">
                        {#if activeItem && activeItem.colors}
                            {#each activeItem.colors as color}
                                <div
                                    on:click={() => {$activeColor = color}}
                                    class="color_border" class:active={$activeColor == color}
                                    style="border:0px solid black;"
                                >
                            
                                    <div
                                        class="color"
                                        style="background-color:{colors[color.toLowerCase()]}"
                                    />
                                </div>
                            {/each}
                        {/if}
                    </span>
                </div>

                <div class="p_size">
                    <span class="title"
                        >{{ en: "Size", fr: "Taille" }[$lang]}:</span
                    >
                    {#if activeItem && activeItem.sizes}
                        {#each activeItem.sizes as size}
                            <div class:active={size == $activeSize} on:click={() => {$activeSize = size}} class="size">{size}</div>
                        {/each}
                    {:else}
                        <span class="sizes">
                            {#each ['S', 'M', 'L', 'XL'] as size}
                                <div class:active={size == $activeSize} on:click={() => {$activeSize = size}} class="size">{size}</div>
                            {/each}
                        </span>
                    {/if}
                    
                </div>

                <div class="p_quantity">
                    <span class="title"
                        >{{ en: "Quantity", fr: "Quantité" }[$lang]}:</span
                    >
                    <div class="input_number">
                        <!--Arrow left-->
                        <svg
                            on:click={() => {
                                quantity <= 1
                                    ? ($activeQuantity = 1)
                                    : ($activeQuantity -= 1);
                            }}
                            version="1.1"
                            id="Layer_1"
                            class="arrow_left"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 492.004 492.004"
                            style="enable-background:new 0 0 492.004 492.004;"
                            xml:space="preserve"
                        >
                            <path
                                d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                            />
                        </svg>
                        <input
                            type="number"
                            bind:value={$activeQuantity}
                            
                        />
                        <!--Arrow right-->
                        <svg
                            on:click={() => {
                                $activeQuantity += 1;
                            }}
                            version="1.1"
                            id="Layer_1"
                            class="arrow_right"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 492.004 492.004"
                            style="enable-background:new 0 0 492.004 492.004;"
                            xml:space="preserve"
                        >
                            <path
                                d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                            />
                        </svg>
                    </div>
                </div>

                <div class="btns">
                    <button on:click={addToCart} type="button" class="add_cart_btn">
                        {{ en: "Add to cart", fr: "J'achète" }[$lang]}
                        <svg
                            id="Capa_1"
                            enable-background="new 0 0 512 512"
                            height="512"
                            viewBox="0 0 512 512"
                            width="512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m504.399
              185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592
              3.315-11.059 12.158-7.743 19.75l48.225
              110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749
              7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83
              13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677
              16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216
              34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487
              256.652h-335.824c-2.547
              0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764
              1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151
              16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0
              11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462
              5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315
              11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281
              4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528
              2.301-2.76 3.971-5.307 3.971z"
                            />
                            <path
                                d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z"
                            />
                            <path
                                d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z"
                            />
                            <path
                                d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p_desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae maxime provident rerum dolorum, quia accusantium
                cupiditate natus doloribus similique ullam voluptates omnis
                voluptatibus libero nulla totam recusandae corrupti laudantium
                exercitationem!
            </div>
            <hr />
            <div class="policies">
                <div class="socialShare">
                    <span
                        >{{
                            en: "SHARE THIS PRODUCT",
                            fr: "PARTAGEZ CE PRODUIT",
                        }[$lang]}</span
                    >
                    <div class="socialmedia">
                        <i class="fab fa-facebook" />
                        <i class="fab fa-instagram" />
                    </div>
                </div>
                <div class="delivery">
                    <span
                        >{{
                            en: "DELIVERY & RETURNS",
                            fr: "LIVRAISON & RETOURS",
                        }[$lang]}</span
                    >
                    <span class="desc"
                        >Delivered between Wednesday 30 Dec and Sunday 3 Jan.
                        Please check exact dates in the checkout page.</span
                    >
                </div>
            </div>
            <button
                type="button"
                class="wishlist_btn"
                on:mouseenter={() => {
                    show = true;
                }}
                on:mouseleave={() => {
                    show = false;
                }}
            >
                <i class="far fa-heart" />
                <span class="popuptext" class:show id="myPopup"
                    >Add to wishlist</span
                >
            </button>
        </div>
    </div>
</div>

<style>
    .container {
        background-color: white;
        color: #181d22;
        display: flex;
        flex-direction: column;
        padding: 15px;
        height: 100%;
    }

    .all_info {
        position: relative;
        grid-column-start: 3;
        grid-column-end: 4;
    }

    .p_container {
        display: grid;
        grid-template-columns: 5% 50% 40% 5%;
    }

    .p_info {
        display: flex;
        flex-direction: column;
    }

    .p_imgs {
        display: flex;
        flex-direction: column;
        grid-column-start: 2;
        grid-column-end: 3;
        align-items: center;
    }

    .p_imgs .p_main_img {
        max-width: 550px;
        position: relative;
        max-height: 550px;
        width: 80vw;
        height: 80vw;
    }

    .p_main_img .product_img {
        max-width: 300px;
        margin: auto;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        position: absolute;
        width: 50vw;
    }
    .p_imgs .p_slider {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .p_imgs .p_slider img {
        width: 10%;
    }

    .p_order_details {
        display: flex;
        flex-direction: column;
    }
    .circle_border {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        max-width: 550px;
        max-height: 550px;
        width: 80vw;
        height: 80vw;
    }
    .circle_border .inside_color {
        fill: transparent !important;
    }
    .circle_border defs linearGradient stop {
        stop-color: rgb(var(--AccentColor));
    }
    .p_back_circle {
        background-color: #f6f6f8;
        max-width: 480px;
        max-height: 480px;
        width: 70vw;
        height: 70vw;
        border-radius: 50%;
        position: absolute;
        margin-left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .p_title {
        color: #181d22;
        font-size: 35px;
        font-weight: 700;
        width: max-content;
    }
    .p_price {
        color: #181d22;
        font-size: 35px;
        font-weight: 700;
    }
    .p_price span {
        color: rgb(var(--AccentColor));
    }
    .p_subTitle {
        color: #181d22;
        font-size: 30px;
        font-weight: 700;
        width: max-content;
    }
    .p_subTitle span {
        color: rgb(var(--AccentColor));
        margin-left: 8px;
    }
    hr {
        width: 100%;
        color: E5E5E5;
        border: solid 1px #e5e5e5;
        margin: 10px 0 10px 0;
    }
    .p_desc {
        font-size: 20px;
        font-weight: 200;
        color: #181d22;
    }
    .p_order_details .title {
        margin-right: 10px;
        font-size: 18px;
        font-weight: 600;
    }

    .p_size {
        display: flex;
        flex-direction: row;
    }
    .sizes {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        row-gap: 15px;
        column-gap: 5px;
    }
    .size {
        background-color: #181d22;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        color: white;
        margin: 0 5px 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: 700;
    }
    .size:hover, .size.active {
        background-color: rgb(var(--AccentColor));
    }
    .p_colors {
        display: flex;
        flex-direction: row;
    }
    .colors {
        display: flex;
        flex-direction: row;
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
    .color_border:hover, .color_border.active {
        border-width: 2px !important;
    }
    .p_order_details > div {
        margin: 15px 0 15px 0px;
    }
    .p_quantity input[type="number"]::-webkit-outer-spin-button,
    .p_quantity input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .p_quantity {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .p_quantity .input_number {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 2px solid #181d22;
        border-radius: 15px;
        height: 40px;
        width: max-content;
    }
    .input_number .arrow_left,
    .input_number .arrow_right {
        width: 25px;
        fill: #181d22;
        cursor: pointer;
        height: 100%;
    }
    .input_number .arrow_left:active {
        border-radius: 0 14px 14px 0;
        background-color: rgb(var(--AccentColor));
        fill: white;
    }
    .input_number .arrow_right:active {
        border-radius: 0 14px 14px 0;
        background-color: rgb(var(--AccentColor));
        fill: white;
    }
    .input_number .arrow_left {
        transform: rotate(180deg);
    }

    .input_number input[type="number"] {
        width: 80px;
        background-color: transparent;
        height: 100%;
        border: none;
        text-align: center;
        color: #181d22;
        font-size: 20px;
        font-weight: 700;
    }
    .input_number input[type="number"]:focus {
        outline: none;
    }

    .popuptext {
        visibility: hidden;
        width: 160px;
        height: 35px;
        background-color: rgb(var(--AccentColor));
        color: #fff;
        font-weight: 500;
        font-size: 15px;
        text-align: center;
        border-radius: 6px;
        padding: 8px 0;
        position: absolute;
        bottom: 50%;
        z-index: 5006;
        left: 50%;
        margin-left: -80px;
    }
    .popuptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgb(var(--AccentColor)) transparent transparent
            transparent;
    }

    .show {
        visibility: visible;
        animation: popup 0.5s ease-out;
        transform: translateY(-75%);
    }
    @keyframes popup {
        0% {
            transform: translateY(-50%);
            opacity: 0;
        }
        100% {
            transform: translateY(-75%);
            opacity: 1;
        }
    }

    .wishlist_btn {
        background-color: #181d22;
        color: white;
        border-radius: 50%;
        border: none;
        height: 40px;
        width: 40px;
        margin-left: 15px;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 15px;
    }
    .wishlist_btn:focus {
        outline: none;
    }

    .add_cart_btn {
        background-color: rgb(var(--AccentColor));
        color: white;
        border-radius: 10px;
        width: 100%;
        height: 40px;
        border: none;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        position: relative;
    }
    .add_cart_btn:focus {
        outline: none;
    }
    .add_cart_btn svg {
        fill: white;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 0;
        margin: auto;
        bottom: 0;
        left: 20px;
    }

    .btns {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .rotateLeft {
        animation: rotateLeft 1s ease-out;
    }

    @keyframes rotateLeft {
        100% {
            transform: rotate(-360deg);
        }
    }

    .rotateRight {
        animation: rotateRight 1s ease-out;
    }

    @keyframes rotateRight {
        100% {
            transform: rotate(360deg);
        }
    }
    .rotating {
        animation: FadeIn 1s ease-out;
    }
    @keyframes FadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .p_slider .arrow_left {
        transform: rotate(180deg);
    }
    .p_slider .arrow_left,
    .p_slider .arrow_right {
        fill: #181d22;
        width: 25px;
        cursor: pointer;
    }

    .policies {
        display: flex;
        flex-direction: row;
        font-size: 20px;
        font-weight: 700;
        color: #181d22;
        justify-content: space-between;
    }
    .policies .socialShare {
        width: 45%;
        display: flex;
        flex-direction: column;
    }
    .policies .socialShare .socialmedia i {
        font-size: 35px;
        cursor: pointer;
        margin: 6px;
    }
    .policies .delivery {
        display: flex;
        flex-direction: column;
        width: 45%;
    }
    .policies .delivery .desc {
        font-size: 15px;
        font-weight: 400;
        margin: 6px 6px 6px 0;
    }

    @media only screen and (max-width: 1180px) {
        .p_container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 60px 0 60px;
        }
        .p_imgs .p_slider svg {
            margin-top: 15px;
            width: 12%;
        }
        .p_imgs .p_slider img {
            margin-top: 15px;
            width: 15%;
        }
        .all_info {
            margin-top: 25px;
        }
    }
</style>
