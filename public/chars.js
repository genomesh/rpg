function huntress () {
  let obj = char();
  obj.basic.pierce = 0;
  obj.colour = 'white';
  obj.spritesheet = document.getElementById('huntressSS');
  obj.e.learned = true;
  obj.e.dmg = 30;
  obj.e.cdimg = document.getElementById('gldarrowcd');
  obj.e.pierce = 2;
  obj.e.maxcd = 200;
  obj.e.cost = 30;
  obj.e.img = document.getElementById('gldarrow');
  obj.ls.cdimg = document.getElementById('divineicd');
  obj.ls.maxcd = 200;
  obj.ls.cost = 50;
  obj.ls.timer = 50;
  obj.basic.img = document.getElementById('arrow');
  obj.arrows = [],
  obj.update = function () {
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].update();
      if (this.arrows[i].test()) {this.arrows.splice(i,1); i -= 1; break}
      if (this.arrows[i].timer == 0) { this.arrows.splice(i,1); i -=1; break}
    }
    this.bupdate();
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    this.mp.c = this.mp.m;
    this.hp.c = this.hp.m;
    if (this.lvl % 5 == 0 && this.basic.pierce < 6) {this.basic.pierce += 1;}
    if (this.lvl == 5) this.ls.learned = true;
    if (this.as < 10) this.as = 10;
    this.lvlup();
  };
  obj.bstart = function () {
    if (this.ls.currently == false) {
      if (this.e.currently) {
        this.arrows.push(arrow(this.e.img,this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.basic.pierce+this.e.pierce,this.basic.dmg + this.e.dmg));
        this.e.currently = false;
      } else {
        this.arrows.push(arrow(this.basic.img,this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.basic.pierce,this.basic.dmg));
      }
    }
  }
  obj.estart = function () {this.e.currently = true;}
  obj.econt = function () {this.e.cd = this.e.maxcd}
  obj.lsstart = function () {this.ls.currently = true;this.immunity = 10;this.colour = 'gold';this.ls.ctimer = this.ls.timer}
  obj.lscont = function () {
    this.ls.ctimer -= 1;
    this.ls.cd = this.ls.maxcd;
    this.immunity = 10;
    this.vel = [0,0];
    if (this.ls.ctimer === 0) {this.ls.ctimer = this.ls.timer; this.ls.currently = false; this.colour = 'white';}
  }
  return obj;
}

function senshi () {
  let timg = document.getElementById('senshi')
  let obj = char();
  obj.hp.m = 100;
  obj.basic.maxcd = 20;
  obj.basic.dmg = 15;
  obj.hp.c = 100;
  obj.image = timg;
  obj.weapon = weapon('redkatana');
  obj.weapon.w = obj.weapon.image.width*3/10;
  obj.weapon.h = obj.weapon.image.height*3/10;
  obj.e.learned = true;
  obj.e.cdimg = document.getElementById('dragonstrikecd');
  obj.e.maxcd = 125;
  obj.e.dmg = 20;
  obj.e.cost = 50;
  obj.w = timg.width/10*2;
  obj.h = timg.height/10*2;
  this.startRad = 0;
  this.endRad = 0;
  obj.bstart = function() {this.basic.currently = true};
  obj.bcont = meleecont;
  obj.estart = function() {
    this.basic.cd = 0;
    this.basic.bonus = 20;
    this.weapon.frame = 0;
    this.e.cd = this.e.maxcd;
  };
  obj.econt = function () {}
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    this.mp.c = this.mp.m;
    this.hp.c = this.hp.m;
    if (this.lvl % 5 == 0 && this.weapon.range < 200) {this.weapon.range += 20;}
    if (this.as < 10) this.as = 10;
    this.lvlup();
  };
  obj.update = function () {
    this.weapon.draw(pointto(this,mouse));
    this.bupdate();
  };
  return obj;
}

function thuldrom () {
  let timg = document.getElementById('thuldrom');
  let obj = char();
  obj.basic.maxcd = 40;
  obj.basic.dmg = 25;
  obj.hp.m = 150;
  obj.hp.c = 150;
  obj.image = timg;
  obj.weapon = weapon('hammer');
  obj.w = timg.width/10*4;
  obj.h = timg.height/10*4;
  this.startRad = 0;
  this.endRad = 0;
  obj.bstart = obj.bstart = function() {this.basic.currently = true};
  obj.bcont = meleecont;
  obj.estart = function() {
    console.log('e attack');
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    if (this.lvl % 5 == 0 && this.weapon.range < 200) {this.weapon.range += 20;}
    if (this.hp.m < 250) this.hp.m += 10;
    if (this.hp.regen < 16) this.hp.regen += 2;
    this.mp.c = this.mp.m;
    this.hp.c = this.hp.m;
    this.lvlup();
  };
  obj.update = function () {
    this.weapon.draw(pointto(this,mouse));
    this.bupdate();
  };
  return obj;
}
