const totalGrades = prompt("Ingrese las calificaciones del estudiante separadas por comas:");
// usar map siempre que queramos hacer un nuevo array con los elementos que operamos, en vez de forEach porque forEach simplemente itera sobre ellos pero no devuelve un array nuevo, el trim sirve para quitar los espacios vacios al inicio y al final del string que convertimos a float, es una buena practica usarlo siempre que vayamos a convertir strings a float, pues al convertirlos podria surgir un error si lo hacemos mal
const grades = totalGrades.split(",").map(grade => {
    const parsedGrade = parseFloat(grade.trim());
    if (isNaN(parsedGrade)) {
        return null;
    } else {
        return parsedGrade;
    }
});

const validGrades = grades.filter(grade => grade !== null)

if (validGrades.length === 0) {
    console.log("No se ingresaron calificaciones validas.");
} else {

    // El metodo reduce() va a iterar sobre los items que tengamos en el array, mientras y va a operar segun le digamos, si tengo strings los va a concatenar, si tengo numeros dependiendo de si le paso una operacion aritmetica los va a operar o si los numeros los paso a strings los puedo concatenar tambien, pero basicamente lo que hace es o irlos pegando uno tras otro, u operaciones aritmeticas con ellos
    const sum = validGrades.reduce((accumulated, grade) => accumulated + grade, 0);
    const average = sum / validGrades.length;

    console.log(`El promedio de calificaciones del estudiante es: ${average}`);
}