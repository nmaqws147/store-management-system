'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

type SalaryContextType = {
  salarySum: number[];
  setSalarySum: React.Dispatch<React.SetStateAction<number[]>>;
  saveToLocalStorage: (key: string, data: unknown) => void;
};


const SalaryContext = createContext<SalaryContextType>({
  salarySum: [],
  setSalarySum: () => {},
  saveToLocalStorage: () => {}
});


export const SalaryProvider = ({ children }: { children: ReactNode }) => {
  const [salarySum, setSalarySum] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salarySum');
      return saved ? JSON.parse(saved) : [0];
    }
    return [0];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('salarySum', JSON.stringify(salarySum));
    }
  }, [salarySum]);

  const saveToLocalStorage = useCallback((key: string, data: unknown) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('❌ ERROR saving to localStorage:', error);
      }
    }
  }, []);

  return (
    <SalaryContext.Provider value={{ salarySum, setSalarySum, saveToLocalStorage }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = (): SalaryContextType => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
};

const ContextPage = ({ children }: { children?: ReactNode }) => {
  return (
    <SalaryProvider>
      {children ?? (
        <div>
          <h1>Products Context Page</h1>
        </div>
      )}
    </SalaryProvider>
  );
};

export default ContextPage;
