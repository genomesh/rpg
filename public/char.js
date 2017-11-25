function char () {
  return {
    basic : {cd : 0,maxcd : 20, dmg : 10,currently : false},
    e : {cd : 0,maxcd : 20,currently : false, learned : false, cost : 20},
    ls : {cd : 0,maxcd : 20,currently : false, learned : false, cost : 20},
    xp : 0,
    lvl : 0,
    hp : {c : 75, m : 75, regen : 5},
    mp : {c : 100, m : 100, regen : 20},
    immunity : 0,
    w : 15,
    h : 15,
    colour : 'black',
    vel : [0,0],
    pos : [0,0],
    takeDmg : function (dmg) {
      if (this.immunity == 0) {
        this.hp.c -= dmg;
        this.immunity = 20;
      }
    },
    update : function () {
      if (this.immunity == 0) {
        for (let i = 0; i<mobs.length;i++) {
          if (checkTouching(this,mobs[i])) {
            this.takeDmg(mobs[i].onhitdmg);
            break;
          }
        }
      } else {this.immunity -= 1;}
      this.attack();
      if (this.hp.c < 1) this.death();
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
        if (canvas.keys[69] && this.mp.c >= this.e.cost && this.e.learned) {
          this.e.cd = this.e.maxcd;
          this.mp.c -= this.e.cost;
          this.estart();
        }
      } else { this.e.cd -= 1;}
      if (this.ls.currently) {
        this.lscont();
      };
      if (this.ls.cd === 0) {
        if (canvas.keys[16] && this.mp.c >= this.ls.cost && this.ls.learned) {
          this.ls.cd = this.ls.maxcd;
          this.mp.c -= this.ls.cost;
          this.lsstart();
        }
      } else { this.ls.cd -= 1;}
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
    death : function () {this.hp.c = 0;death()},
    move : function () {
      if (canvas.keys[65] && this.vel[0] > -7) {this.vel[0] -= 0.5};
      if (canvas.keys[68] && this.vel[0] < 7) {this.vel[0] += 0.5};
      if (canvas.keys[87] && this.vel[1] > -7) {this.vel[1] -= 0.5};
      if (canvas.keys[83] && this.vel[1] < 7) {this.vel[1] += 0.5};
      this.vel[0] *= 0.925;
      this.vel[1] *= 0.925;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      mouse.pos[0] += this.vel[0];
      mouse.pos[1] += this.vel[1];
    },
    draw : function () {
      ctx.fillStyle = this.colour;
      if (this.image) {ctx.drawImage(this.image,canvas.width/2-this.w/2,canvas.height/2-this.h/2,this.w,this.h)}
      else {ctx.fillRect(canvas.width/2-this.w/2,canvas.height/2-this.h/2,this.w,this.h);}
    }
  }
}

function weapon (imgid) {
  let img = document.getElementById(imgid);
  return {
    image : img,
    frame : 0,
    maxframe : 5,
    frameRotates : [5/8,1/2,1/6,-1/6,-1/2,-5/8],
    w : img.width*4/10,
    h : img.height*4/10,
    currentSide : Math.PI/4,
    leftright : 1,
    range : 100,
    currentRotate : 0,
    sig : Math.PI/4,
    dpos : [0,0],
    draw : function (rad) {
      this.currentRotate = rad;
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(this.currentRotate + this.sig + this.currentSide);
      ctx.drawImage(this.image,0,-this.h,this.w,this.h);
      ctx.rotate(-this.currentSide -this.sig - this.currentRotate);
      ctx.translate(-canvas.width/2, -canvas.height/2);
    }
  }
}

function meleecont () {
  let w = this.weapon;
  w.currentSide = w.frameRotates[w.frame] * w.leftright * Math.PI;
  if (w.frame === 2) {
    this.startRad = pointto(this,mouse) + w.frameRotates[w.frameRotates.length-1]* Math.PI;
    this.endRad = pointto(this,mouse) + w.frameRotates[0]* Math.PI;
    for (let i = 0; i<mobs.length; i++) {
      if (this.startRad < pointto(this, mobs[i]) &&
          this.endRad > pointto(this, mobs[i]) &&
          w.range + mobs[i].w/2 > distBetween(this,mobs[i])) {
        if (mobs[i].takeDmg(this.basic.dmg)) {
          mobs.splice(i,1);
          i -= 1;
        }
      }
    }
  }
  w.frame += 1;
  if (w.frame === w.frameRotates.length) {
    this.basic.currently = false;
    w.leftright *= -1;
    w.frame = 0;
  }
}
