'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransactionContextValue {
  currentStep: 0 | 1;
  setCurrentStep: (step: 0 | 1) => void;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<0 | 1>(0);

  return (
    <TransactionContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    return { currentStep: 0 as const, setCurrentStep: () => {} };
  }
  return context;
}
