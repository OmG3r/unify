<style>

.u-option {
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: #50c275;
        border-radius: 4px;
        color: white;
        height: 45px;
    }

    .u-icon {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
    }


    .u-icon img {
        display: block;
        max-width: 100%;
        height: 100%;
    }
</style>


<script>
    import {storage} from '../../firebase'
    import MaterialSpinner from '../../comps/misc/MaterialSpinner.svelte'

    export let carts;
    export let selectedItems
    let exporting = false
     const exportPrinting = async () => {
         if (exporting) {
             return
         }
         exporting = true
        /*
            creator-itemid -> Size -> Color
        */
        let hashedItems = {}
        const hasheCarts = $carts.reduce((acc, curr) => {
            
            acc[curr.cartID] = curr
            hashedItems =  { ...hashedItems,...curr.items}
            return acc
        }, {})
        
        let itemCount = $selectedItems.reduce((itemCount, curr) => {
            console.log(curr)
            let [cartID, creator, itemID]  = curr.split('-')
            let itemRef = creator + "-" + itemID
            
            console.log(cartID)
            console.log(hasheCarts)

            let itemData = hasheCarts[cartID].items[itemRef]
            if (itemCount[itemRef] == undefined) {
                itemCount[itemRef] = {}
                for (const color of itemData.colors) {
                    itemCount[itemRef][color] = {}
                    for (const size of itemData.sizes) {
                        itemCount[itemRef][color][size] = 0 
                    }
                }
            } else if (itemCount[itemRef][itemData.size] == undefined) {
                itemCount[itemRef][itemData.color] = {}
                for (const size of itemData.sizes) {
                    itemCount[itemRef][itemData.color][size] = 0 
                }
            } else if (itemCount[itemRef][itemData.color][itemData.size] == undefined) {
                itemCount[itemRef][itemData.color][itemData.size] = 0 
            }
            itemCount[itemRef][itemData.color][itemData.size] += itemData.quantity
            return itemCount
        }, {})
        let totalPerItem = {}
        let totalPerItemColor = {}
        for (let [itemKey, colors] of Object.entries(itemCount)) {
            totalPerItem[itemKey] = 0
            totalPerItemColor[itemKey] = {}
            for (let [color, sizes] of Object.entries(colors)) {
                totalPerItemColor[itemKey][color] = 0
                for (let [size, quantity] of Object.entries(sizes)) {
                    totalPerItem[itemKey] += quantity
                    totalPerItemColor[itemKey][color] += quantity
                }
            }
        }
        console.log('total')
        console.log(totalPerItem)
        console.log(totalPerItemColor)
        console.log(itemCount)
        //let wb = XLSX.utils.book_new();
        const zip = new JSZip();

        for ( let oneItem of Object.entries(itemCount)) {
            oneItem = {key: oneItem[0], value: oneItem[1]}
        
        
        

            let colors = Object.keys(oneItem.value).length
            let sizes = Object.keys(Object.values(oneItem.value)[0]).length

            console.log('sizes: ' + sizes)
            console.log('colors: ' + colors)
            let rows = sizes * colors + 1;
            let columns = 7;

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
            let format = []
            for  (let [color, sizes] of Object.entries(oneItem.value)) {

                for (let [size, quantity] of Object.entries(sizes)) {
                    format.push([oneItem.key ,color, size, quantity,totalPerItemColor[oneItem.key][color], totalPerItem[oneItem.key]])
                }
            }

            worksheet.addRows(format)

            for (let row of Array(rows).keys()) {
                if (row == 0) {
                    continue
                }
                for (let column of Array(columns).keys()) {
                    if (column == 0) {
                        continue
                    }
                    worksheet.getRow(row).getCell(column).border = {
                        top: {style:'thin', color: {argb:'000000'}},
                        left: {style:'thin', color: {argb:'000000'}},
                        bottom: {style:'thin', color: {argb:'000000'}},
                        right: {style:'thin', color: {argb:'000000'}}
                    };
                    worksheet.getRow(row).getCell(column).alignment = { vertical: 'middle', horizontal: 'center' }
                    
                }
                
            }


            worksheet.mergeCells(0,1,sizes * colors , 1);
            //worksheet.getRow(1).getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getColumn(1).width = 25
            worksheet.getColumn(2).width = 15
            worksheet.mergeCells(0,6,sizes * colors , 6);
            //worksheet.getRow(1).getCell(6).alignment = { vertical: 'middle', horizontal: 'center' }

            for (let i of Array(colors).keys()) {

                // merge by start row, start column, end row, end column (equivalent to K10:M12)
                let startRow = i * sizes + 1
                let endRow = (i + 1) * sizes

                
                worksheet.mergeCells(startRow, 2, endRow, 2);
                //worksheet.getRow(startRow).getCell(2).alignment = { vertical: 'middle', horizontal: 'center' }
                

                worksheet.mergeCells(startRow, 5, endRow, 5);
                //worksheet.getRow(startRow).getCell(5).alignment = { vertical: 'middle', horizontal: 'center' }
            

            }
            console.log(hashedItems[oneItem.key])
            
            let itemFolder = zip.folder(oneItem.key)
            
            const buffer = await workbook.xlsx.writeBuffer();
            itemFolder.file('quantity.xlsx', buffer, {binary: true})
            let [creator, itemxID] = oneItem.key.split('-')
            let itemPathStorage ='creators/' + creator + "/merch/" + itemxID
            for (let face of  ['front', 'back'] ) {
                try {
                    let url = await storage.ref(itemPathStorage + "/" + face + "-print.png").getDownloadURL()
                    let resp = await fetch(url)
                    const blob = await resp.blob()
                    itemFolder.file(face + "-print.png", blob);
                } catch (error) {
                    console.log(error)
                }
                
            }

            let color = hashedItems[oneItem.key].colors[0]
            for (let face of  ['front', 'back'] ) {
                try {
                    let url = await storage.ref(itemPathStorage + "/" + face + "-" + color).getDownloadURL()
                    let resp = await fetch(url)
                    const blob = await resp.blob()
                    itemFolder.file(face + "-" + color + ".png", blob);
                } catch (error) {
                    console.log(error)
                }
                
            }
        
        }
        const content = await zip.generateAsync({type:"blob"})
        saveAs(content, "example.zip");
        exporting = false
        return
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = '.xlsx';

        const blob = new Blob([buffer], {type: fileType});

        saveAs(blob, 'fileName' + fileExtension);

    }
    


</script>

<div on:click={exportPrinting} class="u-option">
    {#if exporting}
        <MaterialSpinner />
    {:else}
        <div class="u-icon">
            <img src="/imgs/misc/hoodie-print.png" alt="print">
        </div>
        <div  class="u-text">
            Printing
        </div>
    {/if}
</div>