let countId = 1 ;

const events = [];

function createEvent() {
    const nameEvent = prompt('Ingrese el nombre del evento')
    const dateEvent = prompt('Ingrese la fecha del evento en el siguiente formato DD-MM-YYYY')
    const eventDescription = prompt('Ingrese la descripcion del evento')

    const event = {
        id: countId++,
        name: nameEvent,
        date: dateEvent,
        description : eventDescription
    }

    events.push(event)

    console.log("Evento creado correctamente:");
    console.log(event);
}

// function showEvents(events) {
//     console.log('Estos son los eventos agendados')
//     events.forEach(event => {
//         console.log(`ID: ${event.id}, Nombre: ${event.name}, Fecha: ${event.date}, Descripcion: ${event.description}`)
//     })
// }
function showEvents(events) {
    console.log('Estos son los eventos agendados:');
    console.table(events);
}

function editEvent() {
    const eventId = parseInt(prompt('Ingrese el ID del evento que desea editar'))

    const eventIndex = events.findIndex(event => event.id === eventId)

    if (eventIndex === -1) {
        alert('El ID ingresado no coincide con ningun evento agendado')
        return
    }

    const event = events[eventIndex]

    const newNameEvent = prompt('Ingrese el nuevo nombre del evento')
    const newDateEvent = prompt('Ingrese la nueva fecha del evento en el siguiente formato DD-MM-YYYY')
    const newEventDescription = prompt('Ingrese la nuevadescripcion del evento')

    event.name = newNameEvent
    event.date = newDateEvent
    event.description = newEventDescription

    console.log('Evento editado exitosamente')
    console.log(event)
}

function deleteEvent() {
    showEvents(events)

    const eventId = parseInt(prompt('Ingrese el ID del evento que desea eliminar'));
    //Encuentra dentro de events pero buscando por el indice
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex === -1) {
        console.log("No se encontro ningun evento con ese ID.");
        return;
    }
    //Con splice eliminamos un elemento en el array y con el , 1 decimos cuantos elementos a partir de esa posicion eliminamos, en este caso eliminamos 1 pues colocamos solo 1, los [0] nos sirven para almacenar el elemento eliminado en deletedEvent
    const deletedEvent = events.splice(eventIndex, 1)[0];
    alert(`Evento eliminado correctamente: ${deletedEvent.name}`);

    showEvents(events)
}

function showMenu() {
    console.log("Bienvenido al sistema de gestion de eventos\n" +
                "1. Crear evento\n" +
                "2. Mostrar eventos\n" +
                "3. Editar evento\n" +
                "4. Eliminar evento\n" +
                "5. Salir");
}

function main() {
    let flag = true;

    while (flag) {
        showMenu();

        const option = parseInt(prompt("Seleccione una opcion:"));

        switch (option) {
            case 1:
                createEvent();
                break;
            case 2:
                showEvents(events);
                break;
            case 3:
                editEvent();
                break;
            case 4:
                deleteEvent();
                break;
            case 5:
                flag = false;
                console.log("Fin del programa");
                break;
            default:
                console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
        }
    }
}

main();
