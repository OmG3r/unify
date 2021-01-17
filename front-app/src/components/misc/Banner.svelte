<style>
    .banner {
        width: 100%;
        text-align: center;
        position: relative;
        display: flex;
        align-items: center
    }

    .close {
        position: absolute;
        bottom: 0;
        right: 12px;
        top: 0;
        width: 32px;
        height: 32px;
        opacity: 1;
    }
    .close:hover {
        opacity: 1;
    }
    .close:before, .close:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }
</style>


<script>
    import {link} from 'svelte-routing'
    export let url = "#";
    export let text = ""
    export let backgroundColor;
    export let textColor;

</script>

<a href={url} use:link class="banner"
 style={"background-color:" + backgroundColor + ";color:" + textColor + ";"}>
    <span>{text}</span>
    <div class="close"></div>
</a>