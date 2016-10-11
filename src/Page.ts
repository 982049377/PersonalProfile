
class Pages extends egret.DisplayObjectContainer {

    public  textfield = new egret.TextField();
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
    /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        public createBitmapByName(name:string):egret.Bitmap {
            var result = new egret.Bitmap();
            var texture:egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }

        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        public startAnimation(result:Array<any>):void {
            var self:any = this;

            var parser = new egret.HtmlTextParser();
            var textflowArr:Array<Array<egret.ITextElement>> = [];
            for (var i:number = 0; i < result.length; i++) {
                textflowArr.push(parser.parser(result[i]));
            }

            var textfield = self.textfield;
            var count = -1;
            var change:Function = function () {
                count++;
                if (count >= textflowArr.length) {
                    count = 0;
                }
                var lineArr = textflowArr[count];

                self.changeDescription(textfield, lineArr);

                var tw = egret.Tween.get(textfield);
                tw.to({"alpha": 1}, 200);
                tw.wait(2000);
                tw.to({"alpha": 0}, 200);
                tw.call(change, self);
            };

            change();
        }

        /**
         * 切换描述内容
         * Switch to described content
         */
        private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
            textfield.textFlow = textFlow;
        }
        
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