import { useState } from 'react';
import { FormData, GeneratedName } from '../types';
import { generateWuTangNames } from '../utils/nameGenerator';

interface UseNameGenerationProps {
  onSuccess?: (names: GeneratedName[]) => void;
  onError?: (error: Error) => void;
}

interface GenerateNameInput {
  name: string;
  style: string;
  keywords?: string;
  purpose?: string;
  elements?: string[];
  preference?: string;
}

export function useNameGeneration({ onSuccess, onError }: UseNameGenerationProps = {}) {
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
      onSuccess?.(validatedNames);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate names'));
      setGeneratedNames([]);
      onError?.(err instanceof Error ? err : new Error('Failed to generate names'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    setLastFormData(data);
    await generateNames(data);
  };

  const handleRegenerateClick = async () => {
    if (lastFormData) {
      await generateNames(lastFormData);
    }
  };

  return {
    generatedNames,
    isLoading,
    error,
    handleFormSubmit,
    handleRegenerateClick
  };
}
