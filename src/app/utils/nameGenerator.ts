import OpenAI from 'openai';
import { FormData, GeneratedName } from '../types';

const SYSTEM_PROMPT = `You are a Wu-Tang Clan name generator that creates unique names following specific rules and cultural elements. 

IMPORTANT RULES TO FOLLOW:
1. Structure Rules (Choose one pattern):
   - [Adjective] + [Noun] (e.g., Silent Lotus)
   - [Verb] + [Noun] (e.g., Blazing Shadow)
   - [Noun] + [Noun] (e.g., Tiger Strike)
   - [Place] + [Term] (e.g., Shaolin Flow)
   - [Adjective] + [Term] (e.g., Hidden Groove)

2. Phonetic Rules:
   - Prioritize rhyming (end rhymes or alliteration)
   - Aim for 2-3 syllables per word
   - Ensure smooth pronunciation

3. Cultural Elements Distribution:
   - 50% chance: East Asian cultural elements
   - 30% chance: Hip-hop terminology
   - 20% chance: Abstract descriptors

4. Name Components:
   Adjectives: Silent, Hidden, Mystic, Sacred, Shadow, Dark, Blazing, Flying, Soaring, Rising, Iron, Flowing, Furious, Burning, Fierce, Eternal, Crimson, Golden
   Nouns: Dragon, Tiger, Crane, Phoenix, Lotus, Bamboo, Jade, Fist, Blade, Strike, Chi, Wind, Thunder, Flame, Shadow, Ice, Earth, Wave
   Hip-hop Terms: Flow, Rhythm, Cipher, Beat, Crew, Tribe, Clan, Groove, Syndicate
   Places/Historical: Shaolin, Forbidden, Wu-Tang, Yangtze, Himalaya, Mount, Temple, Pagoda, Dynasty, Emperor, Sage, Warrior
   Abstract Terms: Balance, Harmony, Chaos, Void, Realm, Spirit, Eternal

OUTPUT FORMAT:
For each name generated, provide:
1. The name itself
2. A detailed explanation of:
   - The meaning behind each word
   - The cultural significance
   - How it relates to the user's input
   - The structural pattern used`;

export async function generateWuTangNames(
  input: FormData,
  openaiApiKey: string
): Promise<GeneratedName[]> {
  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  const prompt = `Generate 3 unique Wu-Tang style names for a person named "${input.name}" with the following preferences:
- Style: ${input.style}
${input.keywords ? `- Keywords: ${input.keywords}` : ''}
${input.purpose ? `- Purpose: ${input.purpose}` : ''}
${input.preference ? `- Name Style Preference: ${input.preference}` : ''}

For each name, provide:
1. The name itself
2. A brief explanation of its meaning and how it relates to the person

Format the response as a JSON array with "name" and "explanation" fields for each entry.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  const responseText = response.choices[0]?.message?.content;
  if (!responseText) {
    throw new Error('No response from OpenAI');
  }

  try {
    const parsedData = JSON.parse(responseText);
    if (!Array.isArray(parsedData)) {
      throw new Error('Invalid response format');
    }

    return parsedData.map(item => ({
      name: item.name,
      explanation: item.explanation
    }));
  } catch (error) {
    throw new Error('Failed to parse OpenAI response');
  }
}
