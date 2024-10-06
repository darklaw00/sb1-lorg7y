import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractStoryComponents(storyIdea: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a world-building assistant. Extract key components from the given story idea."
        },
        {
          role: "user",
          content: `Extract key components from this story idea: ${storyIdea}`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in extractStoryComponents:', error);
    throw error;
  }
}

export async function generateFollowUpQuestions(storyComponents: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a world-building assistant. Generate follow-up questions based on the extracted story components."
        },
        {
          role: "user",
          content: `Generate follow-up questions based on these story components: ${storyComponents}`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in generateFollowUpQuestions:', error);
    throw error;
  }
}