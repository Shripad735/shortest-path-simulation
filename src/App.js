import React, { useState, useCallback } from 'react';
import Map from './components/Map';
import AlgorithmSelector from './components/AlgorithmSelector';
import ResultsDisplay from './components/ResultsDisplay';
import AlgorithmInfo from './components/AlgorithmInfo';
import { useBFS, useDFS, useDijkstra } from './hooks/algorithmHooks';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const bfs = useBFS();
  const dfs = useDFS();
  const dijkstra = useDijkstra();

  const updatePath = useCallback((newPath) => {
    setPath(newPath);
  }, []);

  const updateVisited = useCallback((newVisited) => {
    setVisited(newVisited);
  }, []);

  const runAlgorithm = async () => {
    if (!startNode || !endNode || isRunning) return;

    setPath([]);
    setVisited([]);
    setIsRunning(true);

    switch (selectedAlgorithm) {
      case 'bfs':
        await bfs(startNode, endNode, updatePath, updateVisited);
        break;
      case 'dfs':
        await dfs(startNode, endNode, updatePath, updateVisited);
        break;
      case 'dijkstra':
        await dijkstra(startNode, endNode, updatePath, updateVisited);
        break;
      default:
        break;
    }

    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 py-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          Shortest Path Algorithams Simulation
        </h1>
        <div className="flex flex-col md:flex-row p-6 gap-8">
          <div className="flex-1">
            <Map
              startNode={startNode}
              endNode={endNode}
              setStartNode={setStartNode}
              setEndNode={setEndNode}
              path={path}
              visited={visited}
            />
          </div>
          <div className="flex-1 space-y-6">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              setSelectedAlgorithm={setSelectedAlgorithm}
            />
            <button
              onClick={runAlgorithm}
              disabled={isRunning}
              className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:ring-green-400'
              }`}
            >
              {isRunning ? 'Running...' : 'Run Algorithm'}
            </button>
            <ResultsDisplay path={path} visited={visited} />
            <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
            {/* add copyright to the bottom like copyright symbol with name Shripad SK  */}
            <div className="text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Shripad SK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;