let user, mobs, slimepics, slimetimer, currentScreen

function startGame () {
  spawntimer = 0;
  bullets = [];
  mobs = [];
  mobs[0] = blooper();
  mobs[0].pos = [650,650];
  mobs[1] = goblinarcher();
  mobs[1].pos = [800,500];
  mobs[2] = goblinarcher();
  mobs[2].pos = [800,800];
  mobs[3] = goblinarcher();
  mobs[3].pos = [500,500];
  mobs[4] = goblinarcher();
  mobs[4].pos = [500,800];
  currentScreen = 'ingame';
}

function init () {
  slimetimer = 0;
  currentScreen = 'inmenu';
  slimepics = [
    document.getElementById('s1'),
    document.getElementById('s2'),
    document.getElementById('s3'),
    document.getElementById('s4'),
    document.getElementById('s5'),
    document.getElementById('s6'),
    document.getElementById('s7')
  ];
  spawntimer = 0;
  bullets = [];
  mobs = [];
  user = char();
  createStats();
  createCanvas();
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

function death () {
  currentScreen = 'inmenu';
}

function distBetween (o1,o2) {
  let xd = o1.pos[0] - o2.pos[0];
  let yd = o1.pos[1] - o2.pos[1];
  return Math.hypot(xd,yd)
}
