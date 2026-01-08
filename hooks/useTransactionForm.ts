'use client';

import { useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  methodSchema,
  transactionInfoSchema,
  MethodFormData,
  TransactionInfoFormData,
} from '@/lib/schemas/transactionSchema';
import { createTransaction, CreateTransactionDTO } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { useTransactionContext } from '@/context/TransactionContext';

export type TransactionStep = 0 | 1;

interface UseTransactionFormReturn {
  currentStep: TransactionStep;
  methodForm: UseFormReturn<MethodFormData>;
  infoForm: UseFormReturn<TransactionInfoFormData>;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  submitTransaction: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
}

export function useTransactionForm(): UseTransactionFormReturn {
  const { currentStep, setCurrentStep } = useTransactionContext();

  const methodForm = useForm<MethodFormData>({
    resolver: zodResolver(methodSchema),
    defaultValues: {
      type: undefined,
    },
  });

  const infoForm = useForm<TransactionInfoFormData>({
    resolver: zodResolver(transactionInfoSchema),
    defaultValues: {
      amount: undefined,
      cpfCnpj: '',
      legalName: '',
      accountType: undefined,
      bank: '',
      account: '',
      agency: '',
      description: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateTransactionDTO) => createTransaction(data),
  });

  const nextStep = useCallback(() => {
    methodForm.handleSubmit(() => {
      setCurrentStep(1);
    })();
  }, [methodForm, setCurrentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  const resetForm = useCallback(() => {
    methodForm.reset();
    infoForm.reset();
    setCurrentStep(0);
    mutation.reset();
  }, [methodForm, infoForm, setCurrentStep, mutation]);

  const submitTransaction = useCallback(() => {
    infoForm.handleSubmit((infoData) => {
      const methodData = methodForm.getValues();
      
      const payload: CreateTransactionDTO = {
        type: methodData.type,
        amount: infoData.amount,
        cpfCnpj: infoData.cpfCnpj,
        description: infoData.description,
        bank: infoData.bank,
        account: infoData.account,
        agency: infoData.agency,
        accountType: infoData.accountType,
      };

      mutation.mutate(payload);
    })();
  }, [infoForm, methodForm, mutation]);

  return {
    currentStep,
    methodForm,
    infoForm,
    nextStep,
    prevStep,
    resetForm,
    submitTransaction,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
