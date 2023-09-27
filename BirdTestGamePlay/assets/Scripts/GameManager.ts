import { _decorator, CCClass, Component, Label, Node } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  
    GameData_dictionary: { [key: number]: [number,number,number[]] } = {};
    public static intances:GameManager
    public lev:number =1
    public Maxlevl():number
    { 
        return Object.keys(this.GameData_dictionary).length;
    }
    //--------------------------------------------------------------------
    protected onLoad(): void {
    GameManager.intances = this;

    }
  
    start() {
       
        this.GetDataToDictionary()
       this.StartGameAtLev(this.lev)
    }
    public StartGameAtLev(indexLev:number)
    {
        GameData.Intances.StartGameAtLev(indexLev,this.GameData_dictionary[indexLev][0],this.GameData_dictionary[indexLev][1],this.GameData_dictionary[indexLev][2])
    }
    GetDataToDictionary()
    {
        this.GameData_dictionary[1] =  [6,4,[9,10,10,11,1,11,9,10,-1,-1,-1,-1,1,9,11,1,10,11,9,1]]
        this.GameData_dictionary[2] =  [8,5,[0,4,3,1,3,5,1,2,0,2,0,5,2,2,4,-1,-1,-1,-1,-1,0,5,5,2,1,3,4,0,3,3,1,4,5,4,1]]
        this.GameData_dictionary[3] =  [7,4,[0,10,11,0,4,1,10,11,4,4,1,4,-1,-1,-1,-1,1,0,11,0,10,1,11,10]]
    }
//            0,10,11,0,4,1,10,11,4,4,1,4,-1,-1,-1,-1,1,0,11,0,10,1,11,10
    update(deltaTime: number) {
        
    }
}


