import { _decorator, CCClass, Component, Label, Node } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

   
    //@property({type: Node}) public gameOver:Node;//?????????????????????????
    public static intances:GameManager
    protected onLoad(): void {
        GameManager.intances = this;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


