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

function updateStats () {
  sctx.clearRect(0,0,stats.width,stats.height);
  sctx.fillStyle = 'black';
  sctx.fillRect(7,7,106, 26);
  sctx.fillRect(118,7,106, 26);
  sctx.fillRect(229,7,106, 26);
  sctx.fillStyle = 'red';
  sctx.fillRect(10,10,100*user.chp/user.mhp, 20);
  sctx.fillStyle = 'aqua';
  sctx.fillRect(121,10,100*user.cmp/user.mmp, 20);
  sctx.fillStyle = 'green';
  sctx.fillRect(232,10,100*user.xp/(100+20*user.lvl), 20);
  sctx.font= "26px consolas";
  sctx.textBaseline = "hanging";
  sctx.fillStyle = 'black';
  sctx.fillText("Level: " + user.lvl.toString(),343,12,300); //x,y,max w
}
