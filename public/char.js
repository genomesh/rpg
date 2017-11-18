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

function meleestart () {
  this.startRad = pointto(this,mouse) + this.weapon.frameRotates[this.weapon.frameRotates.length-1]* Math.PI;
  //console.log(pointto(this,mouse));
  this.endRad = pointto(this,mouse) + this.weapon.frameRotates[0]* Math.PI;
  this.basic.currently = true; //add with animation
}
function meleecont () {
  let w = this.weapon;
  w.currentSide = w.frameRotates[w.frame] * w.leftright * Math.PI;
  if (w.frame === 2) {
    for (let i = 0; i<mobs.length; i++) {
      if (this.startRad < pointto(this, mobs[i]) &&
          this.endRad > pointto(this, mobs[i]) &&
          w.range + mobs[i].w/2 > distBetween(this,mobs[i])) {
        console.log('hit!')
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
