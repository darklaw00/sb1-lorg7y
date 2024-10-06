import WorldBuilderForm from '@/components/WorldBuilderForm';
import StoryOutput from '@/components/StoryOutput';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">World Builder Engine</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WorldBuilderForm />
        <StoryOutput />
      </div>
      <Toaster />
    </div>
  );
}