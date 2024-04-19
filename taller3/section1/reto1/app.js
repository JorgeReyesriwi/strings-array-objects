// seccion 1 reto 1 crear un programa que capture nombre y apellido de una persona y con eso haga un nombre de usuario y un correo personalizados

const users = {};
const domain = "@mydomain.com";

function getUser(fullName) {
  let fullNames = fullName.split(" ");
  let name = fullNames[0];
  let lastname = fullNames[1];
  let username = name.slice(0, 3) + lastname.slice(0, 3);
  let email = username + domain
  console.log(username)
  return { username, email }
}

function addUser(user) {

  // let counter = ''; no le vi ningun fallo al hacerlo con una cadena vacia funciona igual que tener la variable undefined
  // let counter = 0; de esta forma cada vez que agregaba un nuevo usuario sin estar repetido el usuario tenia al final del username un 0
  let counter;
  
  // Uso del metodo hasOwnProperty que nos devuelve true o false dependiendo si encontro coincidencia con lo que comparamos, en este caso lo usamos en nuestro objeto users para ver si el username coincide con alguno ya existente en el objeto
  while (users.hasOwnProperty(user.username + counter)) {
    counter++;
  }

  user.username = user.username + counter;
  user.email = user.username + domain;
  // agregar el username como llave y el email como valor a mi objeto users
  users[user.username] = user.email;
}

function userList() {
  console.log("Lista de Usuarios:");
  Object.entries(users).forEach(([username, email]) => {
      console.log(`Nombre de Usuario: ${username} \n Correo Electrónico: ${email}`);
  });
}

let flag = true

while (flag) {
  const fullName = prompt("Ingrese su primer nombre y primer apellido:").toLowerCase();
  let name = fullName.split(" ");
  if (name.length !== 2) {
    alert("Ingrese los valores solicitados");
    continue;
  }

  const newUser = getUser(fullName)
  addUser(newUser)

  flag = confirm("Quiere ingresar mas usuarios?:")
}

userList()
