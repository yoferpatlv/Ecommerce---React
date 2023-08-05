require('dotenv').config()

const { connect, disconnect, Types: { ObjectId }, default: mongoose } = require("mongoose");
const { Product, Item, Cart,User } = require("../../../models");
const { NotFoundError } = require("errors");
const addItemToCart = require(".");
const addItemToCart = require('.');

const { MONGO_URL_TEST } = process.env;

describe("addItemToCart", () => {
    beforeAll(() => connect(MONGO_URL_TEST));

    // beforeEach(() => Promise.all([Product.deleteMany()]));
    beforeEach(() => mongoose.connection.db.dropDatabase())

    it("succeeds on existing Product", () => {
        // happy path

        const product1 = new Product({
            name: 'Nike Air Max 90',
            sku: 'nkh1144',
            price: 150,
            discount: 0,
            stock: 114,
            img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b5eba256-ef26-45d1-852f-c1992be17a3e/air-max-90-zapatillas-PTBWZ5.png',
            type: 'shoes',
            categ: 'men',
            gallery: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b5eba256-ef26-45d1-852f-c1992be17a3e/air-max-90-zapatillas-PTBWZ5.png'
                ,
                'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/h5jqhhyekxesgqfxwgpj/offcourt-mens-slides-Xkb8kb.png'

            ],
            nivel:5
        })

        return Promise.all([product1.save()])
            .then(([product1]) => {
                const item1 = new Item({
                    product: product1.id,
                    price: 180,
                    qty: 1
                })
                const cart1 = new Cart({
                    items: [item1]
                })
                const pepito = new User({
                    // role:'anonymous'
                    cart: cart1
                })

                // addItemToCart(cart1)
                
                 addItemToCart(userId, productId, price, qty)
                    .then((cart1) => {
                        expect(items).toHaveLength(1);

                       

                    })
            });
    });

    xit("succeeds on existing Product", () => {
        // happy path

        const product1 = new Product({
            name: 'airMax90',
            sku: 'nkh1144',
            price: 150,
            discount: 0,
            stock: 114,
            img: 'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
            type: 'shoes',
            categ: 'men'
        })
        const product2 = new Product({
            name: 'airMax270',
            sku: 'nkh1244',
            price: 140,
            discount: 0,
            stock: 116,
            img: 'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
            type: 'shoes',
            categ: 'men'
        })
        const product3 = new Product({
            name: 'airMaxJordan',
            sku: 'nkh1344',
            price: 190,
            discount: 0,
            stock: 118,
            img: 'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
            type: 'shoes',
            categ: 'men'
        })


        return Promise.all([product1.save(), product2.save(), product3.save()]).then(
            ([product1, product2, product3]) =>
                addItemToCart(userId, productId, price, qty)
                    .then((Product) => {
                        expect(Product).toHaveLength(3);

                    })
        );
    });


    it("fails on non-existing Product", () => {
        // unhappy path
        const productId = new ObjectId().toString();

        return addItemToCart(productId)
            .catch((error) => {
                expect(error).toBeInstanceOf(NotFoundError);
                expect(error.message).toEqual(`product with id ${productId} not found`);
            });
    });

    afterAll(() => disconnect());
});