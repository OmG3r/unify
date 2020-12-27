<style>
    .u-overlay {
        min-height: 100vh;
        max-height: 100vh;
        width: 100%;
        position: fixed;
        display: flex;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 50000;
    }

    .u-box {
        width: 500px;
        background-color: white;
        min-height: 100px;
        margin: auto;
        padding: 20px;
        border-radius: 4px;
    }

    .u-title {
        width: 100%;
        text-align: center;
        font-size: 22px
    }

    .u-desc {
        padding: 20px 20px;
        text-align: center;
        margin: 0;
    }

    .u-buttons {
        width: 100%;
        display: flex;
        padding: 10px 0;
        justify-content: space-evenly
    }

    .u-over-button {
        width: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: white;
        text-align: center;
        padding: 8px 0;

        
    -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Opera and Firefox */
        cursor: pointer;
    }

    
</style>


<script>
    import {popup} from '../utils.js'
    import { fade} from 'svelte/transition';

    let overlay
    let template = {
        title: "Write title", 
        desc: "Please select",
        buttons: [
            {name: "OK", value: true, color: '#F0F0F0'},
            {name: "Decline", value: false, color: 'red'}
        ]
    }
    let popData = undefined
    let promises = []
    let colorsConver = {
        'ok': '#46b978',
        'danger': '#d23149',
    }

    popup.set(async (data) => {
        /* we got a new sub*/
        /* start the promise for the future click */
        let pro = new Promise(async (resolve, reject) => {
            /* make sure all promises before this one are done */
            await Promise.all(promises)
            /* when they are done start the overlay for this sub */

            /* convert text to appropriate hex */
            for (let btn of data.buttons) {
                if (colorsConver[btn.color]) {
                    btn.color = colorsConver[btn.color]
                }
            }
            popData = data
            setTimeout(() => {
                overlay.addEventListener('click', (event) => {
                    if(event.target !== event.currentTarget) return;
                    event.stopPropagation()
                    console.log("from overlay")
                    
                    resolve(data.buttons[data.buttons.length - 1].value)
                    popData = undefined
                }, {
                    once: true,
                    capture: true
                })
                for ( let b of [...document.querySelectorAll('.u-overlay .u-buttons')]) {
                    b.addEventListener('click', (event) => {
                        event.stopPropagation()
                        console.log("ending button")
                        
                        resolve(event.target.dataset.res)
                        popData = undefined
                    }, {
                        once: true,
                        capture: true
                    })  
                }
                
            }, 130)
        })
        /* add this promise so the future ones wait it*/
        promises.push(pro)
        return pro
   })
</script>

{#if popData}
    <div bind:this={overlay} transition:fade="{{duration: 150 }}" class="u-overlay">

        <div on:click|stopPropagation|preventDefault class="u-box">
            
                <div class="u-title"> {popData.title}</div>
                <p class="u-desc">{popData.desc}</p>
                <div class="u-buttons">
                    {#each popData.buttons as b}
                        <div data-res={b.value} class="u-over-button" style={"background-color:" + b.color}>
                            {b.name}
                        </div>
                    {/each}
                </div>
            
        </div>
    </div>
{/if}