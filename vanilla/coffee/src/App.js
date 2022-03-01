import ProductList from "./pages/ProductList.js";
import ProductDetail from "./pages/ProductDetail.js";
import Cart from "./pages/Cart.js";
import { initRoute } from "./utils/router.js";

function App({ $app }) {
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/web/") {
      new ProductList({ $app }).render();
    } else if (pathname.indexOf("products") !== -1) {
      const [, productId] = pathname.split("products/");
      new ProductDetail({ $app, productId });
    }
  };

  initRoute(this.route);
  window.addEventListener("popstate", this.state);
  this.route();
}

export default App;
