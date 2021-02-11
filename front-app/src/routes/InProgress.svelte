<style>
  
    .left_side {
        width: 100%;
        height: 100vh;
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
    .u_logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        font-weight: 700;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .left_side .u_logo img {
        width: 50px;
        height: 50px;
    }
    .left_side .title {
        font-size: 40px;
        font-weight: 700;
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
        z-index: 50;
    }

    .circle_top,
    .circle_bottom {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        transform: rotate(-145deg);
        position: absolute;
    }
    .circle_bottom {
        background-color: rgb(var(--AccentColor));
        bottom: -150px;
        left: -150px;
    }
    .circle_top {
        background-color: #273441;
        top: -150px;
        right: -150px;
        width: 400px;
        height: 400px;
    }
   
    .under{
        width: 100%;
        max-width: 500px;
        position: absolute;
        top:0;
        bottom: 0;
        right: 0;
        left:0;
        margin: auto;
    }
    .shadow{
        position: absolute;
        box-shadow: 0 0 133px #46b978;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: #46b9786b;
        top:0;
        bottom: 0;
        right: 0;
        left:0;
        margin: auto;
    }
  
</style>

<script>
    import {link} from 'svelte-routing'
    document.title = "Unify - Under Construction"
</script>


<div class="left_side">
    <a href="/" use:link class="u_logo">
        <img src="./img/logo.png" alt="logo" />Unify
    </a>
    <div class="title">
        Under construction
    </div>
    <div style="position:relative;width: 300px;height:300px">
        <div class="shadow"/>
        <img class="under"src="/img/under.png" alt="cloud">
    </div>
    
    

   

    <div class="circle_top" />
    <div class="circle_bottom" />
</div>