function slime (x,y) {
  let obj = mob();
  obj.pos = [x,y];
  obj.h=18;
  obj.w=18;
  obj.hp = 30;
  obj.onhitdmg = 20;
  obj.xpval = 15;
  obj.mcd = [30,60];
  obj.ccd = 0;
  obj.bouncedist = 200;
  obj.bounceframes = 30;
  obj.cframe = 0;
  obj.bouncing = false;
  obj.image = document.getElementById("slime");
  obj.dimage = document.getElementById("dmgslime");
  obj.update = function () {
    this.invulnerable -= 1;
    if (this.bouncing) {
      this.bounce();
    }
    if (this.ccd > 0) {
      this.draw();
      this.ccd -= 1;
    } else {
      this.startBounce();
      this.ccd = this.mcd[0] + Math.floor(Math.random()*this.mcd[1]);
    }
  };
  obj.bounce = function () {
    this.cframe -= 1;
    this.pos[0] += this.dest[0]/this.bounceframes;
    this.pos[1] += this.dest[1]/this.bounceframes;
    if (this.cframe == 0) {this.bouncing = false;}
  };
  obj.startBounce = function () {
    this.sigma = pointto(this,user);
    this.dest = [Math.cos(this.sigma) * this.bouncedist,Math.sin(this.sigma) * this.bouncedist];
    this.cframe = this.bounceframes;
    this.bouncing = true;
  }
  return obj;
}

function blooper () {
  let obj = mob();
  obj.xpval = 75;
  obj.hp = 50;
  obj.onhitdmg = 50;
  obj.colour = 'purple';
  obj.spawntimer = 0;
  obj.update = function () {
    this.invulnerable -= 1;
    this.spawntimer += 1;
    this.spawnslime();
    this.draw();
  };
  obj.spawnslime = function () {
    if (this.spawntimer % 30 == 0) {mobs.push(slime(this.pos[0],this.pos[1]));}
  }
  return obj;
}

function goblinarcher () {
  let obj = mob();
  obj.mcd = [30,60];
  obj.arrowimg = document.getElementById('arrow');
  obj.ccd = 0;
  obj.xpval = 75;
  obj.hp = 40;
  obj.arrows = [];
  obj.onhitdmg = 15;
  obj.arrowdmg = 50;
  obj.colour = 'green';
  obj.update = function () {
    this.invulnerable -= 1;
    if (this.ccd == 0) {
      this.shoot();
      this.ccd = this.mcd[0] + Math.floor(Math.random()*this.mcd[1]);
    } else {this.ccd -= 1;}
    for (let i = 0; i<this.arrows.length;i++) {
      this.arrows[i].update();
      if (this.arrows[i].test()) {this.arrows.splice(i,1); i -= 1; break}
      if (this.arrows[i].timer == 0) { this.arrows.splice(i,1); i -=1; break}
    }
    this.draw();
  };
  obj.shoot = function () {
    this.arrows.push(arrow(this.arrowimg,this.pos[0],this.pos[1],0,0,pointto(this,user),0,this.arrowdmg,user));
  }
  return obj;
}
