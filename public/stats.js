let sctx;
function createStats () {
  stats = document.createElement('canvas');
  stats.height = 125;
  stats.width = 800;
  stats.className = 'stats';
  stats.id = 'stats';
  sctx = stats.getContext('2d');
  document.getElementById('gameArea').insertBefore(stats, document.getElementById('gameArea').childNodes[0]);
  sctx.fillStyle = 'lightgrey';
  sctx.fillRect(0,0,stats.width,stats.height);
  window.setInterval(updateStats,25);
}

function display (x,y,w,h,c) {
  return {
    x : x,
    y : y,
    w : w,
    h : h,
    bc : 'black',
    fc : c,
    draw : function () {
      sctx.fillStyle = this.bc;
      sctx.fillRect(this.x-3,this.y-3,this.w+6,this.h+6);
      sctx.fillStyle = this.fc;
      sctx.fillRect(this.x,this.y,this.w*this.getVal(),this.h);
    }
  }
}

let hpbar = display(10,10,100,20,'red');
hpbar.getVal = () => user.chp/user.mhp;
let mpbar = display(10,40,100,20,'aqua');
mpbar.getVal = () => user.cmp/user.mmp;
let xpbar = display(10,70,100,20,'green');
xpbar.getVal = () => user.xp/(100+20*user.lvl);

let ecd = display(150,35,50,50,'lightgrey');
ecd.getVal = () => {
  if (user.e.learned) {
    return user.e.cd/user.e.maxcd
  } else {
    return 0;
  }
}
ecd.img = document.getElementById('gldarrowcd');
ecd.draw = function () {
  sctx.fillStyle = this.bc;
  sctx.fillRect(this.x-3,this.y-3,this.w+6,this.h+6);
  sctx.fillStyle = this.fc;
  sctx.fillRect(this.x,this.y+this.h,this.w,-this.h*this.getVal());
  sctx.drawImage(this.img,this.x+2.5,this.y+2.5,45,45)
}

/*
ecd.draw = function () {
  sctx.fillStyle = this.bc;
  sctx.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  sctx.fillStyle = this.fc;

  sctx.beginPath();
  //sctx.arc(this.x,this.y,this.w*0.45,this.getVal*Math.PI*2,Math.PI*2);
  sctx.arc(this.x,this.y,this.w*0.4,1,Math.PI*2,false);
  sctx.lineTo(this.x,this.y);
  sctx.fill();
  sctx.closePath()

}*/

function updateStats () {
  sctx.clearRect(0,0,stats.width,stats.height);
  hpbar.draw();
  mpbar.draw();
  xpbar.draw();
  ecd.draw();
  sctx.fillStyle = 'blue';
  sctx.font= "26px consolas";
  sctx.textBaseline = "hanging";
  sctx.fillStyle = "black";
  sctx.fillText("Level: " + user.lvl.toString(),343,12,300);
}
