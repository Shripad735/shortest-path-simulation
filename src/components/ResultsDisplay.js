import React from 'react';

function ResultsDisplay({ path, visited }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-2">Results</h2>
      <p>Path length: {path.length}</p>
      <p>Nodes visited: {visited.length}</p>
    </div>
  );
}

export default ResultsDisplay;