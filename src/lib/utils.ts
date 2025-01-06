import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 随机数生成器
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 延迟函数
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 格式化日期
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// 生成随机ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
