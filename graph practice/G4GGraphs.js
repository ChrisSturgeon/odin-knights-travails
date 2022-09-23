// Create the Queue class

class Queue {
  constructor() {
    this.items = [];
  }

  // Adds element to the end of the queue array
  enqueue = function (element) {
    this.items.push(element);
  };

  // removes AND returns the first item in the queue array or underflow if empty
  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }

  // Returns the front element of the queue
  front() {
    if (this.isEmpty()) {
      return 'No elements in queue';
    }
    return this.items[0];
  }

  // Returns true is the items array is empty
  isEmpty() {
    return this.items.length == 0;
  }
}

// Create the graph class
class Graph {
  // Define the vertex array and the adjacent list
  constructor(noOfVerticies) {
    this.noOfVerticies = noOfVerticies;
    this.adjList = new Map();
  }

  // Functions to be implemented

  // adds vertex to the graph
  addVertex(v) {
    // initialise the adjacent list with a null array
    this.adjList.set(v, []);
  }

  // Adds edge between v and w, and also w and v becuase it's an undirected graph
  addEdge(v, w) {
    // get the adjacent list for v and add in vertex w
    this.adjList.get(v).push(w);

    // get the adjacent list for w and add in vertex v
    this.adjList.get(w).push(v);
  }

  // Prints the vertex and adjacent lists
  printGraph() {
    // get all the verticies in the graph map
    const allKeys = this.adjList.keys();

    // iterate over each vertex
    for (let i of allKeys) {
      // get adjacent list for the vertex
      const allValues = this.adjList.get(i);
      let edgeString = '';

      // iterate over the adjacent list and concat values into string
      for (let j of allValues) {
        edgeString = +j + ' ';
      }

      // Print the vertex and its list
      console.log(`${i} ---> ${allValues}`);
    }
  }

  // Performs bread-first-traversal search on graph
  bfs(startNode) {
    // Create an object to store visited nodes
    const visitedNodes = {};

    // Create queue object
    const queue = new Queue();

    // Add the start node to the queue
    visitedNodes[startNode] = true;
    queue.enqueue(startNode);

    // Loop until the queue is empty
    while (!queue.isEmpty()) {
      // Get first element in queue
      let currentNode = queue.dequeue();

      // Get adjacent edge list for the current vertex
      const edgeList = this.adjList.get(currentNode);

      // Loop through the list and add the elements to the queue if not already processed
      for (let i in edgeList) {
        let neighbour = edgeList[i];

        if (!visitedNodes[neighbour]) {
          visitedNodes[neighbour] = true;
          queue.enqueue(neighbour);
        }
      }
    }
    console.log(visitedNodes);
  }

  // dfs(v)
}

const myGraph = new Graph(6);
const verticies = ['A', 'B', 'C', 'D', 'E', 'F'];

verticies.forEach((vertex) => {
  myGraph.addVertex(vertex);
});

myGraph.addEdge('A', 'B');
myGraph.addEdge('A', 'D');
myGraph.addEdge('A', 'E');
myGraph.addEdge('B', 'C');
myGraph.addEdge('D', 'E');
myGraph.addEdge('E', 'F');
myGraph.addEdge('E', 'C');
myGraph.addEdge('C', 'F');

myGraph.printGraph();
