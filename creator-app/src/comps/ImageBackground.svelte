<style>
    .image-wrapper {
        position: relative;
    }

    .background {
        width: 100%;
        height: 100%;
        
    }

    .image-wrapper img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 0;
        border-radius: 20px 20px 0 0;
    }
    .image-wrapper .background{
       border-radius: 25px 25px 0 0;
    }

</style>


<script>
    import {formatCssStyle} from '../utils.js'

    export let bgColor = "#000000"
    export let img;
    export let height = "300px"
    export let width = "300px"
</script>

<div style={formatCssStyle({height: height, width: width})} class="image-wrapper">
    <div style={formatCssStyle({'background-color': bgColor})} class="background"></div>
    <img crossorigin="anonymous" src={img} alt="imag">
</div>