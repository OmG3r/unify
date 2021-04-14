<script>
    export let activeItem;
    export let params;
    export let creatorData;
    import { lang, cart } from "../../store.js";
    import { onMount } from "svelte";
    import { dbWrapper, user, db } from "../../firebase.js";
    import { uuidToImageLink, colors, notification, generateDeliveryDate } from "../../utils.js";
    import { navigate, link as routlink } from "svelte-routing";
    import { writable } from "svelte/store";
    import {convert} from "../../filter"
    if (activeItem == undefined) {
        activeItem = {
            name: "Ahmed Shirt",
            img: "/img/tshirt.png",
            price: 90,
            type: "T-shirt",
            id: "MMX8E7",
        };
    }
    let filter = convert(creatorData.accentColor);
    let [minDdate, maxDdate] = generateDeliveryDate()
    console.log("in singe");
    let validated = false;
    onMount(async () => {
        
        console.log("mounted");
        let data = await dbWrapper.get(
            "/creators/" + params.userid + "/merch/all"
        );
        console.log("sdf " +params);
        if (data[params.itemid] == undefined) {
            navigate("/" + params.userid, {replace: true});
        } else if (data[params.itemid].deleted === true) {

            navigate("/" + params.userid, {replace: true});
        } else {
            validated = true;
            activeItem = data[params.itemid];
            $activeColor = activeItem.featuredColor;
            $activeFacade = activeItem.featuredFace;

            for (let [col, facades] of Object.entries(activeItem.imgs)) {
                console.log(facades);
                for (let [facade, id] of Object.entries(facades)) {
                    let path =
                        "creators/" +
                        params.userid +
                        "/merch/" +
                        params.itemid +
                        "/" +
                        facade +
                        "-" +
                        col;
                    console.log(id);
                    let link = uuidToImageLink(id, path);
                    console.log(link);
                    activeItem.imgs[col][facade] = link;
                    console.log(activeItem.imgs[col][facade]);
                }
            }

            activeItem = activeItem;
            console.log(activeItem);

           
        }

        
    });

    const addToCart = () => {
        if ($activeSize == "") {
            notification.set({
                accentColor: "error",
                title: "Error",
                content: "Please Select Size",
            });
            return;
        }
        cart.add({
            [params.userid + "-" + params.itemid]: {
                ...activeItem,
                quantity: $activeQuantity,
                color: $activeColor,
                size: $activeSize,
            },
        });
        console.log($cart);
        notification.set({
            accentColor: "success",
            title: "Success",
            content: { en: 'Article Added to Cart', fr: 'Article ajouté au panier ' }[$lang],
            uniqueActions: [
                {
                    text: { en: 'Checkout', fr: 'Commander' }[$lang],
                    func: () => {
                        navigate("/cart");
                    }
                }
            ]
        });
        
    };
    console.log("doing init");
    let show = false;
    let quantity = 1;
    let rotateLeft = false;
    let rotateRight = false;
    let rotating = false;
    const activeColor = writable("Black");
    const activeFacade = writable("front");
    const activeSize = writable("");
    const activeQuantity = writable(1);
    console.log("ending iti");

    const addWishlist = (nid) => {
        if ($user == 0 || $user == undefined) {
            navigate(
                "/signin?backurl=/" + params.userid + "/merch/" + activeItem.id
            );
            return;
        }

        if (
            $user.docData.wishlist &&
            Object.keys($user.docData.wishlist).includes(nid)
        ) {
            // remove it
            console.log("removing " + nid);
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
            console.log("adding " + nid);
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
    let rotate = (type) => {
        $activeFacade == "front"
            ? ($activeFacade = "back")
            : ($activeFacade = "front");
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
    console.log("ended script");
   

    let topFinal =0;
    let leftFinal= 0;
    let scale=1;

	let duration = 500;
   let mouse_position = (e,DifWidth)=>{
    
    let myElement = e.target.getBoundingClientRect();
    
    let marginTop = e.target.offsetTop;
    let marginLeft = e.target.offsetLeft;
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    //position of element
    let top  = myElement.top +  scrollTop - clientTop;
    let left = myElement.left + scrollLeft - clientLeft;
     
   
    let winEv = window.event;
    //position of mouse
    let posY = winEv.clientY + scrollTop - clientTop ; 
    let posX = winEv.clientX  + scrollLeft - clientLeft  ;
    
    topFinal = top - posY + DifWidth
    leftFinal= left  - posX + DifWidth
 
    scale=2.5
    
   }

   let clientX
   let clientY
   let touch_position = (e,DifWidth)=>{

    let myElement = e.target.getBoundingClientRect();
    
    let marginTop = e.target.offsetTop;
    let marginLeft = e.target.offsetLeft;
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    //position of element
    let top  = myElement.top +  scrollTop - clientTop;
    let left = myElement.left + scrollLeft - clientLeft;
     
   clientX = e.touches[0].clientX;
   clientY = e.touches[0].clientY;

   topFinal = top - clientY + DifWidth
    leftFinal= left  - clientX + DifWidth
    console.log(topFinal ,leftFinal)
    
    scale=2.5
   }
   
</script>

<style>
    .heart-img {
        max-width: 100%;
    }
    .container {
        background-color: white;
        color: #181d22;
        display: flex;
        flex-direction: column;
        padding: 15px;
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
        z-index:9;
    }
    .p_main_img .gadgad{
        max-width: 100%;
        max-height: 100%;
        margin: auto;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        position: absolute;
        width: 50vw;
        height: 50vw;
        z-index:10;
        border-radius: 50%;
       /*  background-color: red; */

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
        overflow: hidden;
    }

    .p_title {
        color: #181d22;
        font-size: 35px;
        font-weight: 700;
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
        flex-wrap: wrap;
    }
    .p_size .title{
        margin:8px 10px 0 0;
    }
    .sizes {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        row-gap: 15px;
        column-gap: 5px;
    }
    .size {
        background-color: #000;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        color: white;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: 700;
    }
    .size:hover,
    .size.active {
        background-color: #181d22;
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
    .color_border:hover,
    .color_border.active {
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
        flex-wrap: wrap;
    }
    .p_quantity .input_number {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 2px solid #181d22;
        border-radius: 15px;
        height: 40px;
        width: max-content;
        margin: 5px;
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
        background-color: #181d22;
        fill: white !important;
    }
    .input_number .arrow_right:active {
        border-radius: 0 14px 14px 0;
        background-color: #181d22;
        fill: white !important;
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
        border-color: #181d22 transparent transparent
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
        position: relative;
        margin-left: auto
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
        user-select: none;
    }
    .add_cart_btn:hover{
        background-color:#181d22 !important;
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
        flex-direction: column;
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
        width: 100%;
    }
    .policies .delivery .desc {
        font-size: 15px;
        font-weight: 400;
        margin: 6px 6px 6px 0;
    }
    .u-heart-container {
        display: flex;
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
    @media only screen and (max-width: 800px) {
        .p_container{
            padding: 0;
        }
        .p_title{
            font-size: 30px;
        }
        .p_subTitle{
            font-size: 25px;
        }
        .wishlist_btn{
            position: static;
        }
    }
</style>

{#if validated}
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
                        style="{filter}"
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
                                gradientUnits="userSpaceOnUse">
                                <stop offset="0" stop-color="#000" />
                                <stop
                                    offset="0.093"
                                    stop-color="#000"
                                    stop-opacity="0" />
                                <stop
                                    offset="0.729"
                                    stop-color="#000"
                                    stop-opacity="0" />
                                <stop offset="0.918" stop-color="#000" />
                                <stop offset="1" stop-color="#000" />
                            </linearGradient>
                            <filter
                                id="filter"
                                x="0"
                                y="0"
                                width="734"
                                height="734"
                                filterUnits="userSpaceOnUse">
                                <feFlood result="flood" flood-color="#f7f7f7" />
                                <feComposite
                                    result="composite"
                                    operator="in"
                                    in2="SourceGraphic" />
                                <feBlend result="blend" in2="SourceGraphic" />
                            </filter>
                        </defs>
                        <g
                            class="inside_color"
                            style="fill: #bcbcbc; filter: url(#filter)">
                            <circle
                                id="Ellipse_1_copie"
                                data-name="Ellipse 1 copie"
                                class="cls-1"
                                cx="367"
                                cy="367"
                                r="361"
                                style="stroke: inherit; filter: none; fill: inherit" />
                        </g>
                        <use
                            xlink:href="#Ellipse_1_copie"
                            style="stroke: url(#linear-gradient); filter: none; fill: none" />
                    </svg>
                    <!--end-->

                    <div class="p_back_circle"
                   
                    >
                    <div class="gadgad" id="gadgad_id"
                    on:mousemove|preventDefault|stopPropagation={(e) =>{
                        let DifWidth = e.target.offsetWidth - document.querySelector(".product_img").offsetWidth + e.target.offsetLeft 
                        mouse_position(e,DifWidth)
                        }}
                    on:touchmove|preventDefault|stopPropagation ={(e) =>{
                        let DifWidth = e.target.offsetWidth - document.querySelector(".product_img").offsetWidth + e.target.offsetLeft 
                        touch_position(e,DifWidth)
                    }}
                    on:touchstart|preventDefault|stopPropagation ={(e) =>{
                        let DifWidth = e.target.offsetWidth - document.querySelector(".product_img").offsetWidth + e.target.offsetLeft 
                        touch_position(e,DifWidth)
                    }}
                    on:touchend|preventDefault|stopPropagation={(e) => {
                        scale=1
                        topFinal=0;
                        leftFinal=0}}
                        
                        on:mouseleave|preventDefault|stopPropagation={(e) => {
                                scale=1
                                topFinal=0;
                                leftFinal=0}}
                    >
                    </div>
                    {#if activeItem && activeItem.imgs}
                        <img
                            src={activeItem.imgs[$activeColor][$activeFacade]}
                            alt="product"
                            class="product_img"
                            class:rotating
                            style="top:{topFinal}px;left:{leftFinal}px;transform:scale({scale})"
                            
                            />
                    {/if}
                    
                    </div>
                </div>

                <div class="p_slider">
                    <!--Arrow left-->
                    <svg
                        on:click={() => {
                            rotate('left');
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
                        xml:space="preserve">
                        <path
                            d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
                    </svg>
                    {#if activeItem && activeItem.imgs && activeItem.imgs[$activeColor]}
                        {#each Object.entries(activeItem.imgs[$activeColor]) as [facade, link]}
                            <img
                                on:click={() => {
                                    $activeFacade = facade;
                                }}
                                crossorigin="anonymous"
                                src={link}
                                alt="product" />
                        {/each}
                    {/if}

                    <!--Arrow right-->
                    <svg
                        on:click={() => {
                            rotate('right');
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
                        xml:space="preserve">
                        <path
                            d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
                    </svg>
                </div>
            </div>

            <div class="all_info">
                
                <div class="p_info">
                    <div class="u-heart-container">
                        <span class="p_title">{activeItem.name}</span>
                        
                            <button
                                type="button"
                                class="wishlist_btn"
                                on:mouseenter={() => {
                                    show = true;
                                }}
                                on:mouseleave={() => {
                                    show = false;
                                }}
                                on:click={addWishlist(params.userid + '-' + activeItem.id)}>
                                <img
                                    class="heart-img"
                                    src={$user && $user.docData && $user.docData.wishlist && $user.docData?.wishlist[params.userid + '-' + activeItem.id] ? '/img/misc/filled-heart-1.png' : '/img/misc/empty-heart.png'}
                                    alt="eart" />
                                <span
                                    class="popuptext"
                                    class:show
                                    style="background-color:{creatorData.accentColor}"
                                    id="myPopup">{$user && $user.docData && $user.docData.wishlist && $user.docData?.wishlist[params.userid + '-' + activeItem.id] ? 'Remove from ' : 'Add to '}
                                    wishlist</span>
                            </button>
                        
                    </div>
                    
                    <span class="p_subTitle">
                        {#if activeItem.creator}
                            <a  href={"/" + activeItem.creator} use:routlink>
                            <span style="color:{creatorData.accentColor}">{activeItem.creator}</span>
                            </a>
                        {/if}
                    </span>
                    <hr />
                    <span class="p_price">
                        {activeItem.price}
                        <span style="color:{creatorData.accentColor}">TND</span>
                    </span>
                </div>
                
                <div class="p_order_details">
                    <div class="p_colors">
                        <span
                            class="title">{{ en: 'Colors', fr: 'couleurs' }[$lang]}:</span>
                        <span class="colors">
                            {#if activeItem && activeItem.colors}
                                {#each activeItem.colors as color}
                                    <div
                                        on:click={() => {
                                            $activeColor = color;
                                        }}
                                        class="color_border"
                                        class:active={$activeColor == color}
                                        style="border:0px solid black;">
                                        <div
                                            class="color"
                                            style="background-color:{colors[color.toLowerCase()]}" />
                                    </div>
                                {/each}
                            {/if}
                        </span>
                    </div>
                    
                    <div class="p_size">
                        <span
                            class="title">{{ en: 'Size', fr: 'Taille' }[$lang]}:</span>
                        {#if activeItem && activeItem.sizes}
                            {#each activeItem.sizes as size}
                                <div
                                    class:active={size == $activeSize}
                                    style=background-color:{$activeSize == size ? creatorData.accentColor : ""}
                                    on:click={(e) => {
                                        $activeSize = size;       
                                    }}
                                    class="size">
                                    {size}
                                </div>
                            {/each}
                        {:else}
                            <span class="sizes">
                                {#each ['S', 'M', 'L', 'XL'] as size}
                                    <div
                                        class:active={size == $activeSize}
                                        on:click={(e) => {
                                            $activeSize = size;
                                        }}
                                        class="size"
                                        
                                        style=background-color:{$activeSize == size ? creatorData.accentColor : ""}
                                        >
                                        
                                        <span on:click>{size}</span>
                                    </div>
                                {/each}
                            </span>
                        {/if}
                    </div>
                    
                    <div class="p_quantity">
                        <span
                            class="title">{{ en: 'Quantity', fr: 'Quantité' }[$lang]}:
                        </span>
                        <div class="input_number">
                            
                            <svg
                                on:click={() => {
                                    quantity <= 1 ? ($activeQuantity = 1) : ($activeQuantity -= 1);
                                }}
                                version="1.1"
                                id="Layer_1"
                                class="arrow_left"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 492.004 492.004"
                            style="enable-background:new 0 0 492.004 492.004; fill:#181d22"
                                xml:space="preserve">
                                <path
                                    d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
                            </svg>
                            <input type="number" bind:value={$activeQuantity} />

                            <svg
                                on:click={(e) => {
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
                                style="enable-background:new 0 0 492.004 492.004; fill:#181d22"
                                xml:space="preserve">
                                <path
                                    d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
              c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
              c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
              c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
                            </svg>
                        </div>
                    </div>

                    <div class="btns">
                        <button
                            on:click={addToCart}
                            type="button"
                            style="background-color:{creatorData.accentColor}"
                            class="add_cart_btn">
                            {{ en: 'Add to cart', fr: "J'achète" }[$lang]}
                            <svg
                                id="Capa_1"
                                enable-background="new 0 0 512 512"
                                height="512"
                                viewBox="0 0 512 512"
                                width="512"
                                xmlns="http://www.w3.org/2000/svg">
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
              2.301-2.76 3.971-5.307 3.971z" />
                                <path
                                    d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z" />
                                <path
                                    d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z" />
                                <path
                                    d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15
              15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!--
                <div class="p_desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae maxime provident rerum dolorum, quia accusantium
                    cupiditate natus doloribus similique ullam voluptates omnis
                    voluptatibus libero nulla totam recusandae corrupti
                    laudantium exercitationem!
                </div>
                -->
                <hr />
                <div class="policies">
                     <!--
                    <div class="socialShare">
                       
                        <span>{{ en: 'SHARE THIS PRODUCT', fr: 'PARTAGEZ CE PRODUIT' }[$lang]}
                        </span>
                        
                        <div class="socialmedia">
                            <i class="fab fa-facebook" />
                            <i class="fab fa-instagram" />
                        </div>
                       
                    </div>
                     -->
                    <div class="delivery">
                        <span>{{ en: 'DELIVERY', fr: 'LIVRAISON' }[$lang]}
                        </span>
                        <span class="desc">Delivered between 
                            <span style="color:{creatorData.accentColor}; font-weight:600">{minDdate}</span>
                    and <span style="color:{creatorData.accentColor};font-weight:600">{maxDdate}</span>. Please check exact dates in the
                            checkout page.
                        </span>
                    </div>
                    <div class="delivery">
                        <span>{{ en: 'LAUNDRY', fr: 'LESSIVE' }[$lang]}
                        </span>
                        <span class="desc">The product have special washing techniques. <a style="color:{creatorData.accentColor}" href="/washing">learn more.</a></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
{/if}
