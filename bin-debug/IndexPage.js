var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        _super.call(this);
        this._pauseTime = 30;
    }
    var d = __define,c=IndexPage,p=c.prototype;
    p.loadSound = function () {
        var sound = new egret.Sound();
        //sound 加载完成监听
        this._sound = sound = RES.getRes("Fade_mp3");
        this._channel = sound.play(0, 0);
        var Anim_point = 0; //定义按钮模式
        var stop_time = 0;
        this.music = this.createBitmapByName("music1_jpg");
        this.music.x = 20 + this.music.width / 2;
        this.music.y = 45 + this.music.height / 2;
        this.music.scaleX = 0.4;
        this.music.scaleY = 0.4;
        this.music.$alpha = 1;
        changeanchor(this.music);
        this.addChild(this.music);
        this.music.touchEnabled = true;
        //stop
        this.music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
        function changeanchor(icon) {
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2; //改变锚点位置
        }
        function changeAnim(e) {
            Anim_point = (Anim_point + 1) % 2;
            switch (Anim_point) {
                case 0:
                    this._channel = this._sound.play(stop_time, 0);
                    break;
                case 1:
                    stop_time = this._channel.position;
                    this._channel.stop();
                    this._channel = null;
                    break;
            }
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
        this.music.touchEnabled = false;
        //this.setProgress(0);
    };
    //更新进度
    p.onTimeUpdate = function (e) {
        var position = this._channel ? this._channel.position : 0;
        //this.setProgress(position);
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
        this.loadSound();
    };
    return IndexPage;
}(Pages));
egret.registerClass(IndexPage,'IndexPage');
//# sourceMappingURL=IndexPage.js.map