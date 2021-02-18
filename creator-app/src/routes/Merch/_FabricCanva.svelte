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
        await fabric.Image.fromURL(mockupURL, function(oImg) {
            hash.mockup = oImg
            oImg.id = 'mockup'
            oImg.scaleToWidth(600, false)
            oImg.set('selectable', false);
            oImg.set("evented", false)
            hash.canva.add(oImg)
        });
        var boundary = new fabric.Rect({
            id: 'boundary',
            top : boundaryData.top,
            width: boundaryData.width, height: boundaryData.height,
            selectable: false,
            strokeDashArray: [5, 2],
            stroke: "blue",
            fill: "transparent",
            evented: false
        });
        boundary.center()
        hash.canva.add(boundary);
        boundary.center()
        boundary.set({top: boundaryData.top})
        boundary.setCoords();
        boundary.saveState();
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
            if (objCoords.tl.x < boundaryCoords.tl.x) {
                console.log("excceded left")
                obj.left = boundaryCoords.tl.x 
                exceeded = true
        
            }
            if (objCoords.tl.y < boundaryCoords.tl.y) {
                console.log("exceeded top")
                obj.top = boundaryCoords.tl.y
                exceeded = true
            }
            if (objCoords.br.x > boundaryCoords.br.x) {
                obj.left = boundaryCoords.br.x - obj.width * obj.scaleX
                console.log("exceeded right")
                exceeded = true
            }
            if (objCoords.br.y > boundaryCoords.br.y) {
                obj.top = boundaryCoords.br.y - obj.height * obj.scaleY
                console.log("exceeded bottom")
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
            for (let obj of allObjects) {

                Object.values(obj.aCoords).map((item) => {
                    allXs.push(item.x)
                    allYs.push(item.y)
                })
            }
            console.log('xs, ys')
            
            allYs.sort((a, b) => a - b)
            allXs.sort((a,b) => a - b)

            console.log(allYs)
            console.log(allXs)
            let onePixelToM = 0.146028037 / 100
            let maxX = allXs[allXs.length - 1]
            let minX = allXs[0]
            let maxY = allYs[allYs.length - 1]
            let minY = allYs[0]

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
                compareIt(event)
                setTimeout(() => {
                    areaCalculatePrice()
                }, 100)
                
            }
        });

        hash.canva.on('object:scaled', (event) => {
            compareIt(event)
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