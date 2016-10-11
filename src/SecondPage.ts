class SecondPage extends Pages {

    public constructor()
    {
        super();
    }
    public Creat(Width:number,Hight:number){
/**
     * 创建第二页面
     * Create a game scene
     */

        var SecondPage=new Pages();
        SecondPage.y=0;
        SecondPage.width=Width;
        SecondPage.height=Hight;
        this.addChild(SecondPage);
        //MovePage(SecondPage);
        //SecondPage.MovePage(SecondPage);
        //var move=new MovePage;
        //move.MovePage(SecondPage);
        
        var sky:egret.Bitmap = this.createBitmapByName("stara_jpg");
        SecondPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;
        
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, Width, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        SecondPage.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("eye_jpg");
        icon.x = 20;
        icon.y = 45;
        icon.$setScaleX(0.45);
        icon.$setScaleY(0.45);
        var offsetX=0;
        var offsetY=0;
        icon.$touchEnabled=true;
        icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this)
        icon.addEventListener(egret.TouchEvent.TOUCH_END,endMove,this)
        SecondPage.addChild(icon);
function startMove(e:egret.TouchEvent){
            offsetX=e.stageX-icon.x;
            offsetY=e.stageY-icon.x;
            this.addChild(icon);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this)

}

function endMove(){
            
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
}
function onMove(e:egret.TouchEvent){
              icon.x=e.stageX-offsetX;
              icon.y=e.stageY-offsetY;
              
}

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 220;
        line.y = 61;
        SecondPage.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = Width - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "14081202";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        SecondPage.addChild(colorLabel);

        var textfield = new egret.TextField();
        SecondPage.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = Width - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        var Mask = new egret.Shape();
        Mask.graphics.beginFill(0x000000, 0.5);
        Mask.graphics.drawRect(0, 0, Width, 600);
        Mask.graphics.endFill();
        Mask.y = 230;
        SecondPage.addChild(Mask);

        var label:egret.TextField = new egret.TextField();
        SecondPage.addChild( label );
        label.x=48;
        label.y=300;
        label.width = 500;
        label.height = 500;
        label.textColor = 0xFFFFFF;
        label.fontFamily="KaiTi";
        label.text = "姓名：王恒尊\n\n学号：14081202\n\n专业：数字媒体技术\n\n爱好：小说，音乐，游戏\n\n属性：宅\n\nQ Q：982049377\n\n微信：Monologue_whz\n\n目标：学好编程";


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }
}