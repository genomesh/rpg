let canvas, ctx, mouse;

function createCanvas () {
  canvas = document.createElement('canvas');
  canvas.height = 500;
  canvas.width = 800;
  canvas.keys = [];
  menu.sb = button(canvas.width/2,50,canvas.width/2,50, () => currentScreen = 'charselect');
  instructions.mb = button(canvas.width/2,250,canvas.width/3,50, () => currentScreen = 'inmenu');
  menu.ib = button(canvas.width/2,150,canvas.width/2,50, () => currentScreen = 'instructions');
  charselect.deab = button(canvas.width/4,150,canvas.width/6,150, () => {user = huntress();startGame()});
  charselect.thuldromb = button(canvas.width/2,150,canvas.width/6,150, () => {user = thuldrom();startGame()});
  charselect.senshib = button(canvas.width*3/4,150,canvas.width/6,150, () => {user = senshi();startGame()});
  charselect.deab.text = 'D';
  charselect.thuldromb.text = 'T';
  charselect.senshib.text = 'S';
  menu.sb.text = 'Play';
  instructions.mb.text = 'Back to Menu';
  menu.ib.text = 'Instructions';
  mouse = {
    pos : [0,0],
    w : 0,
    h : 0
  }
  ctx = canvas.getContext('2d');
  document.getElementById('gameArea').insertBefore(canvas, document.getElementById('gameArea').childNodes[0]);
  console.log('setup complete');
  ctx.fillStyle = 'lightgrey';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  window.setInterval(updateCanvas,25);
  window.addEventListener('keydown', function (e) {
    canvas.keys[e.keyCode] = true;
  })
  window.addEventListener('keyup', function (e) {
    canvas.keys[e.keyCode] = false;
  })
  canvas.addEventListener('mousemove', function (e) {
    updateMousePos(canvas, e);
  })
  canvas.addEventListener('mousedown', function (e) {
    mouse.down = true;
  })
  canvas.addEventListener('mouseup', function (e) {
    mouse.down = false;
  })
}

function updateCanvas () {
  if (currentScreen === 'instructions') {
    instructions.update();
  } if (currentScreen === 'ingame') {
    ingame.update();
  } if (currentScreen === 'inmenu') {
    menu.update();
  } if (currentScreen === 'charselect') {
    charselect.update();
  }
}

function button (x,y,w,h, onclick) {
  return {
    pos : [x,y],
    w : w,
    h : h,
    onClick : onclick,
    c1 : 'grey',
    c2 : 'lightgrey',
    colour : 'grey',
    onHover : function () {
      this.colour = this.c2;
      if (mouse.down) {
        this.onClick();
      }
    },
    offHover : function () {
      this.colour = this.c1;
    },
    update : function () {
      if (checkTouching(this,mouse)) {
        this.onHover();
      } else {
        this.offHover();
      }
      this.draw();
    },
    draw : function () {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.pos[0]-this.w/2,this.pos[1]-this.h/2,this.w,this.h);
      if (this.text) {
        ctx.font= (this.h*2/3).toString() + "px consolas";
        ctx.textBaseline = "hanging";
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(this.text,this.pos[0],this.pos[1]-this.h/3);
      }
    }
  }
}

function updateMousePos (c, e) {
  var rect = c.getBoundingClientRect();
  if (currentScreen === 'ingame') {
    mouse.pos[0] = user.pos[0] -canvas.width/2+ e.clientX - rect.left;
    mouse.pos[1] = user.pos[1] -canvas.height/2 + e.clientY - rect.top
  } else {
    mouse.pos[0] = e.clientX - rect.left;
    mouse.pos[1] = e.clientY - rect.top
  }
}

function draw () {
  this.dpos[0] = canvas.width/2 - user.pos[0] + this.pos[0];
  this.dpos[1] = canvas.height/2 - user.pos[1] + this.pos[1];
  if (this.currentDelay > 0) {
    if (this.dimage) {
      ctx.drawImage(this.dimage,this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
    } else {
      ctx.fillStyle = this.dcolour;
      ctx.fillRect(this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
    }
    this.currentDelay -= 1;
  } else {
    if (this.image) {
      ctx.drawImage(this.image,this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
    } else {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
    }
  }
}
