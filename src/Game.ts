// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, SNAKE_MAX_SPEED } from "./Constants";
import AssetManager from "./AssetManager";
import Snake from "./Snake";
import Bug from "./Bug";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;

// assetmanager object
let assetManager:AssetManager;

// game objects
let snake:Snake;
let bug:Bug;
let background:createjs.Sprite;

// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");
    
    // construct game object sprites
    background = assetManager.getSprite("sprites", "misc/backgroundGame");
    stage.addChild(background);

    snake = new Snake(stage, assetManager);
    snake.startSlowDown();
    snake.showMe();
    //snake.startMe();
    
    bug = new Bug(stage, assetManager);
    bug.rotateMe(225);
    bug.showMe();
    bug.startMe();

    
    // listen on the stage for clicks
    stage.on("mousedown", onMoveSnake);
    
    stage.on("snakeKilled", onSnakeDead);
    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onMoveSnake(e:createjs.Event) {
    snake.rotateMe();
    snake.startMe();
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    
    // This is your game loop :)
    snake.update();

    bug.update();
    // update the stage!
    stage.update();
}

function onSnakeDead(e:createjs.Event):void {
    console.log("Snake is dead");

}

// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);    
}

main();