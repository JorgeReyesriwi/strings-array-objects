let password = "";
let flag = true;

let message = "Contraseña insegura. Debe cumplir las siguientes condiciones:";

while (flag) {
  password = prompt("Ingrese una contraseña:");
  
  // Verificar si la contraseña tiene al menos 8 caracteres
  const hasMinLength = /.{8,}/.test(password);
  

  // Verificar si la contraseña contiene al menos un número
  const hasNumber = /\d/.test(password);
  // const hasNumber2 = /[0-9]/.test(password)


  // Verificar si la contraseña contiene al menos una letra, pero aqui solo me muestra si contiene uno en mayuscula o en minuscula, desde que las letras esten asi ya se cumple
  const hasLetter = /[a-zA-Z]/.test(password);
  // Si quisiera que el programa tuviera al menos una mayuscula y al menos una minuscula deberia separar en dos regex
  // const hasUpperCaseLetter = /[A-Z]/.test(password)
  // const hasLowerCaseLetter = /[a-z]/.test(password)

  // Verificar si la contraseña contiene al menos un caracter especial
  const hasSpecialChar = /[!@#$%^&*()+=_\-{}\[\]:;"'?<>,.|/\\~`]/.test(password);
  // \ antes de ciertos caracteres: Algunos caracteres tienen un significado especial en expresiones regulares, como [, ], -, \, y necesitan ser escapados con una barra invertida \ para ser tratados como caracteres literales dentro de la clase de caracteres. Por ejemplo, \[ coincide con el carácter "[" literal.
  // El "-" dentre dos caracteres nos sirve para marcar un rango entre uno y otro


  // Verificar si todas las condiciones se cumplen
  if (hasMinLength && hasNumber && hasSpecialChar && hasLetter /** && hasLowerCaseLetter && hasUpperCaseLetter*/) {
    alert("Contraseña segura");
    flag = false;
  } else {
    message = "Contraseña insegura. Debe cumplir las siguientes condiciones:";
    
    // Condiciones no cumplidas
    if (!hasMinLength) message += "\n- Debe tener al menos 8 caracteres.";
    if (!hasNumber) message += "\n- Debe contener al menos un numero.";
    if (!hasLetter) message += "\n- Debe contener al menos una letra.";
    if (!hasSpecialChar) message += "\n- Debe contener al menos un caracter especial.";

    // if (!hasUpperCaseLetter) message += "\n Debe tener al menos una letra mayuscula"
    // if (!hasLowerCaseLetter) message += "\n Debe tener al menos una letra minuscula"
    
    alert(message);
  }
}


