<style>
    .u-notifications {
        height: 80vh;
        width: 390px;
        position: fixed;
        right: 80px;
        z-index: 60;
        padding: 0 30px 15px 10px;
        overflow: hidden;
        right: 0;
        bottom: 30px;
        display: flex;
        flex-direction: column-reverse;

        pointer-events: none;
    }

    .u-toast {
        pointer-events: auto;

        display: flex;
        align-items: center;
        
        width: 100%;
        border-radius: 4px;
        background: white;
        margin-top: 16px;
        padding: 0 15px;
    }


    .u-t-band {
        height: 70%;
        padding: 0 3px;
        border-radius: 3px;
    }

    .u-t-content {
        padding: 15px 0;
        padding-right: 16px; 
        margin-left: 16px;

    }
    .u-t-title {
        font-weight: bold;
        font-size: 17px;
        margin-bottom: 8px;
    }
    .u-t-text {
        color: #67696E;
    }
    .u-actions {
        margin-left: auto;
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        
    }
    .u-actions .u-t-action:first-child {
        border-top: 1px solid grey; 
    }
    .u-t-action {
        padding: 8px 0;
        cursor: pointer;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid grey;
    }
    .shadow-6 {
   box-shadow: 0 1px 1px rgba(0,0,0,0.25), 
              0 2px 2px rgba(0,0,0,0.20), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.10),
              0 16px 16px rgba(0,0,0,0.05);

    }

    @media only screen and (max-width: 750px) {
            .u-notifications {
                width: 100vw;
                align-items: center;
            }
    }
</style>

<script>
    import {notification} from '../utils.js'
    import { fly } from 'svelte/transition';
    
    let toasts = []
    let createdToasts = 0;

    let toastDuration = 15000

    let template = {
        accentColor: "#F0A92E;",
        title: "Delete",
        content: "an error happend",
        uniqueActions: [
            {
                text: 'Checkout',
                func: () => {
                    console.log("doing func")
                }
            }
        ]
    }
    const notifcolors = {
        'alert': '#f5b353',
        'error': '#e26d8e',
        'success': '#4aba73'
    }
    notification.subscribe((value) => {
        if (value == 0) {
            return
        }
        createdToasts++
        
        let saveC = createdToasts
        if (notifcolors[value.accentColor]) {
            value.accentColor = notifcolors[value.accentColor]
        }
        let newToast = {num: createdToasts,data: value}

        let timeOutFn = setTimeout(() => {
            deleteToast(newToast)
        }, toastDuration)
        newToast.timer = timeOutFn
        toasts = [newToast, ...toasts]
    })


    
    

    let deleteToast = (t) => {
        clearTimeout(t.timer)
        toasts = toasts.filter((i) => i.num != t.num)
    }
</script>




<div class="u-notifications">
    {#each toasts as toast (toast.num)}
        <div transition:fly="{{ x: 200, duration: 300 }}" class="u-toast shadow-6">
            <div class="u-t-band" style={"background: " + toast.data.accentColor + ";"}>
            
            </div>
 
            <div class="u-t-content" >
                <div class="u-t-title">
                    {toast.data.title}
                </div>
                <div class="u-t-text">
                    {toast.data.content}
                </div>
            </div>
            <div class="u-actions">
                {#if toast?.data?.uniqueActions}
                    {#each toast.data.uniqueActions as action}
                        <div on:click={() => {action.func();deleteToast(toast);} } class="u-t-action">
                            {action.text}
                        </div> 
                    {/each}
                {/if}
                <div on:click={() => {deleteToast(toast)}} class="u-t-action">
                    Dismiss
                </div>

            </div>
            
        </div>
    {/each}
</div>