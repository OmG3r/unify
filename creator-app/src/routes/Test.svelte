<script>
    import { onMount } from "svelte";
    let canvas = {};
    

    

    

    

    onMount(() => {
        canvas = new fabric.Canvas("canvas");
        canvas.stateful = true;


        var boundary = new fabric.Rect({
            width: 390,
            height: 230,
            left: 5,
            top: 5,
            selectable: false,
            strokeDashArray: [5, 2],
            stroke: "blue",
            fill: "transparent",
        });

        var parent = new fabric.Rect({
            width: 250, 
            height: 110,
            left: 50,
            top: 50,
            selectable: false,
            strokeDashArray: [2, 5],
            stroke: "black",
            fill: "transparent",
        });

        var child = new fabric.Circle({
            radius: 30,
            fill: "rgba(255,0,0,0.8)",
            top: 50,
            left: 50,
            hasControls: false,
        });


        function inside(p, vs) {
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x,
                yi = vs[i].y;
            var xj = vs[j].x,
                yj = vs[j].y;
            var intersect =
                yi > p.y !== yj > p.y &&
                p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function getCoords(rect) {
        var coords = [];
        coords.push(rect.aCoords.tl);
        coords.push(rect.aCoords.tr);
        coords.push(rect.aCoords.br);
        coords.push(rect.aCoords.bl);
        coords.push(rect.aCoords.tl);
        return coords;
    }

    function objectMoving(e) {
        var cCoords = getCoords(parent);
        var inBounds = inside(
            { x: e.target.left, y: e.target.top  },
            cCoords
        );

        if (inBounds) {
            e.target.setCoords();
            e.target.saveState();
        } else {
            e.target.left = e.target._stateProperties.left;
            e.target.top = e.target._stateProperties.top;
        }
    }

        canvas.add(boundary);
        canvas.add(parent);
        canvas.add(child);
        canvas.on("object:moving", objectMoving);
    });

    
</script>
<div>sss</div>

<canvas id="canvas" width="400" height="280" />
