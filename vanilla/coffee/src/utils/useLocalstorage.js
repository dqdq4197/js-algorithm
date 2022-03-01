const KEY = "products_cart";

function useLocalstorage() {
  this.set = (value) => {
    localStorage.setItem(KEY, value);
  };

  this.get = () => {
    localStorage.getItem(KEY);
  };

  this.remove = () => {
    localStorage.removeItem(KEY);
  };
}

export default useLocalstorage;
