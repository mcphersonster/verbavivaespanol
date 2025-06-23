'use server';

import {createNextApi} from '@genkit-ai/next';
import '@/ai/flows/generate-feedback';

export const {GET, POST} = createNextApi();
