/* 
   Filename: complex_code.js
   Description: This code demonstrates a complex algorithm for finding the shortest path
                between two nodes in a graph using Dijkstra's algorithm.
*/

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, new Map());
  }

  addEdge(source, destination, weight) {
    this.nodes.get(source).set(destination, weight);
    this.nodes.get(destination).set(source, weight);
  }

  dijkstra(source) {
    const distances = new Map();
    const visited = new Set();
    const previous = new Map();
    const infinity = Number.MAX_SAFE_INTEGER;

    for (let node of this.nodes.keys()) {
      distances.set(node, infinity);
    }
    distances.set(source, 0);

    while (visited.size !== this.nodes.size) {
      let currentNode = this.getMinDistanceNode(distances, visited);
      visited.add(currentNode);
    
      for (let [neighbor, weight] of this.nodes.get(currentNode)) {
        let pathDistance = distances.get(currentNode) + weight;
  
        if (pathDistance < distances.get(neighbor)) {
          distances.set(neighbor, pathDistance);
          previous.set(neighbor, currentNode);
        }
      }
    }

    return { distances, previous };
  }

  getMinDistanceNode(distances, visited) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let minNode = null;

    for (let [node, distance] of distances) {
      if (!visited.has(node) && distance <= minDistance) {
        minDistance = distance;
        minNode = node;
      }
    }

    return minNode;
  }
}

// Create a graph
const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("B", "D", 1);
graph.addEdge("C", "D", 5);
graph.addEdge("D", "E", 7);

// Calculate the shortest path from "A" to "E"
const { distances, previous } = graph.dijkstra("A");

console.log("Shortest Path:", getPath("E"));

function getPath(destination) {
  let path = [];
  let current = destination;

  while (current !== "A") {
    path.unshift(current);
    current = previous.get(current);
  }

  path.unshift("A");
  return path.join(" -> ");
}