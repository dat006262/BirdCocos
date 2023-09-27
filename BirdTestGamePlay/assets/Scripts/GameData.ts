import { _decorator, CCInteger, color, Color, Component, instantiate, Node, Prefab, random, randomRange, randomRangeInt, Sprite, SpriteRenderer, Vec2, Vec3 } from 'cc';
import { BranchData } from './BranchData';
import { BirdData } from './BirdData';
import { TreeData } from './TreeData';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;


@ccclass('GameData')
export  class GameData extends Component {
    @property(Prefab)public BranchLeftPrefabs:Prefab;
    @property(Prefab)public BranchRightPrefabs:Prefab;
    @property(Prefab)public BranchSlotPrefabs:Prefab;
    @property(Prefab)public birdPrefabs:Prefab;
    @property(Node)public WingameLabel:Node;
    @property(Node)public LossgameLabel:Node;

    @property(TreeData)public treeData:TreeData;
    @property(GameManager)public gameManager:GameManager;
    @property(BranchData) public branchSelected:BranchData;
    @property({ type :BirdData})  public birds_Selected:BirdData[] = [];
     public GameDataNumber:number[] = [];
    canNextGame:boolean = true
    lev:number = 0
    branchNumber:number=6;
    birdNumberq :number=6 ;
    branchLength :number=4 ;
    public listColor:Color[] =
    [
        color(255,0,0,255)/*red=0*/,
        color(82,0,255,255)/*blue=1*/,
        color(255,255,0,255)/*yellow=2*/,
        color(104,255,0,255)/*whitegreen=3*/,
        color(255,0,255,255)/*pink=4*/,
        color(255,155,0,255)/*orange=5*/,
        color(250, 235, 215,255)/*AliceBlue=6*/,
        color(250, 235, 215, 255)/*AntiqueWhite=7*/,
        color(210, 105, 30,255)/*Chocolate=8*/,
        color(0, 139, 139,255)/*DarkCyan=9*/,
        color( 184, 134, 11,255)/*DarkGoldenRod=10*/,
        color(0, 100, 0,255)/*DarkGreen=11*/,
        color(139, 0, 139,255)/*DarkMagenta=12*/,
        color(55, 20, 147,255)/*DeepPink=13*/
    ];
    public static Intances:GameData =null;

    //---------------------------------------------------------------------------------------
    protected onLoad(): void {
        GameData.Intances = this;
    }
  
    
    start() {
        // let array:number[] = [0,4,3,1,3,5,1,2,0,2,0,5,2,2,4,-1,-1,-1,-1,-1,0,5,5,2,1,3,4,0,3,3,1,4,5,4,1]
        // this.StartGameAtLev(0,8,5,array)

    //     let array:number[] = [9,10,10,11,1,11,9,10,-1,-1,-1,-1,1,9,11,1,10,11,9,1]
    //    this.StartGameAtLev(0,6,4,array)
     
    }
    public StartGameAtLev(lev:number,branchNumber:number,branchLength:number,GameDataNumber:number[])
    {
        this.lev = lev
        this.branchNumber = branchNumber;
        this.branchLength = branchLength;
        this.GameDataNumber = GameDataNumber;
        this.treeData =   this.getComponentInChildren(TreeData);
        this.SpawnBranchAndSlot()
        this.treeData.getData()
        this.treeData.sortBranch()
        //this.GameDataNumber = [0,4,3,1,3,5,1,2,0,2,0,5,2,2,4,-1,-1,-1,-1,-1,0,5,5,2,1,3,4,0,3,3,1,4,5,4,1];
        this.SpawnBirdAndGetData();
    }
    SpawnBranchAndSlot()
    {
        for (let i=0;i<this.branchNumber;i++)
        {
            if(i%2==0)
            {
                let newBrach = instantiate(this.BranchLeftPrefabs)
                newBrach.setParent(this.treeData.node)
                newBrach.name = `The branch left ${ i }`
                this.SpawnSlot(newBrach,i)
             }
            else
            {
                let newBrach = instantiate(this.BranchRightPrefabs)
                newBrach.setParent(this.treeData.node)
                newBrach.name = `The branch right ${ i }`
                this.SpawnSlot(newBrach,i)
            } 
        }
    }
    SpawnSlot(  BranchData:Node,branchIndex:number)
    {
        for (let i=0;i<this.branchLength;i++)
        {
            let newSlit =  instantiate(this.BranchSlotPrefabs)
            newSlit.name = `Slot ${ branchIndex }-${ i }`
            newSlit.setParent(BranchData)
        }
    }
    update(deltaTime: number) {
        
    }
    fixGameDataNumber()
    {
        let copy = this.GameDataNumber
        this.GameDataNumber =[]
        this.GameDataNumber = copy.filter((num) => num !== -1);
      
    }
    SpawnBirdAndGetData()
    {
        
        this.fixGameDataNumber()
        for (let i=0;i<this.treeData.branchList.length-2;i++)
        {
            for(let j=0;j<this.treeData.Branchlength();j++)
            {//sinh prefab
                let newBirf =instantiate(this.birdPrefabs);
                newBirf.parent = this.treeData.BranchSlot[i*this.treeData.Branchlength()+j].node;
               //Set Bird Data
                let bird_data =  newBirf.getComponent(BirdData);
                bird_data.Slot = this.treeData.BranchSlot[i*this.treeData.Branchlength()+j];
                         //  bird_data.color = this.listColor[i];
                bird_data.color = this.listColor[this.GameDataNumber[i*this.treeData.Branchlength()+j]];
                //To mau
                let x = newBirf.getComponent(Sprite); 
                x.color = bird_data.color;
                //Set BranchSlot
                this.treeData.BranchSlot[i*this.treeData.Branchlength()+j].Bird = bird_data;
                this.treeData.BranchSlot[i*this.treeData.Branchlength()+j].Pos = new Vec2(i,j)
            }
        }
        for (let i=this.treeData.branchList.length-2;i<this.treeData.branchList.length;i++)
        {
            //SetVector BrachSlot Null
            for(let j=0;j<this.treeData.Branchlength();j++)
            {
               this.treeData.BranchSlot[i*this.treeData.Branchlength()+j].Pos = new Vec2(i,j)
            }
        }

        this.treeData.BirdList = this.treeData.getComponentsInChildren(BirdData);
    }
    deleteAllBird()
    {
        this.treeData.BirdList.forEach(element => {
            element.node.removeFromParent();
            element.node.active = false;
             element.destroy()
            
        });
        this.treeData.BranchSlot.forEach(element => 
            {
                element.Bird = null;

            })
    }
    deleteAllBranchAndSlot()
    {
        this.treeData.BranchSlot.forEach(element => {
            element.node.removeFromParent();
            element.node.active = false;
             element.destroy()
            
        });
        this.treeData.branchList.forEach(element => {
            element.node.removeFromParent();
            element.node.active = false;
             element.destroy()
            
        });
        this.treeData.clearData()
    }
    NextLevelGame()
    {
        if(!this.canNextGame){return}
        this.deleteAllBranchAndSlot()
        this.WingameLabel.active = false
        this.LossgameLabel.active = false
        this.gameManager.lev++
        
        if(this.gameManager.lev>this.gameManager.Maxlevl())
        {
            this.gameManager.lev=this.gameManager.Maxlevl()
           
        }
      
        this.gameManager.StartGameAtLev(this.gameManager.lev)

    }
    ReStartGame()
    {
        if(!this.canNextGame){return}
        this.deleteAllBird()
        this.SpawnBirdAndGetData()
        this.WingameLabel.active = false
        this.LossgameLabel.active = false
    }
    WinGame()
    {
        this.WingameLabel.active = true;
    }
    LossGame()
    {
        this.LossgameLabel.active = true;
    }
    highlighBird()
    {
        this.birds_Selected.forEach(eleme=>
            {
                eleme.node.setScale(2,2,2);
            })

    }
    UnhighlighBird()
    {
        this.birds_Selected.forEach(eleme=>
            {
                eleme.node.setScale(1,1,1);
            })

    }
}

