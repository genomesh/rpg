const ingame = {
  bg : document.getElementById('darkbackgroundtile'),
  bgw : 80,
  update : function () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.drawbg();
    for (let i = 0; i < mobs.length; i++) {mobs[i].update()}
    user.update();
  },
  drawbg : function () {
    for (let i = -1; i < canvas.width/this.bgw + 1; i++) {
      for (let j = -1; j < canvas.height/this.bgw + 1; j++) {
        let x = user.pos[0] % this.bgw;
        let y = user.pos[1] % this.bgw;
        ctx.drawImage(this.bg, this.bgw*i - x,this.bgw*j - y,this.bgw,this.bgw);
      }
    }
  }
}

function updateSlimeTest () {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(slimepics[slimetimer%7],0,0,96,96);
  ctx.drawImage(document.getElementById('slime'),96,0,48,48);
  slimetimer += 1;
}

const menu = {
  ib : 'button',
  sb : 'button',
  update : function () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.sb.update();
    this.ib.update();
  }
}

const charselect = {
  deab : 'button',
  thuldromb : 'button',
  senshib : 'button',
  update : function () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.deab.update();
    this.thuldromb.update();
    this.senshib.update();
  }
}

const instructions = {
  mb : 'button',
  update : function () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //startButton.update();
    ctx.font= "40px consolas";
    ctx.textBaseline = "hanging";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Welcome to Pandemonia',canvas.width/2,10);
    ctx.font= "20px consolas";
    ctx.fillText('You move by using WASD, and click to attack.',canvas.width/2,70);
    ctx.fillText('When you level up you unlock new skills,',canvas.width/2,100);
    ctx.fillText('which can be used with either the left shift or e key.',canvas.width/2,130);
    ctx.fillText('The current aim of the game is to kill the slime spawner.',canvas.width/2,160);
    this.mb.update();
  }
}
