'use client';

import { LiveObject } from '@liveblocks/client';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from '@liveblocks/react';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';

import { pointerEventToCanvasPoint } from '@/lib/utils';
import {
  Camera,
  CanvasState,
  Color,
  Layer,
  LayerType,
  Point,
} from '@/types/canvas';

import { CursorsPresence } from './cursors-presence';
import { Info } from './info';
import { LayerPreview } from './layer-preview';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage(root => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: 'none',
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    ({ storage, setMyPresence }, layerType: LayerType, position: Point) => {
      const liveLayers = storage.get('layers');

      if (liveLayers.size > MAX_LAYERS) {
        return;
      }

      const liveLayersIds = storage.get('layerIds');
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      } as Layer);

      liveLayersIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: 'none' });
    },
    [lastUsedColor]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === 'inserting') {
        insertLayer(canvasState.layerType, point);
      }

      setCanvasState({ mode: 'none' });
      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const cursor = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({
      cursor: null,
    });
  }, []);

  return (
    <div className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className='h-screen w-screen'
        onWheel={onWheel}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          {layerIds?.map(layerId => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor='#000'
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </div>
  );
};
