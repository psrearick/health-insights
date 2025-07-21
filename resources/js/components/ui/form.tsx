import {
    ComponentProps,
    ReactNode,
    cloneElement,
    ReactElement,
    HTMLAttributes,
    ChangeEvent,
    FocusEvent,
    createContext,
    useContext,
    memo
} from 'react';
import {
    unstable_PasswordToggleField as PasswordToggleFieldPrimitive,
    Label as LabelPrimitive,
    Checkbox as CheckboxPrimitive
} from 'radix-ui';
import { CheckIcon, Eye, EyeClosed } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils.ts';

interface FormContextValue {
    disabled?: boolean;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
    return useContext(FormContext) || {};
};

interface FormContainerProps extends ComponentProps<'form'> {
    disabled?: boolean;
}

function FormContainer({
                           className,
                           children,
                           disabled,
                           ref,
                           ...props
                       }: FormContainerProps) {
    return (
        <FormContext.Provider value={{ disabled }}>
            <form
                ref={ref}
                className={className}
                {...props}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
}

interface FormFieldsetProps extends ComponentProps<'fieldset'> {
    children?: ReactNode;
    className?: string;
    legend?: string;
    asChild?: boolean;
}

function FormFieldset({
                          asChild,
                          className,
                          children,
                          ref,
                          ...props
                      }: FormFieldsetProps) {
    const Comp = asChild ? Slot : 'fieldset';
    return (
        <Comp
            ref={ref}
            className={cn('flex flex-col gap-4', className)}
            {...props}
        >
            {children}
        </Comp>
    );
}

interface FormControlProps extends ComponentProps<'div'> {
    children: ReactNode;
    asChild?: boolean;
    className?: string;
}

function FormControl({
                         children,
                         asChild,
                         className,
                         ...props
                     }: FormControlProps) {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp className={cn('flex flex-col gap-1', className)} {...props}>
            {children}
        </Comp>
    );
}

interface FormFieldProps {
    name: string;
    label?: ReactNode;
    error?: string;
    required?: boolean;
    children: ReactElement;
    className?: string;
    requiredIndicator?: ReactNode;
}

function FormField({
                       name,
                       label,
                       error,
                       required,
                       children,
                       className,
                       requiredIndicator
                   }: FormFieldProps) {
    const fieldId = name;
    const errorId = error ? `${name}-error` : undefined;

    const defaultRequiredIndicator = <span className="text-destructive ml-1" aria-label="required">*</span>;

    let labelElement = null;
    if (label) {
        if (typeof label === 'string' && required) {
            labelElement = (
                <FormLabel htmlFor={fieldId}>
                    {label}
                    {requiredIndicator || defaultRequiredIndicator}
                </FormLabel>
            );
        } else {
            labelElement = (
                <FormLabel htmlFor={fieldId}>
                    {label}
                </FormLabel>
            );
        }
    }

    const fieldProps = {
        id: fieldId,
        name,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': errorId,
        'aria-required': required
    };

    const fieldElement = cloneElement(children, fieldProps);

    return (
        <FormControl className={className}>
            {labelElement}
            {fieldElement}
            <FormInputError id={errorId} message={error} />
        </FormControl>
    );
}

function FormLabel({
                       children,
                       htmlFor,
                       className,
                       ref,
                       ...props
                   }: ComponentProps<typeof LabelPrimitive.Root>) {
    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn('text-sm', className)}
            htmlFor={htmlFor}
            {...props}
        >
            {children}
        </LabelPrimitive.Root>
    );
}

const inputClasses = cn(
    'border border-gray-6 outline-none',
    'focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50',
    'px-3 py-1 h-10 my-1 w-full rounded-md',
    'selection:bg-primary selection:text-primary-foreground placeholder:text-gray-7 md:text-sm',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20'
);

interface FormPasswordInputProps {
    className?: string;
    inputClassName?: string;
    toggleClassName?: string;
    iconClassName?: string;
    tabIndex?: number;
    placeholder?: string;
    id?: string;
    name?: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    autoComplete?: 'current-password' | 'new-password';
    autoFocus?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
    'aria-describedby'?: string;
}

const FormPasswordInput = memo(function FormPasswordInput({
                                                              className = '',
                                                              inputClassName = '',
                                                              toggleClassName = '',
                                                              iconClassName,
                                                              tabIndex,
                                                              placeholder = 'Password',
                                                              required = false,
                                                              id,
                                                              name,
                                                              value,
                                                              disabled: propDisabled,
                                                              autoComplete,
                                                              autoFocus,
                                                              onChange,
                                                              onBlur,
                                                              onFocus,
                                                              'aria-invalid': ariaInvalid,
                                                              'aria-describedby': ariaDescribedBy
                                                          }: FormPasswordInputProps) {
    const { disabled: contextDisabled } = useFormContext();
    const isDisabled = propDisabled ?? contextDisabled;
    return (
        <PasswordToggleFieldPrimitive.PasswordToggleField>
            <div className={cn(inputClasses, 'flex justify-between group', className)}>
                <PasswordToggleFieldPrimitive.Input
                    name={name}
                    id={id || name}
                    className={cn('focus:outline-0 w-full placeholder:text-gray-7', inputClassName)}
                    tabIndex={tabIndex}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    required={required}
                    disabled={isDisabled}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    aria-invalid={ariaInvalid}
                    aria-describedby={ariaDescribedBy}
                />
                <PasswordToggleFieldPrimitive.Toggle
                    id={`${name}_toggle`}
                    className={cn('group-focus-within:text-primary focus:outline-0 focus:text-primary-9 hover:text-primary-9 focus:ring-2 focus:ring-primary/20 rounded-sm', toggleClassName)}
                    aria-label="Toggle password visibility"
                    tabIndex={0}
                >
                    <PasswordToggleFieldPrimitive.Icon
                        className={iconClassName}
                        visible={<Eye className="h-4" aria-hidden="true" />}
                        hidden={<EyeClosed className="h-4" aria-hidden="true" />}
                    />
                    <span className="sr-only">Toggle password visibility</span>
                </PasswordToggleFieldPrimitive.Toggle>
            </div>
        </PasswordToggleFieldPrimitive.PasswordToggleField>
    );
});

interface FormInputProps extends ComponentProps<'input'> {
    className?: string;
    name?: string;
    id?: string;
    placeholder?: string;
    'aria-required'?: boolean;
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
    'aria-describedby'?: string;
}

const FormInput = memo(function FormInput(
    {
        className,
        name,
        id,
        type = 'text',
        placeholder,
        disabled: propDisabled,
        ...props
    }: FormInputProps) {
    const { disabled: contextDisabled } = useFormContext();
    const isDisabled = propDisabled ?? contextDisabled;

    return (
        <input
            data-form-field
            name={name}
            id={id}
            type={type}
            className={cn(inputClasses, className)}
            placeholder={placeholder}
            disabled={isDisabled}
            {...props}
        />
    );
});

interface FormTextAreaProps extends ComponentProps<'textarea'> {
    className?: string;
    name?: string;
    id?: string;
    placeholder?: string;
    'aria-required'?: boolean;
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
    'aria-describedby'?: string;
}

function FormTextArea({
                          className,
                          name,
                          id,
                          placeholder,
                          ...props
                      }: FormTextAreaProps) {
    return (
        <textarea
            data-form-field
            name={name}
            id={id}
            className={cn(inputClasses, className)}
            placeholder={placeholder}
            {...props}
        />
    );
}

function FormCheckbox({
                          className, ...props
                      }: ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(inputClasses, 'w-auto size-4.5 m-0 p-0 rounded-sm', className)}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current"
            >
                <CheckIcon className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

interface FormInputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
    id?: string;
}

function FormInputError({
                            message,
                            className = '',
                            id,
                            ...props
                        }: FormInputErrorProps) {
    if (!message) return null;

    return (
        <p
            {...props}
            id={id}
            className={cn('text-sm text-destructive', className)}
            role="alert"
        >
            {message}
        </p>
    );
}

export {
    FormContainer,
    FormFieldset,
    FormControl,
    FormField,
    FormLabel,
    FormPasswordInput,
    FormTextArea,
    FormInput,
    FormCheckbox,
    FormInputError
};

export type {
    FormContainerProps,
    FormFieldsetProps,
    FormControlProps,
    FormFieldProps,
    FormPasswordInputProps,
    FormInputProps,
    FormTextAreaProps,
    FormInputErrorProps
};
