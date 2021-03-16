import GameCharacter from "./GameCharacter";
import AssetManager from "./AssetManager";

export default class Snake extends GameCharacter {


    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        super(stage, assetManager, "bug/alive");

        
    }


}