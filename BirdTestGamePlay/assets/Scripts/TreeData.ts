import { _decorator,Color, CCInteger, Component, Node } from 'cc';
import { BranchData } from './BranchData';
import { BranchSlot } from './BranchSlot';
import { BirdData } from './BirdData';
const { ccclass, property, executeInEditMode  } = _decorator;

@ccclass('TreeData')
export class TreeData extends Component {

    // public TileRow[] rows { get; private set; }
    // public TileCell[] cells { get; private set; }
  
    // public int size => cells.Length;
    // public int height => rows.Length;
    // public int width => size / height;

    @property({type: BranchData})  public branchList:BranchData[] = [];
    @property({type: BranchSlot})  public BranchSlot:BranchSlot[] = [];
    @property({type: BirdData})  public BirdList:BirdData[] = [];
    public Branchlength(): number {
        return this.BranchSlot.length/this.branchList.length
    }
    protected onLoad(): void {
       this.getData()
    }
    
    start() {
        
       
    }
    update(deltaTime: number) {
       
    }
    public getData()
    {
        this.branchList = this.getComponentsInChildren(BranchData);
        this.BranchSlot = this.getComponentsInChildren(BranchSlot);
    }
    public checkwin():boolean
    {
        let color_Check:Color ;
        let Win_Check:boolean=true;
        for(let i=0;i<   this.branchList.length;i++)//neu ko phai canh trong
        {
            if(!this.branchList[i].branchSlotList[0].isEmpty())//Check canh co chim
            {
                color_Check = this.branchList[i].branchSlotList[0].Bird.color
                for(let j=0;j<   this.branchList[i].branchSlotList.length;j++)
                {
                    if(this.branchList[i].branchSlotList[j].isEmpty() )//co lot trong ==null => false
                    { 
                        console.log("NotWinGame")
                         return false
                    }
                    if(this.branchList[i].branchSlotList[j].Bird.color != color_Check)//notsamecolor =>false
                    { 
                        console.log("NotWinGame")
                        return false
                       
                    }
                }

            }
        }
        console.log("WinGameroi")
        return true
    }

    public checkLoss():boolean
    {
        let color_Check_root:Color ;
        let Win_Check:boolean=true;
        for(let i=0;i<this.branchList.length;i++)//neu ko phai canh trong
        {
            if(!this.branchList[i].branchSlotList[0].isEmpty())//Check canh co chim
            {
                color_Check_root =this.branchList[i].branchSlotList[0].Bird.color
                let x:BirdData[] = this.branchList[i].GetLastBird();

                for(let j=0;j<this.branchList.length;j++)//neu ko phai canh trong
                {
                   if(!this.branchList[j].branchSlotList[0].isEmpty()&& j!=i)//Check canh co chim
                    {
                        console.log("testWay:",i,j)
                        if( this.branchList[j].CheckCanMove_OnlyMoveAllBird(x) )
                        {
                            console.log("foundWay:",i,j)
                            return false

                        }
                        

                    }
                    else if(this.branchList[j].branchSlotList[0].isEmpty())
                    {
                        console.log("foundWay:",i,j)
                            return false
                    }
                }
            }
           
        }
        return true
    }

    
}


