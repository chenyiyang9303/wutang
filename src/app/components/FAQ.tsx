import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
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
    id: 'save-name',
    question: (<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Can I save my generated Wu-Tang name?</h3>),
    answer: (
      <div className="space-y-2">
        <p>Yes! Each generated name can be easily copied using the copy button. However, please note that:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Generated names are random and unique to each session</li>
          <li>Names are not stored in our database</li>
          <li>We recommend saving your favorite names immediately</li>
        </ul>
      </div>
    ),
  },
];

export default function FAQ() {
  return (
    <div>
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
                <DisclosurePanel as="dd" className="mt-2 pr-12">
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
