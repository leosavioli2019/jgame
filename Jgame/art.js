export default function Art(id, width=40, height=40, color="black", espessure=1){

    //elemnts
    const canvas = document.querySelector("canvas#"+id)
    const paint = canvas.getContext("2d");

    //styles
    canvas.width = width;
    canvas.height = height;

    //painter style
    paint.lineWidth = espessure;
    paint.strokeStyle = color;

    //painter
    const painter = {
        
        active: false,
        move: false,
        pos: {x: 0, y: 0},
        posBefore: null
    
    }

    //draw the line
    const draw = (line) => {

        paint.beginPath();
        paint.moveTo(line.posBefore.x, line.posBefore.y);
        paint.lineTo(line.pos.x, line.pos.y);
        paint.stroke();

    }

    //events
    canvas.onmousedown = () => { painter.active = true };
    canvas.onmouseup = () => { painter.active = false };

    canvas.onmousemove = (event) => {
        
        painter.pos.x = event.clientX;
        painter.pos.y = event.clientY;
        painter.move = true;

    }

    //loop
    const loop = () => {
        if(painter.active && painter.move && painter.posBefore != null){
            draw({ pos: painter.pos, posBefore: painter.posBefore});
            painter.move = false;
        }
        painter.posBefore = {...painter.pos}
        setTimeout(loop, 10)
    }

    //call
    loop()
}