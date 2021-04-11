export default function ConstDegrade(id, R, C, pallet, time=50, styles=true){

    
    let rows = R;
    let columns = C;
    let pixels = [];
    let element = document.querySelector(`range#${id}`);
    let r = false;
    
    create();
    styles ? style() : element;
    font();
    render();
        
    window.setInterval(colorise, time)

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
                if(!r){

                    //generate color
                    const intense = pixels[index]
                    const color = pallet[intense]
                    html += `<td class="pixel" id="${id}" style="background-color: ${color}">`
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
        const degrade = 1;
        const belowIntensy = pixels[below];
        const newIntensy = belowIntensy - degrade >= 0 ? belowIntensy - degrade : 0

        //set
        pixels[pixel] = newIntensy
        console.log(pixels)
    }

    function colorise(){
        for(let column = 0; column<columns; column++){
            for(let row = 0; row<rows; row++){

                const index = column + (columns * row)
                up(index)

            }
        }
        render()
    }

}