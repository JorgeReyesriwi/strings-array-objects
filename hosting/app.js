// Las variables declaradas con var nos van a mover su declaracion al principio de su ambito, pero no la inicializamos, es por eso que el primer console.log nos da undefined

// var x;
console.log(x)

var x = "Hola X"

console.log(x)

// si tratamos de hacer lo mismo que hicimos con var, pero usando let y const tenemos un ejemplo de Temporal Dead Zone(TDZ)
// console.log(y)
// let y = "Hola Y"

// console.log(z)
// const z = "Hola Z"

sayHello(); // Error: sayHello No es una funcion || lo que ocurre aqui es que la declaracion de la variable se va a mover al principio de su ambito(scope), no la asignacion de la funcion en si, es por eso que si llamamos la funcion nos dara error

var sayHello = function() {
    console.log("Hola mundo");
};

// La declaración completa de la función se eleva al principio de su ambito(scope), por lo que puedes llamar a la función antes de su declaración formal en el código.

sayHello2()

function sayHello2() {
    console.log("Hola mundo");
}

// Con las Funciones flecha tambien tenemos
sayHello();

const sayHello = () => {
    console.log("Hola mundo");
    sayHello(); // "Hola mundo"
};


if(true) {
  var perro = "Perrito"
}