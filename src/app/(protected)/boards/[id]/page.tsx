import { Workspace } from '@/features/boards/Workspace';
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <Workspace boardId={(await params).id} />;
}
