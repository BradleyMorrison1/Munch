import GameCharacter from "./GameCharacter";
import AssetManager from "./AssetManager";

export default class Snake extends GameCharacter {

    // custom event for dispatching
    private eventKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        super(stage, assetManager, "snake/alive");

        // construct custom event object
        this.eventKilled = new createjs.Event("snakeKilled", true, false);
    }

    public killMe():void {
        this._state = GameCharacter.STATE_DEAD;
        this._sprite.gotoAndPlay("snake/dead");
        this._sprite.on("animationend", () => {
            this._sprite.stop();
            this.stage.dispatchEvent(this.eventKilled);
        },true);
    }
}