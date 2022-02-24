const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

function ImageView({ $app, url, onClose }) {
  this.url = url;
  this.onClose = onClose;

  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";
  this.$target.addEventListener("click", (e) => {
    const targetClassName = e.target.className;
    if (targetClassName.indexOf("ImageViewer") !== -1) {
      onClose();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (this.url && e.code === "Escape") {
      onClose();
    }
  });
  $app.appendChild(this.$target);

  this.setUrl = (newUrl) => {
    this.url = newUrl;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="content">${
      this.url ? `<img src="${IMAGE_PATH_PREFIX}${this.url}">` : ""
    }</div>`;

    this.$target.style.display = this.url ? "block" : "none";
  };

  this.render();
}

export default ImageView;
