const email = prompt("Ingrese su correo electronico:");

function validateEmail(email) {
    if (!email) {
        return false;
    }

   
    const partsEmail = email.split('@');

    if (partsEmail.length !== 2) {
        return false;
    }

    // Verificar si el correo tiene un punto '.' después del símbolo '@', if (domainParts.length < 2) nos dice que el dominio puede tener un punto o no y tomarlo por valido 
    const domainParts = partsEmail[1].split('.');
    if (domainParts.length < 2) {
        return false;
    }
    /** 
     ** Con esta condicion solo es valida si queremos que el dominio este dividido en al menos 2 partes, lo que nos daria a entender que hay al menos un punto en el dominio

    const domainParts2 = partsEmail[1].split('.');
    if (domainParts2.length === 2) {
        return false;
    }
    */

    // Verificar si el correo electrónico no contiene espacios en blanco con regex \s es 
    if (/\s/.test(email)) {
        return false;
    }
/**
 * Verifica si el correo tiene espacios en blanco utilizando metodos de los strings
 **  
    const spaceEmail = email.split(' ');
    if (spaceEmail.length > 1) {
        console.log("El correo electronico contiene al menos un espacio en blanco.");
    } else {
        console.log("El correo electronico no contiene espacios en blanco.");
    }
    */

   return true;
} 

const isValidEmail = validateEmail(email);

if (isValidEmail) {
    console.log("Correo electronico valido");
} else {
    console.log("Correo electronico invalido");
}
