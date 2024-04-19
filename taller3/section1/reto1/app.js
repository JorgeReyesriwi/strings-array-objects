/**
 * Descripción
Seccion 1: Strings y Objetos

Objetivo: Aplicar métodos de manipulación de strings para resolver problemas comunes de programación. Además, utilizar métodos de objetos para interactuar y manipular datos dentro de objetos JavaScript.

Reto 1: Generador de Nombres de Usuario (username) y Correos Electrónicos (email) con el dominio myDomain.com

Crear un script que genere nombres de usuario y email a partir de un nombre y apellido y guarde en un objeto llave:valor - username:email. El script debe cumplir con las siguientes condiciones:

    Solicitud de Datos:
        Solicita al usuario que ingrese su nombre y apellido por prompt().

    Normalización:
        Convierte el nombre y apellido ingresados a minúsculas para estandarizar el formato utilizando toLowerCase().

    Separación y Extracción:
        Utiliza split() para separar el nombre completo en un array de dos elementos, uno para el nombre y otro para el apellido.
        Aplica slice() para obtener las primeras tres letras del nombre y las primeras tres letras del apellido.

    Generación del Nombre de Usuario:
        Concatena las letras obtenidas de nombre y apellido para formar una base para el nombre de usuario.

    Generacion del Correo Electrónico:
        Concatena el nombre de usuario con el dominio myDomain.com para formar el correo electrónico. Por ejemplo:
            Nombre de Usuario (username): johndoe
            Correo Electrónico: johndoe@myDomain.com

    Almacena el nombre de usuario generado en un objeto global llamado 'users' con el username como clave y el correo electrónico como valor. Por ejemplo: - Nombre de Usuario (username): johndoe - Correo Electrónico: johndoe@myDomain.com - users = { johndoe: 'johndoe@myDomain.com' }

    Verificación de Unicidad:
        Verifica si el nombre de usuario generado ya existe en el objeto 'users'. Utiliza Object.keys() para obtener un array con las claves del objeto. Utiliza includes() para verificar si el nombre de usuario ya existe.
        Si el nombre de usuario ya existe, agrega un número al final del nombre de usuario y actualiza el correo electrónico correspondiente. Por ejemplo, si 'johndoe' ya existe, el nuevo nombre de usuario será 'johndoe1' y el correo electrónico será 'johndoe1@myDomain.com'.

Nota: Puedes utilizar bucles for, while y estructuras condicionales como if/else para resolver este reto, pero te recomiendo que utilices métodos de strings y arrays para simplificar la solución.
 */

const users = [];
const domain = "@mydomain.com";


function getUsername(fullName) {
  let fullNames = fullName.split(" ");
  let name = fullNames[0];
  let lastname = fullNames[1];
  let username = name.slice(0, 3) + lastname.slice(0, 3);
  let email = username + domain
  console.log(username)
  return { username, email }
}

function addUser(user) {
  users.push(user);
}

function userList() {
  console.log("Lista de usuarios")
  users.forEach((user, index) => {
    console.log(`${index + 1} Username: ${user.username}, Email: ${user.email}`)
  })
}

let flag = confirm("Quiere ingresar mas usuarios?:")

while (flag) {
  const fullName = prompt("Enter your fullname:").toLowerCase();
  const newUser = getUsername(fullName)
  addUser(newUser)
}

userList()