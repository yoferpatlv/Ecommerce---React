# E-commerce App
![](https://media.giphy.com/media/VGoAzphxf599Gz8a5F/giphy.gif)

Esta aplicación es una tienda virtual (E-commerce)

## Functional Description
Puedes encontrar productos por categoría y los más comprados, también te proporciona un buscador, y para poder comprar un producto, primero debes agregar el producto al carrito.
<!-- 
You can find products by category and the most purchased, it also provides you with a search engine, and in order to buy a product, you must first add the product to the cart. -->
###  Use Cases

Anonymous (unregistered user)
- view most popular products        -DONE
- search products                   -DONE
- view product                      -DONE
- add to / remove from / update cart ...
- checkout (order)

<!-- Client (registered user)
- idem Anonymous
- add to / view wishlist
- update profile info (personal, addresss, payment methods, ...)
- pay now
- view / manage orders (list, cancel "in progress" orders, ...)

Admin
- update stock (products)
- manage orders (status, ...)
- manage users (delete, update, ...) -->

Admin (super user)

### Use Case Diagram
![](https://i.postimg.cc/PJWkknNy/Captura-de-pantalla-2022-09-22-112330.png)

### Flows
    
### UI Design

## Technical Description



### Blocks

### Data Model

User *
- id: ObjectId
- name (optional when 'anonymous')
- email (optional when 'anonymous')
- password (optional when 'anonymous')
- role: string (enum: ['anonymous', 'client', 'admin'])
- cart: Cart

Product *
- id: ObjectId
- sku: string
- price: number
- discount: number (optional)
- stock: number

Item (embedded)*
- id: ObjectId
- product: ObjectId
- price: number
- qty: number (default 1)

Cart (embedded)*
- id: ObjectId
- items: [Item]

Address (embedded)
- id: ObjectId
- fullname
- address
- passport

Order
- id: ObjectId
- user: ObjectId
- cart: Cart
- date
- paymentAddress: Address
- shippingAddress: Address
- paymentMethod: string (enum ['credit card', 'paypal', ...])

### Sequence
### Components
### Code Coverage (Testing)
### Technologies

## Roadmap

Sprint 0

- DONE figma
- DONE data model
- DONE data model to mongoose
- DONE populate data
- TODO implement users logic
- TODO implement users api routes
- TODO figma to react
- TODO ...

Sprint 1

- TODO implement admin functionalities

Sprint 2

- TODO ...

Sprint 3

- TODO ...