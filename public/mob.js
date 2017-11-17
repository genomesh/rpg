function mob () {
  return {
    w : 15,
    h : 15,
    hp : 30,
    onhitdmg : 10,
    xpval : 10,
    invulnerable : 0,
    colourDelay : 10,
    cuurentDelay : 0,
    colour : 'green',
    dcolour : 'red',
    vel : [0,0],
    checkTouching,
    pos : [600,340],
    dpos : [0,0],
    update : function () {
      this.invulnerable -= 1;
      this.draw();
    },
    draw : function () {
      this.dpos[0] = canvas.width/2 - user.pos[0] + this.pos[0];
      this.dpos[1] = canvas.height/2 - user.pos[1] + this.pos[1];
      if (this.currentDelay > 0) {
        if (this.dimage) {
          ctx.drawImage(this.dimage,this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
        } else {
          ctx.fillStyle = this.dcolour;
          ctx.fillRect(this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
        }
        this.currentDelay -= 1;
      } else {
        if (this.image) {
          ctx.drawImage(this.image,this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
        } else {
          ctx.fillStyle = this.colour;
          ctx.fillRect(this.dpos[0]-this.w/2,this.dpos[1]-this.h/2,this.w,this.h);
        }
      }
    },
    takeDmg : function (x) {
      this.collide();
      if (this.invulnerable < 0) {this.hp -= x; this.invulnerable = 10;}
      if (this.hp < 1) {user.xpinc(this.xpval); return true}
    },
    collide : function() {
      this.currentDelay = this.colourDelay;
    }
  }
}
