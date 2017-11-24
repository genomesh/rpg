function huntress () {
  let obj = char();
  obj.pierce = 0;
  obj.e.dmg = 30;
  obj.e.maxcd = 200;
  obj.basic.img = document.getElementById('arrow');
  obj.e.img = document.getElementById('gldarrow');
  obj.arrows = [],
  obj.update = function () {
    if (this.immunity == 0) {
      for (let i = 0; i<mobs.length;i++) {
        if (checkTouching(this,mobs[i])) {
          this.chp -= mobs[i].onhitdmg;
          this.immunity = 20;
          break;
        }
      }
    } else {this.immunity -= 1;}
    if (this.chp < 1) {this.death();}
    this.move();
    this.attack();
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].update();
      if (this.arrows[i].test()) {this.arrows.splice(i,1); i -= 1; break}
      if (this.arrows[i].timer == 0) { this.arrows.splice(i,1); i -=1; break}
    }
    this.draw();
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    this.cmp = this.mmp;
    this.chp = this.mhp;
    if (this.lvl % 5 == 0 && this.pierce < 6) {this.pierce += 1;}
    if (this.as < 10) this.as = 10;
    this.lvlup();
  };
  obj.bstart = function () {
    if (this.e.currently) {
      this.arrows.push(arrow(this.e.img,this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.pierce,this.basic.dmg + this.e.dmg));
      this.e.currently = false;
    } else {
      this.arrows.push(arrow(this.basic.img,this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.pierce,this.basic.dmg));
    }

  }
  obj.estart = function () {this.e.currently = true;}
  obj.econt = function () {}
  return obj;
}

function senshi () {
  let timg = document.getElementById('senshi')
  let obj = char();
  obj.mhp = 100;
  obj.basic.maxcd = 15;
  obj.chp = 100;
  obj.image = timg;
  obj.weapon = weapon('redkatana');
  obj.weapon.w = obj.weapon.image.width*3/10,
  obj.weapon.h = obj.weapon.image.height*3/10,
  obj.w = timg.width/10*2;
  obj.h = timg.height/10*2;
  this.startRad = 0;
  this.endRad = 0;
  obj.bstart = function() {this.basic.currently = true};
  obj.bcont = meleecont;
  obj.estart = function() {
    console.log('e attack');
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    this.cmp = this.mmp;
    this.chp = this.mhp;
    if (this.lvl % 5 == 0 && this.weapon.range < 200) {this.weapon.range += 20;}
    if (this.as < 10) this.as = 10;
    this.lvlup();
  };
  obj.update = function () {
    if (this.immunity == 0) {
      for (let i = 0; i<mobs.length;i++) {
        if (checkTouching(this,mobs[i])) {
          this.takeDmg(mobs[i].onhitdmg);
          break;
        }
      }
    } else {this.immunity -= 1;}
    if (this.chp < 1) {this.death();}
    this.move();
    this.attack();
    this.weapon.draw(pointto(this,mouse));
    this.draw();
  };
  return obj;
}

function thuldrom () {
  let timg = document.getElementById('thuldrom');
  let obj = char();
  obj.basic.maxcd = 25;
  obj.mhp = 150;
  obj.chp = 150;
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
    this.cmp = this.mmp;
    this.chp = this.mhp;
    if (this.lvl % 5 == 0 && this.weapon.range < 200) {this.weapon.range += 20;}
    if (this.mhp < 250) this.mhp += 10;
    this.lvlup();
  };
  obj.update = function () {
    this.move();
    this.attack();
    if (this.immunity == 0) {
      for (let i = 0; i<mobs.length;i++) {
        if (checkTouching(this,mobs[i])) {
          this.takeDmg(mobs[i].onhitdmg);
          break;
        }
      }
    } else {this.immunity -= 1;}
    if (this.chp < 1) {this.death();}
    this.weapon.draw(pointto(this,mouse));
    this.draw();
  };
  return obj;
}
