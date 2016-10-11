var MovePage = (function () {
    function MovePage() {
        //private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
        this._distance = 0; //鼠标点击时，鼠标全局坐标与_bird的位置差
    }
    var d = __define,c=MovePage,p=c.prototype;
    p.MovePage = function (e) {
        //this.page=e;
        e.touchEnabled = true;
        e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, mouseDown, e);
        e.addEventListener(egret.TouchEvent.TOUCH_END, mouseUp, e);
        function mouseDown(evt) {
            console.log("Mouse Down.");
            e.touchEnabled = true;
            //this._distance.x = evt.stageX - this.x;
            this._distance = evt.stageY - e.y;
            e.addEventListener(egret.TouchEvent.TOUCH_MOVE, mouseMove, e);
        }
        function mouseMove(evt) {
            if (e.touchEnabled) {
                console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]");
                e.y = evt.stageY - this._distance;
                //if( e.y > 0){
                //        e.parent.swapChildrenAt(0,1);//缺点：只能识别一次，标志位也不行，多次抖动会打乱节奏先不实用
                //}
                if (e.y < -400) {
                    egret.Tween.get(e).to({ x: 0, y: -1136 }, 350, egret.Ease.sineIn)
                        .call(down).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                    e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, mouseMove, e);
                }
                if (e.y > 400) {
                    egret.Tween.get(e).to({ x: 0, y: 1136 }, 350, egret.Ease.sineIn)
                        .call(down).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                    e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, mouseMove, e);
                }
            }
            function down() {
                e.parent.setChildIndex(e, 0);
            } //容器深度置下  
            //function up():void {
            //     e.parent.swapChildrenAt(2,1);
            //}//调整下面两层的深度           
        }
        function mouseUp(evt) {
            console.log("Mouse Up.");
            this._touchStatus = false;
            if (e.y >= -400 || e.y <= 400) {
                // egret.Tween.get( this ).to( {x:0,y:0}, 250, egret.Ease.sineIn );
                egret.Tween.get(e).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
            }
            e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, mouseMove, e);
        }
    };
    return MovePage;
}());
egret.registerClass(MovePage,'MovePage');
//# sourceMappingURL=MovePage.js.map