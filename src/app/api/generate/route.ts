import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  console.log('API: Received request to generate names');
  
  try {
    const body = await request.json();
    console.log('API: Request body:', body);
    
    const { name, style, keywords, purpose, elements, preference } = body;

    // 构建 prompt
    const prompt = `Generate three unique Wu-Tang Clan style names for someone with the following details:
Name: ${name}
Style Preference: ${style}
${keywords ? `Keywords to incorporate: ${keywords}` : ''}
${purpose ? `Purpose: ${purpose}` : ''}
${elements?.length > 0 ? `Additional elements to consider: ${elements.join(', ')}` : ''}
${preference ? `Name style preference: ${preference}` : ''}

Please follow these rules:
1. Each name should be unique and reflect Wu-Tang Clan's style
2. Names should incorporate elements of martial arts, street wisdom, and mysticism
3. Each name should come with a brief explanation of its artistic origin
4. Names should be respectful and avoid any offensive content
5. Follow the structure rules:
   - [形容词] + [名词]
   - [动词] + [名词]
   - [名词] + [名词]
   - [地名] + [术语]
   - [形容词] + [术语]

Format the response as a JSON array with each object containing:
- name: the generated name
- explanation: explanation of the name's origin and meaning

Generate 3 names in this format.`;

    console.log('API: Calling OpenAI with prompt');
    
    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
    });

    console.log('API: Received response from OpenAI');
    
    // 解析返回的数据
    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    console.log('API: Raw response from OpenAI:', responseText);

    try {
      const parsedData = JSON.parse(responseText);
      console.log('API: Parsed response data:', JSON.stringify(parsedData, null, 2));
      
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error('API: Failed to parse OpenAI response:', parseError);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error('API: Error in name generation:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
