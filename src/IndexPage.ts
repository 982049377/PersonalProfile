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
        this._sound =sound=RES.getRes("faded_mp3");
        this._channel=sound.play(0,0);
        
        var Anim_point =0;//定义按钮模式

        this.music= this.createBitmapByName("music_png");
        this.music.x = this.music.width/2-5;
        this.music.y = 150+this.music.height/2;
        this.music.scaleX=0.4;
        this.music.scaleY=0.4;
        this.music.$alpha=0.8;
        this.changeanchor(this.music);
        this.music.touchEnabled = true;
        //stop
        this.music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
       
        var Sizetimer:egret.Timer = new egret.Timer(3000,0);
        //注册事件侦听器
        Sizetimer.addEventListener(egret.TimerEvent.TIMER,ChangeSizeByself,this);
        Sizetimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{ },this);
        //开始计时
      //  ChangeSizeByself();
       egret.Tween.get(this.music).to({scaleX:0.3,scaleY:0.3},1000, egret.Ease.sineIn)
                .wait(500).to({scaleX:0.7,scaleY:0.7},1000, egret.Ease.sineIn).wait(500);//进行第一次播放
        Sizetimer.start();

        var rotationtimer:egret.Timer = new egret.Timer(30,0);
        //注册事件侦听器
        rotationtimer.addEventListener(egret.TimerEvent.TIMER,()=>{this.music.rotation += 0.2;},this);
        rotationtimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{ },this);
        //开始计时
        rotationtimer.start();

      
        this.addChild(this.music);

           
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
        function  ChangeSizeByself():void{
            //this.music=e;
            egret.Tween.get(this.music).to({scaleX:0.3,scaleY:0.3},1000, egret.Ease.sineIn)
                .wait(500).to({scaleX:0.7,scaleY:0.7},1000, egret.Ease.sineIn).wait(500);
            //RotationByself(e);
            //console.log("12315664654899498498");
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

        var sky:egret.Bitmap = this.createBitmapByName("bg_jpeg");
        IndexPage.addChild(sky);
        sky.width = Width;
        sky.height = Hight;

        this.loadSound();

        var name:egret.Bitmap = this.createBitmapByName("name_png");
        this.changeanchor(name);
        name.scaleX=0.5;
        name.scaleY=0.5;
        name.x=320;
        name.y=900;
        IndexPage.addChild(name);
        
    }
 }