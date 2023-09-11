function calculateTotalPriceAll(cartItems){
     // Calcula totalPriceAll sumando los totalPrices de todos los items
     const totalPriceAll = cartItems.reduce((total, item) => total + item.totalPrice, 0)
     return totalPriceAll
}

module.exports = calculateTotalPriceAll 