var FirstPage = (function (_super) {
    __extends(FirstPage, _super);
    function FirstPage() {
        _super.call(this);
        //this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }
    var d = __define,c=FirstPage,p=c.prototype;
    p.Creat = function (Width, Hight) {
        /**
   *
   *
* 创建第一页面
* Create a game scene
*/
        var FirstPage = new Pages();
        FirstPage.y = 0;
        FirstPage.width = Width;
        FirstPage.height = Hight;
        this.addChild(FirstPage);
        //MovePage(FirstPage);
        //FirstPage.MovePage(FirstPage);
        //var move=new MovePage;
        //move.MovePage(FirstPage);
        var sky = this.createBitmapByName("dawn_jpg");
        FirstPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, Width, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        FirstPage.addChild(topMask);
        var icon = this.createBitmapByName("head_jpg");
        icon.x = 20;
        icon.y = 45;
        icon.$setScaleX(0.4);
        icon.$setScaleY(0.4);
        icon.$alpha = 1;
        egret.Tween.get(icon).to({ alpha: 0 }, 200).wait(300).to({ alpha: 1 }, 200);
        var offsetX = 0;
        var offsetY = 0;
        icon.$touchEnabled = true;
        icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        icon.addEventListener(egret.TouchEvent.TOUCH_END, endMove, this);
        function startMove(e) {
            offsetX = e.stageX - icon.x;
            offsetY = e.stageY - icon.x;
            this.addChild(icon);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function endMove() {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(e) {
            icon.x = e.stageX - offsetX;
            icon.y = e.stageY - offsetY;
        }
        FirstPage.addChild(icon);
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 220;
        line.y = 61;
        FirstPage.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = Width - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "14081202";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        FirstPage.addChild(colorLabel);
        var textfield = new egret.TextField();
        FirstPage.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = Width - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var label = new egret.TextField();
        FirstPage.addChild(label);
        label.x = 48;
        label.y = 240;
        label.width = 800;
        label.height = 800;
        label.textColor = 0xFFFFFF;
        label.size = 54;
        label.bold = true;
        label.italic = true;
        label.fontFamily = "Microsoft YaHei";
        label.text = "个\n\n\n          人\n\n\n                    简\n\n\n                              历";
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
    };
    return FirstPage;
}(Pages));
egret.registerClass(FirstPage,'FirstPage');
//# sourceMappingURL=FirstPage.js.map