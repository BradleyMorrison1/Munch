import {SNAKE_MAX_SPEED} from "./Constants";
import AssetManager from "./AssetManager";

export default class GameCharacter {

    // state class constants
    public static STATE_IDLE:number = 1;
    public static STATE_MOVING:number = 2;
    public static STATE_DEAD:number = 3;

    // private property variables
    protected _speed:number;
    protected _state:number;
    protected _sprite:createjs.Sprite;
    // the x and y displacement of the sprite per tick
    protected xDisplace:number;
    protected yDisplace:number;


    // protected variables
    protected stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string) {
        // initialization        
        this._speed = SNAKE_MAX_SPEED;
        this._state = GameCharacter.STATE_IDLE;
        this.stage = stage;
        this.xDisplace = 0;
        this.yDisplace = 0;

        this._sprite = assetManager.getSprite("sprites", animation, 300, 300);
    }
    
    // ------------------------------------------------------------ gets/sets

    set speed(value:number){
        this.speed = value;
    }
    get speed():number {
        return this._speed;
    }

    get sprite():createjs.Sprite {
        return this._sprite;
    }

    get state() {
        return this._state;
    }

    // -------------------------------------------------------------- protected method
    protected toRadians(degrees:number):number {
        return degrees * (Math.PI / 180);
    }

    // -------------------------------------------------------------- public methods
    public showMe():void {
        this.stage.addChild(this._sprite);
    }

    public hideMe():void {
        this.stage.removeChild(this._sprite);
    }

    public rotateMe(degrees:number):void {
        if(this.state == GameCharacter.STATE_DEAD) return;
        
        // rotate the sprite
        this.sprite.rotation = degrees;
    }
    
    public startMe():void {
        if(this.state == GameCharacter.STATE_DEAD) return;
        
        
    }
    

}