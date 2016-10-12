var SecondPage = (function (_super) {
    __extends(SecondPage, _super);
    function SecondPage() {
        _super.call(this);
    }
    var d = __define,c=SecondPage,p=c.prototype;
    p.Creat = function (Width, Hight) {
        /**
             * 创建第二页面
             * Create a game scene
             */
        var SecondPage = new Pages();
        SecondPage.y = 0;
        SecondPage.width = Width;
        SecondPage.height = Hight;
        this.addChild(SecondPage);
        //MovePage(SecondPage);
        //SecondPage.MovePage(SecondPage);
        //var move=new MovePage;
        //move.MovePage(SecondPage);
        var sky = this.createBitmapByName("stara_jpg");
        SecondPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, Width, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        SecondPage.addChild(topMask);
        var icon = this.createBitmapByName("eye_jpg");
        icon.x = 20;
        icon.y = 45;
        icon.$setScaleX(0.45);
        icon.$setScaleY(0.45);
        var offsetX = 0;
        var offsetY = 0;
        icon.$touchEnabled = true;
        icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        icon.addEventListener(egret.TouchEvent.TOUCH_END, endMove, this);
        SecondPage.addChild(icon);
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
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
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
        var label = new egret.TextField();
        SecondPage.addChild(label);
        label.x = 48;
        label.y = 300;
        label.width = 500;
        label.height = 500;
        label.textColor = 0xFFFFFF;
        label.fontFamily = "KaiTi";
        label.text = "姓名：王恒尊\n\n学号：14081202\n\n专业：数字媒体技术\n\n爱好：小说，音乐，游戏\n\n属性：宅\n\nQ Q：982049377\n\n微信：Monologue_whz\n\n目标：学好编程";
        label.alpha = 0;
        var LogoField = new egret.DisplayObjectContainer;
        LogoField.width = 500;
        LogoField.height = 500;
        LogoField.x = 450;
        LogoField.y = 500;
        SecondPage.addChild(LogoField);
        var logo = this.createBitmapByName("logo_png");
        logo.x = logo.width / 2 - 75;
        logo.y = logo.height / 2 - 100;
        this.changeanchor(logo);
        logo.$setScaleX(0.8);
        logo.$setScaleY(0.8);
        LogoField.addChild(logo);
        var logotxt = new egret.TextField();
        LogoField.addChild(logotxt);
        logotxt.x = 10;
        logotxt.y = 20;
        logotxt.width = 400;
        logotxt.height = 400;
        logotxt.textColor = 0xFFFF00;
        logotxt.fontFamily = "KaiTi";
        logotxt.text = "Touch";
        logotxt.strokeColor = 0x0000ff;
        logotxt.stroke = 2;
        logotxt.size = 40;
        var alphatimer = new egret.Timer(2000, 0);
        //注册事件侦听器
        alphatimer.addEventListener(egret.TimerEvent.TIMER, changealpha, this);
        alphatimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { }, this);
        //开始计时
        alphatimer.start();
        logo.$touchEnabled = true;
        var logoStatus = 1;
        logo.addEventListener(egret.TouchEvent.TOUCH_TAP, click, this);
        function changealpha() {
            var labeltw = egret.Tween.get(logotxt);
            labeltw.to({ "alpha": 0 }, 600).to({ "alpha": 1 }, 600, egret.Ease.sineIn).wait(1000);
        }
        function click() {
            var status = (logoStatus + 1) % 2;
            switch (status) {
                case 0:
                    egret.Tween.get(label).to({ "alpha": 1 }, 300, egret.Ease.sineIn);
                    alphatimer.removeEventListener(egret.TimerEvent.TIMER, changealpha, this);
                    alphatimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { }, this);
                    logoStatus = 0;
                    logotxt.alpha = 0;
                    break;
                case 1:
                    egret.Tween.get(logotxt).to({ "alpha": 1 }, 300, egret.Ease.sineIn);
                    egret.Tween.get(label).to({ "alpha": 0 }, 300, egret.Ease.sineIn);
                    alphatimer.addEventListener(egret.TimerEvent.TIMER, changealpha, this);
                    alphatimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { }, this);
                    alphatimer.start();
                    logoStatus = 1;
                    break;
            }
        }
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
    };
    return SecondPage;
}(Pages));
egret.registerClass(SecondPage,'SecondPage');
//# sourceMappingURL=SecondPage.js.map