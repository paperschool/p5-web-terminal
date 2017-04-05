/**
 * Created by overlord on 02/03/17.
 */
function Games(name) {

    this.name     = name;
    this.programs = [];
    this.typeActive = false;
    this.running  = 0;

    this.checkRunning = function(){
        if(this.programs[this.running].running){
            return true;
        }
        return false;
    }

    this.keyTyped = function (key)   {this.programs[this.running].keyTyped(keyCode );}
    this.keyPressed = function (key) {this.programs[this.running].keyPressed(keyCode );}
    this.mouseMoved = function ()    {this.programs[this.running].mouseMoved(keyCode ); }
    this.mouseClicked = function ()  {this.programs[this.running].mouseClicked(keyCode );}

    this.setup = function () {
        this.programs.push(new Bounce("Bounce"));
        this.programs.push(new Snake("Snake"));

    }

    this.update = function () {if(this.typeActive){this.programs[this.running].update();}}
    this.draw = function ()   {
        if(this.typeActive){this.programs[this.running].draw();}
    }

}

function Maths(name) {

    this.name     = name;
    this.programs = [];
    this.typeActive = false;
    this.running  = 0;

    this.keyTyped = function (key)   {this.running.keyTyped(keyCod );}
    this.keyPressed = function (key) {this.running.keyPressed(keyCode);}
    this.mouseMoved = function ()    {this.running.mouseMoved(keyCode); }
    this.mouseClicked = function ()  {this.running.mouseClicked(keyCode);}

    this.setup = function () {}

    this.update = function ()        {if(this.typeActive){this.programs[this.running].update();}}
    this.draw = function ()          {if(this.typeActive){this.programs[this.running].draw();}}

}


