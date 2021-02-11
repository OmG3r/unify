<script>
    import {onMount} from 'svelte';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // You can also use <link> for styles
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
    }
    .left_part {
        display: flex;
        flex-direction: column;
        width: 70%;
        z-index: 6;
    }
    .left_part .title {
        max-width: 290px;
    }

    .left_part .sub_title {
        font-size: 25px;
        font-weight: 400;
    }
    .get_started_btn {
        margin-left: 25px;
    }
    button:focus {
        outline: 0;
    }
    .get_started_btn button {
        background-color: #00ce7c;
        border: none;
        border-radius: 18px;
        color: white;
        font-size: 25px;
        font-weight: 600;
        height: 70px;
        width: 300px;
        cursor: pointer;
    }
    .get_started_btn button:active {
        background-color: #49d29b;
    }
    .slider {
        position: absolute;
        bottom: -220px;
        right: 15%;
        z-index: 5;
    }
    .slider img {
        width: 600px;
    }
    .shape_top_left {
        width: 500px;
        height: 250px;
        background-color: #273441;
        position: absolute;
        bottom: 0px;
        left: -250px;
        border-top-left-radius: 260px;
        border-top-right-radius: 260px;
        border-bottom: 0;
    }
    .shape_bottom_left {
        background-color: white;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        position: absolute;
        top: -250px;
        left: -250px;
    }

    .shape1 {
        background-color: white;
        width: 50vw;
        height: 50vw;
        border-radius: 50%;
        position: absolute;
        top: -19%;
        right: -12%;
        z-index: 4;
    }
    .shape2 {
        background-color: #00ce7c;
        width: 50vw;
        height: 50vw;
        border-radius: 50%;
        position: absolute;
        top: -38%;
        right: 12%;
        z-index: 3;
    }
    .shape3 {
        background-color: #273441;
        width: 50vw;
        height: 50vw;
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
        justify-content: center;
        height: 600px;
    }
    .section1 .part_one {
        width: 40%;
    }
    .section1 .part_one .paragraph {
        color: #181d22;
        font-size: 50px;
        font-weight: 600;
    }
    .section1 .part_two {
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
        padding: 40px 0 40px 0;
        position: relative;
    }
    .section2 .part_one {
        width: 40%;
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
        font-size: 30px;
        font-weight: 600;
        height: 75px;
        width: 380px;
        border: none;
        
        margin: 25px auto 0 auto;
        cursor: pointer;
    }
    .section2 .part_one button:active {
        background-color: #49d29b;
    }
    .section2 .part_two {
        width: 40%;
    }

    .section2 .part_two img {
        width: 125%;
    }

    
    @media only screen and (max-width: 1180px) {
        .slider {
            right: 0;
        }
        .slider img {
            width: 50vw;
            min-width: 500px;
        }
        .shape1 {
            top: -10%;
        }
        .shape2 {
            top: -20%;
        }
        .shape3 {
            bottom: -10%;
        }
        .section1 {
            flex-direction: column;
        }
        .section1 .part_one {
            width: 100%;
            padding: 10px;
        }
        .section1 .part_one .paragraph {
            font-size: 30px;
        }
        .section1 .socialMedia {
            width: 100%;
            flex-wrap: wrap;
            justify-content: flex-start;
        }
        .section1 .socialMedia img {
            width: 70px;
            margin-top: 20px;
        }
        .get_started_btn .btn {
            max-width: 80%;
            font-size: 20px;
        }
        .section2 {
            flex-direction: column;
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
        .slider {
            display: none;
        }
        .shape1 {
            display: none;
        }
        .shape2 {
            display: none;
        }
        .shape3 {
            display: none;
        }
        .shape_bottom_left {
            width: 400px;
            height: 400px;
            top: -200px;
            left: -200px;
        }
    }
</style>

<!--header-->
<header>
    <div class="left_part">
        <div class="title" data-aos="fade-right" data-aos-duration="1000">All-in-one Place Unified</div>
        <div class="sub_title" data-aos="fade-right" data-aos-delay="400" data-aos-duration="1000">Design and sell branded merch</div>
        <div class="get_started_btn">
            <button class="btn" data-aos="fade-up" data-aos-delay="800" data-aos-duration="600">
                <a href="https://creator.unify.tn">Get Started Now</a></button>
        </div>
    </div>

    <div class="slider" data-aos="fade-up"  data-aos-duration="1000"><img src="./img/beki.png" alt="content_creator" /></div>

    <div class="shape_top_left" />
    <div class="shape_bottom_left" />

    <div class="shape1" />
    <!--White circle-->
    <div class="shape2" />
    <!--green circle-->
    <div class="shape3" />
    <!--gray circle-->
</header>
<!-- End header-->

<!------Section 1 -------->
<div class="section1">
    <div class="part_one">
        <div class="paragraph">
            <div class="div_p">
                Start
                <span style="color:#00CE7C !important">Generating</span>
                Revenues
            </div>

            <div style="color:#747474 !important">From Your Hobby</div>
        </div>
    </div>
    <div class="socialMedia part_two" data-aos="fade-up">
        <img src="/img/socialMedia/yt_colored.svg" alt="yt" />
        <img src="/img/socialMedia/twitch_colored.svg" alt="twitch" />
        <img src="/img/socialMedia/fb_colored.svg" alt="fb" />
        <img src="/img/socialMedia/instagram_colored.svg" alt="instagram" />
        <img src="/img/socialMedia/nimo_colored.svg" alt="nimo" />
    </div>
</div>
<!------End Section 1------>

<!------Section 2 -------->
<div class="section2">
    <div class="part_one">
        <div class="title">
            Start Selling Your
            <span style="color:#00CE7C !important">Customized</span>
            Merch Online
        </div>
        <div class="paragraph">
            We handle it all from printing to support.
            <div>
                focus on your hobby. we'll take care of printing, shipping,
                customer support and more.
            </div>
        </div>
        <button><a href="https://creator.unify.tn">Start Your Store Now</a></button>
    </div>
    <div class="part_two" data-aos="fade-right"><img src="/img/section2.png" alt="section2" /></div>
</div>
<!------End Section 2------>
