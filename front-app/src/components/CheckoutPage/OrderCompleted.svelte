
<script>
let OrderID = 54767523
let drawn = true;
</script>

<style>
    .container {
        background:#46B978;
        background-image: url("/img/logo_white_small.png");
        background-size: 160px;
        width: 100vw;
        height: 100vh;
        
        
    }
   
  
    

    .opacity {
        min-height: 100vh;
        width: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to left,rgba(70, 185, 120, 0.5) -20%,  rgba(70, 185, 120, 1) 10%, rgba(70, 185, 120, 1) 90%, rgba(70, 185, 120, 0.5) 110%);
    }
    .orderInfo{
        color: white;
        font-size: 25px;
        font-weight: 700;
    }
    .orderID{
        font-size: 18px;
        font-weight: 400;
        text-align: center;
    }
    #tick{
        width: 140px;
    }
    .circ{
    opacity: 0;
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
}
#tick{
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    -webkit-transition: stroke-dashoffset 1s 0.5s ease-out;
    -moz-transition: stroke-dashoffset 1s 0.5s ease-out;
    -ms-transition: stroke-dashoffset 1s 0.5s ease-out;
    -o-transition: stroke-dashoffset 1s 0.5s ease-out;
    transition: stroke-dashoffset 1s 0.5s ease-out;
}
.drawn + svg .path{
    opacity: 1;
    stroke-dashoffset: 0;
}
</style>
<div class="container">
    
    <div class="opacity">

        <div class="tickAnimation">

        <div class="trigger" class:drawn></div>
        <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">
        <path class="circ path" style="fill:#ffffff;stroke-linejoin:round;stroke-miterlimit:10;" d="
            M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
        <polyline class="tick path" style="fill:none;stroke:#46B978;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="
            11.6,20 15.9,24.2 26.4,13.8 "/>
        </svg>

    </div>
    
    <div class="orderInfo">
        Your order has been registred.
        <div class="orderID">
            Order Number : {OrderID}
        </div>
    </div>

    </div>

    

</div>