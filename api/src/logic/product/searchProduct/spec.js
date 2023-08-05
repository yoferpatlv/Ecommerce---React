require('dotenv').config()

const { connect, disconnect, Types: { ObjectId },default:mongoose } = require("mongoose");
const { Product, Item, Cart } = require("../../../models");
const { NotFoundError } = require("errors");
const searchProduct = require(".");

const { MONGO_URL_TEST } = process.env;

describe("searchProduct", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  // beforeEach(() => Promise.all([Product.deleteMany()]));
  beforeEach(()=> mongoose.connection.db.dropDatabase())

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
      name: 'airMaxJordan',
      sku: 'nkh1344',
      price: 190,
      discount: 0,
      stock: 118,
      img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
      type:'shoes',
      categ:'men'
    })
    const query = 'airMax90'

    return Promise.all([product1.save(), product2.save(), product3.save()])
      .then(([product1, product2, product3]) =>
        searchProduct(query)
          .then((products) => {
            expect(products).toHaveLength(1);
      
            expect(products[0].name).toEqual('airMax90')
            expect(products[0].sku).toEqual('nkh1144')
            expect(products[0].price).toEqual(150)
            expect(products[0].discount).toEqual(0)
            expect(products[0].stock).toEqual(114)
            expect(products[0].img).toEqual('https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg')
            expect(products[0].type).toEqual('shoes')
            expect(products[0].categ).toEqual('men')

          })
      );
  });

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
      name: 'airMaxJordan',
      sku: 'nkh1344',
      price: 190,
      discount: 0,
      stock: 118,
      img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg',
      type:'shoes',
      categ:'men'
    })


    return Promise.all([product1.save(), product2.save(), product3.save()]).then(
      ([product1, product2, product3]) =>
        searchProduct('air')
          .then((Product) => {
            expect(Product).toHaveLength(3);

          })
    );
  });


  it("fails on non-existing Product", () => {
    // unhappy path
    const productId = new ObjectId().toString();

    return searchProduct(productId)
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual(`product with id ${productId} not found`);
      });
  });

  afterAll(() => disconnect());
});