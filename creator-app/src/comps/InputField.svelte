<style>
    .input-wrapper {
        width: 100%;
        margin-bottom: 1.5rem;
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
        -webkit-box-shadow: 0 0 0 1px #ddd;
        box-shadow: 0 0 0 1px #ddd;
        border-radius: 4px;
        border: 0;
        outline: none;
    }
    
</style>

<script>
    export let title = ""
    export let id;
    export let text = ""
    export let placeholder = ""
</script>

<div class="input-wrapper">
    <label for={id ? id : title} required="required" class="input-label">
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
