"use client";

import Link from "next/link";

const partners = [
  {
    name: "Game Sprunki",
    url: "https://game-sprunki.com/"
  },
  {
    name: "MagicBox.Tools",
    url: "https://magicbox.tools/"
  },
  {
    name: "AI Nav Site",
    url: "https://navs.site"
  },
  {
    name: "AI Tool Center",
    url: "https://aitoolcenter.com/"
  },
  {
    name: "ai-toolify",
    url: "https://ai-toolify.com/"
  },
  {
    name: "RightAI Tools Directory",
    url: "https://right-ai.com/"
  },
  {
    name: "Sprunked",
    url: "https://sprunked.dev"
  },
  {
    name: "ForIT AI",
    url: "https://forit.ai"
  },
  {
    name: "What Is Ai Tools",
    url: "https://whatisaitools.com/"
  },
  {
    name: "AIMonstr",
    url: "https://www.aimonstr.com"
  },
  {
    name: "YP for AI Tools Directory",
    url: "https://ypforai.com"
  }
];

export default function Partnerlink() {
  return (
    <nav className="py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          Partner Links
        </h3>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {partner.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}