
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TransactionPage from './page';
import * as useTransactionFormHook from '@/hooks/useTransactionForm';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { MethodFormData, TransactionInfoFormData } from '@/lib/schemas/transactionSchema';

vi.mock('@/hooks/useTransactionForm');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('TransactionPage Verification', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockNextStep = vi.fn();
  const mockPrevStep = vi.fn();
  const mockSubmitTransaction = vi.fn();
  const mockResetForm = vi.fn();

  const createMockForm = (overrides = {}) => ({
    register: vi.fn(),
    watch: vi.fn(),
    handleSubmit: vi.fn(),
    formState: { errors: {}, isValid: true },
    setValue: vi.fn(),
    getValues: vi.fn(),
    reset: vi.fn(),
    trigger: vi.fn(),
    control: {},
    getFieldState: vi.fn(),
    setError: vi.fn(),
    clearErrors: vi.fn(),
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter as unknown as ReturnType<typeof useRouter>);
  });

  it('renders PIX fields when transaction type is PIX', () => {
    const mockMethodForm = createMockForm({
        getValues: vi.fn().mockImplementation((field) => field === 'type' ? 'PIX' : undefined),
        watch: vi.fn().mockImplementation((field) => field === 'type' ? 'PIX' : undefined),
    });

    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: mockMethodForm as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm({
          watch: vi.fn()
      }) as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    render(<TransactionPage />);

    expect(screen.getByText('Pix details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pix key')).toBeInTheDocument();
  });

  it('does NOT render PIX fields when transaction type is TED', () => {
    const mockMethodForm = createMockForm({
        getValues: vi.fn().mockImplementation((field) => field === 'type' ? 'TED' : undefined),
        watch: vi.fn().mockImplementation((field) => field === 'type' ? 'TED' : undefined),
    });

    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: mockMethodForm as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm({
          watch: vi.fn()
      }) as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    render(<TransactionPage />);

    expect(screen.queryByText('Pix details')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Pix key')).not.toBeInTheDocument();
    expect(screen.getByText('Bank details')).toBeInTheDocument();
  });
});
