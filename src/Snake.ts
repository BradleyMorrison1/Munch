import {SNAKE_MAX_SPEED, SNAKE_SLOW_DELAY} from "./Constants";

import GameCharacter from "./GameCharacter";
import AssetManager from "./AssetManager";

export default class Snake extends GameCharacter {

    // custom event for dispatching
    private eventKilled:createjs.Event;
    private eventSpeedChange:createjs.Event;

    // where mouse was clicked
    private mouseX:number;
    private mouseY:number;

    // slow down timer
    private slowDownTimer:number;


    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        super(stage, assetManager, "snake/alive");

        // construct custom event object
        this.eventKilled = new createjs.Event("snakeKilled", true, false);
        this.eventSpeedChange = new createjs.Event("snakeSpeedChange", true, false);
    }

    // ---------------------------------------------------------- event handler
    private onSlowDown() {
        // adjust the speed!
        this._speed--;
        this.sprite.dispatchEvent(this.eventSpeedChange);
        console.log("Snake slowed: " + this._speed);
        // is the snake dead
        if(this._speed <= 0) {
            this.killMe();
        }

    }

    // ---------------------------------------------------------- public methods
    public startSlowDown():void {
        // start the timer to slow down the snake's speed
        this.slowDownTimer = window.setInterval(() => this.onSlowDown(), SNAKE_SLOW_DELAY);
    }

    public rotateMe():void {
        // get coordinates of the mouse
        this.mouseX = this.stage.mouseX
        this.mouseY = this.stage.mouseY

        // calculate the rotation we need to rotate the snaki in radians to point at mouse click
        let radians:number = Math.atan2((this.mouseY - this._sprite.y), (this.mouseX - this._sprite.x));

        super.rotateMe(this.toDegrees(radians));
    }

    public killMe():void {
        this._state = GameCharacter.STATE_DEAD;

        // stop the timer
        window.clearInterval(this.slowDownTimer);


        this._sprite.gotoAndPlay("snake/dead");
        this._sprite.on("animationend", () => {
            this._sprite.stop();
            this.stage.dispatchEvent(this.eventKilled);
        },true);
    }

    public resetMe():void {
        this._sprite.gotoAndStop("snake/alive");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._sprite.rotation = 0;
        this._speed = SNAKE_MAX_SPEED;
        this._state = GameCharacter.STATE_IDLE;
    }

    public update():void {
        if(this._state != GameCharacter.STATE_MOVING) return;

        super.update();

        //is it time to stop the snake? did it reach its destination
        if ((Math.abs(this._sprite.x - this.mouseX) < 10) && (Math.abs(this._sprite.y - this.mouseY) < 15)) {
            this.stopMe()
        }

    }
}