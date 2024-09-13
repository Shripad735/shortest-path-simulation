import React from 'react';

function AlgorithmSelector({ selectedAlgorithm, setSelectedAlgorithm }) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Select Algorithm</h2>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="bfs">Breadth-First Search (BFS)</option>
        <option value="dfs">Depth-First Search (DFS)</option>
        <option value="dijkstra">Dijkstra's Algorithm</option>
      </select>
    </div>
  );
}

export default AlgorithmSelector;