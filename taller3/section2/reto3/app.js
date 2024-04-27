let products = {};
let idCounter = 1;
const badWords = ['palabra1', 'palabra2', 'palabra3', 'palabra4', 'palabra5'];


function showMenu() {
    console.log("Bienvenido al Sistema de Gestion de Inventario");
    console.log("1. Cree un producto nuevo");
    console.log("2. Duplique un producto existente");
    console.log("3. Vea un producto por nombre");
    console.log("4. Vea los productos en un rango de precio max-min");
    console.log("5. Elimine un producto");
    console.log("6. Verificar existencia de producto y venderlo");
    console.log("7. Comprar un producto del inventario");
    console.log("8. Salir");
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
    console.table(newProduct);
}

function duplicateProduct() {
    showProductsTable()

    const productId = parseInt(prompt("Ingrese el ID del producto a duplicar:"));

    if (products.hasOwnProperty(productId)) {
        const originalProduct = products[productId];
        let copyCounter = 1
        let duplictedName = originalProduct.name + ` copia ${copyCounter}`

        while (Object.values(products).some(product => product.name === duplictedName)) {
            copyCounter++
            duplictedName = originalProduct.name + ` copia ${copyCounter}`
        }
    //  const duplicatedProduct = Object.assign({}, originalProduct); Alternativa, preguntar porque mejor una u otra
        const duplicatedProduct = { ...originalProduct };
        duplicatedProduct.name = duplictedName
        duplicatedProduct.id = idCounter 
        products[idCounter] = duplicatedProduct;
        idCounter++;
        console.log("Producto duplicado exitosamente:");
        console.table(duplicatedProduct);
    } else {
        console.log("El ID del producto ingresado no existe");
    }
}

function searchProduct() {
    showProductsTable()
    const productName = prompt("Ingrese el nombre del prodcuto que quiere ver")

    const findProduct = Object.values(products).find(product => product.name === productName) 

    if (findProduct) {
        console.log("El producto que quiere ver es")
        console.table(findProduct)
    } else {
        console.log("producto no encontrado")
    }
}

function productsByPriceRange() {
    const minPrice = parseFloat(prompt("Ingrese el precio minimo:"));
    const maxPrice = parseFloat(prompt("Ingrese el precio maximo:"));

    const productsInPriceRange = Object.values(products).filter(product => product.price >= minPrice && product.price <= maxPrice);

    if (productsInPriceRange.length > 0) {
        console.log(`Productos en el rango de precio $${minPrice}  $${maxPrice}:`);
        console.table(productsInPriceRange);
    } else {
        console.log("No hay productos en el rango de precio especificado");
    }
}

function updateProduct() {
    console.log("Elija el producto que quiere actualizar")
    showProductsTable()
    const productName = prompt("Ingrese el nombre del prodcuto que quiere ver")
    const productFound = Object.values(products).find(product => product.name === productName) 

    if (!productFound) {
        console.log("El producto ingresado no existe")
        return
    }

    console.log("El producto que vamos a actualizar es")
    console.table([productFound])

    const newName = prompt("Ingrese el nuevo nombre del producto:")
    if (newName.trim() !== "") {
        productFound.name = newName
    }

    const newPrice = parseInt(prompt("Ingrese el nuevo precio del producto:"))

    if (isNaN(newPrice) && newPrice > 0) {
        productFound.price = newPrice
    }

    const newQuantity = parseInt(prompt("Ingrese la nueva cantidad del producto:"))
    if (isNaN(newQuantity) && newQuantity > 0) {
        productFound.quantity = newQuantity
    }

    const newDescription = prompt("Ingrese la nueva descripcion del producto:")
    if (newDescription.trim() !== "") {
        productFound.name = newDescription
    }

    console.log("Producto actualizado")
    console.table([productFound])
    showProductsTable()
}

function deleteProduct() {
    showProductsTable();
    const productId = parseInt(prompt("Ingrese el ID del producto a eliminar:"));

    products = Object.values(products).filter(product => product.id !== productId);

    console.log("Producto eliminado exitosamente");
    showProductsTable();
}

function verifyProductExistAndSellOrBuy() {
    showProductsTable();
    const productName = prompt("Ingrese el nombre del producto que desea verificar")
    const productExist = Object.values(products).some(product => product.name === productName)

    let confirmation = 0
    
    while (productExist && confirmation !== '3') {
        confirmation = prompt(`Que quieres hacer con el producto ${productName}\n1: Vender\n2: Comprar\n3: Salir`)
        let product = Object.values(products).find(product => product.name === productName)

        switch (confirmation) {
            case '1': 
                product = Object.values(products).find(product => product.name === productName)
                sellProduct(product)
                break
            case '2':
                product = Object.values(products).find(product => product.name === productName)
                buyProduct(product)
                break
            case '3': 
                console.log("Saliteeeeeee")
                break
                //showMenu()
            default: 
                console.log("Opcion invalida, escoja un numero entre 1 y 3")
        }
    }
}

function sellProduct(product) {
    console.log(`Detalles del producto a vender:`)
    console.table([product])

    const quantityToSell = parseInt(prompt(`Ingrese la cantidad de "${product.name}" que desea vender:`))

    if (isNaN(quantityToSell) || quantityToSell <= 0) {
        console.log("La cantidad ingresada es inválida.")
        return
    }

    if (quantityToSell > product.quantity) {
        console.log(`No hay suficiente "${product.name}" en inventario para vender.`)
        return
    }

    if (quantityToSell === product.quantity) {
        console.log(`No puede vender todo el inventario de "${product.name}". Por favor, ingrese una cantidad diferente.`)
        return
    }

    if (quantityToSell < (product.quantity - 1)) {
        const confirmSellAlmostAll = confirm(`Está a punto de vender ${quantityToSell} de "${product.name}". ¿Está seguro?`)
        if (!confirmSellAlmostAll) {
            console.log("Operación cancelada. No se ha realizado ninguna venta.")
            return
        }
    }
    
    product.quantity -= quantityToSell
    console.log(`Se vendieron ${quantityToSell} de ${product.name}`)
    showProductsTable()
}

function buyProduct(product) {
    console.log(`Daelles del producto que seas comprar:`)
    console.table([product])

    const quantityToBuy = parent(prompt(`Ingrese la cantidad de "${product.name}" que desea comprar:`))

    if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
        console.log("La cantidad ingresada es invalida")
        return
    }

    product.quantity += quantityToBuy
    console.log(`Se compraron ${quantityToBuy} de ${product.name}`)
    showProductsTable()
}

function calculatedInventoryPrice() {
    let valueProducts = 0

    for (const product of Object.values(products)) {
        const valueProduct = product.price * product.quantity

        valueProducts += valueProduct
    }
    alert(`El valor total del inventario es ${valueProducts}`)
}

function showSortingOptions() {
    console.log("Seleccione una opcion de ordenamiento:\n1. Ordenar por nombre de forma ascendente (A-Z)\n2. Ordenar por precio de forma ascendente\n3. Ordenar por precio de forma descendente\n4. Ordenar por cantidad de forma ascendente\n5. Ordenar por cantidad de forma descendente")
}

function sortByNameAscending() {
    const sortedProducts = Object.values(products).sort((a, b) => a.name.localeCompare(b.name))
    console.log("Productos ordenados por nombre:")
    console.table(sortedProducts)
}

function sortByPriceAscending() {
    const sortedProducts = Object.values(products).sort((a, b) => a.price - b.price)
    console.log("Productos ordenados por precio de forma ascendente:")
    console.table(sortedProducts)
}

function sortByPriceDescending() {
    const sortedProducts = Object.values(products).sort((a, b) => b.price - a.price)
    console.log("Productos ordenados por precio de forma descendente:")
    console.table(sortedProducts)
}

function sortByQuantityAscending() {
    const sortedProducts = Object.values(products).sort((a, b) => a.quantity - b.quantity)
    console.log("Productos ordenados por cantidad de forma ascendente:")
    console.table(sortedProducts)
}

function sortByQuantityDescending() {
    const sortedProducts = Object.values(products).sort((a, b) => b.quantity - a.quantity)
    console.log("Productos ordenados por cantidad de forma descendente:")
    console.table(sortedProducts)
}

function main() {
    let option = 0

    while (option !== 12) {
        showMenu()
        option = parseInt(prompt("Seleccione una opción del menu:"))

        switch (option) {
            case 1:
                createProduct()
                break
            case 2:
                duplicateProduct()
            break
            case 3:
                searchProduct()
                break
            case 4:
                productsByPriceRange()
                break
            case 5:
                deleteProduct()
                break
            case 6: 
                verifyProductExistAndSellOrBuy()
                break
            case 7:
                updateProduct()
                break
            case 8:
                calculatedInventoryPrice()
                break
            case 9: 
                showSortingOptions()
                const sortingOption = parseInt(prompt("Seleccione una opcion de ordenamiento:"))

                switch (sortingOption) {
                    case 1:
                        sortByNameAscending()
                        break
                    case 2:
                        sortByPriceAscending()
                        break
                    case 3:
                        sortByPriceDescending()
                        break
                    case 4:
                        sortByQuantityAscending()
                        break
                    case 5:
                        sortByQuantityDescending()
                        break
                    default:
                        console.log("Opcion de ordenamiento invalida.")
                }
                break
            default:
                console.log("Opcion invalida, por favor elija una opcion del menu")
        }
    }
}

main()
