"use client";
import { AnimatedTooltip } from "./animated-tooltip";

const people = [
  {
    id: 1,
    name: "Wu Master",
    designation: "Rap Legend",
    image: "/avatars/avatar-1.png",
  },
  {
    id: 2,
    name: "DJ Supreme",
    designation: "Beat Maker",
    image: "/avatars/avatar-2.png",
  },
  {
    id: 3,
    name: "Flow King",
    designation: "Lyricist",
    image: "/avatars/avatar-3.png",
  },
  {
    id: 4,
    name: "Rhyme Master",
    designation: "Wordsmith",
    image: "/avatars/avatar-4.png",
  },
  {
    id: 5,
    name: "Zen Warrior",
    designation: "Philosopher",
    image: "/avatars/avatar-5.png",
  },
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
