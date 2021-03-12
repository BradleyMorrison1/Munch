import GameCharacter from "./GameCharacter";
import AssetManager from "./AssetManager";

export default class Snake extends GameCharacter {

    // custom event for dispatching
    private eventKilled:createjs.Event;

    // where mouse was clicked
    private mouseX:number;
    private mouseY:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        super(stage, assetManager, "snake/alive");

        // construct custom event object
        this.eventKilled = new createjs.Event("snakeKilled", true, false);
    }


    // ---------------------------------------------------------- public methods
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
        this._sprite.gotoAndPlay("snake/dead");
        this._sprite.on("animationend", () => {
            this._sprite.stop();
            this.stage.dispatchEvent(this.eventKilled);
        },true);
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