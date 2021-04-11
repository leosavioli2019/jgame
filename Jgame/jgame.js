import Fire from './fire.js';
import Range from './range.js';
import Art from './art.js';
import ConstDegrade from './degrade.js';


function StartCamera(id, audio=false, video=false, height=400, widht=400){

    navigator.mediaDevices.getUserMedia({audio: audio, video: video}).then(stream=>{
        
        const camera = document.getElementById(`${id}`);
        camera.srcObject = stream; 

    }).catch(error=>console.log(error));

}


const jgame = {
    
    "fire": function (id, wind=true, style=true, height=100, width=100){
        let a = new Fire(id, wind, style, width, height)
    },

    "range": function (id, Row, Column, widht=10, height=10, style=''){
        let a = new Range(id, Row, Column, widht, height, style)
    },

    "paint": function (id, height=140, width=140){
        let a = new Art(id, height, width)
    },
    
    "degrade": function (id, R, C, pallet, time=50, styles=true){
        let a = new ConstDegrade(id, R, C, pallet, time, styles)
    },

    "StartCamera": StartCamera,
}

export default jgame