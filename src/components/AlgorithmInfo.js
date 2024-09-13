import React from 'react';

const algorithmInfo = {
  bfs: {
    name: "Breadth-First Search (BFS)",
    description: "BFS explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
    properties: [
      "Guaranteed to find the shortest path in an unweighted graph",
      "Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges",
      "Space Complexity: O(V)"
    ]
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    description: "DFS explores as far as possible along each branch before backtracking.",
    properties: [
      "Not guaranteed to find the shortest path",
      "Time Complexity: O(V + E)",
      "Space Complexity: O(V)"
    ]
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm finds the shortest path between nodes in a graph, which may represent, for example, road networks.",
    properties: [
      "Guaranteed to find the shortest path in a weighted graph with non-negative weights",
      "Time Complexity: O((V + E) log V) with a binary heap",
      "Space Complexity: O(V)"
    ]
  }
};

function AlgorithmInfo({ selectedAlgorithm }) {
  const info = algorithmInfo[selectedAlgorithm];

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">{info.name}</h3>
      <p className="mb-2">{info.description}</p>
      <ul className="list-disc pl-5">
        {info.properties.map((prop, index) => (
          <li key={index} className="mb-1">{prop}</li>
        ))}
      </ul>
    </div>
  );
}

export default AlgorithmInfo;