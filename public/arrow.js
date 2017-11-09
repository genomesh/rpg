function arrow (px,py,vx,vy,sig,pierce) {
  let arrowimg = document.getElementById('arrow');
  return {
    sigma: sig,
    speed : 9,
    pierce : pierce,
    img : arrowimg,
    h : arrowimg.height,
    w : arrowimg.width,
    pos : [px,py],
    timer : 20,
    colour : 'red',
    vel : [vx/4+15 * Math.cos(sig),vy/4+15 * Math.sin(sig)],
    update : function () {
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
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.sigma);
      ctx.drawImage(this.img,-this.w/2,-this.h/2,this.w,this.h);
      ctx.rotate(-this.sigma);
      ctx.translate(-this.pos[0], -this.pos[1]);
    },
    test : function () {
      for (let i = 0; i<mobs.length;i++){
        if(checkTouching(mobs[i],this)) {
          if (mobs[i].onTouch()) {
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
