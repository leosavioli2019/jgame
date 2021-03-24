//settings
const animations = ["fire", "wind", "water"];

//pallet
const pallet = {
    "fire": [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}],
}
const into = false;
const pixels = [];


let columns = 40;
let rows = 40;

function Fire(id, wind=true, styles=true, widht=100, height=100){

    this.id = id
    this.pixel = 0;
    this.r = false;
    rows = 40;
    column = 40;

    let element = document.querySelector(`animation#${this.id}`) 
    create();
    styles ? style() : element;
    font();
    render();
        
    window.setInterval(colorise, 50)

    function create(){
        const number = rows * columns
        for(let c = 0; c<number; c++){
            pixels.push(0);
        }
    }

    function style(){
        const head = document.getElementsByTagName('head')[0]
        head.innerHTML += `
        //added by jgame
        <style>
            td.pixel{
                border: 1px solid #000;
                text-align: center;
                vertical-align: center;
                font-family: monospace;
                font-size: 18px;
            }

            table.${id}{
                border-collapse: collapse;
                border: 1px solid #000;
            }

            .pixel{
                width: 10px;
                height: 10px;
            }
        </style>
        `
    }

    function render(){
        let html = `<table id="${id}" cellpadding=0 cellspacing=0>`;

        for(let row = 0; row<rows; row++){
            
            html += '<tr class="pixel">'

            for(let column = 0; column<columns; column++){
                const index = column + (columns * row)
                if(!this.r){

                    //generate color
                    const intense = pixels[index]
                    const color = pallet["fire"][intense]
                    const rgb =  `${color.r}, ${color.g}, ${color.b}`

                    //show
                    html += `<td class="pixel" id="${id}" style="background-color: rgb(${rgb})">`
                    html += '</td>'

                }else{

                    html += `<td class="pixel">`
                    html += index
                    html += '</td>'
                }
            }

            html += '</tr>'
        }

        html += '</table>'
        element.innerHTML = html
    }

    function font(){
        for(let column = 0; column<columns; column++){

            const index = columns * rows
            const id = (index - columns) + column

            pixels[id] = 36;
        }
    }

    function up(pixel){
        //test
        const below = pixel + columns;
        if(below >= columns * rows){
            return 
        }
    
        //calculate
        const degrade = Math.floor( Math.random() * 3);
        const belowIntensy = pixels[below];
        const newIntensy = belowIntensy - degrade >= 0 ? belowIntensy - degrade : 0

        //set
        pixels[wind ? pixel - degrade : pixel] = newIntensy
    }

    function colorise(){
        for(let column = 0; column<columns; column++){
            for(let row = 0; row<rows; row++){

                const index = column + (columns * row)
                this.pixel = index;
                up(index)

            }
        }
        render()
    }
}

function Range(id, R, C, height=10, width=10, styles=''){

    this.id = id;
    let rows = R;
    let columns = C;
    let styleHeight = height;
    let styleWidth = width;
    let S = styles;

    const numbers = []
    const element = document.querySelector(`range#${this.id}`);
    
    create();
    style();
    render();

    function create(){
        const number = rows * columns
        console.log(number)
        for(let c = 0; c<number; c++){
            numbers.push(0);
        }
        console.log(numbers)
    }

    function style(){
        const head = document.getElementsByTagName('head')[0]
        head.innerHTML +=
        `
        //created by jgame
        <style>
            td.rpixel{
                border: 1px solid #000;
                text-align: center;
                vertical-align: center;
                font-family: monospace;
                font-size: 18px;
            }

            table.tablepixel{
                border-collapse: collapse;
                border: 1px solid #000;
            }

            .rpixel{
                width: ${styleWidth}px;
                height: ${styleHeight}px;
            }
        </style>`
    }

    function render(){
        let html = `<table cellpadding=0 cellspacing=0>`;

        for(let row = 0; row<rows; row++){
            
            html += '<tr class="rpixel">'

            for(let column = 0; column<columns; column++){
                const index = column + (columns * row)
                let string = `${S.replaceAll('$', String(index))}`
                html += `<td class="rpixel" style="${eval(string)}">`
                html += index
                html += '</td>'
            }

            html += '</tr>'
        }

        html += '</table>'
        element.innerHTML = html
    }
}

function Art(id, width=40, height=40, color="black", espessure=1){

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

        console.log(line)
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


function StartCamera(id, audio=false, video=false, height=400, widht=400){

    navigator.mediaDevices.getUserMedia({audio: audio, video: video}).then(stream=>{
        
        const camera = document.getElementById(`${id}`);
        camera.srcObject = stream; 

    }).catch(error=>console.log(error));

}

//main
function fire(id, wind=true, style=true, height=100, width=100){
    let a = new Fire(id, wind, style, width, height)
}

function range(id, Row, Column, widht=10, height=10, style=''){
    let a  = new Range(id, Row, Column, widht, height, style)
}

function paint(id, height=140, weight=140){
    let a  = new Art(id, weight, height)
}