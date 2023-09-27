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

    
    @property({ type :CCInteger})  public branchNumber:number=8;
    @property({ type :CCInteger}) public birdNumberq :number=6 ;
    @property({ type :CCInteger}) public branchnumber :number=5 ;

    
    
    public listColor:Color[] =
    [
        color(255,0,0,255)/*red=0*/,
        color(82,0,255,255)/*blue=1*/,
        color(255,255,0,255)/*yellow=2*/,
        color(104,255,0,255)/*whitegreen=3*/,
        color(255,0,255,255)/*pink=4*/,
        color(255,155,0,255)/*orange=5*/
    ];
    public static Intances:GameData =null;
    protected onLoad(): void {
        GameData.Intances = this;
    }
    SpawnBranch()
    {

    }
    SpawnSlot(){}
    start() {
        this.GameDataNumber = [0,4,3,1,3,5,1,2,0,2,0,5,2,2,4,-1,-1,-1,-1,-1,0,5,5,2,1,3,4,0,3,3,1,4,5,4,1];
        
        
        this.treeData =   this.getComponentInChildren(TreeData);

        //this.startGame();
    }

    update(deltaTime: number) {
        
    }
    fixGameDataNumber()
    {
        let copy = this.GameDataNumber
        this.GameDataNumber =[]
        this.GameDataNumber = copy.filter((num) => num !== -1);
      
    }
    startGame()
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
    newGame()
    {
        this.deleteAllBird()
        this.startGame()
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

