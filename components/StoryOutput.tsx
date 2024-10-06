'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function StoryOutput() {
  const [storyComponents, setStoryComponents] = useState<any>(null);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

  useEffect(() => {
    const components = localStorage.getItem('storyComponents');
    const questions = localStorage.getItem('followUpQuestions');

    if (components) {
      setStoryComponents(JSON.parse(components));
    }
    if (questions) {
      setFollowUpQuestions(JSON.parse(questions));
    }
  }, []);

  if (!storyComponents) {
    return <div>No story processed yet. Use the form to submit your story idea.</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Extracted Story Components</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(storyComponents).map(([key, value]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>{key}</AccordionTrigger>
                <AccordionContent>{JSON.stringify(value, null, 2)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follow-up Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {followUpQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}