import './CuboidVisualizer.css';

interface Props {
  isWhole_lb: boolean;
  isWhole_lh: boolean;
  isWhole_bh: boolean;
  isWhole_lbh: boolean;
}

export const CuboidVisualizer = ({ isWhole_lb, isWhole_lh, isWhole_bh, isWhole_lbh }: Props) => (
  <div className="visualizer">
    <svg viewBox="0 0 320 220" role="img" aria-label="Cuboid with diagonals">
      <g className="cube-frame">
        <rect x="80" y="70" width="140" height="110" className="edge" />
        <rect x="130" y="35" width="140" height="110" className="edge" />
        <line x1="80" y1="70" x2="130" y2="35" className="edge" />
        <line x1="220" y1="70" x2="270" y2="35" className="edge" />
        <line x1="220" y1="180" x2="270" y2="145" className="edge" />
        <line x1="80" y1="180" x2="130" y2="145" className="edge" />
      </g>

      <g className="diagonals">
        <line x1="80" y1="180" x2="270" y2="145" className={`diag diag--lb ${isWhole_lb ? 'diag--whole' : 'diag--not'}`} />
        <line x1="80" y1="70" x2="220" y2="180" className={`diag diag--lh ${isWhole_lh ? 'diag--whole' : 'diag--not'}`} />
        <line x1="130" y1="35" x2="220" y2="180" className={`diag diag--bh ${isWhole_bh ? 'diag--whole' : 'diag--not'}`} />
        <line x1="80" y1="180" x2="270" y2="35" className={`diag diag--space ${isWhole_lbh ? 'diag--whole' : 'diag--not'}`} />
      </g>
    </svg>
  </div>
);
