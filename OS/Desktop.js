/**
 * Created by Overlord Main on 24/02/2017.
 */
function Desktop(){

    this.programRunning = false;

    this.desktopBackground = '\n\n\n\n'+
        '                                                   ....\n'+
        '                                               ...........\n'+
        '                                             .................\n'+
        '                                          ......................\n'+
        '                                        #.........................(\n'+
        '                                        %%%%*.................(%%%#\n'+
        '                                        %%%%%%%#...........%%%%%%%(\n'+
        '                                   .......(%%%%%%%%....,%%%%%%%%/......\n'+
        '                              ............../%%%%%%%%%%%%%%%*.............\n'+
        '                          ..................... /%%%%%%%*....................\n'+
        '                         ......................... %%%%%.........................\n'+
        '                         ##(....................(##%%%%%##(....................(##\n'+
        '                      .. ######/............(######%%%%%######(............(######.\n'+
        '                   .......#########......(#########%%%%%##########.... .(########......\n'+
        '               ..............,#####################%%%%%#####################,.............\n'+
        '            .....................(#################%%%%%#################(....................\n'+
        '         ...........................##############/.....*##############.........................\n'+
        '          /(/.....................//(##########/.............(##########///.....................//\n'+
        '          ////(/,.............,(//(/(,..,###*...................*###,..,//(///,.............,((///\n'+
        '          ///////((/.......*((///*.........................................*/(/(/*.......*(//(////\n'+
        '          /////////(//(///////................................................///////(////////////\n'+
        '          /////////////////.....................................................//////////////////\n'+
        '          ///////////////(,.......................................................,///////////////\n'+
        '          ////////////////****..................****!!!!!(****..................****(/////////////\n'+
        '          ////////////////*******,...........*******!!!!!*******,...........*******(//////////////\n'+
        '          ,(((/(/////////***********....,*********,......**********....,**********(//////////(//,\n'+
        '             */(////////*********************,.............,*********************(///////(/*\n'+
        '                 ,(//////******************,....................******************(/////(,\n'+
        '                     /(/.***************...........................***************./(/\n'+
        '                         ****************$$.....................,$/***************\n'+
        '                           .*************$$$$$...............,$$$$/************.\n'+
        '                               ,*********$$$$$$$$,........$$$$$$$$/********,\n'+
        '                                 ******$$$$$$$$$$$$$$$$$$$$$$$$$/*****.\n'+
        '                                       ,$$$$$$$$$$$$$$$$$$$$$$$$$$\n'+
        '                                        .$$$$$$$$$$$$$$$$$$$$$$$,\n'+
        '                                           .$$$$$$$$$$$$$$$$$.\n'+
        '                                                .$$$$$$$$$,\n'+
        '                                                    $$$.     \n';

    this.scan = -100;

    this.refreshRibon = function () {
        fill(255,255,255,50);
        rect(0,this.scan,width,100);

        this.scan+=2;
        if(this.scan >= height){
            this.scan = -100;
        }

    }

    this.bars = function () {

        var barThickness = 3;

        for(var i = 0 ; i < width ; i+=barThickness){
            fill(255,255,255,50);
            rect(0,i,width,1);
        }

    }
    
    this.update = function () {
    }

    this.loading = false;
    this.loadTime = 0;

    this.load = function(){
        if(this.loadTime < 100){
            this.loadTime += 1;
            fill(random(0,255),10,255,10);
            rect(0,0,map(this.loadTime,0,100,0,width),height);
        } else {
            this.loadTime = 0;
            this.loading = false;
        }

    }

    this.drawlogo = function () {
        fill(random(200,255));
        textSize(width*0.015);
        text(this.desktopBackground,0,0,width,height);
    }

    this.draw = function () {

        this.bars();
        this.refreshRibon();
        if(this.loading){
            this.load();
        }
        if(!this.loading && !this.programRunning){

            this.drawlogo();
            this.loading = false;
        }

    }
}