var double = x => x*2;
var triple = x => x*3;
var multiply = {
  double : double,
  triple : triple
};

(function() {
    module.exports.getMultiply = function() { return multiply; }
}());
/*
export function hello() {
  return "Hello";
}
*/
