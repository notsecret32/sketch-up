import { Canvas } from '@/components/board/canvas';
import { CanvasLoading } from '@/components/board/canvas-loading';
import { Room } from '@/components/board/room';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
