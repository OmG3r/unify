<style>


</style>


<script>
    import {onMount} from 'svelte'
import { object_without_properties } from 'svelte/internal';

    export let hash = {}
    export let facade;
    export let selectedColor
    export let mockupURL;
    export let showBoundaries
    let canvaDiv;

    onMount(async () => {
        hash.canva = new fabric.Canvas(canvaDiv, {width:600, height:600});
        hash.canva.stateful = true;
        hash.background = new fabric.Rect({
            fill: $selectedColor,
            width:600,
            height: 600,
            selectable: false
        });
        hash.background.center()
        hash.canva.add(hash.background);
        await fabric.Image.fromURL(mockupURL, function(oImg) {
            hash.mockup = oImg
            oImg.scaleToWidth(600, false)
            oImg.set('selectable', false);
            hash.canva.add(oImg)
        });
        var boundary = new fabric.Rect({
            width: 310, height: 310,
            selectable: false,
            strokeDashArray: [5, 2],
            stroke: "blue",
            fill: "transparent"
        });
        boundary.center()
        hash.canva.add(boundary);
        boundary.center()

        showBoundaries.subscribe((v) => {
            if (v == true) {
                boundary.opacity = 1
            } else {
                boundary.opacity = 0
            }
            hash.canva.renderAll();
            
        })
        selectedColor.subscribe((v) => {
            hash.background.set('fill', v)
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
            console.log({
                tl: {
                    obj: objCoords.tl,
                    bou: boundaryCoords.tl
                },
                br: {
                    obj: objCoords.br,
                    bou: boundaryCoords.br
                }
            })
            obj.right = obj.left + obj.width * obj.scaleY
            obj.bottom = obj.top + obj.height * obj.scaleX
            console.log([obj.top, obj.left, obj.right, obj.bottom])
            console.log("----")
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

        let lastobj = undefined
        function objectMoving(e) {
            var cCoords = getCoords(boundary);
            console.log(e.target.aCoords)
            var inBounds = inside({ x: e.target.left, y: e.target.top}, cCoords);

            if (inBounds) {
                e.target.setCoords();
                e.target.saveState();
            } else {
                e.target.left = e.target._stateProperties.left;
                e.target.top = e.target._stateProperties.top;

            }
        }
        hash.canva.on("object:moving", compareIt)
        hash.canva.on('mouse:up', function (event) {
            if (lastobj) {
                
                compareIt(lastobj)
            }
        });

        //hash.canva.on("object:moving", objectMoving);
    })
</script>

<canvas bind:this={canvaDiv} class="c-canva"  id="front"></canvas>