<style>
</style>


<script>
    import {onMount} from 'svelte'
import { object_without_properties } from 'svelte/internal';
    import {colors} from '../../utils.js'
    import {meterSquarePrice} from '../../mockupdata.js'
    export let hash = {}
    export let facade;
    export let selectedColor
    export let mockupURL;
    export let showBoundaries
    export let boundaryData;
    export let printarea;
    export let mockup
    let canvaDiv;
    onMount(async () => {
        hash.canva = new fabric.Canvas(canvaDiv, {width:600, height:600});
        hash.canva.stateful = true;
        hash.background = new fabric.Rect({
            id: 'color-box',
            fill: colors[$selectedColor.toLocaleLowerCase()],
            width:600,
            height: 600,
            selectable: false,
            evented: false
        });
        hash.background.center()
        hash.canva.add(hash.background);
       
        var boundary = new fabric.Rect({
            id: 'boundary',
            top : boundaryData.top,
            width: boundaryData.width, height: boundaryData.height,
            selectable: false,
            evented: false,
            strokeDashArray: [5, 2],
            strokeWidth: 2,
            stroke: "blue",
            fill: colors[$selectedColor.toLocaleLowerCase()],
            absolutePositioned: true
            
        });
        boundary.center()
        hash.canva.add(boundary);
        boundary.center()
        boundary.set({top: boundaryData.top})
        boundary.setCoords();
        boundary.saveState();
        hash.boundary = boundary

        await fabric.Image.fromURL(mockupURL, function(oImg) {
            hash.mockup = oImg
            oImg.id = 'mockup'
            oImg.scaleToWidth(600, false)
            oImg.set('selectable', false);
            oImg.set("evented", false)
            //oImg.clipPath = boundary
            hash.canva.add(oImg)
        });
        showBoundaries.subscribe((v) => {
            if (v == true) {
                boundary.opacity = 1
            } else {
                boundary.opacity = 0
            }
            hash.canva.renderAll();
            
        })
        selectedColor.subscribe((v) => {
            hash.background.set('fill', colors[v.toLocaleLowerCase()])
            hash.boundary.set('fill', colors[v.toLocaleLowerCase()])
            hash.canva.renderAll();
        })
        function inside(p, vs) {
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i].x, yi = vs[i].y;
                var xj = vs[j].x, yj = vs[j].y;
                var intersect = yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
                if (intersect) inside = !inside;
            }
            return inside;
        }
        function getCoords(rect) {
            var coords = []
            coords.push(rect.aCoords.tl);
            coords.push(rect.aCoords.tr);
            coords.push(rect.aCoords.br);
            coords.push(rect.aCoords.bl);
            console.log(coords)
            return coords;
        }
        console.log(boundary.top)
        function compareIt(e) {
            let obj = e.target
            if (['color-box', 'boundary', 'mockup'].includes(obj.id)) {
                return
            }
            let objCoords = obj.aCoords
            let boundaryCoords = boundary.aCoords
            
            obj.right = obj.left + obj.width * obj.scaleY
            obj.bottom = obj.top + obj.height * obj.scaleX
            console.log([obj.top, obj.left, obj.right, obj.bottom])
            console.log('boundary')
            console.log(boundaryCoords)
            console.log(boundary.getCoords())
            console.log('obj')
            console.log(objCoords)
            console.log(obj.getCoords())
            let exceeded = false
            const corners = ['tl', 'tr', 'br', 'bl']
            
            let minX = boundaryCoords.tl.x // left
            let maxX = boundaryCoords.tr.x // right
            let maxY = boundaryCoords.br.y // bottom
            let minY = boundaryCoords.tr.y // top
            if (!corners.every((corner) => objCoords[corner].x > minX)) {
                console.log("excceded left")
                console.log(corners.map((corner) => objCoords[corner].x ))
                console.log(minX)
                obj.left = boundaryCoords.tl.x 
                exceeded = true
        
            }
            if (!corners.every((corner) => objCoords[corner].y < maxY)) {
                obj.top = boundaryCoords.br.y - obj.height * obj.scaleY
                console.log("exceeded bottom")
                console.log(corners.map((corner) => objCoords[corner].y ))
                console.log(maxY)
                
                exceeded = true
            }
            if (!corners.every((corner) => objCoords[corner].x < maxX)) {
                obj.left = boundaryCoords.br.x - obj.width * obj.scaleX
                console.log("exceeded right")
                exceeded = true
            }
            if (!corners.every((corner) => objCoords[corner].y > minY)) {
                

                console.log("exceeded top")
                obj.top = boundaryCoords.tl.y
                console.log(corners.map((corner) => objCoords[corner].y ))
                console.log(minY)
                exceeded = true
            }
            if (exceeded == false) {
                e.target.setCoords();
                e.target.saveState();
            } else {
            
                
            }
        }
      
        let hadObjects = false
        const areaCalculatePrice = () => {
            let allObjects = hash.canva.getObjects().filter((item) => !['color-box', 'boundary', 'mockup'].includes(item.id))
            console.log(allObjects)
            if (allObjects.length == 0) {
                if (hadObjects) {
                    console.log("had objects")
                    $printarea = {
                        ...$printarea,
                        [facade.toLocaleLowerCase()]: {
                            ...$printarea[facade.toLocaleLowerCase()],
                            price: 0,
                            area: 0,
                        }
                    }
                    hadObjects = false
                }

                return
            }
            hadObjects = true
            let realfromneck = '62.5cm'
            let realtopixel = 428
            
            let allXs = []
            let allYs = []

            let boundaryCoords = boundary.aCoords
            let boundaryMinX = boundaryCoords.tl.x // left
            let boundaryMaxX = boundaryCoords.tr.x // right
            let boundaryMaxY = boundaryCoords.br.y // bottom
            let boundaryMinY = boundaryCoords.tr.y // top
            for (let obj of allObjects) {
                let objXs = []
                let objYs = []
                Object.values(obj.aCoords).map((item) => {
                    objXs.push(item.x)
                    objYs.push(item.y)
                    //allXs.push(item.x)
                    //allYs.push(item.y)
                })

                const isOutViewRight = objXs.every((x) => x > boundaryMaxX) // item out of view right
                const isOutViewLeft = objXs.every((x) => x < boundaryMinX) // item out of view left
                const isOutViewBottom = objYs.every((y) => y > boundaryMaxY) // item out of view bottom
                const isOutViewTop = objYs.every((y) => y < boundaryMinY) // item out of view top
                console.log('right out of view : ' + isOutViewRight)
                console.log('left out of view : ' + isOutViewLeft)
                console.log('bottom out of view : ' + isOutViewBottom)
                console.log('top out of view : ' + isOutViewTop)
                console.log(objYs)
                console.log(boundaryMinY)
                if (isOutViewRight || isOutViewLeft || isOutViewBottom || isOutViewTop) {
                    console.log("item out of view not taking into account")
                } else {
                    allXs.push(...objXs)
                    allYs.push(...objYs)
                }
            }
            console.log('xs, ys')
            
            allYs.sort((a, b) => a - b)
            allXs.sort((a,b) => a - b)

            console.log(allYs)
            console.log(allXs)
           if (allYs.length == 0 && allXs.length == 0) {
               console.log("no print")
                $printarea = {
                    ...$printarea,
                    [facade.toLocaleLowerCase()]: {
                        ...$printarea[facade.toLocaleLowerCase()],
                        price: 0,
                        area: 0,

                    }
                }
                return
           }


            let onePixelToM = 0.146028037 / 100
            let maxX = allXs[allXs.length - 1]
            if (maxX > boundaryMaxX) {
                // some of area of images is cropped
                console.log("price right out")
                maxX = boundaryMaxX
            }
            let minX = allXs[0]
            if (minX < boundaryMinX) {
                console.log("price left out")
                minX = boundaryMinX
            }

            let maxY = allYs[allYs.length - 1]

            if (maxY > boundaryMaxY) {
                console.log("price bottom out")
                maxY = boundaryMaxY
            }
            let minY = allYs[0]

            if (minY < boundaryMinY) {
                console.log("price top out")
                minY = boundaryMinY
            }
            
            console.log('min Y: ' + minY + " max Y: " + maxY)
            console.log('min X : ' + minX + " max X " + maxX)
            console.log(Math.abs(maxY - minY) * onePixelToM)
            let oneLine  = ((maxY - maxY) ** 2 + (maxX - minX) ** 2) ** 0.5
            let twoLine = ((maxX - maxX) ** 2  + (maxY - minY) ** 2) ** 0.5
            let coveredArea = oneLine * onePixelToM * twoLine * onePixelToM
            console.log('covered area :' + coveredArea)
            let price = coveredArea * meterSquarePrice
            if (price < $printarea[facade.toLocaleLowerCase()].minPrice) {
                price = $printarea[facade.toLocaleLowerCase()].minPrice
            }
            $printarea = {
                ...$printarea,
                [facade.toLocaleLowerCase()]: {
                    ...$printarea[facade.toLocaleLowerCase()],
                    price: price,
                    area: coveredArea,

                }
            }
        }
        
       // hash.canva.on("object:moving", compareIt)
        hash.canva.on('object:added', () => {
            setTimeout(() => {
                areaCalculatePrice()
            }, 100)
        })

        hash.canva.on('object:removed', () => {
            console.log("running removed")
            setTimeout(() => {
                areaCalculatePrice()
            }, 100) 
        })

        hash.canva.on('object:moved', function (event) {
           
            if (isObjectMoving) {
                
                isObjectMoving = false
                //compareIt(event)
                setTimeout(() => {
                    areaCalculatePrice()
                }, 100)
                
            }
        });

        hash.canva.on('object:scaled', (event) => {
            
            //compareIt(event)
            setTimeout(() => {
                areaCalculatePrice()
            }, 100)
        });
        let show = true
        let isObjectMoving = false
        hash.canva.on('object:moving', function (event) {
            isObjectMoving = true;
        });

        hash.canva.on('mouse:move', function(options) {
            
            if (show == false) {
                return
            }
            console.log('x: ' + options.e.layerX + "; y: " + options.e.layerY);
            show = false;
            setTimeout(() => {
                show = true
            }, 300);
        });
        //hash.canva.on("object:moving", objectMoving);
    })
</script>

<canvas bind:this={canvaDiv} class="c-canva"  id="front"></canvas>