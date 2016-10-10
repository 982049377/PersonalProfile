
class Pages extends egret.DisplayObjectContainer {

    public constructor()
    {
        super();
        //this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    /*private onAddToStage(event:egret.Event)
    {
        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    }*/

    public MovePage(e:Pages):void{
            this.touchEnabled = true;
            e.addEventListener(egret.TouchEvent.TOUCH_BEGIN,e.mouseDown,this);
            e.addEventListener(egret.TouchEvent.TOUCH_END,e.mouseUp,this);
    }
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差

    private mouseDown(evt:egret.TouchEvent)
    {
        console.log("Mouse Down.");
        this._touchStatus = true;
        //this._distance.x = evt.stageX - this.x;
        this._distance.y = evt.stageY - this.parent.$getY();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
            console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            //this.x = evt.stageX - this._distance.x;
            this.$setY( evt.stageY - this._distance.y);
             if( this.y < -this.stage.stageHeight/2 ){
                     egret.Tween.get( this ).to( {x:0,y:-1136}, 350, egret.Ease.sineIn )
                     .wait(300).to({x:0,y:0}, 100, egret.Ease.sineIn);
                     this.parent.addChildAt(this,0);
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }
                 if( this.y > this.stage.stageHeight/2 ){
                     egret.Tween.get( this ).to( {x:0,y:-1136}, 350, egret.Ease.sineIn )
                     .wait(300).to({x:0,y:0}, 100, egret.Ease.sineIn);
                     this.parent.addChildAt(this,0);
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }         
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        this._touchStatus = false;
        if( this.y >= -this.stage.stageHeight/2 ) {
               // egret.Tween.get( this ).to( {x:0,y:0}, 250, egret.Ease.sineIn );
               egret.Tween.get( this ).to( {x:0,y:-1136}, 350, egret.Ease.sineIn )
                     .wait(300).to({x:0,y:0}, 100, egret.Ease.sineIn);
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private _txInfo:egret.TextField;
    private _bgInfo:egret.Shape;
    private drawText()
    {
        this._bgInfo = new egret.Shape;
        this.addChildAt( this._bgInfo, this.numChildren - 1 );
        //this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff, .5 );
        this._bgInfo.graphics.drawRect( 0, 0, this._txInfo.width, this._txInfo.height );
        this._bgInfo.graphics.endFill();
    }
}