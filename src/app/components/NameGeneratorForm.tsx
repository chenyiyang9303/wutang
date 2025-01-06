'use client';

import { useState } from 'react';

// 定义表单数据类型
interface FormData {
  name: string;
  style: string;
  keywords: string;
  purpose: string;
  elements: string[];
  preference: string;
}

// 定义组件属性类型
interface NameGeneratorFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

// 风格选项
const STYLE_OPTIONS = [
  { value: 'kungfu', label: 'Kung Fu Style' },
  { value: 'hiphop', label: 'Hip-Hop Style' },
  { value: 'scifi', label: 'Sci-Fi/Future Style' },
  { value: 'fantasy', label: 'Fantasy/Magic Style' },
  { value: 'custom', label: 'Custom Style' },
];

// 用途选项
const PURPOSE_OPTIONS = [
  { value: 'team', label: 'Team Name' },
  { value: 'brand', label: 'Brand/Project Name' },
  { value: 'character', label: 'Virtual Character' },
  { value: 'other', label: 'Other' },
];

// 附加元素选项
const ELEMENT_OPTIONS = [
  { value: 'regional', label: 'Regional Elements' },
  { value: 'philosophical', label: 'Philosophical Elements' },
  { value: 'metaphorical', label: 'Metaphorical Elements' },
];

// 语感偏好选项
const PREFERENCE_OPTIONS = [
  { value: 'simple', label: 'Simple (e.g., Word + Word)' },
  { value: 'rhyme', label: 'Rhyming (e.g., Shadow Flow)' },
  { value: 'mysterious', label: 'Mysterious (e.g., Void Whisper)' },
  { value: 'distinctive', label: 'Distinctive (e.g., Jade Blaze)' },
];

export default function NameGeneratorForm({ onSubmit, isLoading }: NameGeneratorFormProps) {
  // 表单状态
  const [formData, setFormData] = useState<FormData>({
    name: '',
    style: '',
    keywords: '',
    purpose: '',
    elements: [],
    preference: '',
  });

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 处理复选框变化
  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      elements: prev.elements.includes(value)
        ? prev.elements.filter((item) => item !== value)
        : [...prev.elements, value],
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 名字输入 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input-field"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>

      {/* 风格选择 */}
      <div>
        <label htmlFor="style" className="block text-sm font-medium mb-2">
          Choose Your Style *
        </label>
        <select
          id="style"
          name="style"
          required
          className="input-field"
          value={formData.style}
          onChange={handleInputChange}
        >
          <option value="">Select a style</option>
          {STYLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 关键词输入 */}
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium mb-2">
          Keywords (Optional)
        </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          className="input-field"
          value={formData.keywords}
          onChange={handleInputChange}
          placeholder="e.g., dragon, rhythm, eternal"
        />
        <p className="text-sm text-gray-500 mt-1">Separate multiple keywords with commas</p>
      </div>

      {/* 用途选择 */}
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium mb-2">
          Name Purpose (Optional)
        </label>
        <select
          id="purpose"
          name="purpose"
          className="input-field"
          value={formData.purpose}
          onChange={handleInputChange}
        >
          <option value="">Select a purpose</option>
          {PURPOSE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 附加元素选择 */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Additional Elements (Optional)
        </label>
        <div className="space-y-2">
          {ELEMENT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={option.value}
                checked={formData.elements.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor={option.value} className="ml-2 text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 语感偏好选择 */}
      <div>
        <label htmlFor="preference" className="block text-sm font-medium mb-2">
          Name Style Preference (Optional)
        </label>
        <select
          id="preference"
          name="preference"
          className="input-field"
          value={formData.preference}
          onChange={handleInputChange}
        >
          <option value="">Select a preference</option>
          {PREFERENCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Generating Names...' : 'Generate Wu-Tang Names'}
      </button>
    </form>
  );
}
