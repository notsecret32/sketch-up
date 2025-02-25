export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export type LayerType = 'rectangle' | 'ellipse' | 'path' | 'text' | 'note';

export type RectangleLayer = {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: 'ellipse';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: 'path';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type TextLayer = {
  type: 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: 'note';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;

export type CanvasState =
  | {
      mode: 'none';
    }
  | {
      mode: 'selection';
      origin: Point;
      current?: Point;
    }
  | {
      mode: 'translating';
      current: Point;
    }
  | {
      mode: 'inserting';
      layerType: LayerType;
    }
  | {
      mode: 'pencil';
    }
  | {
      mode: 'pressing';
      origin: Point;
    }
  | {
      mode: 'resizing';
      initialRect: Rect;
      side: Side;
    };
