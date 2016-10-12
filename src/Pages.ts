
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
        public changeanchor(icon:egret.Bitmap):void {
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;//改变锚点位置
    }   
}