/**
 * Created by Overlord Main on 23/02/2017.
 */

function Cell(column){

    this.label          = "";
    this.location       = createVector();
    this.size           = createVector();
    this.selected       = false;
    this.column         = column;
    this.columnSelected = false;

    this.update = function(x,y,xs,ys,label,selected){
        if(label != null){this.label = label; }
        this.columnSelected = selected;
        this.location.x = x;
        this.location.y = y;
        this.size.x     = xs;
        this.size.y     = ys;
    }

    this.draw   = function(){

        //stroke(random(200,255));

        noStroke();

        if(this.selected){
            if(this.columnSelected){
                fill(100,random(220,255),100); // row selected and column active
            } else {
                fill(100,100,random(220,255)); // row selected but column inactive
            }
        }
        else { fill(58,71,72); } // off case

        rect(this.location.x,this.location.y + this.size.y - 5,this.size.x,5);
        fill(255);
        rect(this.location.x,this.location.y,1,this.size.y/3);
        rect(this.location.x,this.location.y,this.size.x/3,1);


        if(this.selected){
            if(this.columnSelected){
                fill(100,random(220,255),100); // row selected and column active
            } else {
                fill(150,150,random(150,210)); // row selected and column active
            }
        }
        else {
            fill(random(200,255));
        }

        if(this.label != null){
            textSize(this.size.y/2);
            text(this.label, this.location.x + this.size.x*0.05, this.location.y + this.size.y/2 + 5);

        }

    }

}

function Column(label,rows,column) {

    this.column = column;
    this.numRows  = rows;
    this.rows = [];
    this.rowSelected = 0;
    this.label = label; // Array Copied
    this.selected = false;
    this.xPos;

    this.selectCell = function(direction){
        if(direction == 0){
            this.rowSelected = 0;
            this.rows[this.rowSelected].selected = true;
        }
        else if(direction == 1 && this.rowSelected < this.numRows - 1) { // down
            for(var i = this.rowSelected ; i < this.numRows-1; i++){
                if(!(this.rows[i+1].label == "")){
                    this.rows[this.rowSelected].selected = false;
                    this.rowSelected = i+1;
                    this.rows[this.rowSelected].selected = true;
                    return true;
                }
            }
        }
        else if(direction == -1 && this.rowSelected > 0){ // up
            for(var i = this.rowSelected ; i > 0; i--){
                if(!(this.rows[i-1].label == "")){
                    this.rows[this.rowSelected].selected = false;
                    this.rowSelected = i-1;
                    this.rows[this.rowSelected].selected = true;
                    return true;
                    break;
                }
            }
        }
        sounds.play(2);
        return false;
    }

    this.setup = function () {
        for(var x = 0 ; x < this.numRows ; x++){
            this.rows.push(new Cell(this.column));
        }
        this.rows[this.rowSelected].selected = true;
    }

    this.update = function(xPos,columns){
        this.xPos = xPos;
        for(var i = 0 ; i < this.numRows ; i++){
            this.rows[i].update(this.xPos,((height -1)/this.numRows) * i,width/columns,(height-1)/this.numRows,this.label[i],this.selected);
        }
    }

    this.draw = function(){
        for(var i = 0 ; i < this.numRows ; i++){
            this.rows[i].draw();
        }

    }

}

function GUI(){

    this.columns  = [];
    this.columnSelected = 0;
    this.numCols = 2;
    this.numRows  = 15;
    this.names    = [];
    this.subNames = [];
    this.typeActive = true;

    this.programSwitch = function(){
        var programType = this.columns[0].rowSelected;
        var program     = this.columns[1].rowSelected;
        return [programType,program];
    }

    this.refreshSubNames = function (list) {

        for(var i = 0 ; i < this.numRows ; i++){
            this.subNames[i] = "";
            this.names[i] = "";
        }

        for(var i = 1 ; i < list.length ; i++){
            this.names[i-1] = (list[i].name);
        }

        for(var i = 0 ; i < list[(this.columns[0].rowSelected)+1].programs.length ; i++){
            this.subNames[i] = (list[(this.columns[0].rowSelected)+1].programs[i].name);
        }

        if(this.columnSelected == 0){
            for (var i = 0; i < this.numRows; i++) {
                this.columns[1].rows[i].selected = false;
            }
            this.columns[1].rows[0].selected = true;
            this.columns[1].rowSelected = 0;
        }


    }

    this.selectCell = function(direction,list){
        if(this.columns[this.columnSelected].selectCell(direction)){
            this.refreshSubNames(list)
        }
    }

    this.selectColumn = function(direction) {
        if (direction == 0) {
            this.columnSelected = 0;
            this.columns[this.columnSelected].selected = true;
        } else if (direction == 1 && this.columnSelected > 0) {                 // Left
            this.columns[this.columnSelected].selected = false;
            this.columnSelected -= 1;
            this.columns[this.columnSelected].selected = true;
        } else if (direction == 2 && this.columnSelected < this.numCols - 1) { //Right
            this.columns[this.columnSelected].selected = false;
            this.columnSelected += 1;
            this.columns[this.columnSelected].selected = true;
        } else {
            sounds.play(2);
        }
    }

    // Input Events
    this.keyPressed = function(key,list){
        switch(key) {
            case UP_ARROW    : this.selectCell(-1,list); sounds.play(3);break; // up
            case DOWN_ARROW  : this.selectCell( 1,list); sounds.play(3);break; // down
            case LEFT_ARROW  : this.selectColumn(1);     sounds.play(3);break; // Left
            case RIGHT_ARROW : this.selectColumn(2);     sounds.play(3);break; // Right
            case BACKSPACE   :                           sounds.play(5);break; // Enter
            default          : sounds.play(2);
        }
    }

    this.keyTyped = function(key,list){
        switch(key) {
            case 'w' || 'W' : this.selectCell(-1,list);  sounds.play(3); break; // up
            case 's' || 'S' : this.selectCell( 1,list);  sounds.play(3); break; // down
            case 'a' || 'A' : this.selectColumn(1);      sounds.play(3); break; // Left
            case 'd' || 'D' : this.selectColumn(2);      sounds.play(3); break; // Right
        }
    }

    this.setup = function(list){

        this.columns.push(new Column(this.names,this.numRows,0));
        this.columns[0].setup();

        this.columns.push(new Column(this.subNames,this.numRows,1));
        this.columns[1].setup();

        this.columns[0].selected = true;

        this.refreshSubNames(list);

    }

    this.update = function(){
        this.columns[1].label = this.subNames;
        for(var x = 0 ; x < this.numCols ; x++){
            this.columns[x].update(x * (width-1)/this.numCols,this.numCols);
        }
    }

    this.draw = function(){
        //background(58,71,72);
        for(var x = 0 ; x < this.numCols ; x++){
            this.columns[x].draw();
        }


    }

}

function OS(){

    // Desktop Background (purely Design)
    this.desktopBackground = new Desktop();
    this.programTypeCurrent = 0; //Currently Selected Category
    this.programTypes = [];      //Collection of Program Categories

    this.programLoad = function(){

        //check if subprogram list is empty
        if(this.programTypes[this.programTypes[0].columns[0].rowSelected+1].programs.length == 0){
            sounds.play(2);
            return;
        }

        // kill old program
        if(this.programTypeCurrent != 0){
            this.programTypes[this.programTypeCurrent].programs[this.programTypes[this.programTypeCurrent].running].running = false;
        }

        //pause unnecessary animations during game;
        this.desktopBackground.loading        = true;
        this.desktopBackground.programRunning = true;

        this.programTypes[this.programTypeCurrent].typeActive = false;
        var newProgram = this.programTypes[this.programTypeCurrent].programSwitch();
        this.programTypeCurrent = newProgram[0]+1;
        this.programTypes[this.programTypeCurrent].running = newProgram[1];
        this.programTypes[this.programTypeCurrent].typeActive = true;
        var currentProgram =  this.programTypes[this.programTypeCurrent].running;
        this.programTypes[this.programTypeCurrent].programs[currentProgram].running = true;
        this.programTypes[this.programTypeCurrent].programs[currentProgram].setup();
        sounds.play(4);
    }

    this.programUnload = function(){
        if(this.programTypeCurrent != 0 && !this.programTypes[this.programTypeCurrent].checkRunning()){
            this.desktopBackground.loading        = true;
            this.desktopBackground.programRunning = false;
            this.programTypes[this.programTypeCurrent].typeActive = false;
            this.programTypeCurrent = 0;
            this.programTypes[this.programTypeCurrent].typeActive = true;
        }
    }

    // Input Events
    this.keyPressed = function(key){
        if(key == ENTER && this.programTypeCurrent == 0 && this.programTypes[this.programTypeCurrent].columnSelected == 1){
            this.programLoad();

            return;
        }
        if(this.programTypeCurrent == 0){
            this.programTypes[this.programTypeCurrent].keyPressed(key,this.programTypes);
        } else {
            this.programTypes[this.programTypeCurrent].keyPressed(key,null);
        }
    }

    this.keyTyped = function(key){
        if(this.programTypeCurrent == 0){
            this.programTypes[this.programTypeCurrent].keyTyped(key,this.programTypes);
        } else {
            this.programTypes[this.programTypeCurrent].keyTyped(key);
        }
    }

    this.setup = function(){

        this.programTypes.push(new GUI());
        this.programTypes.push(new Games("Game"));
        this.programTypes.push(new Maths("Maths"));

        // Add all names of program categories to name array in GUI
        for(var i = 1 ; i < this.programTypes.length ; i++){
            this.programTypes[i].setup();
        }
        this.programTypes[0].setup(this.programTypes);



    }

    this.update = function(){

        this.programUnload(); // check if program state has been terminated;

        if(!this.desktopBackground.loading){
            this.programTypes[this.programTypeCurrent].update();
        }

        this.desktopBackground.update();

    }

    this.draw = function(){

        if(!this.desktopBackground.loading){
            background(58,71,72);
            this.programTypes[this.programTypeCurrent].draw();
        }

        this.desktopBackground.draw();


    }
}




