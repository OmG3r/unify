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
    
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;
    width: 90%;
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
    width: 80%;
}

.using,.about,.follow,.newsletter{
    color:white;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 20px 0 20px;
}
.using .title,.about .title,.follow .title,.newsletter .title{
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
.items a {
    margin: 2.5px 0 2.5px 0;
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
           width: 100%;
       }
       .left_part .sub_text{
           width: 300px;
       }
   }
   @media only screen and (max-width: 800px) {
       .right_part{
           align-items: center;
       }
       .about,.follow,.newsletter,.using{
           max-width: 115px;
       }
       .left_part,.right_part{
           flex-direction: column;
       }
       .left_part .logo {
           margin-bottom: 15px;
       }
       .using,.about,.follow,.newsletter{
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
    import { lang } from "../store.js";

</script>
<footer>
    <div class="top">
        <div class="left_part">

            <div class="logo">
                <img src="/img/logo_transaprent.png" alt="logo">
                Unify
            </div>

            <div class="sub_text">
                {{
                    en: 'Unify is the first platform dedicated to content creation in Tunisia that connects content creators and their supporters.', 
                    fr: 'Unify est la première plateforme dédiée à la création de contenu en Tunisie qui met en relation les créateurs de contenu et et leurs fans.' 
                }[$lang]}
            </div>
        </div>
        <div class="right_part">

            <div class="using">
                <div class="title">{{en: 'Creators’ Hub', fr: 'Hub des créateurs' }[$lang]}</div>
                <div class="items">
                    <a href="https://creator.unify.tn" class="item">{{en: 'Merch', fr: 'Marchandise' }[$lang]}</a>
                    <a href="/inprogress" class="item">{{en: 'Custom Design', fr: 'Design Personnalisé' }[$lang]}</a>
                    <a href="/inprogress" class="item">{{en: 'Donation', fr: 'Don' }[$lang]}</a>
                    <a href="/inprogress" class="item">{{en: 'Subscription', fr: 'Abonnements' }[$lang]}</a>
                </div>
            </div>
            <div class="about">
                <div class="title">{{en: 'Unify', fr: 'Unify' }[$lang]}</div>
                <div class="items">
                    <a href="/inprogress" class="item">{{en: 'About', fr: 'À propos' }[$lang]}</a>
                    <a href="/inprogress" class="item">{{en: 'Brand', fr: 'Brand' }[$lang]}</a>
                    <a href="/contactus" class="item">{{en: 'Contact us', fr: 'Contactez-nous' }[$lang]}</a>
                    <a href="/payment" class="item">{{en: 'Methods of Payment', fr: 'Modes de paiement' }[$lang]}</a>
                    <a href="/terms" class="item">{{en: 'Terms', fr: 'Termes' }[$lang]}</a>
                    <a href="/policy" class="item">{{en: 'Policies', fr: 'Politiques' }[$lang]}</a>

                </div>
            </div>
            <div class="follow">
                <div class="title">{{en: 'Social Media', fr: 'Réseaux sociaux' }[$lang]}</div>
                <div class="items">
                    <a href="#"><img src="/img/misc/fb.png" alt="fb"></a>
                    <a href="#"><img src="/img/misc/instagram.png" alt="fb"></a>
                    
                </div>
            </div>
            <!-- <div class="newsletter">
                <div class="title">{{en: 'Newsletter', fr: 'Newsletter' }[$lang]}</div>
                <div class="items">
                    {{
                        en: 'Subscribe and be the first to hear about new features and exclusive offers.', 
                        fr: 'Abonnez-vous et soyez les premiers à être informés des nouvelles fonctionnalités et des offres exclusives.' 
                    }[$lang]}
                     
                </div>
            </div> -->

        </div>

    </div>
    <div class="copyright">
        {{
            en: 'Crafted With', 
            fr: 'Réalisé avec' 
         }[$lang]}
         <img src="/img/misc/heart2.png" alt="heart"> 
         {{
            en: 'By', 
            fr: 'Par ' 
         }[$lang]} 
         <span>UNIFY</span>
         {{
            en: '@ All right reserved', 
            fr: '@ Tous droits réservés ' 
         }[$lang]} 
    </div>

    <div class="right_top_shape"></div>
    <div class="left_bottom_shape"></div>
</footer>