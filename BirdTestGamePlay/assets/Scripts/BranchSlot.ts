import { _decorator, Component, Node, Vec2 } from 'cc';
import { BirdData } from './BirdData';
const { ccclass, property } = _decorator;

@ccclass('BranchSlot')
export class BranchSlot extends Component {
    @property({type:Vec2}) public Pos:Vec2 ;
    @property({type:BirdData})public Bird:BirdData;
    //public empty:boolean;
    public isEmpty(): boolean {
        return this.Bird == null;
    }
    public oncuppied(): boolean {
        return this.Bird == null;
    }
}


