import { computeDiagonals, faceDiagonal, isNearInteger, nearIntegerTolerance, spaceDiagonal } from './diagonals';

describe('diagonal calculations', () => {
  it('calculates face diagonals correctly', () => {
    expect(faceDiagonal(3, 4)).toBeCloseTo(5);
    expect(faceDiagonal(5, 12)).toBeCloseTo(13);
  });

  it('calculates space diagonal correctly', () => {
    expect(spaceDiagonal({ l: 3, b: 4, h: 12 })).toBeCloseTo(13);
    expect(spaceDiagonal({ l: 1, b: 1, h: 1 })).toBeCloseTo(Math.sqrt(3));
  });

  it('returns structured diagonal results', () => {
    const { d_lb, d_lh, d_bh, d_lbh } = computeDiagonals({ l: 44, b: 117, h: 240 });
    expect(d_lb.value).toBeCloseTo(faceDiagonal(44, 117));
    expect(d_lh.value).toBeCloseTo(faceDiagonal(44, 240));
    expect(d_bh.value).toBeCloseTo(faceDiagonal(117, 240));
    expect(d_lbh.value).toBeCloseTo(spaceDiagonal({ l: 44, b: 117, h: 240 }));
  });
});

describe('near integer detection', () => {
  it('detects perfect integers', () => {
    expect(isNearInteger(5)).toBe(true);
    expect(isNearInteger(12.0)).toBe(true);
  });

  it('applies tolerance to round floating errors', () => {
    const almostInt = 10 + nearIntegerTolerance / 2;
    expect(isNearInteger(almostInt)).toBe(true);
  });

  it('rejects values outside tolerance', () => {
    const outside = 7 + nearIntegerTolerance * 2;
    expect(isNearInteger(outside)).toBe(false);
  });
});
