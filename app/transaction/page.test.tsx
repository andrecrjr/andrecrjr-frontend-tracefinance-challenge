
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('TransactionPage', () => {
  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
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

  it('renders Step 1 (Method) initially', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 0,
      methodForm: createMockForm({
        watch: vi.fn().mockReturnValue(undefined),
      }) as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm() as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    render(<TransactionPage />);

    expect(screen.getByText('Transaction method')).toBeInTheDocument();
  });

  it('disables Next button when no method is selected', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 0,
      methodForm: createMockForm({
        watch: vi.fn().mockReturnValue(undefined),
      }) as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm() as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    render(<TransactionPage />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button and calls nextStep when method is selected', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 0,
      methodForm: createMockForm({
        watch: vi.fn().mockReturnValue('TED'),
      }) as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm() as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    render(<TransactionPage />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
    
    fireEvent.click(nextButton);
    expect(mockNextStep).toHaveBeenCalled();
  });

  it('renders Step 2 (Information)', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: createMockForm() as unknown as UseFormReturn<MethodFormData>,
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

    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Transaction information')).toBeInTheDocument();
  });

  it('displays validation errors in Step 2', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: createMockForm() as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm({
        watch: vi.fn(),
        formState: {
          errors: {
            amount: { message: 'Amount is required', type: 'required' },
            cpfCnpj: { message: 'Tax ID is required', type: 'required' }
          },
          isValid: false,
          isLoading: false,
          isSubmitted: false,
          isSubmitSuccessful: false,
          isSubmitting: false,
          isValidating: false,
          submitCount: 0,
          dirtyFields: {},
          touchedFields: {},
          defaultValues: {}
        }
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

    expect(screen.getByText('Amount is required')).toBeInTheDocument();
    expect(screen.getByText('Tax ID is required')).toBeInTheDocument();
  });

  it('calls submitTransaction on Send button click', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: createMockForm() as unknown as UseFormReturn<MethodFormData>,
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

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);
    expect(mockSubmitTransaction).toHaveBeenCalled();
  });

  it('redirects to home on success', () => {
    vi.mocked(useTransactionFormHook.useTransactionForm).mockReturnValue({
      currentStep: 1,
      methodForm: createMockForm() as unknown as UseFormReturn<MethodFormData>,
      infoForm: createMockForm({
          watch: vi.fn()
      }) as unknown as UseFormReturn<TransactionInfoFormData>,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: mockResetForm,
      submitTransaction: mockSubmitTransaction,
      isSubmitting: false,
      isSuccess: true, // Success!
      error: null,
    });

    render(<TransactionPage />);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
