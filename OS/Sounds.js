/**
 * Created by Overlord Main on 23/02/2017.
 */
function Sounds(){

    this.sfx = [];
    this.volume = 0.1;
    this.setup = function(){
        try {
            this.sfx.push(loadSound('content/home/sounds/beep_1.wav'));     //0
            this.sfx.push(loadSound('content/home/sounds/error_1.wav'));    //1
            this.sfx.push(loadSound('content/home/sounds/error_2.wav'));    //2
            this.sfx.push(loadSound('content/home/sounds/typing_1.wav'));   //3
            this.sfx.push(loadSound('content/home/sounds/loading_1.mp3'));  //4
            this.sfx.push(loadSound('content/home/sounds/noise_1.mp3'));    //5
            this.sfx.push(loadSound('content/home/sounds/beep_2.wav'));    //6
            this.sfx.push(loadSound('content/home/sounds/beep_3.wav'));    //7
        }
        catch(err) {
            console.log("sounds disabled");
        }
    }

    this.play = function(index) {
        try {
            this.sfx[index].play();
            this.sfx[index].setVolume(0.2);
        }
        catch(err) {
            console.log("sounds disabled");
        }
    }
    
    this.volumeUp = function () {
        if(this.volume < 1.0) {this.volume += 0.1;}
    }

    this.volumeDown = function () {
        if(this.volume > 0.1) {this.volume -= 0.1;}
    }


}