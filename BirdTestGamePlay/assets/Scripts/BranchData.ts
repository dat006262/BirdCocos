import { _decorator, Color, Component, easing,  Node, tween, Vec3 } from 'cc';
import { BirdData } from './BirdData';
import { BranchSlot } from './BranchSlot';
import { GameData } from './GameData';
import { DEBUG } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('BranchData')
export  class BranchData extends Component {
    @property({type: BranchSlot}) public branchSlotList: BranchSlot[] =[];

    protected onLoad(): void {
        this.branchSlotList = this.getComponentsInChildren(BranchSlot);
    }

    GetLastBird():BirdData[]
    {     
        let isBranchEmpty:boolean = true;
        let color_Check:Color ;
        let result:BirdData[]=[]
        //TestGetAll
        for(let i=this.branchSlotList.length-1;i>=0;i--)
        {
            if(isBranchEmpty)//
            {
                 if (this.branchSlotList[i].isEmpty()){continue;}
                  isBranchEmpty =false
                  color_Check= this.branchSlotList[i].Bird.color;
                   result.push(this.branchSlotList[i].Bird);
                   continue;
            }


             if(color_Check == this.branchSlotList[i].Bird.color)
            {
                result.push(this.branchSlotList[i].Bird);
            
            }
            else break;
        }

        return result;
    }
    GetLastBirdToGameData()
    { 
        if(GameData.Intances.branchSelected ==null )//khi chua chon 
        {
            if(this.GetLastBird().length !=0)
            {
             GameData.Intances.branchSelected =this
             GameData.Intances.birds_Selected = this.GetLastBird();
             GameData.Intances.highlighBird();
            }
        //if can move
        }
        else if(GameData.Intances.branchSelected ==this)//Khi da chon  + chon lai canh cu
        {
             GameData.Intances.UnhighlighBird();
             GameData.Intances.branchSelected = null
             GameData.Intances.birds_Selected = null;
        }
        else if(GameData.Intances.branchSelected !=this)//Khi da chon  + chon canh moi
        {

                if(this.CheckCanMove())
                {
                    //move
                    GameData.Intances.UnhighlighBird();
                    this.BirdFly()
                  
                    GameData.Intances.branchSelected = null
                    GameData.Intances.birds_Selected = null;
                    if( GameData.Intances.treeData.checkwin())
                    {
                        GameData.Intances.WinGame()

                    }
                    if(GameData.Intances.treeData.checkLoss())
                    {
                        GameData.Intances.LossGame()
                    }
                    
                }
                else
                {
                    GameData.Intances.UnhighlighBird();
                    GameData.Intances.branchSelected =this
                    GameData.Intances.birds_Selected = this.GetLastBird();
                    GameData.Intances.highlighBird();
                }
            
        }
    }

    CheckCanMove():boolean
    {
        
        if (GameData.Intances.branchSelected ==null||GameData.Intances.birds_Selected.length == 0)//neu ma chua chon canh hoac canh da chon cha co j ca
        {return false}
       let countSlotNull=0;
       let color_Check:Color ;
       let isletCheckColor:boolean = false;
       let isShameColor:boolean = false;
       let isCanMove:boolean = false;
       
        for(let i=this.branchSlotList.length-1;i>=0;i--)
        {
           
            if (!this.branchSlotList[i].isEmpty())//neu co chim
            {
                isletCheckColor = true;
                color_Check = this.branchSlotList[i].Bird.color;
           
            }
            //ko chim thi
            if(!isletCheckColor)
            {
                countSlotNull++;
                if( countSlotNull ==this.branchSlotList.length)
                {
                    isCanMove =true
                }
            }
            else
            {
                if(color_Check == GameData.Intances.birds_Selected[0].color )
                {
                    isShameColor = true
                }
                else
                {
                    isShameColor = false
                }
                break;
            }
            
            
        }
        if(isShameColor)
        {
            isCanMove = true
            if(countSlotNull>=  GameData.Intances.birds_Selected.length)
            {
                //Co the di chuyen chim 
                // isCanMove = true
            }
        }
        return isCanMove;
        

    }
    BirdFly()
    {
        let isLetSwap:boolean = false;
        let numberBirdMove =   GameData.Intances.birds_Selected.length

        let  j=0
        for(let i=0;i<this.branchSlotList.length;i++)
        {
            if (this.branchSlotList[i].isEmpty()&&!isLetSwap)//neu co chim
            {   
                 isLetSwap= true;
              
                
            }
            if(isLetSwap)
            {

                GameData.Intances.birds_Selected[j].Slot.Bird = null; //Slot chim bay di = null
                GameData.Intances.birds_Selected[j].Slot = this.branchSlotList[i]//chhim bay toi vi tri slot moi
               
                this.branchSlotList[i].Bird =  GameData.Intances.birds_Selected[j] //Slot chim bay den co chim moi
                let target : Vec3 = new Vec3(this.branchSlotList[i].node.worldPosition.x,this.branchSlotList[i].node.worldPosition.y,this.branchSlotList[i].node.worldPosition.z) ;
           
                GameData.Intances.birds_Selected[j].FlyAnim(this.branchSlotList[i])
                // GameData.Intances.birds_Selected[j].node.setParent(this.branchSlotList[i].node)
                // GameData.Intances.birds_Selected[j].node.setPosition(Vec3.ZERO)
                j++
                
            }
            if(j>numberBirdMove-1){break}
        }
    }
   
   
    CheckCanMove_OnlyMoveAllBird( birds_Selected:BirdData[]):boolean
    {
        
        if (birds_Selected.length == 0)//neu ma chua chon canh hoac canh da chon cha co j ca
        {return false}
       let countSlotNull=0;
       let color_Check:Color ;
       let isletCheckColor:boolean = false;
       let isShameColor:boolean = false;
       let isCanMove:boolean = false;
       
        for(let i=this.branchSlotList.length-1;i>=0;i--)
        {
           
            if (!this.branchSlotList[i].isEmpty())//neu co chim
            {
                isletCheckColor = true;
                color_Check = this.branchSlotList[i].Bird.color;
           
            }
            //ko chim thi
            if(!isletCheckColor)
            {
                countSlotNull++;
                if( countSlotNull ==this.branchSlotList.length)
                {
                    isCanMove =true
                }
            }
            else
            {
                if(color_Check == birds_Selected[0].color )
                {
                    isShameColor = true
                }
                else
                {
                    isShameColor = false
                }
                break;
            }
            
            
        }
        if(isShameColor)
        {
         
            if(countSlotNull>=  birds_Selected.length)
            {
               
                isCanMove = true
            }
        }
        return isCanMove;
        

    }
}


