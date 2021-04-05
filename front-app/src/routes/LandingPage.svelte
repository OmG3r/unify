<script>
    import {onMount} from 'svelte';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // You can also use <link> for styles
    import { lang } from "../store.js";

    // ..
    export let params = {};
    document.title = "Unify"
    onMount(async () => {
            AOS.init();
        });
   
</script>

<style>
    header {
        background-color: #181d22;
        position: relative;
        height: 800px;
        color: white;
        font-size: 60px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 15px black;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        background-image: url("/img/back.png");
      
    }

    header .socialMedia{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 15px 0;
    }
    header .socialMedia img{
        width: 50px;
        margin:0 10px 0 10px
    }
    
    .left_part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 6;
    }
    

    .left_part .sub_title {
        font-size: 22px;
        font-weight: 400;
        text-align: center;
        margin: 30px 0 20px 0;
    }
    .left_part .title{
        text-align: center;
        font-size: 70px;
        margin: 15px 0 15px 0;
        z-index: 5;
        line-height: 1;
    }
    
    button:focus {
        outline: 0;
    }
    .get_started_btn button {
        background-color: #00ce7c;
        border: none;
        border-radius: 30px;
        color: white;
        font-size: 20px;
        font-weight: 600;
        height: max-content;
        width: max-content;
        cursor: pointer;
    }
    .get_started_btn button:active {
        background-color: #49d29b;
    }
    .get_started_btn a {
        padding: 18px 30px;
        display: block;
    }
    .slider {
        position: absolute;
        bottom: -220px;
        right: 15%;
        z-index: 5;
        display: none;
    }
    .slider img {
        width: 600px;
    }
    
    .shape_top_right {
        position: absolute;
        top: 0;
        right: 0;
        width: 300px;
        height: 300px;
        background-color: #273542;
        border-bottom-left-radius: 300px;
        border-right: 0;
        border-bottom: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .shape_bottom_left {

        position: absolute;
        bottom: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background-color: #46b974;
        border-top-right-radius: 300px;
        border-right: 0;
        border-bottom: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .shape1 {
        background-color: white;
        width: 900px;
        height: 900px;
        border-radius: 50%;
        position: absolute;
        top: -19%;
        right: -12%;
        z-index: 4;
        
    }
    .shape2 {
        background-color: #00ce7c;
        width: 900px;
        height: 900px;
        border-radius: 50%;
        position: absolute;
        top: -38%;
        right: 12%;
        z-index: 3;
        
    }
    .shape3 {
        background-color: #273441;
        width: 900px;
        height: 900px;
        border-radius: 50%;
        position: absolute;
        bottom: -23%;
        right: -11%;
        z-index: 3;
    }
    .section1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 100px 140px 100px 140px;
        min-height: 500px;
    }
    .section1 .part_one {
        width: 100%;
        
    }
    .section1 .part_one .paragraph {
        color: #181d22;
        font-size: 50px;
        font-weight: 600;
    }
    .section1 .part_one .paragraph .div_sub{
        width: max-content;
    }
    .section1 .part_two {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }
    .section1 .part_two img {
        width: 100px;
        margin: 0 15px 0 15px;
    }
    .section2 {
        background-color: #f1f4f8;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 40px 0px 40px 140px;
        position: relative;
    }
    .section2 .part_one {
        width: 100%;
        color: #3d4853;
        font-size: 50px;
        font-weight: 600;
    }
    .section2 .part_one .paragraph {
        color: #4b555f;
        font-size: 30px;
        font-weight: 400;
        margin-top: 25px;
    }
    .section2 .part_one .paragraph div {
        margin-top: 35px;
    }

    .section2 .part_one button {
        display: block;
        background-color: #00ce7c;
        color: white;
        border-radius: 20px;
        font-size: 25px;
        font-weight: 600;
        height: max-content;
        min-height: 75px;
        width: max-content;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 25px auto 0 auto;
        cursor: pointer;
    }
    .section2 .part_one button a {
        padding: 15px 30px;
        display: block;

    }
    .section2 .part_one button:active {
        background-color: #49d29b;
    }
    .section2 .part_two {
        width: 100%;
        overflow: hidden;
    }

    .section2 .part_two img {
        width: 1200px;
    }
.get_started_btn .btn a {
            padding: 12px 24px;
        }
    

    @media only screen and (max-width: 1180px) {

        
        .section1 {
            flex-direction: column;
            padding: 100px 0 100px 0;
            justify-content: center;
        }
        .section1 .part_one {
            width: 100%;
            padding: 10px;
            text-align: center;
            margin: 0;
        }
        .section1 .part_one .paragraph {
            font-size: 40px;
        }
        .section1 .part_one .paragraph .div_sub{
            width: 100%;
        }
        .section1 .socialMedia {
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0;
        }
        .section1 .socialMedia img {
            width: 70px;
            margin-top: 20px;
        }
        .get_started_btn .btn {
            max-width: 80%;
            font-size: 20px;
        }
        .get_started_btn .btn a {
            padding: 5px 10px;
        }
        .section2 {
            flex-direction: column;
            padding: 40px;
        }
        .section2 .part_one {
            width: 90%;
        }
        .section2 .part_two {
            display: none;
        }
        .section2 .part_one .title {
            font-size: 35px;
        }
        .section2 .part_one button {
            max-width: 80%;
            font-size: 20px;
        }
      
    }
 
    @media only screen and (max-width: 800px) {
        .left_part .title{
            font-size: 40px;
        }

        header .socialMedia img{
            width: 30px;
            margin:0 10px 0 10px;
            flex-wrap:wrap;
        }
        .shape_top_right,.shape_bottom_left{
            width: 200px;
            height: 200px;
        }
        
        .section1 .part_one .paragraph,.section2 .part_one .title{
            font-size: 30px;
        }
        .section2 .part_one .paragraph{
            font-size: 20px;
        }
    }
.half-circle {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    border-top-right-radius: 100px;
    border-right: 0;
    border-bottom: 0;
    
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.left{
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 4;
}
.right{
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 4;
}
.instagram{
    width: 45px;
}
.twitch{
    width: 40px;
}
.fb{
    width: 48px;
}
</style>

<!--header-->
<header>
    <div class="left_part">
        <div class="title" data-aos="fade-right" data-aos-duration="1000">
            {{ en: 'Tools for Gamers.', fr: 'Outils pour Gamers. ' }[$lang]}<br>
            {{ en: 'Creators. Brands.', fr: 'Createurs. Brands.' }[$lang]}

            <div class="socialMedia part_two" data-aos="fade-right" data-aos-delay="800" data-aos-duration="1000" >
            <img src="/img/socialMedia/instagram_colored.svg" alt="instagram" class="instagram" />
            <img src="/img/socialMedia/twitch_colored.svg" alt="twitch" class="twitch" />
            <img src="/img/socialMedia/youtube_colored.svg" alt="yt" />
            <img src="/img/socialMedia/facebook_colored.svg" alt="fb"  class="fb"/>
            <img src="/img/socialMedia/nimo_colored.svg" alt="nimo" />
            </div>

            <div class="sub_title" data-aos="fade-right" data-aos-delay="400" data-aos-duration="1000">{{ en: 'Design and sell branded merch', fr: 'Conception et vente de marchandise' }[$lang]}</div>
    

            <div class="get_started_btn">
                <button class="btn" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="600">
                    <a  target="_blank" href="https://creator.unify.tn/register">{{ en: 'Get Started Now', fr: 'Commencez maintenant' }[$lang]}</a></button>
            </div>
    </div>
    <!-- <img class="left" src="/img/left.png" alt="left">
    <img class="right" src="/img/right.png" alt="left"> -->
    <!-- <div class="shape_top_right"></div>
    <div class="shape_bottom_left"></div> -->

</header>
<!-- End header-->

<!------Section 1 -------->
<div class="section1">
    <div class="part_one">
        <div class="paragraph">
            <div class="div_p">
                {{ en: 'Start', fr: 'Commencez' }[$lang]}
                <span style="color:#00CE7C !important">{{ en: 'Generating', fr: 'À Générer' }[$lang]}</span>
                {{ en: 'Revenues', fr: 'Des Revenus' }[$lang]}
            </div>

            <p style="color:#747474 !important" class="div_sub">{{ en: 'From Your Hobby', fr: ' Partir De Votre Passion' }[$lang]}</p>
        </div>
    </div>
    <div class="socialMedia part_two" data-aos="fade-up">
        <img src="/img/socialMedia/youtube_colored.svg" alt="yt" />
        <img src="/img/socialMedia/twitch_colored.svg" alt="twitch" />
        <img src="/img/socialMedia/facebook_colored.svg" alt="fb" />
        <img src="/img/socialMedia/instagram_colored.svg" alt="instagram" />
        <img src="/img/socialMedia/nimo_colored.svg" alt="nimo" />
    </div>
</div>
<!------End Section 1------>

<!------Section 2 -------->
<div class="section2">
    <div class="part_one">
        <div class="title">
            {{ en: 'Start Selling Your', fr: 'Commencez à Vendre Votre' }[$lang]}
            
            <span style="color:#00CE7C !important">{{ en: 'Customized', fr: 'Marchandise' }[$lang]}</span>
            {{ en: 'Merch Online', fr: 'Personnalisée En Ligne' }[$lang]}
        </div>
        <div class="paragraph">
            {{ en: ' We handle it all from printing to support.', fr: "Nous nous occupons de tout, de l'impression et la livrason au support client." }[$lang]}
           
            <div>
                {{ 
                en: "focus on your hobby. we'll take care of the printing, shipping,customer support and more.",
                fr: "Concentrez-vous sur votre passion. nous nous occuperons de l'impression, de l'expédition, du support client et plus." 
                }[$lang]}
            
            </div>
        </div>
        <button><a target="_blank" href="https://creator.unify.tn/register">
            {{ 
                en: "Start Now",
                fr: "Démarrez Maintenant" 
                }[$lang]}</a></button>
    </div>
    <div class="part_two" data-aos="fade-right"><img src="/img/section2.png" alt="section2" /></div>
</div>
<!------End Section 2------>
