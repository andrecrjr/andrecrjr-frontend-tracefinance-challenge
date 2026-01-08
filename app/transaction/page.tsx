'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useTransactionForm } from '@/hooks/useTransactionForm';
import { MethodStep } from '@/components/MethodStep';
import { InformationStep } from '@/components/InformationStep';

export default function TransactionPage() {
  const router = useRouter();
  const {
    currentStep,
    methodForm,
    infoForm,
    nextStep,
    prevStep,
    resetForm,
    submitTransaction,
    isSubmitting,
    isSuccess,
  } = useTransactionForm();

  const handleCancel = () => {
    resetForm();
    router.push('/');
  };

  const handleClose = () => {
    router.push('/');
  };

  useEffect(()=>{
    prevStep()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);


  return (
    <div className="h-full flex flex-col bg-surface-secondary p-8 relative overflow-y-scroll">
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 rounded-lg hover:bg-surface-hover transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-text-secondary" />
      </button>

      <div className="flex-1 max-w-2xl mx-auto w-full pt-8">
        {currentStep === 0 && (
          <MethodStep
            form={methodForm}
            onNext={nextStep}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 1 && (
          <InformationStep
            form={infoForm}
            onBack={prevStep}
            onSubmit={submitTransaction}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}