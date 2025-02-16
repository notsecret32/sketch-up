import { Canvas } from '@/components/board/canvas';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  return <Canvas boardId={params.boardId} />;
}
