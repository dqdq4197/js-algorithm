import Breadcrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import LoadingView from "./LoadingView.js";
import Nodes from "./Nodes.js";
import { request } from "./api.js";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    isLoading: false,
    selectedImage: null,
  };

  const loadingView = new LoadingView({
    $app,
    isLoading: this.state.isLoading,
  });

  const breadcrumb = new Breadcrumb({
    $app,
    depth: this.state.depth,
  });

  const imageView = new ImageView({
    $app,
    url: this.state.selectedImage,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImage: null,
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
      selectedImage: this.state.selectedImage,
    },
    onClick: async (node) => {
      try {
        if (node.type !== "FILE") {
          this.setState({
            ...this.state,
            isLoading: true,
          });
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            isLoading: false,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else {
          // 이미지 보기.
          this.setState({
            ...this.state,
            selectedImage: node.filePath,
          });
        }
      } catch (e) {
        console.log(`error 발생! ${e}`);
        throw new Error("Erorr");
      }
    },
    onBackClick: async () => {
      const nextState = { ...this.state };
      nextState.depth.pop();

      const prevNodeId =
        nextState.depth.length === 0 ? null : nextState.depth.slice(-1)[0].id;
      if (!prevNodeId) {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        const rootNodes = await request();
        this.setState({
          ...this.state,
          isLoading: false,
          isRoot: true,
          nodes: [...rootNodes],
        });
      } else {
        const prevNode = request(prevNodeId);

        this.setState({
          ...this.state,
          isRoot: false,
          nodes: prevNode,
        });
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    loadingView.setState(this.state.isLoading);
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setUrl(this.state.selectedImage);
  };

  const init = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isLoading: false,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      throw new Error("error 발생");
    }
  };

  init();
}

export default App;
