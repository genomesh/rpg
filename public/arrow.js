function arrow (px,py,vx,vy,sig,pierce,dmg,target) {
  let arrowimg = document.getElementById('arrow');
  return {
    sigma: sig,
    speed : 9,
    dmg : dmg,
    pierce : pierce,
    img : arrowimg,
    h : arrowimg.height,
    w : arrowimg.width,
    target : target,
    pos : [px,py],
    dpos : [0,0],
    timer : 20,
    colour : 'red',
    vel : [vx/4+15 * Math.cos(sig),vy/4+15 * Math.sin(sig)],
    update : function () {
      console.log('arrowupdate');
      this.move();
      this.draw();
      this.timer -= 1;
    },
    move : function () {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    },
    draw : function () {
      //ctx.fillStyle = this.colour;
      //ctx.fillRect(this.pos[0]-this.w/2,this.pos[1]-this.h/2,this.w,this.h);
      this.dpos[0] = canvas.width/2 - user.pos[0] + this.pos[0];
      this.dpos[1] = canvas.height/2 - user.pos[1] + this.pos[1];
      ctx.translate(this.dpos[0], this.dpos[1]);
      ctx.rotate(this.sigma);
      ctx.drawImage(this.img,-this.w/2,-this.h/2,this.w,this.h);
      ctx.rotate(-this.sigma);
      ctx.translate(-this.dpos[0], -this.dpos[1]);
    },
    test : function () {
      if (this.target) {
        if (checkTouching(this,this.target)) {
          console.log('yeet');
          this.target.takeDmg(this.dmg);
          if (this.pierce == 0) return true;
          else this.pierce -= 1;
        }
      } else {
        for (let i = 0; i<mobs.length;i++){
          if(checkTouching(mobs[i],this)) {
            if (mobs[i].takeDmg(this.dmg)) {
              mobs.splice(i,1);
              i -= 1;
            }
            if (this.pierce == 0) return true;
            else this.pierce -= 1;
          }
        }
      }
    }
  }
}
