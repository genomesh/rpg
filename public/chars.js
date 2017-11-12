function huntress () {
  let obj = char();
  obj.pierce = 0;
  obj.arrows = [],
  obj.update = function () {
    if (this.immunity == 0) {
      for (let i = 0; i<mobs.length;i++) {
        if (checkTouching(this,mobs[i])) {
          this.chp -= mobs[i].onhitdmg;
          this.immunity = 40;
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
    this.arrows.push(arrow(this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.pierce,this.basic.dmg));
  }
  obj.estart = function () {console.log('E attack')}
  return obj;
}

function senshi () {
  let obj = char();
  obj.swingRad = 1;
  obj.swingrange = 100;
  this.startRad = 0;
  this.endRad = 0;
  obj.bstart = function () {
    this.startRad = pointto(this,mouse) - this.swingRad/2;
    //console.log(pointto(this,mouse));
    this.endRad = pointto(this,mouse) + this.swingRad/2;
    this.basic.currently = true; //add with animation
  }
  obj.bcont = function () {
    for (let i = 0; i<mobs.length; i++) {
      if (this.startRad < pointto(this, mobs[i]) &&
          this.endRad > pointto(this, mobs[i]) &&
          this.swingrange + mobs[i].w/2 > distBetween(this,mobs[i])) {
            console.log('hit!')
            if (mobs[i].takeDmg(this.basic.dmg)) {
              mobs.splice(i,1);
              i -= 1;
            }
          }
    }
    this.basic.currently = false;
  };
  obj.estart = function() {
    console.log('e attack');
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.xp -= 100 + this.lvl * 20; this.lvl += 1} else {return}
    this.as = 20 - this.lvl;
    this.cmp = this.mmp;
    this.chp = this.mhp;
    if (this.lvl % 5 == 0 && this.swingrange < 200) {this.swingrange += 20;}
    if (this.as < 10) this.as = 10;
    this.lvlup();
  };
  obj.update = function () {
    if (this.immunity == 0) {
      for (let i = 0; i<mobs.length;i++) {
        if (checkTouching(this,mobs[i])) {
          this.chp -= mobs[i].onhitdmg;
          this.immunity = 40;
          break;
        }
      }
    } else {this.immunity -= 1;}
    if (this.chp < 1) {this.death();}
    this.move();
    this.attack();
    this.draw();
  };
  return obj;
}
