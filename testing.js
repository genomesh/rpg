//var example = require("./example.js");
//import hello from './example.js'; // or './module'
/*
var double = multiply.getDouble();
var triple = multiply.getTriple();
const hello = require('')*/
//multiply = example.getMultiply();

//console.log(multiply.double(3));

function vehicle () {
  return {
    type : 'vehicle',
    colour : 'blue',
    who : function () {
      console.log(this.type);
    }
  }
}

function car () {
  let obj = vehicle();
  obj.colour = 'red';
  obj.type = 'car';
  obj.phenotype = looks;
  return obj;
}

function looks () {
  console.log(this.colour);
}

let myCar = car();

myCar.who();
myCar.phenotype();
/*
function Foo(){}
Foo.prototype.bar = function(){}
var x = new Foo()
x.bar()
*/
