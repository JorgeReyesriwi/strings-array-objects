let products = {};
let idCounter = 1;

function showMenu() {
    console.log("Bienvenido al Sistema de Gestion de Inventario");
    console.log("1. Cree un producto nuevo");
    console.log("2. Duplique un producto existente");
    console.log("3. Vea un producto por nombre");
    console.log("4. Vea los productos en un rango de precio max-min");
    console.log("5. Elimine un producto");
    console.log("6. Salir");
}

function showProductsTable() {
    console.log("Productos en Inventario");
    console.table(products);
}

function createProduct() {
    const nameProduct = prompt("Ingrese el nombre del producto:");
    const priceProduct = parseFloat(prompt("Ingrese el precio del producto:"));
    const quantityProduct = parseInt(prompt("Ingrese la cantidad del producto:"));
    const descriptionProduct = prompt("Ingrese la descripción del producto:");

    const newProduct = {
        id: idCounter,
        name: nameProduct,
        price: priceProduct,
        quantity: quantityProduct,
        description: descriptionProduct
    };

    products[idCounter] = newProduct;

    idCounter++;

    console.log("Producto creado exitosamente:");
    console.log(newProduct);
    showProductsTable()

}

function duplicateProduct() {
    showProductsTable()

    const productId = parseInt(prompt("Ingrese el ID del producto a duplicar:"));

    if (products.hasOwnProperty(productId)) {
        const originalProduct = products[productId];
        const duplicatedProduct = Object.assign({}, originalProduct);
        duplicatedProduct.name += " Copia";
        duplicatedProduct.id = idCounter;
        products[idCounter] = duplicatedProduct;
        idCounter++;
        console.log("Producto duplicado exitosamente:");
        console.log(duplicatedProduct);
    } else {
        console.log("El ID del producto ingresado no existe");
    }
}

function main() {
    let option = 0;

    while (option !== 6) {
        showMenu();
        option = parseInt(prompt("Seleccione una opción del menu:"));

        switch (option) {
            case 1:
                createProduct();
                break;
            case 2:
                duplicateProduct();
            break;
            case 3:
                // funcion ver producto por nombre
                break;
            case 4:
                // funcion ver producto por rango de precios min-max
                break;
            case 5:
                // funcion eliminar producto
                break;
            case 6:
                console.log("Saliste del programa");
                break;
            default:
                console.log("Opcion invalida, por favor elija una opcion del menu");
        }
    }
}

main();