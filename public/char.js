function char () {
  let x, y, sigma, a, b;
  return {
    basic : {cd : 0,maxcd : 20, dmg : 10,currently : false},
    e : {cd : 0,maxcd : 20,currently : false},
    xp : 0,
    lvl : 0,
    mhp : 100,
    chp : 100,
    mmp : 100,
    cmp : 100,
    immunity : 0,
    w : 15,
    h : 15,
    colour : 'black',
    vel : [0,0],
    pos : [10,10],
    update : function () {
      if (this.immunity == 0) {
        for (let i = 0; i<mobs.length;i++) {
          if (checkTouching(this,mobs[i])) {
            this.chp -= mobs[i].onhitdmg;
            this.immunity = 40;
            break;
          }
        }
      } else {this.immunity -= 1;}
      this.attack();
      if (this.chp < 1) {this.death();}
      this.move();
      this.draw();
    },
    attack : function () {
      if (this.basic.currently) {
        this.bcont();
      };
      if (this.basic.cd === 0) {
        if (mouse.down) {
          this.basic.cd = this.basic.maxcd;
          this.bstart();
        }
      } else { this.basic.cd -= 1;}
      if (this.e.currently) {
        this.econt();
      };
      if (this.e.cd === 0) {
        if (canvas.keys[69]) {
          this.e.cd = this.e.maxcd;
          this.estart();
        }
      } else { this.e.cd -= 1;}
    },
    xpinc : function (amount) {
      this.xp += amount;
      this.lvlup();
    },
    lvlup : function () {
      if (this.xp > 100) {this.lvl += 1; this.xp -= 100;} else {return}
      this.as = 20 - this.lvl;
      if (this.as < 10) this.as = 10;
      this.lvlup();
    },
    death : function () {this.chp = 1;console.log('dead')},
    move : function () {
      if (canvas.keys[65] && this.vel[0] > -7) {this.vel[0] -= 0.5};
      if (canvas.keys[68] && this.vel[0] < 7) {this.vel[0] += 0.5};
      if (canvas.keys[87] && this.vel[1] > -7) {this.vel[1] -= 0.5};
      if (canvas.keys[83] && this.vel[1] < 7) {this.vel[1] += 0.5};
      this.vel[0] *= 0.925;
      this.vel[1] *= 0.925;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    },
    draw : function () {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.pos[0]-this.w/2,this.pos[1]-this.h/2,this.w,this.h);
    }
  }
}