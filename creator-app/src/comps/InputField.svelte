<style>
    .input-wrapper {
        width: 100%;
        margin: 15px 0 15px 0;
        position: relative;
    }

    .input-label {
        width: 100%;
        margin: 0 0 10px;
        text-align: left;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        z-index: 1;
        color: #46B978;
        font-size: 18px;
        font-weight: 600;
        position: absolute;
        top: -12px;
        left: 30px;
        color: #46c092;
        background-color: white;
        padding: 0 5px 0 5px;
        height: 13px;
    }

    .input-wrapper-container {
        width: 100%;
        min-height: 40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
    }

    .input-text {
        position: relative;
        width: 100%;
        padding: 0 10px;
        line-height: 40px;
        outline: none;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #b9bbbc;
        padding-left: 15px;
        font-size: 15px;
        font-weight: 600;
    }
    
</style>

<script>
    import {accentColor} from "../store.js"
    export let title = ""
    export let id;
    export let text = ""
    export let placeholder = ""
</script>

<div class="input-wrapper" >
    <label for={id ? id : title} required="required" class="input-label" style="color:{$accentColor}">
        {title}
    </label>
    <div class="input-wrapper-container">
        
        <input
            id={id ? id : title}
            bind:value={text}
            type="text"
            required="required"
            tabindex="1"
            placeholder={placeholder}
            class="input-text" />
    </div>
</div>
