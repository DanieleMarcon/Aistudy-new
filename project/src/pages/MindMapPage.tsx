import React, { useState } from 'react';
import { Maximize, Minimize, ZoomIn, ZoomOut, Map } from 'lucide-react';
import '../styles/MindMapPage.css';

interface MapNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  children: string[];
}

interface MapData {
  nodes: { [key: string]: MapNode };
  rootId: string;
}

const MindMapPage: React.FC = () => {
  // Mock mindmap data
  const initialMapData: MapData = {
    rootId: 'root',
    nodes: {
      'root': {
        id: 'root',
        label: 'La Fotosintesi',
        description: 'Processo utilizzato dalle piante per convertire la luce solare in energia chimica.',
        x: 0,
        y: 0,
        children: ['light', 'chlorophyll', 'products']
      },
      'light': {
        id: 'light',
        label: 'Luce solare',
        description: 'Fonte di energia per il processo di fotosintesi. Le piante catturano l\'energia luminosa attraverso le foglie.',
        x: -200,
        y: -100,
        children: ['wavelength']
      },
      'wavelength': {
        id: 'wavelength',
        label: 'Lunghezza d\'onda',
        description: 'Le piante assorbono principalmente le lunghezze d\'onda rosse e blu, riflettendo il verde.',
        x: -300,
        y: -50,
        children: []
      },
      'chlorophyll': {
        id: 'chlorophyll',
        label: 'Clorofilla',
        description: 'Pigmento verde nelle foglie che assorbe la luce solare e permette la fotosintesi.',
        x: 0,
        y: -120,
        children: ['chloroplasts']
      },
      'chloroplasts': {
        id: 'chloroplasts',
        label: 'Cloroplasti',
        description: 'Organelli cellulari che contengono la clorofilla e svolgono la fotosintesi.',
        x: 100,
        y: -180,
        children: []
      },
      'products': {
        id: 'products',
        label: 'Prodotti',
        description: 'I risultati del processo di fotosintesi che sostengono la vita della pianta.',
        x: 200,
        y: -50,
        children: ['glucose', 'oxygen']
      },
      'glucose': {
        id: 'glucose',
        label: 'Glucosio',
        description: 'Zucchero prodotto durante la fotosintesi, usato come fonte di energia per la pianta.',
        x: 300,
        y: -100,
        children: []
      },
      'oxygen': {
        id: 'oxygen',
        label: 'Ossigeno',
        description: 'Gas rilasciato nell\'atmosfera come sottoprodotto della fotosintesi.',
        x: 250,
        y: 50,
        children: []
      }
    }
  };

  const [mapData] = useState<MapData>(initialMapData);
  const [selectedNode, setSelectedNode] = useState<string>(mapData.rootId);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Calculate connections between nodes
  const connections = Object.values(mapData.nodes).flatMap(node => 
    node.children.map(childId => ({
      from: node.id,
      to: childId,
      fromX: node.x,
      fromY: node.y,
      toX: mapData.nodes[childId].x,
      toY: mapData.nodes[childId].y
    }))
  );

  return (
    <div className={`mind-map-page ${isFullscreen ? 'fullscreen' : ''}`}>
      <section className="header-section">
        <h1>Mappa Mentale</h1>
        <p>Visualizza concetti e collegamenti in modo interattivo</p>
      </section>

      <section className="map-controls">
        <div className="zoom-controls">
          <button onClick={zoomOut} disabled={zoomLevel <= 0.6}>
            <ZoomOut size={20} />
          </button>
          <span>{Math.round(zoomLevel * 100)}%</span>
          <button onClick={zoomIn} disabled={zoomLevel >= 2}>
            <ZoomIn size={20} />
          </button>
        </div>
        <button className="fullscreen-button" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </section>

      <section className="map-container">
        <div 
          className="mindmap" 
          style={{ 
            transform: `scale(${zoomLevel})`,
            height: isFullscreen ? '80vh' : '500px' 
          }}
        >
          {/* Draw connections first so they appear behind nodes */}
          <svg className="connections">
            {connections.map((conn, index) => (
              <g key={`conn-${index}`}>
                <line
                  x1={conn.fromX + 400} // Center offset
                  y1={conn.fromY + 250}
                  x2={conn.toX + 400}
                  y2={conn.toY + 250}
                  stroke="#888"
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>

          {/* Render nodes */}
          {Object.values(mapData.nodes).map(node => (
            <div
              key={node.id}
              className={`map-node ${selectedNode === node.id ? 'selected' : ''}`}
              style={{
                left: `${node.x + 400}px`, // Center offset
                top: `${node.y + 250}px`
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              {node.label}
            </div>
          ))}
        </div>
      </section>

      {selectedNode && (
        <section className="node-details">
          <div className="detail-card">
            <h2>{mapData.nodes[selectedNode].label}</h2>
            <p>{mapData.nodes[selectedNode].description}</p>
            
            {mapData.nodes[selectedNode].children.length > 0 && (
              <div className="related-concepts">
                <h3>Concetti correlati:</h3>
                <ul>
                  {mapData.nodes[selectedNode].children.map(childId => (
                    <li key={childId} onClick={() => handleNodeClick(childId)}>
                      {mapData.nodes[childId].label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="map-instructions">
        <div className="instruction-card">
          <Map size={24} />
          <h3>Come usare la mappa</h3>
          <ul>
            <li>Clicca su un nodo per vedere i dettagli</li>
            <li>Usa i controlli di zoom per ingrandire o ridurre</li>
            <li>Clicca sui concetti correlati per navigare la mappa</li>
            <li>Usa il pulsante di schermo intero per una visualizzazione migliore</li>
            <li>Prova ad esporre la mappa ad alta voce a parole tue</li>
            <li>Ripeti le definizioni dei concetti a voce alta</li>
            <li>Quando sei pronto usa la funzione specchio per avere un feedback</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MindMapPage;