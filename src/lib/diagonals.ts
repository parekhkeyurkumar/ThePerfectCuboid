export interface Dimensions {
  l: number;
  b: number;
  h: number;
}

export const nearIntegerTolerance = 1e-9;

export const isNearInteger = (value: number, tolerance = nearIntegerTolerance): boolean => {
  const nearest = Math.round(value);
  return Math.abs(value - nearest) <= tolerance;
};

export const faceDiagonal = (a: number, b: number): number => Math.sqrt(a * a + b * b);

export const spaceDiagonal = (dimensions: Dimensions): number => {
  const { l, b, h } = dimensions;
  return Math.sqrt(l * l + b * b + h * h);
};

export interface DiagonalResult {
  value: number;
  isWhole: boolean;
}

export interface ComputedDiagonals {
  d_lb: DiagonalResult;
  d_lh: DiagonalResult;
  d_bh: DiagonalResult;
  d_lbh: DiagonalResult;
}

const buildResult = (value: number): DiagonalResult => ({
  value,
  isWhole: isNearInteger(value)
});

export const computeDiagonals = (dimensions: Dimensions): ComputedDiagonals => {
  const { l, b, h } = dimensions;
  const d_lb = faceDiagonal(l, b);
  const d_lh = faceDiagonal(l, h);
  const d_bh = faceDiagonal(b, h);
  const d_lbh = spaceDiagonal(dimensions);

  return {
    d_lb: buildResult(d_lb),
    d_lh: buildResult(d_lh),
    d_bh: buildResult(d_bh),
    d_lbh: buildResult(d_lbh)
  };
};
