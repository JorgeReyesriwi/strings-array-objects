const inputGrades = prompt("Ingrese las calificaciones de los estudiantes separadas por comas:")

const grades = inputGrades.split(",").map(grade => parseFloat(grade.trim()))


const average = grades.reduce((accumulated, grade) => accumulated + grade, 0) / grades.length

const sortedGrades = grades.sort((a, b) => b - a);
const maxGrade = sortedGrades[0]
// pop() saca el ultimo item de un array y me lo almacena
const copyGrades = sortedGrades
const minGrade = copyGrades.pop()

const passedGrades = grades.filter(grade => grade >= 70)
const failedGrades = grades.filter(grade => grade < 70)

console.log(`Promedio de Calificaciones: ${average}`)
console.log(`Calificación Máxima: ${maxGrade}`)
console.log(`Calificación Mínima: ${minGrade}`)
console.log(`Número de Aprobados: ${passedGrades.length}`)
console.log(`Número de Reprobados: ${failedGrades.length}`)
console.log(`Lista de Calificaciones Ordenadas de Mayor a Menor: ${sortedGrades.join(", ")}`)
