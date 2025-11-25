// contexts/SalaryContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

// 1. define type
type SalaryContextType = {
  salarySum: number[];
  setSalarySum: React.Dispatch<React.SetStateAction<number[]>>;
  saveToLocalStorage: (key: string, data: unknown) => void; // ✅ غير من number إلى any
};

// 2. create context with default values
const SalaryContext = createContext<SalaryContextType>({
  salarySum: [],
  setSalarySum: () => {},
  saveToLocalStorage: () => {}
});

export function SalaryProvider({ children }: { children: ReactNode }) {
  // ✅ جلب salarySum من localStorage أول ما الصفحه تتحمل
  const [salarySum, setSalarySum] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salarySum');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // ✅ حفظ salarySum في localStorage كل ما تتغير
  useEffect(() => {
    localStorage.setItem('salarySum', JSON.stringify(salarySum));
  }, [salarySum]);

  const saveToLocalStorage = useCallback((key: string, data: unknown) => { // ✅ غير من number إلى any
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('❌ ERROR saving to localStorage:', error);
      }
    }
  }, []);
  
  return (
    <SalaryContext.Provider value={{ 
      salarySum, 
      setSalarySum,
      saveToLocalStorage
    }}>
      {children}
    </SalaryContext.Provider>
  );
}

// 3. typed hook
export const useSalary = (): SalaryContextType => {
  const context = useContext(SalaryContext);
  return context;
};