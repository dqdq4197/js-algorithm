import request from "../utils/request.js";

function ProductDetail({ $app, productId }) {
  this.state = {
    productId,
    product: localStorage.get("sd") ? localStorage.get("sd") : [],
    selectedProducts: [],
  };

  this.$target = document.createElement("div");
  this.$target.className = "ProductDetailPage";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state.selectedProducts[0]);
    this.render();
  };

  this.setState(this.state);

  this.onSelectChange = (e) => {
    console.log(e);
  };

  this.$target.addEventListener("click", (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === "SELECT") {
      const optionId = parseInt(e.target.value, 10);

      const { product, selectedProducts } = this.state;
      const option = product.productOptions.find(
        (option) => option.id === optionId
      );
      const selectedOption = selectedProducts.find(
        (product) => product.id === optionId
      );

      if (option && !selectedOption) {
        const selectedProducts = [
          ...this.state.selectedProducts,
          {
            id: product.id,
            optionId,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        this.setState({
          ...this.state,
          selectedProducts: selectedProducts,
        });
      }
    }

    if (e.target.tagName === "INPUT") {
      const { optionId } = e.target.dataset;
      const value = parseInt(e.target.value, 10);

      const nextSelectedProducts = [...this.state.selectedProducts];
      const product = this.state.selectedProducts.find(
        (product) => product.id === +optionId
      );
      console.log(value, value < 0);
      if (value < 0 || product.stock < value) return;
      console.log(value < 0 || product.stock < value);
      const selectedOptionIndex = nextSelectedProducts.findIndex(
        (product) => product.id === +optionId
      );
      nextSelectedProducts[selectedOptionIndex].quantity = value;

      this.setState({
        ...this.state,
        selectedProducts: nextSelectedProducts,
      });
    }
  });

  this.render = () => {
    const { imageUrl, name, price, productOptions } = this.state.product;
    console.log(this.state.product);
    this.$target.innerHTML = `
        <h1>${name} 상품 정보</h1>
        <div class="ProductDetail">
          <img src="${imageUrl}">
          <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price">${price.toLocaleString()}원~</div>
            <select>
              <option>선택하세요.</option>
              ${productOptions.map(
                (option) => `
                    <option value=${option.id} ${
                  !option.stock ? "disabled" : ""
                } />
                        ${renderOption(option, name)}
                    </option>
                `
              )}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
              <ul>
                ${this.state.selectedProducts.map((product) => {
                  return `
                        <li>
                            ${name} ${product.optionName} ${(
                    product.optionPrice * product.quantity
                  ).toLocaleString()}원
                            <div>
                                <input type="number" data-option-id=${
                                  product.id
                                } value=${product.quantity}>개
                            </div>
                        </li>
                    `;
                })}
              </ul>
              <div class="ProductDetail__totalPrice">175,000원</div>
              <button class="OrderButton">주문하기</button>
            </div>
          </div>
        </div>
    `;
  };

  const renderOption = (option, productName) => {
    const { name, price, stock } = option;

    if (!stock) {
      return `(품절) ${productName} ${name}`;
    }

    if (price > 0) {
      return `${productName} ${name} (+${price.toLocaleString()})원`;
    }

    return `${productName} ${name}`;
  };

  const init = async () => {
    try {
      const product = await request(this.state.productId);

      this.setState({
        ...this.state,
        product,
      });
    } catch (e) {
      throw new Error("init Error 발생");
    }
  };

  init();
}

export default ProductDetail;
