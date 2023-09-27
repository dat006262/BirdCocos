import { _decorator, Color, Component, easing, Node, tween, Vec3 } from 'cc';
import { BranchSlot } from './BranchSlot';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('BirdData')
export class BirdData extends Component {
    @property({type: Color}) public color:Color;
    public Slot:BranchSlot;
    public FlyAnim(to:BranchSlot)
    {
        tween(this.node.worldPosition)
                .to(1, to.node.worldPosition, {easing :easing.linear,
                    onStart:()=>
                    {
                        GameData.Intances.canNextGame = false
                        this.node.setParent(GameData.Intances.treeData.node)
                    },
                    onUpdate: (target:Vec3, ratio: number) => {
                       this.node.worldPosition = target
                    },
                    onComplete:()=>
                    {
                        this.node.worldPosition = to.node.worldPosition
                        this.node.setParent(to.node)
                        this.node.position =new Vec3(0,0,0)
                        GameData.Intances.canNextGame = true
                    }
                 
                })
                .start();
         
        
    }
}


