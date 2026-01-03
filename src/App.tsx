import { useMemo, useState } from 'react';
import { computeDiagonals, Dimensions } from './lib/diagonals';
import { CuboidVisualizer } from './components/CuboidVisualizer';

type FieldKey = keyof Dimensions;

interface InputState {
  value: string;
  error: string;
}

const presets: Dimensions[] = [
  { l: 3, b: 4, h: 5 },
  { l: 44, b: 117, h: 240 },
  { l: 120, b: 209, h: 297 }
];

const MAX_VALUE = 9999;
const MIN_VALUE = 1;

const formatNumber = (value: number) => value.toFixed(4);

const validateValue = (raw: string): string => {
  if (!raw) return 'Please enter a value.';
  if (!/^\d+$/.test(raw)) return 'Use whole numbers only (no decimals or signs).';
  const numeric = Number.parseInt(raw, 10);
  if (Number.isNaN(numeric)) return 'Value is not a number.';
  if (numeric < MIN_VALUE) return 'Values must be positive.';
  if (numeric > MAX_VALUE) return 'Keep values to four digits (max 9999).';
  return '';
};

const WholeBadge = ({ isWhole }: { isWhole: boolean }) => (
  <span className={`pill ${isWhole ? 'pill--good' : 'pill--bad'}`}>{isWhole ? '✅ Whole Number' : '❌ Not whole'}</span>
);

const InputField = ({
  label,
  field,
  state,
  onChange
}: {
  label: string;
  field: FieldKey;
  state: InputState;
  onChange: (field: FieldKey, value: string) => void;
}) => (
  <label className="input-block">
    <span className="input-label">{label}</span>
    <input
      inputMode="numeric"
      pattern="[0-9]*"
      type="text"
      value={state.value}
      onChange={(event) => onChange(field, event.target.value)}
      aria-invalid={Boolean(state.error)}
      aria-describedby={`${field}-error`}
    />
    {state.error && (
      <span id={`${field}-error`} className="input-error">
        {state.error}
      </span>
    )}
  </label>
);

const App = () => {
  const [inputs, setInputs] = useState<Record<FieldKey, InputState>>({
    l: { value: '3', error: '' },
    b: { value: '4', error: '' },
    h: { value: '5', error: '' }
  });

  const handleChange = (field: FieldKey, value: string) => {
    const error = validateValue(value);
    setInputs((prev) => ({
      ...prev,
      [field]: { value, error }
    }));
  };

  const applyPreset = (preset: Dimensions) => {
    setInputs({
      l: { value: preset.l.toString(), error: '' },
      b: { value: preset.b.toString(), error: '' },
      h: { value: preset.h.toString(), error: '' }
    });
  };

  const dimensions = useMemo(() => {
    const entries = Object.entries(inputs) as [FieldKey, InputState][];
    const hasErrors = entries.some(([, state]) => state.error !== '');
    if (hasErrors) return undefined;

    const values: Dimensions = {
      l: Number.parseInt(inputs.l.value, 10),
      b: Number.parseInt(inputs.b.value, 10),
      h: Number.parseInt(inputs.h.value, 10)
    };

    if (Object.values(values).some((value) => Number.isNaN(value) || value < MIN_VALUE || value > MAX_VALUE)) {
      return undefined;
    }

    return values;
  }, [inputs]);

  const diagonals = useMemo(() => (dimensions ? computeDiagonals(dimensions) : undefined), [dimensions]);

  const diagStatus = {
    lb: Boolean(diagonals?.d_lb.isWhole),
    lh: Boolean(diagonals?.d_lh.isWhole),
    bh: Boolean(diagonals?.d_bh.isWhole),
    lbh: Boolean(diagonals?.d_lbh.isWhole)
  };

  const renderValue = (value?: number) => (value !== undefined ? formatNumber(value) : '—');

  return (
    <div className="page">
      <header className="hero">
        <h1>The Perfect Cuboid</h1>
        <p className="lede">
          Adjust the edges of a cuboid and see how the face and space diagonals behave. Look for the elusive case where
          every diagonal is a whole number!
        </p>
      </header>

      <main className="section-stack">
        <section className="card education full-width">
          <div className="card-header">
            <h2>What’s a perfect cuboid?</h2>
          </div>
          <p>
            A perfect cuboid would have every edge length, each face diagonal, and the space diagonal all as whole numbers.
            Mathematicians have searched for centuries, but it is still unknown whether such a cuboid exists.
          </p>
          <p className="callout">Try to find one! Adjust the values and watch the diagonals.</p>
          <ul className="bullets">
            <li>The face diagonals come from applying the Pythagorean theorem to each rectangle.</li>
            <li>The space diagonal extends the theorem into three dimensions.</li>
          </ul>
        </section>

        <section className="card full-width visualizer-card">
          <div className="card-header">
            <h2>Cuboid visualizer</h2>
            <p className="helper">Thin lines highlight each diagonal. Colors update as values change.</p>
          </div>
          <CuboidVisualizer
            isWhole_lb={diagStatus.lb}
            isWhole_lh={diagStatus.lh}
            isWhole_bh={diagStatus.bh}
            isWhole_lbh={diagStatus.lbh}
          />
          <div className="legend" aria-label="Diagonal legend">
            <span className="legend-item legend-item--whole">Green = whole</span>
            <span className="legend-item legend-item--not">Red = not whole</span>
          </div>
        </section>

        <section className="card full-width">
          <div className="card-header">
            <h2>Dimensions</h2>
            <p className="helper">Positive whole numbers only (1-9999).</p>
          </div>

          <div className="inputs">
            <InputField label="Length (l)" field="l" state={inputs.l} onChange={handleChange} />
            <InputField label="Breadth (b)" field="b" state={inputs.b} onChange={handleChange} />
            <InputField label="Height (h)" field="h" state={inputs.h} onChange={handleChange} />
          </div>

          <div className="presets" aria-label="Dimension presets">
            {presets.map((preset) => (
              <button key={`${preset.l}-${preset.b}-${preset.h}`} className="preset" onClick={() => applyPreset(preset)}>
                {preset.l} × {preset.b} × {preset.h}
              </button>
            ))}
          </div>
        </section>

        <section className="dual-grid">
          <div className="card">
            <div className="card-header">
              <h2>Face diagonals</h2>
              <p className="helper">Each uses Pythagoras on a face of the cuboid.</p>
            </div>
            <div className="diag-grid">
              <article className="diag">
                <div className="diag-label">d_lb = √(l² + b²)</div>
                <div className="diag-value">{renderValue(diagonals?.d_lb.value)}</div>
                <WholeBadge isWhole={diagStatus.lb} />
              </article>
              <article className="diag">
                <div className="diag-label">d_lh = √(l² + h²)</div>
                <div className="diag-value">{renderValue(diagonals?.d_lh.value)}</div>
                <WholeBadge isWhole={diagStatus.lh} />
              </article>
              <article className="diag">
                <div className="diag-label">d_bh = √(b² + h²)</div>
                <div className="diag-value">{renderValue(diagonals?.d_bh.value)}</div>
                <WholeBadge isWhole={diagStatus.bh} />
              </article>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Space diagonal</h2>
              <p className="helper">The body diagonal from one vertex to the opposite corner.</p>
            </div>
            <article className="diag diag--large">
              <div className="diag-label">d_lbh = √(l² + b² + h²)</div>
              <div className="diag-value diag-value--large">{renderValue(diagonals?.d_lbh.value)}</div>
              <WholeBadge isWhole={diagStatus.lbh} />
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
