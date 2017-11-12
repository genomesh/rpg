function slime () {
  let obj = mob();
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
  obj.pos = [canvas.width/2,canvas.height/2];
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
  return obj;
}
