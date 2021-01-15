<style>
header{
    background-color: #181D22;
    position: relative;
    height: 800px;
    color:white;
    font-size: 60px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 15px black;
}
.left_part{
    display: flex;
    flex-direction: column;
    width: 70%;
}
.left_part .title{
    max-width: 290px;
}

.left_part .sub_title{
    font-size: 25px;
    font-weight: 400;
}
.get_started_btn{
    margin-left: 25px;
}
button:focus {outline:0;}
.get_started_btn button {
    background-color: #00CE7C;
    border: none;
    border-radius: 18px;
    color: white;
    font-size: 25px;
    font-weight: 600;
    height: 70px;
    width: 300px;
    cursor: pointer;
}
.get_started_btn button:active{
    background-color: #49d29b;
}
.slider{
    position: absolute;
    bottom: -220px;
    right: 300px;
    z-index: 5;
    }
.slider img{
    width: 600px;
}
.shape_top_left{
    width: 500px;
    height: 250px;
    background-color:#273441;
    position:absolute;
    bottom: 0px;
    left: -250px;
    border-top-left-radius:260px;
    border-top-right-radius:260px;
    border-bottom: 0;
}
.shape_bottom_left{
    background-color:white;
    width: 500px;
    height: 500px;
    border-radius: 50%;
     position:absolute;
    top:-250px;
    left: -250px;
}

.shape1{
    background-color: white;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    position:absolute;
    top:-150px;
    right: -200px;
    z-index: 4;
}
.shape2{
    background-color: #00CE7C;
    width: 800px;
    height: 800px;
    border-radius: 50%;
     position:absolute;
    top:-300px;
    right: 200px;
    z-index: 3;
}
.shape3{
    background-color: #273441;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    position:absolute;
    bottom: -200px;
    right: -200px;
    z-index: 3;
}
.section1{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 600px;;
}
.section1 .part_one{
    width: 40%;
}
.section1 .part_one .paragraph{
    color:#181D22;
    font-size: 50px;
    font-weight: 600;
}
.section1 .part_two{
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;     
}
.section1 .part_two img{
    width: 100px;
    margin: 0 15px 0 15px;
}
.section2{
    background-color: #F1F4F8;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40px 0 40px 0;
    position: relative;
}
.section2 .part_one{
    width: 40%;
    color:#3D4853;
    font-size: 50px;
    font-weight: 600;
}
.section2 .part_one .paragraph{
    color:#4B555F;
    font-size: 30px;
    font-weight: 400;
    margin-top: 25px;
}
.section2 .part_one .paragraph div{
    margin-top: 35px;
}

.section2 .part_one button{
    background-color: #00CE7C;
    color: white;
    border-radius: 20px;
    font-size: 30px;
    font-weight: 600;
    height: 75px;
    width: 380px;
    border:none;
    margin-top: 25px;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}
.section2 .part_one button:active{
    background-color: #49d29b;
}
.section2 .part_two{
    width: 40%;
}

.section2 .part_two img{
    position: absolute;
    bottom: 0;
    width: 65%;
}


</style>


<script>
    export let params = {}


</script>
<!--header-->
<header>

  
    <div class="left_part">
        <div class="title">All-in-one Place Unified</div>
        <div class="sub_title">Design and sell branded merch</div>
        <div class="get_started_btn">
            <button class="btn">Get Started Now</button>
        </div>
    </div>

    <div class="slider"><img src="./img/beki.png" alt="content_creator"></div>

    <div class="shape_top_left"/>
    <div class="shape_bottom_left"/>
    
    <div class="shape1"/>   <!--White circle-->
    <div class="shape2"/>   <!--green circle-->
    <div class="shape3"/>   <!--gray circle-->
   
    
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
    <div class="socialMedia part_two">
        <img src="/img/socialMedia/yt_colored.svg" alt="yt">
        <img src="/img/socialMedia/twitch_colored.svg" alt="twitch">
        <img src="/img/socialMedia/fb_colored.svg" alt="fb">
        <img src="/img/socialMedia/instagram_colored.svg" alt="instagram">
        <img src="/img/socialMedia/nimo_colored.svg" alt="nimo">
    </div>

</div>
<!------End Section 1------>

<!------Section 2 -------->
<div class="section2">
    <div class="part_one">
        <div class="title">
            Start Selling Your 
            <span style="color:#00CE7C !important">Customized</span>
            Merch Online</div>
        <div class="paragraph">
            We handle it all from printing to support.
            <div>focus on your hobby. we'll take care of printing,shipping,customer support and more.</div> 
        </div>
        <button>Start Your Store Now</button>
    </div>
    <div class="part_two">
        <img src="/img/section2.png" alt="section2">
    </div>

</div>
<!------End Section 2------>