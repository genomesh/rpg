let user, mobs

function init () {
  spawntimer = 0;
  bullets = [];
  mobs = [];
  user = senshi();
  createStats();
  createCanvas();
  mobs[0] = blooper();
  mobs[0].pos = [canvas.width/4,canvas.height*3/4];
  mobs[1] = blooper();
  mobs[1].pos = [canvas.width/4,canvas.height/4];
  mobs[2] = blooper();
  mobs[2].pos = [canvas.width*3/4,canvas.height/4];
  console.log('init completed');
}

function pointto (o1,o2) {
  let xdif = o2.pos[0]-o1.pos[0];
  let ydif = o2.pos[1]-o1.pos[1];
  return Math.atan2(ydif,xdif);
}

let checkTouching = function (o1,o2) {
  if (o1.pos[0]-o1.w/2>o2.pos[0]+o2.w/2 || o1.pos[0]+o1.w/2<o2.pos[0]-o2.w/2 ||
    o1.pos[1]-o1.h/2>o2.pos[1]+o2.h/2 || o1.pos[1]+o1.h/2<o2.pos[1]-o2.h/2) {
      return false;
  } else {
    return true;
  }
}

function distBetween (o1,o2) {
  let xd = o1.pos[0] - o2.pos[0];
  let yd = o1.pos[1] - o2.pos[1];
  return Math.hypot(xd,yd)
}
