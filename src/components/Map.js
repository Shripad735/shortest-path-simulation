import React from 'react';

const gridSize = 10;

function Map({ startNode, endNode, setStartNode, setEndNode, path, visited }) {
  const handleNodeClick = (x, y) => {
    if (!startNode) {
      setStartNode({ x, y });
    } else if (!endNode) {
      setEndNode({ x, y });
    }
  };

  const getNodeClass = (x, y) => {
    const baseClass = 'w-12 h-12 border border-gray-200 cursor-pointer rounded-lg transform transition-all duration-300 ease-in-out hover:scale-110 ';
    
    if (startNode && startNode.x === x && startNode.y === y) {
      return baseClass + 'bg-gradient-to-r from-green-400 to-green-600 animate-pulse';
    }
    if (endNode && endNode.x === x && endNode.y === y) {
      return baseClass + 'bg-gradient-to-r from-red-400 to-red-600 animate-pulse';
    }
    if (path.some(node => node.x === x && node.y === y)) {
      return baseClass + 'bg-gradient-to-r from-yellow-300 to-yellow-500 animate-bounce';
    }
    if (visited.some(node => node.x === x && node.y === y)) {
      return baseClass + 'bg-gradient-to-r from-blue-300 to-blue-500 animate-fade-in';
    }
    return baseClass + 'bg-white hover:bg-gray-100';
  };

  return (
    <div className="grid grid-cols-10 gap-1 border-4 border-purple-500 rounded-lg p-4 bg-purple-100 shadow-lg">
      {[...Array(gridSize)].map((_, y) => (
        <React.Fragment key={y}>
          {[...Array(gridSize)].map((_, x) => (
            <div
              key={`${x}-${y}`}
              className={getNodeClass(x, y)}
              onClick={() => handleNodeClick(x, y)}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Map;