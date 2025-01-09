'use client';

import { useState, useEffect } from 'react';
import { WUNameForm } from '@/app/components/ui/wu-name-form';
import NameResults from './components/NameResults';
import Header from './components/Header';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import AnimatedTooltipPreview from './components/ui/animated-tooltip-preview';
import { SpotlightTitle } from './components/ui/spotlight-title';
import { Background } from './components/ui/background';
import { BackgroundGradient } from './components/ui/background-gradient';
import Image from 'next/image';
import { FormData, GeneratedName } from './types';
import Partnerlink from './components/Partnerlink';

export default function Home() {
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const generateNames = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
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
      
      // 确保data是一个数组
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      // 验证并转换数据格式
      const validatedNames = data.map(item => {
        if (!item.name || typeof item.name !== 'string') {
          throw new Error('Invalid name in response');
        }
        // 支持 explanation 或 origin 字段
        const explanation = item.explanation || item.origin;
        if (!explanation || typeof explanation !== 'string') {
          throw new Error('Invalid explanation in response');
        }
        return {
          name: item.name,
          explanation: explanation
        };
      });

      setGeneratedNames(validatedNames);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate names'));
      setGeneratedNames([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setLastFormData(formData); // 保存表单数据
    await generateNames(formData);
  };

  const handleRegenerateClick = async () => {
    if (lastFormData) {
      await generateNames(lastFormData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Header Section */}
        <header className="relative">
          <Background/>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
            <SpotlightTitle className="mb-4">
              Wu Tang Name Generator
            </SpotlightTitle>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Get your personalized Wu-Tang name in seconds! Inspired by the legendary Wu-Tang Clan, 
              this generator combines style, creativity, and a touch of martial arts mystique.
            </p>
            <div className="mt-8">
              <AnimatedTooltipPreview />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">Trusted by over 25,000 Wu-Tang Clan fans worldwide.</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Form Section */}
            <section className="relative">
              <WUNameForm 
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </section>

            {/* Right Column - Results Section */}
            <section className="card backdrop-blur-xl bg-white/10 dark:bg-black/10 border-gray-200 dark:border-gray-800">
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Your Wu-Tang Names</h2>
              <NameResults
                names={generatedNames}
                onRegenerateClick={handleRegenerateClick}
                isLoading={isLoading}
                error={error}
              />
            </section>
          </div>

          {/* How It Works Section */}
          <section className="mt-16">
            <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-6">Wu-Tang Name Generator: How Does It Work?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">1. Enter Your Details</h3>
                <p>Share your name and choose your preferred style - from classic Wu-Tang to modern hip-hop vibes.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">2. Select Your Style</h3>
                <p>Choose from Kung Fu, Hip-Hop, Sci-Fi, Fantasy, or create your own unique blend.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">3. Get Your Names</h3>
                <p>Receive three unique Wu-Tang names, each with its own artistic origin story.</p>
              </div>
            </div>
          </section>

          {/* Wu-Tang Members Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">What Are the Names of Wu-Tang Clan Members?</h2>
            <div className="grid md:grid-cols-3 gap-6">
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/rza.webp`}
                      alt="RZA"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">RZA</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>RZA stands for "Ruler Zig-Zag-Zig Allah," derived from the teachings of the Five Percent Nation, symbolizing knowledge, wisdom, and understanding.</li>
                      <li>It also signifies his role as the leader and producer of Wu-Tang Clan. The name sounds concise, powerful, and imbued with intelligence.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>
              
              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/gza.webp`}
                      alt="GZA"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">GZA</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>GZA is short for "Genius." He is considered the most intellectual and philosophical member of Wu-Tang Clan.</li>
                      <li>The name evokes the imagery of a "wise man," aligning with his thoughtful lyricism.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/method-man.webp`}
                      alt="Method Man"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Method Man</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>"Method" likely references his love for marijuana (as "method" is a slang term for it in New York).</li>
                      <li>It also hints at his unique approach and style, particularly in rhythm and flow.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/raekwon.webp`}
                      alt="Raekwon"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Raekwon</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Raekwon is a name rich in martial arts-inspired imagery. Though its exact origin is unclear, it connects with his alternate alias, "Chef," symbolizing his lyrical "cooking."</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/ghostface-killah.webp`}
                      alt="Ghostface Killah"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Ghostface Killah</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>This name comes from the antagonist "Ghostface Killer" in the classic kung fu movie Mystery of Chessboxing.</li>
                      <li>It emphasizes his mysterious persona and unique metaphorical style in his lyrics.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/odb.webp`}
                      alt="Ol' Dirty Bastard"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Ol' Dirty Bastard</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>The name symbolizes his unclassifiable and utterly unique personality.</li>
                      <li>According to ODB himself, the inspiration came from a martial arts film, Shaolin and Wu Tang, referring to a character described as "a fatherless orphan."</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/u-god.webp`}
                      alt="U-God"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">U-God</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>U-God stands for "Universal God," reflecting his understanding of spirituality and higher powers.</li>
                      <li>The name carries an air of mystery and philosophical depth.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/inspectah-deck.webp`}
                      alt="Inspectah Deck"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Inspectah Deck</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>"Inspectah" denotes his role as an observer, adept at analyzing his surroundings and life.</li>
                      <li>His lyrics often showcase sharp insight and storytelling.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/masta-killah.webp`}
                      alt="Masta Killah"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Masta Killah</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>The name directly derives from a classic martial arts film character, symbolizing his razor-sharp lyrics.</li>
                      <li>As the last member to join Wu-Tang Clan, his name exudes martial arts aesthetics.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[700px] flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <Image
                      src={`/avatars/cappadonna.webp`}
                      alt="Cappadonna"
                      height="400"
                      width="400"
                      className="object-contain h-[300px] w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4">Cappadonna</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      <li>His name "Cappa" may have originated from New York street slang and later evolved into "Cappadonna," embodying a unique sense of street culture.</li>
                    </ul>
                  </div>
                </div>
              </BackgroundGradient>
            </div>
          </section>
          <FAQ type="wutang" />
        </div>
      </main>
      <Partnerlink />
      <Footer />
    </div>
  );
}
