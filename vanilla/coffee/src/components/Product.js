function Product({ initialState }) {
  this.state = initialState;

  this.render = () => {
    const $item = `
          <li class="Product" data-product-id=${this.state.id}>
              <img src="${this.state.imageUrl}">
              <div class="Product__info">
                <div>${this.state.name}</div>
                <div>${this.state.price.toLocaleString()}원~</div>
              </div>
          </li>
      `;
    return $item;
  };
}

export default Product;
