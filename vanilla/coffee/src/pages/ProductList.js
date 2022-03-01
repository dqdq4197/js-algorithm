import Product from "../components/Product.js";
import request from "../utils/request.js";
import { routerChange } from "../utils/router.js";

function ProductList({ $app }) {
  this.state = {
    products: [],
  };

  this.$target = document.createElement("div");
  this.$target.className = "ProductListPage";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const init = async () => {
    try {
      const items = await request();

      this.setState({
        ...this.state,
        products: items,
      });
    } catch (e) {
      throw new Error("init Error 발생");
    }
  };

  this.render = () => {
    const $items = this.state.products
      .map((item) => {
        const product = new Product({
          initialState: item,
        });

        return product.render();
      })
      .join("");

    this.$target.innerHTML = `<h1>상품목록</h1><ul>${$items}</ul>`;
  };

  this.$target.addEventListener("click", (e) => {
    const $product = e.target.closest(".Product");

    if ($product) {
      const { productId } = $product.dataset;

      routerChange(`/web/products/${productId}`);
    }
  });

  init();
}

export default ProductList;
