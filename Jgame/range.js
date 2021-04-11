export default function Range(id, R, C, height=10, width=10, styles=''){

    let rows = R;
    let columns = C;
    let styleHeight = height;
    let styleWidth = width;
    let S = styles;

    const numbers = []
    const element = document.querySelector(`range#${id}`);
    
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