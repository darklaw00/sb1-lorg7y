'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { extractStoryComponents, generateFollowUpQuestions } from '@/lib/storyProcessing';

export default function WorldBuilderForm() {
  const [storyIdea, setStoryIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const extractedComponents = await extractStoryComponents(storyIdea);
      const followUpQuestions = await generateFollowUpQuestions(extractedComponents);

      // Save the extracted components and follow-up questions
      localStorage.setItem('storyComponents', JSON.stringify(extractedComponents));
      localStorage.setItem('followUpQuestions', JSON.stringify(followUpQuestions));

      toast({
        title: 'Story processed successfully',
        description: 'Check the output section for results and follow-up questions.',
      });
    } catch (error) {
      console.error('Error processing story:', error);
      toast({
        title: 'Error processing story',
        description: 'An error occurred while processing your story. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={storyIdea}
        onChange={(e) => setStoryIdea(e.target.value)}
        placeholder="Enter your story idea here..."
        className="h-64"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Process Story'}
      </Button>
    </form>
  );
}