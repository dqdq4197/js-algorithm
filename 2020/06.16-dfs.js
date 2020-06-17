var graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('X');
graph.insertVertex('G');
graph.insertVertex('H');
graph.insertVertex('P');
graph.insertVertex('E');
graph.insertVertex('Y');
graph.insertVertex('M');
graph.insertVertex('J');
insertTwoWayArc(graph, 1, 'A', 'X');
insertTwoWayArc(graph, 1, 'X', 'G');
insertTwoWayArc(graph, 1, 'X', 'H');
insertTwoWayArc(graph, 1, 'G', 'H');
insertTwoWayArc(graph, 1, 'G', 'P');
insertTwoWayArc(graph, 1, 'H', 'E');
insertTwoWayArc(graph, 1, 'H', 'P');
insertTwoWayArc(graph, 1, 'E', 'M');
insertTwoWayArc(graph, 1, 'E', 'Y');
insertTwoWayArc(graph, 1, 'Y', 'M');
insertTwoWayArc(graph, 1, 'M', 'J');

Graph.prototype.dfs = function() {
    var stack = new Stack();
    var temp = this.first;
    while (temp) {
      temp.inTree = false;
      temp = temp.next;
    }
    temp = this.first;
    stack.push(temp); // 스택에 첫 버텍스를 넣음
    temp.inTree = true;
    while (stack.count) { // 탐색을 완료할 때까지
      temp = stack.pop(); // 넣었던 버텍스를 하나씩 꺼냄
      console.log(temp.key);
      temp.inTree = true;
      var arc = temp.arc;
      while (arc) {
        if (!arc.destination.inTree) {
          stack.push(arc.destination); // 꺼낸 것과 연결된 버텍스들을 스택에 넣음
          arc.destination.inTree = true;
        }
        arc = arc.nextArc;
      }
    }
  };
  
  graph.dfs(); // A, X, H, P, E, Y, M, J, G

  