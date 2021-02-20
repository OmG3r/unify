

<style>

    .donation{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin:20px 0;
        font-weight: 600;
    }
    .donatorName,.donatorAmount{
        margin:0 10px;
    }
    .donatorAmount{
        color:rgba(var(--AccentColor),1)
    }
</style>
<script>

    let donators = [
        {
        name : "Hamadi",
        amount : "100",
        currency : "TND"
        },
        {
        name : "Samer",
        amount : "5",
        currency : "USD"
        },
        {
        name : "mouha",
        amount : "18",
        currency : "EUR"
        }
    ]
</script>

{#each donators as donator}
<div class="donation">
    <div class="donatorName">{donator.name}</div>
    <div class="donatorAmount"> {donator.amount}  {donator.currency}</div>
</div>

{/each}