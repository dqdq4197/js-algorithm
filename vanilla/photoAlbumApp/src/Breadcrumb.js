function Breadcrumb({ $app, depth }) {
  this.depth = depth;

  this.$target = document.createElement("div");
  this.$target.className = "Breadcrumb";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.depth = nextState;
    this.render();
  };

  this.render = () => {
    const items = this.depth
      .map((node) => {
        return `<div>${node.name}</div>`;
      })
      .join("");

    this.$target.innerHTML = `<div class="nav-item">root</div>${items}`;
  };
}

export default Breadcrumb;
