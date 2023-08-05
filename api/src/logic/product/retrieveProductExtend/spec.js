require('dotenv').config()

const { connect, disconnect, Types: { ObjectId }, } = require("mongoose");
const { Product } = require("../../../models");
const { NotFoundError,TypeError } = require("errors");
const retrieveProduct = require(".");
const retrieveProductExtend = require('.');

const { MONGO_URL_TEST } = process.env;

describe("retrieveProductExtend", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  beforeEach(() => Promise.all([Product.deleteMany()]));

  it("succeeds on existing Product", () => {
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


    return Promise.all([product1.save()])
      .then(() => {
        return Product.find()
          .then((products) => {
            _product = products[0]

             return retrieveProductExtend(_product.id)
              .then((product) => {
                // console.log(product)

                expect(product.name).toEqual('airMax90')
                expect(product.sku).toEqual('nkh1144')
                expect(product.price).toEqual(150)
                expect(product.discount).toEqual(0)
                expect(product.stock).toEqual(114)
                expect(product.type).toEqual('shoes')
                expect(product.categ).toEqual('men')

              })
          
        })
      })
  })


  it("fails on non-existing Product", () => {
    // unhappy path
    const productId = new ObjectId();

    return retrieveProductExtend(productId)
      // console.log(retrieveProduct())

      .catch((error) => {
        //TODO arreglar 
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual(`product with id ${productId} not found`);
      });
  });

  afterAll(() => disconnect());
});