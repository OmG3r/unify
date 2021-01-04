<style>
    .img1{
    mix-blend-mode: multiply;
    z-index: 5;
    pointer-events: none;
}

.img1,.bg,.img2{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 600px;
    height: 600px;
}
.bg{
filter: invert(46%) sepia(51%) saturate(4899%) hue-rotate(166deg) brightness(102%) contrast(101%);
z-index: 1;
}
canvas{z-index: 4;}
.container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items:center;
    width: 600px;
    height: 600px;
}
.border.activeBorder{
   width: 200px;
    height: 300px;
    z-index: 10;
    border: 2px dashed blue;
    position: absolute;
    pointer-events: none; 
}
</style>


<script>
    import {onMount} from 'svelte'
import { object_without_properties } from 'svelte/internal';
import domtoimage from 'dom-to-image';    export let hash = {}
    export let facade;
    export let selectedColor
    export let mockupURL;
    export let showBoundaries
    let canvaDiv;
    let activeBorder=true;
    let htmlToCanvas = ()=>{
        activeBorder = false;
        hash.canva.discardActiveObject().renderAll();
        domtoimage.toPng(document.getElementById("container")).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById("hihi").append(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    }
   
    onMount(async () => {
        hash.canva = new fabric.Canvas(canvaDiv, {width:200, height:300});
        hash.canva.stateful = true;
        hash.background = new fabric.Rect({
            //fill: $selectedColor,
            fill:rgba(255,0,0,0),
            width:200,
            height: 300,
            selectable: false
        });
        hash.background.center()
        hash.canva.add(hash.background);
       /* await fabric.Image.fromURL(mockupURL, function(oImg) {
            hash.mockup = oImg
            oImg.scaleToWidth(600, false)
            oImg.set('selectable', false);
            hash.canva.add(oImg)
        });*/

         

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

<div class="container" id="container">
<div class="border" class:activeBorder></div>
<img class="img1" src="../../imgs/pavette.png" alt="background">

<canvas bind:this={canvaDiv} class="c-canva"  id="front"></canvas>

<img class="bg" id="bg" src="../../imgs/pavette_black.png" alt="background">

</div>

<button on:click="{()=>htmlToCanvas()}">html to png</button>

<div  id="hihi"/>