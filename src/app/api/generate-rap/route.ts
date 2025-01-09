import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key. Please set OPENAI_API_KEY in your environment variables.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 增加超时时间到120秒
  maxRetries: 5, // 增加重试次数
});

// 辅助函数：延迟执行
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 带重试的API调用
async function makeOpenAIRequest(messages: any[], retries = 5) {
  let lastError = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} of ${retries} to call OpenAI API...`);
      
      const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4",
        temperature: 0.9,
        max_tokens: 2000,
      });
      
      console.log('OpenAI API call successful');
      return completion;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error.message);
      
      // 如果是最后一次重试，则抛出错误
      if (i === retries - 1) {
        console.error('All retry attempts failed');
        throw error;
      }
      
      // 根据错误类型决定重试策略
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.status === 429) {
        const delayTime = Math.min((i + 1) * 3000, 15000); // 最多等待15秒
        console.log(`Retrying after ${delayTime}ms...`);
        await delay(delayTime);
        continue;
      }
      
      // 如果是其他类型的错误，直接抛出
      throw error;
    }
  }
  
  throw lastError;
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const { theme, mood, style, keywords, rhymeScheme, length, language } = await req.json();

    const languagePrompt = language === 'en' ? '' : `Generate the rap lyrics in ${language} language. `;
    
    const prompt = `${languagePrompt}Generate rap lyrics with the following specifications:
Theme: ${theme}
Mood: ${mood}
Style: ${style}
Keywords: ${keywords}
Rhyme Scheme: ${rhymeScheme}
Length: ${length}

Please provide the following in a structured format:
1. Lyrics: The actual rap lyrics
2. Rhyme Structure: Explanation of the rhyming pattern used
3. Rhythm Guide: Guide for flow and delivery
4. Analysis: Brief analysis of the lyrics and their meaning

Make sure the lyrics reflect the Wu-Tang style while incorporating the specified theme and keywords naturally.`;

    const messages = [
      {
        role: "system",
        content: "You are an expert rap lyricist and music producer, skilled in various rap styles and songwriting techniques. Create lyrics that are authentic, creative, and technically sound."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    console.log('Starting OpenAI request...');
    const completion = await makeOpenAIRequest(messages);
    
    if (!completion?.choices?.[0]?.message?.content) {
      console.error('Invalid response structure from OpenAI');
      throw new Error('Invalid response from OpenAI API');
    }

    const response = completion.choices[0].message.content;
    console.log('Raw response from OpenAI:', response);
    
    // 解析API响应
    const sections = response.split('\n\n');
    console.log('Split sections:', sections);

    let lyrics = '';
    let rhymeStructure = '';
    let rhythmGuide = '';
    let analysis = '';
    
    // 处理每个部分
    let currentSection: string | null = null;
    let currentContent: string[] = [];
    
    for (const section of sections) {
      // 移除数字序号
      const cleanSection = section.replace(/^\d+\.\s*/, '').trim();
      
      // 检查是否是新的部分标题
      if (cleanSection.toLowerCase().startsWith('lyrics:')) {
        if (currentSection === 'lyrics') {
          lyrics = currentContent.join('\n').trim();
        }
        currentSection = 'lyrics';
        currentContent = [cleanSection.replace(/^lyrics:/i, '').trim()];
      } else if (cleanSection.toLowerCase().startsWith('rhyme structure:')) {
        if (currentSection === 'lyrics') {
          lyrics = currentContent.join('\n').trim();
        }
        currentSection = 'rhyme';
        currentContent = [cleanSection.replace(/^rhyme structure:/i, '').trim()];
      } else if (cleanSection.toLowerCase().startsWith('rhythm guide:')) {
        if (currentSection === 'rhyme') {
          rhymeStructure = currentContent.join('\n').trim();
        }
        currentSection = 'rhythm';
        currentContent = [cleanSection.replace(/^rhythm guide:/i, '').trim()];
      } else if (cleanSection.toLowerCase().startsWith('analysis:')) {
        if (currentSection === 'rhythm') {
          rhythmGuide = currentContent.join('\n').trim();
        }
        currentSection = 'analysis';
        currentContent = [cleanSection.replace(/^analysis:/i, '').trim()];
      } else if (cleanSection) {
        // 如果不是标题且不为空，添加到当前内容
        currentContent.push(cleanSection);
      }
    }
    
    // 处理最后一个部分
    if (currentSection === 'analysis') {
      analysis = currentContent.join('\n').trim();
    } else if (currentSection === 'rhythm') {
      rhythmGuide = currentContent.join('\n').trim();
    } else if (currentSection === 'rhyme') {
      rhymeStructure = currentContent.join('\n').trim();
    } else if (currentSection === 'lyrics') {
      lyrics = currentContent.join('\n').trim();
    }

    console.log('Parsed content:', {
      lyricsPreview: lyrics.substring(0, 50),
      rhymeStructurePreview: rhymeStructure.substring(0, 50),
      rhythmGuidePreview: rhythmGuide.substring(0, 50),
      analysisPreview: analysis.substring(0, 50)
    });

    if (!lyrics) {
      console.error('No lyrics found in response');
      throw new Error('Failed to generate lyrics');
    }

    const result = {
      lyrics,
      rhymeStructure,
      rhythmGuide,
      explanation: analysis
    };

    console.log('Final response structure:', {
      hasLyrics: !!result.lyrics,
      hasRhymeStructure: !!result.rhymeStructure,
      hasRhythmGuide: !!result.rhythmGuide,
      hasExplanation: !!result.explanation,
      contentLengths: {
        lyrics: result.lyrics.length,
        rhymeStructure: result.rhymeStructure.length,
        rhythmGuide: result.rhythmGuide.length,
        explanation: result.explanation.length
      }
    });
    
    return NextResponse.json([result]);

  } catch (error: any) {
    console.error('Error generating rap lyrics:', error);
    
    let errorMessage = 'Failed to generate rap lyrics';
    let statusCode = 500;

    if (!process.env.OPENAI_API_KEY) {
      errorMessage = 'OpenAI API key is not configured';
      statusCode = 500;
    } else if (error.code === 'ECONNRESET') {
      errorMessage = 'Connection to AI service failed. Please try again.';
      statusCode = 503;
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please try again later.';
      statusCode = 429;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
