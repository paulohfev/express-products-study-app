const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // this -> refers to the object being saved: { title: string }
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}
