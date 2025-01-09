'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SpotlightTitle } from '../components/ui/spotlight-title';
import { Background } from '../components/ui/background';
import { BackgroundGradient } from '../components/ui/background-gradient';
import Partnerlink from '../components/Partnerlink';
import FAQ from '../components/FAQ';
import AnimatedTooltipPreview from '../components/ui/animated-tooltip-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCopy, RefreshCw } from 'lucide-react';

// 定义表单数据类型
interface RapFormData {
  theme: string;
  mood: string;
  style: string;
  keywords: string;
  rhymeScheme: string;
  length: string;
  language: string;
}

// 定义生成结果类型
interface GeneratedLyrics {
  lyrics: string;
  explanation: string;
  rhymeStructure?: string;
  rhythmGuide?: string;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
  { value: 'pt', label: 'Português' }
];

export default function RapGenerator() {
  const [generatedLyrics, setGeneratedLyrics] = useState<GeneratedLyrics[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFormData, setLastFormData] = useState<RapFormData | null>(null);
  const [activeTab, setActiveTab] = useState('lyrics');
  const [copied, setCopied] = useState(false);

  const generateLyrics = async (formData: RapFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-rap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedLyrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate lyrics'));
      setGeneratedLyrics([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: RapFormData = {
      theme: formData.get('theme') as string,
      mood: formData.get('mood') as string,
      style: formData.get('style') as string,
      keywords: formData.get('keywords') as string,
      rhymeScheme: formData.get('rhymeScheme') as string,
      length: formData.get('length') as string,
      language: formData.get('language') as string,
    };
    setLastFormData(data);
    await generateLyrics(data);
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
      await generateLyrics(lastFormData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <header className="relative">
          <Background/>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
            <SpotlightTitle className="mb-4">
              Rap Name Generator
            </SpotlightTitle>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Generate unique Wu-Tang style rap names! Get creative with our AI-powered
              name generator that combines Wu-Tang's legendary style with your ideas.
            </p>
            <AnimatedTooltipPreview />
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">Trusted by over 300,000 rap enthusiasts worldwide.</p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-zinc-900/50 p-6 rounded-lg backdrop-blur-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <div className="mb-8">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                      Rap Lyrics Generator
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                      Enter your details to generate your unique rap lyrics
                    </p>
                  </div>

                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    name="language"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    required
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <input
                    type="text"
                    name="theme"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    placeholder="What's your song about? (e.g., love, success, dreams)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Keywords</label>
                  <input
                    type="text"
                    name="keywords"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    placeholder="Enter keywords separated by commas (e.g., fire, freedom, pain)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mood</label>
                  <select
                    name="mood"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    required
                  >
                    <option value="energetic">Energetic</option>
                    <option value="angry">Angry</option>
                    <option value="melancholic">Melancholic</option>
                    <option value="confident">Confident</option>
                    <option value="thoughtful">Thoughtful</option>
                    <option value="passionate">Passionate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Style</label>
                  <select
                    name="style"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    required
                  >
                    <option value="classic-rap">Classic Rap</option>
                    <option value="modern-trap">Modern Trap</option>
                    <option value="boom-bap">Boom Bap</option>
                    <option value="conscious">Conscious Rap</option>
                    <option value="melodic">Melodic Rap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rhyme Scheme</label>
                  <select
                    name="rhymeScheme"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                  >
                    <option value="freestyle">Freestyle (Natural Flow)</option>
                    <option value="aabb">AABB (Simple Pairs)</option>
                    <option value="abab">ABAB (Alternating)</option>
                    <option value="complex">Complex Pattern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Length</label>
                  <select
                    name="length"
                    className="w-full px-4 py-2 bg-zinc-800 rounded-md"
                    required
                  >
                    <option value="verse">One Verse</option>
                    <option value="hook">Hook/Chorus</option>
                    <option value="verse-hook">Verse + Hook</option>
                    <option value="full">Full Song</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition-colors"
                >
                  {isLoading ? 'Creating Your Lyrics...' : 'Generate Rap Lyrics'}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="bg-zinc-900/50 p-6 rounded-lg backdrop-blur-sm overflow-y-auto max-h-[800px]">
              {error && (
                <div className="text-red-500 mb-4">
                  Error: {error.message}
                </div>
              )}
              {generatedLyrics.map((item, index) => (
                <div key={index} className="mb-8 last:mb-0">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Rap Lyrics Generator Results
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Here are your generated lyrics!
                </p>
                  <Tabs defaultValue="lyrics" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
                      <TabsTrigger value="rhyme">Rhyme</TabsTrigger>
                      <TabsTrigger value="rhythm">Rhythm</TabsTrigger>
                      <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="lyrics" className="mt-4">
                      <div className="bg-zinc-800 p-6 rounded-lg relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => handleCopyToClipboard(item.lyrics)}
                            className="p-2 hover:bg-zinc-700 rounded-md transition-colors"
                            title="Copy to clipboard"
                          >
                            <ClipboardCopy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleRegenerate}
                            className="p-2 hover:bg-zinc-700 rounded-md transition-colors"
                            title="Regenerate lyrics"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-sm mb-4">
                          {item.lyrics}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="rhyme" className="mt-4">
                      <div className="bg-zinc-800 p-6 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Rhyme Structure</h4>
                        <p className="text-sm text-gray-300">{item.rhymeStructure}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="rhythm" className="mt-4">
                      <div className="bg-zinc-800 p-6 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Rhythm Guide</h4>
                        <p className="text-sm text-gray-300">{item.rhythmGuide}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="analysis" className="mt-4">
                      <div className="bg-zinc-800 p-6 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Lyric Analysis</h4>
                        <p className="text-sm text-gray-300">{item.explanation}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ))}
              {!isLoading && !error && generatedLyrics.length === 0 && (
                <div className="text-center text-gray-500">
                  Your lyrics will appear here. They will include the lyrics, 
                  rhyme structure, rhythm guide, and detailed analysis.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4">
          <section className="mt-16">
            <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-6">Rap Lyrics Generator: How Does It Work?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card backdrop-blur-xl bg-white/10 dark:bg-black/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">1. Enter Your Details</h3>
                <p className="text-gray-600 dark:text-gray-400">Provide your language, theme, keywords, mood, and style preferences.</p>
              </div>
              <div className="card backdrop-blur-xl bg-white/10 dark:bg-black/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">2. Select Your Style</h3>
                <p className="text-gray-600 dark:text-gray-400">Choose from classic rap, modern trap, boom bap, conscious rap, or melodic rap.</p>
              </div>
              <div className="card backdrop-blur-xl bg-white/10 dark:bg-black/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">3. Get Your Lyrics</h3>
                <p className="text-gray-600 dark:text-gray-400">Receive unique rap lyrics that match your preferences.</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="relative">
          <FAQ type="rapname"/>
        </section>
      </main>
      <Partnerlink/>
      <Footer />
    </div>
  );
}
