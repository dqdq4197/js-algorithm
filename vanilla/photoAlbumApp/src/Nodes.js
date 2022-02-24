function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemp = this.state.nodes
        .map((node) => {
          const iconPath = `./assets/${
            node.type === "DIRECTORY" ? "directory.png" : "file.png"
          }`;

          return `
            <div class="Node" data-node-id="${node.id}">
              <img src="${iconPath}" />
              <div>${node.name}</div>
            </div>
          `;
        })
        .join("");

      this.$target.innerHTML = this.state.isRoot
        ? nodesTemp
        : `<div class="Node">
            <img src="./assets/prev.png" />
          </div>${nodesTemp}`;
    }
  };

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;

      if (!nodeId) {
        this.onBackClick();
        return;
      }
      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (selectedNode) {
        onClick(selectedNode);
      }
    }
  });
}

export default Nodes;
