<style>
footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #181D22;
    padding: 50px 0 15px 0;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;
}
.left_part{
    display:flex;
    flex-direction: column;
    width: 20%;
}
.left_part .logo{
    font-weight: 600;
    font-size: 18px;
    color : white;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
}
.left_part .logo img{
    width: 35px;
    margin-right: 10px;
}
.left_part .sub_text{
    color:white;
}
.right_part{
    display:flex;
    flex-direction: row;
    width: 70%;
}

.using,.about,.follow{
    color:white;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 40px 0 40px;
}
.using .title,.about .title,.follow .title{
    color:#848484;
    font-weight: 600;
    margin-bottom: 15px;
}
.using a:hover,.about a:hover,.follow a:hover{
    color:#46B978;
}
.using .items,.about .items{
    display: flex;
    flex-direction: column;
}

.follow .items{
     display: flex;
     flex-direction: row;

}
.follow .items img{
    width: 27px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(73deg) brightness(103%) contrast(103%);
    margin: 0 5px 0 5px;
    cursor: pointer;
}
.follow .items img:hover{
    filter: invert(54%) sepia(66%) saturate(375%) hue-rotate(93deg) brightness(102%) contrast(85%);
}
.copyright{
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 80px;
    z-index: 1;
}
.copyright img {
    width: 25px;
    filter: invert(43%) sepia(20%) saturate(4701%) hue-rotate(333deg) brightness(88%) contrast(83%);
    margin:0 5px 0 5px;
}
.copyright span{
    color:#46B978;
    margin:0 5px 0 5px;
    font-weight: 600;
}
.right_top_shape,.left_bottom_shape{
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
}
.right_top_shape{
    right: -200px;
    top: -200px;
    background-color:#273441;
}
.left_bottom_shape{
    left: -200px;
    bottom: -200px;
    background-color:#46B978;
}
   @media only screen and (max-width: 1180px) {
       .top{
            flex-direction: column;
            align-items: center;
       }
       .left_part{
            flex-direction: row;
            width: max-content;
            margin-bottom: 20px;
            align-items: center;
       }
       .left_part .logo{
            margin-right: 15px;
            margin-bottom: 0;
       }
       .right_part{
           width: max-content;
       }
   }
   @media only screen and (max-width: 800px) {
       .left_part,.right_part{
           flex-direction: column;
       }
       .left_part .logo {
           margin-bottom: 15px;
       }
       .using,.about,.follow{
           margin-bottom: 15px;
       }
       .right_top_shape,.left_bottom_shape{
           width: 300px;
           height: 300px;
       }
       .right_top_shape{
            right: -150px;
            top: -150px;
        }
        .left_bottom_shape{
            left: -150px;
            bottom: -150px;
        }
   }
</style>

<script>

</script>
<footer>
    <div class="top">
        <div class="left_part">

            <div class="logo">
                <img src="/img/logo_transaprent.png" alt="logo">
                Unify
            </div>

            <div class="sub_text">Lorem, ipsum dolor sit amet consectetur</div>
        </div>
        <div class="right_part">

            <div class="using">
                <div class="title">USING UNIFY</div>
                <div class="items">
                    <a href="https://creator.unify.tn" class="item">Sell merch online</a>
                    <a href="/inprogress" class="item">Donation & tipping</a>
                    <a href="/inprogress" class="item">Custom Design</a>
                </div>
            </div>
            <div class="about">
                <div class="title">ABOUT UNIFY</div>
                <div class="items">
                    <a href="/inprogress" class="item">About</a>
                    <a href="/inprogress" class="item">Help & Support</a>
                    <a href="/inprogress" class="item">Contact</a>
                    <a href="/inprogress" class="item">Privacy & Policy</a>
                </div>
            </div>
            <div class="follow">
                <div class="title">FOLLOW UNIFY</div>
                <div class="items">
                    <a href="#"><img src="/img/misc/fb.png" alt="fb"></a>
                    <a href="#"><img src="/img/misc/instagram.png" alt="fb"></a>
                    
                </div>
            </div>

        </div>

    </div>
    <div class="copyright">
        Made with <img src="/img/misc/heart2.png" alt="heart"> By <span>UNIFY</span>.All right reserved
    </div>

    <div class="right_top_shape"></div>
    <div class="left_bottom_shape"></div>
</footer>