let products = {}
let idCounter = 1
const badWords = ['hijueputa', 'malparido', 'gonorrea', 'pirobo', 'marica']

let listBadProducts = []

function showMenu() {
    console.log(`
Bienvenido al Sistema de Gestión de Inventario

1. Crear un producto nuevo
2. Duplicar un producto existente
3. Buscar un producto por nombre
4. Ver los productos en un rango de precio
5. Eliminar un producto
6. Verificar existencia de un producto y venderlo/comprarlo
7. Actualizar un producto
8. Calcular el valor total del inventario
9. Opciones para ordenar un producto, por nombre, precio y cantidad
10. Filtrar productos con malas palabras en la descripcion
11. Generar reporte de productos
12. Salir
`);
}


function showProductsTable() {
    console.log("Productos en Inventario");
    console.table(products);
}

function createProduct() {
    const nameProduct = prompt("Ingrese el nombre del producto:")
    const priceProduct = parseFloat(prompt("Ingrese el precio del producto:"))
    const quantityProduct = parseInt(prompt("Ingrese la cantidad del producto:"))
    const descriptionProduct = prompt("Ingrese la descripción del producto:")

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

function containBadword() {
    for (const word of badWords) {
        if (description.toLowercase().includes(word)) {
            return true
        }
    }
}
function filterForBadWords() {
    for (const product of Object.values(products)){
        if (containBadword(product.description)) {
            listBadProducts.push(Object.assign({}, product))
        }
    }
    console.log("Los productos que contienen malas palabras son")
    console.table(listBadProducts)
}

function replaceBadWords() {
    for (const product of Object.values(products)) {
        product.description = badWords.reduce((description, word) => {
            // el primer parametro son las palabras que buscamos y el segundo parametro 'gi' nos indica que 'g' es global o sea que busacara en todo el string y 'i' que sera indiferente de minusculas o mayusculas.
            const regex = new RegExp(word, 'gi')
            return description.replace(regex, '*'.repeat(word.length))
        }, product.description)
    }
}

function calculateTotalProducts() {
    return Object.values(products).length
}

function generateReport() {
    console.log("Reporte General de Productos")

    sortByPriceDescending
    const mostExpensiveProducts = Object.values(products).filter((product, index) => index < 3)
    const cheapestProducts = Object.values(products).filter((product, index) => index >= -3)

    sortByQuantityDescending();
    const mostStockedProducts = Object.values(products).filter((product, index) => index < 3)
    const leastStockedProducts = Object.values(products).filter((product, index) => index < -3)

    replaceBadWords()

    console.log("Productos más caros:")
    console.table(mostExpensiveProducts)

    console.log("Productos más baratos:")
    console.table(cheapestProducts)

    console.log("Productos con mayor cantidad disponible:")
    console.table(mostStockedProducts)
    
    console.log("Productos con menor cantidad disponible:")
    console.table(leastStockedProducts)

    showProductsTable()
}

function main() {
    let option = 0

    while (option !== 11) {
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
            case 10: 
                filterForBadWords()
                break
            case 11: 
                generateReport()
            default:
                console.log("Opcion invalida, por favor elija una opcion del menu")
        }
    }
}

main()
