function newUser (id, pos) {
  return {
    id : id,
    pos : pos,
    dpos : [0,0],
    draw : draw,
    update : function () {
      this.draw();
    },
    w : 10,
    h : 10,
    colour : 'blue'
  }
}
