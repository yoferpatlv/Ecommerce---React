require('dotenv').config()

const { connect, disconnect, Types: { ObjectId }, } = require("mongoose");
const { Product} = require("../../../models");
const { NotFoundError } = require("errors");
const retrieveProduct = require(".");

const { MONGO_URL_TEST } = process.env;

describe("retrieveProduct", () => {
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
      img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
      type:'shoes',
      categ:'men'
    })
    const product2 = new Product({
      name: 'airMax270',
      sku: 'nkh1244',
      price: 140,
      discount: 0,
      stock: 116,
      img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
      type:'shoes',
      categ:'men'
    })
    const product3 = new Product({
      name: 'airJordan',
      sku: 'nkh1344',
      price: 190,
      discount: 0,
      stock: 118,
      img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
      type:'shoes',
      categ:'men'
    })

    return Promise.all([product1.save(), product2.save(), product3.save()])
      .then(([product1, product2, product3]) =>
        retrieveProduct()
          .then((products) => {
            // console.log(products)
            expect(products).toHaveLength(3);
      
            expect(products[0].name).toEqual('airMax90')
            expect(products[0].sku).toEqual('nkh1144')
            expect(products[0].price).toEqual(150)
            expect(products[0].discount).toEqual(0)
            expect(products[0].stock).toEqual(114)
            expect(products[0].type).toEqual('shoes')
            expect(products[0].categ).toEqual('men')

            expect(products[1].name).toEqual('airMax270')
            expect(products[1].sku).toEqual('nkh1244')
            expect(products[1].price).toEqual(140)
            expect(products[1].discount).toEqual(0)
            expect(products[1].stock).toEqual(116)
            expect(products[1].type).toEqual('shoes')
            expect(products[1].categ).toEqual('men')

            expect(products[2].name).toEqual('airJordan')
            expect(products[2].sku).toEqual('nkh1344')
            expect(products[2].price).toEqual(190)
            expect(products[2].discount).toEqual(0)
            expect(products[2].stock).toEqual(118)
            expect(products[2].type).toEqual('shoes')
            expect(products[2].categ).toEqual('men')

          })
      );
  });


  it("fails on non-existing Product", () => {
    // unhappy path
    const productId = new ObjectId().toString();
    const productId2 = new ObjectId().toString();
    return retrieveProduct([productId,productId2])
    // console.log(retrieveProduct())
    
      .catch((error) => {
       
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual(`product with id ${productId} not found`);
      });
  });

  afterAll(() => disconnect());
});