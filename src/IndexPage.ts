 class IndexPage extends Pages {

    public constructor()
    {
        super();
    }
   private music:egret.Bitmap;
   private _sound: egret.Sound;
   private _channel: egret.SoundChannel;
   private _pauseTime: number = 0;

   private loadSound(): void {
        var sound: egret.Sound = new egret.Sound();
        //sound 加载完成监听
        this._sound =sound=RES.getRes("Fade_mp3");
        this._channel=sound.play(0,0);
        
        var Anim_point =0;//定义按钮模式
        this.music= this.createBitmapByName("music1_jpg");
        this.music.x = 20+this.music.width/2;
        this.music.y = 45+this.music.height/2;
        this.music.scaleX=0.4;
        this.music.scaleY=0.4;
        this.music.$alpha=1;
        changeanchor(this.music);
        this.addChild(this.music);
        this.music.touchEnabled = true;
        //stop
        this.music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
        function changeanchor(icon:egret.Bitmap):void {
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;//改变锚点位置
        }      
        function changeAnim(e: egret.TouchEvent): void {
            Anim_point = (Anim_point + 1 ) % 2;
            switch (Anim_point) {
                case 0 : 
                    this._channel=this._sound.play(this._pauseTime,0);
                    break;
                case 1 :
                    this._pauseTime = this._channel.position; 
                    this._channel.stop();
                    this._channel = null;
                    break;
        } 
    }
}
    public Creat(Width:number,Hight:number){
 /**  
     * 创建主页
     * Create a game scene
     */
        var IndexPage=new Pages();
        IndexPage.y=0;
        IndexPage.width=Width;
        IndexPage.height=Hight;
        this.addChild(IndexPage);
        //MovePage(index);
        //IndexPage.MovePage(IndexPage);
        //var move=new MovePage;
        //move.MovePage(IndexPage);

        var sky:egret.Bitmap = this.createBitmapByName("earth_jpg");
        IndexPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;
        
        this.loadSound();
    }
 }