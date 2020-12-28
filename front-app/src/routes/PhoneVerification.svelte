<script>

</script>
<style>
.left_side{
        width: 100%;
        height:100vh;
        background-color: rgb(var(--userColor));
        color: white;
        padding: 10px 60px 10px 60px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .u_logo{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        font-weight: 700;
        position: absolute;
        top:10px;
        left: 10px;;
    }
    .left_side .u_logo img{
        width: 50px;
        height:50px;
    }
    .left_side .title{
        font-size: 30px;
        font-weight: 700;
        width: 100%;
        text-align:center;
        margin-bottom: 15px;
    }

    .circle_top,.circle_bottom{
    width: 300px;
    height: 300px;
    border-radius: 50%;
    transform: rotate(-145deg);
    position: absolute;
    }
    .circle_bottom{
        background-color: rgb(var(--AccentColor));
        bottom: -150px;
        left: -150px;
    }
    .circle_top{
        background-color: #273441;
        top: -150px;
        right: -150px;
        width: 400px;
    height: 400px;
    }
    .inputContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inputContainer i{
        position: absolute;
        padding: 18px; 
        min-width: 50px;
        color:rgba(var(--userColor),0.2);
        font-size: 25px;
        transform: rotate(90deg);
    }
    .inputContainer input{
        width: 350px; 
        height: 50px;;
        padding: 10px; 
        text-align: center;
        margin: 5px 0 5px 0;
        border-radius: 8px;
        border: none;
        background-color: #F4F8F7;
        color:rgba(var(--userColor),0.8);
        font-size: 20px;
        font-weight: 600;
    }
    .inputContainer input:focus{
        outline: none !important;
        border-color: #719ECE;
        border: 1px solid rgba(var(--userColor),0.5);;
    }
    .verification_btns{
        display: flex;
        flex-direction: row-reverse;
        margin-top: 15px;
    }
    .verification_btns div button{
        width: 150px;
        height: 35px;
        color: white;
        background-color: rgb(var(--AccentColor));
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        border:none;
        margin: 0 7px 0 7px;
        cursor: pointer;
    }
    button:focus{
        outline: none;
    }
    .resend_btn:active{
        background-color: rgba(255,255,255,0.8) !important;
        
    }
    .resend_btn{
        background-color:  white !important;
        color: rgb(var(--userColor)) !important;
    }
    .send_btn:active{
        background-color: rgba(var(--AccentColor),0.8);
    }
</style>

<div class="left_side">
            <div class="u_logo">
                <img src="./img/logo.png" alt="logo" />Unify
            </div>
            <div class="title">Please verify your phone number</div>
             <div class="inputContainer">
                <div class="input">
                    <i class="fas fa-phone"></i>
                <input type="email" class="verification" placeholder="Verification Code">
                </div>
            </div>
            <div class="verification_btns">
            <div class="send"><button class="send_btn">Verify</button></div>
            <div class="resend"><button class="resend_btn">Resend</button></div>
            </div>
           
            <div class="circle_top"></div>
            <div class="circle_bottom"></div>
</div>
