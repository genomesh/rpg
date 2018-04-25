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
    draw : draw,
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
