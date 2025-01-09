import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      target,
      reason,
      mood,
      keywords,
      style,
      length
    } = await req.json();

    // 构建 prompt
    const prompt = `Generate a ${style} style diss track ${length} that disses ${target}.
    Reason for dissing: ${reason}
    Mood: ${mood}
    Include these keywords if possible: ${keywords}
    
    Please format the response as a JSON with the following structure:
    {
      "lyrics": "The actual diss track lyrics",
      "rhymeStructure": "Explanation of the rhyme patterns used",
      "rhythmGuide": "Guide for flow and rhythm",
      "explanation": "Analysis of the lyrics and their meaning"
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional rap lyricist specialized in creating diss tracks. Your responses should be creative, hard-hitting, and maintain proper rap structure and flow."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
    });

    // 解析返回的内容
    const response = completion.choices[0].message.content;
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response || '{}');
    } catch (e) {
      // 如果解析失败，返回一个基本结构
      parsedResponse = {
        lyrics: response,
        rhymeStructure: "Freestyle structure",
        rhythmGuide: "Natural flow",
        explanation: "Raw generated content"
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error: any) {
    console.error('Error generating lyrics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate lyrics' },
      { status: 500 }
    );
  }
}
