let sctx;
function createStats () {
  stats = document.createElement('canvas');
  stats.height = 125;
  stats.width = 800;
  stats.className = 'stats';
  stats.id = 'stats';
  sctx = stats.getContext('2d');
  sctx.textBaseline = "hanging";
  sctx.textAlign = "center";
  document.getElementById('gameArea').insertBefore(stats, document.getElementById('gameArea').childNodes[0]);
  window.setInterval(updateStats,25);
}

function bar (x,y,w,h,c) {
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

function cdbar (x,y,w,h,c,t) {
  let obj = bar(x,y,w,h,c);
  obj.text = t;
  obj.font = "16px consolas";
  obj.fontc = 'black';
  obj.draw = function () {
    sctx.fillStyle = this.bc;
    sctx.fillRect(this.x-3,this.y-3,this.w+6,this.h+6);
    sctx.fillStyle = this.fc;
    sctx.fillRect(this.x,this.y+this.h,this.w,-this.h*this.getVal());
    if (this.img) {sctx.drawImage(this.img,this.x+2.5,this.y+2.5,45,45)}
    sctx.font=this.font;
    sctx.fillStyle = this.fontc;
    sctx.fillText(this.text,this.x+this.w/2,this.y+this.h+5,this.w);
  }
  return obj;
}

let hpbar = bar(10,10,100,20,'red');
hpbar.getVal = () => user.hp.c/user.hp.m;
let mpbar = bar(10,40,100,20,'aqua');
mpbar.getVal = () => user.mp.c/user.mp.m;
let xpbar = bar(10,70,100,20,'green');
xpbar.getVal = () => user.xp/(100+20*user.lvl);

let ecd = cdbar(150,35,50,50,'lightgrey','e');
let lscd = cdbar(210,35,50,50,'lightgrey','shift');

ecd.getVal = () => {
  if (user.e.learned) {
    return user.e.cd/user.e.maxcd
  } else {
    return 0;
  }
}

lscd.getVal = () => {
  if (user.ls.learned) {
    return user.ls.cd/user.ls.maxcd
  } else {
    return 0;
  }
}

function updateStats () {
  if (user.e.learned && user.e.cdimg) {ecd.img = user.e.cdimg;}
  if (user.ls.learned && user.ls.cdimg) {lscd.img = user.ls.cdimg;}
  sctx.clearRect(0,0,stats.width,stats.height);
  hpbar.draw();
  mpbar.draw();
  xpbar.draw();
  ecd.draw();
  lscd.draw();
  sctx.font= "26px consolas";
  sctx.fillStyle = "black";
  sctx.fillText("Level: " + user.lvl.toString(),343,12,300);
}
