let password = "";
let flag = true;

while (flag) {
  password = prompt("Ingrese una contraseña:");
  
  // Verificar si la contraseña tiene al menos 8 caracteres
  const hasMinLength = /.{8,}/.test(password);
  
  // Verificar si la contraseña contiene al menos un número
  const hasNumber = /\d/.test(password);
  
  // Verificar si la contraseña contiene al menos una letra
  const hasLetter = /[a-zA-Z]/.test(password);
  
  // Verificar si la contraseña contiene al menos un caracter especial
  const hasSpecialChar = /[!@#$%^&*()+=_\-{}\[\]:;"'?<>,.|/\\~`]/.test(password);

  // Verificar si todas las condiciones se cumplen
  if (hasMinLength && hasNumber && hasLetter && hasSpecialChar) {
    alert("Contraseña segura");
    flag = false; // Romper el ciclo while si la contraseña es segura
  } else {
    let message = "Contraseña insegura. Debe cumplir las siguientes condiciones:";
    
    // Mostrar las condiciones que no se cumplen
    if (!hasMinLength) message += "\n- Debe tener al menos 8 caracteres.";
    if (!hasNumber) message += "\n- Debe contener al menos un número.";
    if (!hasLetter) message += "\n- Debe contener al menos una letra.";
    if (!hasSpecialChar) message += "\n- Debe contener al menos un caracter especial.";
    
    alert(message);
  }
}
