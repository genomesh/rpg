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
    this.shoot();
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].update();
      if (this.arrows[i].test()) {this.arrows.splice(i,1); i -= 1; break}
      if (this.arrows[i].timer == 0) { this.arrows.splice(i,1); i -=1; break}
    }
    this.draw();
  };
  obj.lvlup = function () {
    if (this.xp > 100 + this.lvl * 20) {this.lvl += 1; this.xp -= 100 + this.lvl * 20;} else {return}
    this.as = 20 - this.lvl;
    this.cmp = this.mmp;
    this.chp = this.mhp;
    if (this.lvl % 5 == 0 && this.pierce < 6) {this.pierce += 1;}
    if (this.as < 10) this.as = 10;
    this.lvlup();
  },
  obj.shoot = function () {
    if (this.cd === 0) {
      if (mouse.down) {
        this.cd = this.as;
        this.arrows.push(arrow(this.pos[0],this.pos[1],this.vel[0],this.vel[1],pointto(this,mouse),this.pierce));
      }
    } else { this.cd -= 1;}
  }
  return obj;
}

function senshi () {
  let obj = char();
  return char();
}
