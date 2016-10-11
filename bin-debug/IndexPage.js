var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        _super.call(this);
        this._pauseTime = 30;
    }
    var d = __define,c=IndexPage,p=c.prototype;
    p.loadSound = function () {
        var sound = this._sound = new egret.Sound();
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.init();
        }, this);
        sound.load("resource/assets/Fade.mp3");
    };
    p.setAllAbled = function (isPlaying) {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
    };
    p.setTextAbled = function (text, touchEnabled) {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    };
    //播放
    p.play = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
    };
    //停止
    p.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    p.onComplete = function (e) {
        console.log("播放完成");
        this.stop();
        this.setAllAbled(false);
        this.setProgress(0);
    };
    //更新进度
    p.onTimeUpdate = function (e) {
        var position = this._channel ? this._channel.position : 0;
        this.setProgress(position);
    };
    p.setProgress = function (position) {
        this._updateTxt.text = position.toFixed(1) + "/" + this._sound.length.toFixed(1);
        var w = (position / this._sound.length) * 400;
        this._bar.x = w + this.stage.stageWidth / 2 - 200;
        var mask = this._progress.mask || new egret.Rectangle(0, 0, 0, 60);
        mask.x = w;
        mask.width = 400 - w;
        this._progress.mask = mask;
    };
    p.Creat = function (Width, Hight) {
        /**
            * 创建主页
            * Create a game scene
            */
        var IndexPage = new Pages();
        IndexPage.y = 0;
        IndexPage.width = Width;
        IndexPage.height = Hight;
        this.addChild(IndexPage);
        //MovePage(index);
        //IndexPage.MovePage(IndexPage);
        //var move=new MovePage;
        //move.MovePage(IndexPage);
        var sky = this.createBitmapByName("earth_jpg");
        IndexPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;
        /* var bgmusic=new Music();
         bgmusic.x=150;
         bgmusic.y=900;
         bgmusic.scaleX=0.4;
         bgmusic.scaleY=0.4;
         IndexPage.addChild(bgmusic);
 */
        var music = this.createBitmapByName("music1_jpg");
        music.x = 20;
        music.y = 45;
        music.scaleX = 0.4;
        music.scaleY = 0.4;
        music.$alpha = 1;
        this.addChild(music);
        var playTxt = new egret.TextField();
        playTxt.text = "播放";
        playTxt.size = 60;
        playTxt.x = 80;
        playTxt.y = 400;
        playTxt.touchEnabled = true;
        //music.touchEnabled=true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.play();
            this.setAllAbled(true);
        }, this);
        this.addChild(playTxt);
        //stop
        var stopTxt = new egret.TextField();
        stopTxt.text = "停止";
        stopTxt.size = 60;
        stopTxt.x = playTxt.x + 180 * 1;
        stopTxt.y = 400;
        stopTxt.touchEnabled = true;
        stopTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = 0;
                this.stop();
                this.onTimeUpdate();
            }
            this.setAllAbled(false);
        }, this);
        this.addChild(stopTxt);
        //pause 
        var pauseTxt = new egret.TextField();
        pauseTxt.text = "暂停";
        pauseTxt.size = 60;
        pauseTxt.x = playTxt.x + 180 * 2;
        pauseTxt.y = 400;
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = this._channel.position;
                this.stop();
            }
        }, this);
        this.addChild(pauseTxt);
    };
    return IndexPage;
}(Pages));
egret.registerClass(IndexPage,'IndexPage');
//# sourceMappingURL=IndexPage.js.map