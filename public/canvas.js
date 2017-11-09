let canvas, ctx, mouse, spawntimer;

function createCanvas () {
  canvas = document.createElement('canvas');
  canvas.height = 500;
  canvas.width = 800;
  canvas.keys = [];
  mouse = {
    pos : [0,0]
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
  spawntimer += 1;
  if (spawntimer % 30 == 0) {mobs.push(slime())}
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < mobs.length; i++) {mobs[i].update()}
  user.update();
}

function updateMousePos (c, e) {
  var rect = c.getBoundingClientRect();
  mouse.pos[0] = e.clientX - rect.left;
  mouse.pos[1] = e.clientY - rect.top
}
