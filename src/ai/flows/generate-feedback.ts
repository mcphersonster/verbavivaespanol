'use server';

/**
 * @fileOverview Generates personalized feedback on flashcard answers using AI.
 *
 * - generatePersonalizedFeedback - A function that handles the generation of personalized feedback.
 * - GeneratePersonalizedFeedbackInput - The input type for the generatePersonalizedFeedback function.
 * - GeneratePersonalizedFeedbackOutput - The return type for the generatePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedFeedbackInputSchema = z.object({
  verb: z.string().describe('The Spanish verb being conjugated.'),
  pronoun: z.string().describe('The pronoun used in the conjugation.'),
  tense: z.string().describe('The tense in which the verb is conjugated.'),
  userAnswer: z.string().describe('The user\'s answer to the conjugation question.'),
  correctAnswer: z.string().describe('The correct answer to the conjugation question.'),
});
export type GeneratePersonalizedFeedbackInput = z.infer<typeof GeneratePersonalizedFeedbackInputSchema>;

const GeneratePersonalizedFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback on the user\'s answer.'),
});
export type GeneratePersonalizedFeedbackOutput = z.infer<typeof GeneratePersonalizedFeedbackOutputSchema>;

export async function generatePersonalizedFeedback(
  input: GeneratePersonalizedFeedbackInput
): Promise<GeneratePersonalizedFeedbackOutput> {
  return generatePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFeedbackPrompt',
  input: {schema: GeneratePersonalizedFeedbackInputSchema},
  output: {schema: GeneratePersonalizedFeedbackOutputSchema},
  prompt: `You are a Spanish language tutor providing personalized feedback to a student on their verb conjugations.

  The student was asked to conjugate the verb '{{verb}}' for the pronoun '{{pronoun}}' in the {{tense}} tense.
  The student answered '{{userAnswer}}', but the correct answer is '{{correctAnswer}}'.

  Provide helpful and encouraging feedback to the student.  Explain why the correct answer is correct, and, if the student's answer is close, explain how they can improve.  Focus on common mistakes and patterns.
  Keep the feedback concise and under 50 words.
  `,
});

const generatePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFeedbackFlow',
    inputSchema: GeneratePersonalizedFeedbackInputSchema,
    outputSchema: GeneratePersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
