import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const wutangFaqs = [
  {
    id: 'characteristics',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">What are the characteristics of Wu-Tang Clan members' names?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Martial Arts Elements:</span> Many names are directly or indirectly inspired by Chinese kung fu or classic martial arts films.
        </p>
        <p>
          <span className="font-semibold">2. Street Culture:</span> The names incorporate symbols of hip-hop culture, such as slang and personal expression.
        </p>
        <p>
          <span className="font-semibold">3. Philosophy and Religion:</span> Some names (e.g., RZA, GZA, U-God) reflect spiritual beliefs or philosophical meanings.
        </p>
        <p>
          <span className="font-semibold">4. Uniqueness:</span> Each name is distinctive, showcasing the member's musical style and personality.
        </p>
      </div>
    ),
  },
  {
    id: 'how-it-works',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">How does the Wu-Tang Name Generator work?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Input Analysis:</span> The generator considers your personal details, style preferences, and keywords.
        </p>
        <p>
          <span className="font-semibold">2. Style Fusion:</span> It combines elements from martial arts, hip-hop culture, and philosophical concepts.
        </p>
        <p>
          <span className="font-semibold">3. Multiple Options:</span> Generates three unique names to give you choices that match your style.
        </p>
        <p>
          <span className="font-semibold">4. Artistic Context:</span> Each generated name comes with an explanation of its artistic origins and meaning.
        </p>
      </div>
    ),
  },
  {
    id: 'social-media',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I use the generated name for social media or other platforms?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The generated names are suitable for use on social media platforms，Let everyone know your new, unique alias!</p>
      </div>
    ),
  },
  {
    id: 'free-to-use',  
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Is the Wu Tang Name Generator free to use?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The Wu Tang Name Generator is 100% free to use.</p>
      </div>
    ),
  },
];

const dissFaqs = [
  {
    id: 'characteristics',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">What are the characteristics of Wu-Tang Clan members' names?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Martial Arts Elements:</span> Many names are directly or indirectly inspired by Chinese kung fu or classic martial arts films.
        </p>
        <p>
          <span className="font-semibold">2. Street Culture:</span> The names incorporate symbols of hip-hop culture, such as slang and personal expression.
        </p>
        <p>
          <span className="font-semibold">3. Philosophy and Religion:</span> Some names (e.g., RZA, GZA, U-God) reflect spiritual beliefs or philosophical meanings.
        </p>
        <p>
          <span className="font-semibold">4. Uniqueness:</span> Each name is distinctive, showcasing the member's musical style and personality.
        </p>
      </div>
    ),
  },
  {
    id: 'how-it-works',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">How does the Wu-Tang Name Generator work?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Input Analysis:</span> The generator considers your personal details, style preferences, and keywords.
        </p>
        <p>
          <span className="font-semibold">2. Style Fusion:</span> It combines elements from martial arts, hip-hop culture, and philosophical concepts.
        </p>
        <p>
          <span className="font-semibold">3. Multiple Options:</span> Generates three unique names to give you choices that match your style.
        </p>
        <p>
          <span className="font-semibold">4. Artistic Context:</span> Each generated name comes with an explanation of its artistic origins and meaning.
        </p>
      </div>
    ),
  },
  {
    id: 'social-media',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I use the generated name for social media or other platforms?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The generated names are suitable for use on social media platforms，Let everyone know your new, unique alias!</p>
      </div>
    ),
  },
  {
    id: 'free-to-use',  
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Is the Wu Tang Name Generator free to use?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The Wu Tang Name Generator is 100% free to use.</p>
      </div>
    ),
  },
];

const rapnameFaqs = [
  {
    id: 'characteristics',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">What are the characteristics of Wu-Tang Clan members' names?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Martial Arts Elements:</span> Many names are directly or indirectly inspired by Chinese kung fu or classic martial arts films.
        </p>
        <p>
          <span className="font-semibold">2. Street Culture:</span> The names incorporate symbols of hip-hop culture, such as slang and personal expression.
        </p>
        <p>
          <span className="font-semibold">3. Philosophy and Religion:</span> Some names (e.g., RZA, GZA, U-God) reflect spiritual beliefs or philosophical meanings.
        </p>
        <p>
          <span className="font-semibold">4. Uniqueness:</span> Each name is distinctive, showcasing the member's musical style and personality.
        </p>
      </div>
    ),
  },
  {
    id: 'how-it-works',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">How does the Wu-Tang Name Generator work?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Input Analysis:</span> The generator considers your personal details, style preferences, and keywords.
        </p>
        <p>
          <span className="font-semibold">2. Style Fusion:</span> It combines elements from martial arts, hip-hop culture, and philosophical concepts.
        </p>
        <p>
          <span className="font-semibold">3. Multiple Options:</span> Generates three unique names to give you choices that match your style.
        </p>
        <p>
          <span className="font-semibold">4. Artistic Context:</span> Each generated name comes with an explanation of its artistic origins and meaning.
        </p>
      </div>
    ),
  },
  {
    id: 'social-media',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I use the generated name for social media or other platforms?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The generated names are suitable for use on social media platforms，Let everyone know your new, unique alias!</p>
      </div>
    ),
  },
  {
    id: 'free-to-use',  
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Is the Wu Tang Name Generator free to use?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! The Wu Tang Name Generator is 100% free to use.</p>
      </div>
    ),
  },
];

const rapFaqs = [
  {
    id: 'rap-generator',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">How does the Rap Generator work?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Input Analysis:</span> The generator analyzes your topic, style preferences, mood, and desired length.
        </p>
        <p>
          <span className="font-semibold">2. Style Matching:</span> It creates lyrics that match your chosen style (Classic Wu-Tang, Modern Trap, etc.).
        </p>
        <p>
          <span className="font-semibold">3. AI Generation:</span> Using advanced AI, it generates unique lyrics that maintain authenticity and flow.
        </p>
        <p>
          <span className="font-semibold">4. Quality Check:</span> Each generated lyric is checked for rhythm, rhyme, and style consistency.
        </p>
      </div>
    ),
  },
  {
    id: 'rap-styles',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">What rap styles are available?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Classic Wu-Tang:</span> Traditional East Coast style with kung-fu references and complex wordplay.
        </p>
        <p>
          <span className="font-semibold">2. Modern Trap:</span> Contemporary style with heavy bass and modern slang.
        </p>
        <p>
          <span className="font-semibold">3. Boom Bap:</span> Old school hip-hop style with strong beats and traditional flow.
        </p>
        <p>
          <span className="font-semibold">4. Conscious Rap:</span> Thoughtful lyrics focusing on social messages and personal growth.
        </p>
      </div>
    ),
  },
  {
    id: 'commercial-use',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I use the generated lyrics commercially?</h3>),
    answer: (
      <div className="space-y-2">
        <p>The generated lyrics are provided for personal use and inspiration. For commercial use, we recommend consulting with legal professionals regarding rights and licensing.</p>
      </div>
    ),
  },
  {
    id: 'best-results',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">How can I get the best results?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">1. Clear Topic:</span> Be specific about your subject matter.
        </p>
        <p>
          <span className="font-semibold">2. Style Match:</span> Choose a style that fits your topic.
        </p>
        <p>
          <span className="font-semibold">3. Mood Setting:</span> Select a mood that complements your message.
        </p>
        <p>
          <span className="font-semibold">4. Length Choice:</span> Pick an appropriate length for your content.
        </p>
      </div>
    ),
  },
  {
    id: 'commercial-use',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I use the generated lyrics for commercial purposes?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
          Yes, you can use the generated lyrics for commercial purposes. However, it’s recommended to ensure the content complies with local laws and copyright regulations before use.
        </p>
      </div>
    ),
  },
  {
    id: 'plagiarism',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Does the freestyle lyrics generator produce plagiarism-free rap lyrics?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
        Yes, the freestyle lyrics generator creates original lyrics and strives to avoid copying existing content. However, due to linguistic similarities, unintentional similarities may occasionally occur, so it’s best to review the lyrics carefully before use.
        </p>
      </div>
    ),
  },
  {
    id: 'beginners',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Is the rap lyrics generator suitable for beginners?</h3>),
    answer: (
      <div className="space-y-2">
        <p>
        Yes, it’s suitable for beginners. The AI-generated lyrics are simple and easy to understand, helping beginners get started quickly and spark their creativity.
        </p>
      </div>
    ),
  },
];

interface FAQProps {
  type?: 'wutang' | 'rap' | 'diss' | 'rapname';
}

export default function FAQ({ type = 'wutang' }: FAQProps) {
  const faqs = type === 'wutang' ? wutangFaqs : type === 'rapname' ? rapnameFaqs : type === 'diss' ? dissFaqs : rapFaqs;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-800/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-800/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.id} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                    {faq.question}
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
