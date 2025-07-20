import {
    Children,
    isValidElement,
    ComponentPropsWithRef,
    ReactNode,
    cloneElement,
    ReactElement,
    HTMLAttributes,
    ChangeEvent
} from 'react';
import {
    unstable_PasswordToggleField as PasswordToggleFieldPrimitive,
    Label as LabelPrimitive,
    Checkbox as CheckboxPrimitive
} from 'radix-ui';
import { CheckIcon, Eye, EyeClosed } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils.ts';

function FormContainer({
                           className,
                           children,
                           ref,
                           ...props
                       }: ComponentPropsWithRef<'form'>) {
    return (
        <form
            ref={ref}
            className={className}
            {...props}
        >
            {children}
        </form>
    );
}

interface FormFieldsetProps extends ComponentPropsWithRef<'fieldset'> {
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
            className={cn('flex flex-col gap-8', className)}
            {...props}
        >
            {children}
        </Comp>
    );
}

interface FormControlProps extends ComponentPropsWithRef<'div'> {
    name: string;
    children: ReactNode;
    asChild?: boolean;
    className?: string;
}

function FormControl({
                         name,
                         children,
                         asChild,
                         className,
                         ...props
                     }: FormControlProps) {
    const Comp = asChild ? Slot : 'div';

    const enhancedChildren = Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
            const childProps = child.props as Record<string, unknown>;

            const isFormField =
                child.type === FormInput ||
                child.type === FormPasswordInput ||
                child.type === FormTextArea ||
                (typeof child.type === 'string' && ['input', 'textarea', 'select'].includes(child.type)) ||
                (childProps && typeof childProps === 'object' && 'data-form-field' in childProps);

            if (isFormField) {
                const fieldElement = child as ReactElement<{ name?: string; id?: string }>;
                return cloneElement(fieldElement, {
                    ...fieldElement.props,
                    name,
                    id: name
                });
            }

            const isLabel =
                child.type === FormLabel ||
                (typeof child.type === 'string' && child.type === 'label') ||
                (childProps && typeof childProps === 'object' && 'data-form-label' in childProps);

            if (isLabel) {
                const labelElement = child as ReactElement<{ htmlFor?: string }>;
                return cloneElement(labelElement, {
                    ...labelElement.props,
                    htmlFor: name
                });
            }
        }
        return child;
    });

    return (
        <Comp className={cn('flex flex-col gap-1', className)} {...props}>
            {enhancedChildren}
        </Comp>
    );
}

function FormLabel({
                       children,
                       htmlFor,
                       className,
                       ref,
                       ...props
                   }: ComponentPropsWithRef<typeof LabelPrimitive.Root>) {
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
    'focus-within:border-primary focus-within:border-ring focus-within:ring-3 focus-within:ring-primary/50',
    'px-3 py-1 h-10 my-1 w-full rounded-md',
    'selection:bg-primary selection:text-primary-foreground placeholder:text-gray-7 md:text-sm',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20'
);

interface FormPasswordInputProps extends ComponentPropsWithRef<typeof PasswordToggleFieldPrimitive.PasswordToggleField> {
    className?: string;
    inputClassName?: string;
    toggleClassName?: string;
    iconClassName?: string;
    tabIndex: number;
    placeholder?: string;
    name?: string;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormPasswordInput({
                               className = '',
                               inputClassName = '',
                               toggleClassName = '',
                               iconClassName,
                               tabIndex = -1,
                               placeholder = 'Password',
                               required = false,
                               name,
                               onChange,
                               ...props
                           }: FormPasswordInputProps) {
    return (
        <PasswordToggleFieldPrimitive.PasswordToggleField
            {...props}
        >
            <div className={cn(inputClasses, 'flex justify-between group', className)}>
                <PasswordToggleFieldPrimitive.Input
                    name={name}
                    id={name}
                    className={cn('focus:outline-0 w-full placeholder:text-gray-7', inputClassName)}
                    tabIndex={tabIndex}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
                <PasswordToggleFieldPrimitive.Toggle id={`"${name}_toggle"`}
                                                     className={cn('group-focus-within:text-primary focus:outline-0 focus:text-primary-9 hover:text-primary-9', toggleClassName)}>
                    <PasswordToggleFieldPrimitive.Icon
                        className={iconClassName}
                        visible={<Eye className="h-4" />}
                        hidden={<EyeClosed className="h-4" />}
                    />
                </PasswordToggleFieldPrimitive.Toggle>
            </div>
        </PasswordToggleFieldPrimitive.PasswordToggleField>
    );
}

interface FormInputProps extends ComponentPropsWithRef<'input'> {
    className?: string;
    name?: string;
    id?: string;
    placeholder?: string;
}

function FormInput(
    {
        className,
        name,
        id,
        placeholder,
        ...props
    }: FormInputProps) {
    return (
        <input
            data-form-field
            name={name}
            id={id}
            className={cn(inputClasses, className)}
            placeholder={placeholder}
            {...props}
        />
    );
}

interface FormTextAreaProps extends ComponentPropsWithRef<'textarea'> {
    className?: string;
    name?: string;
    id?: string;
    placeholder?: string;
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
                      }: ComponentPropsWithRef<typeof CheckboxPrimitive.Root>) {
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
}

function FormInputError({
                            message,
                            className = '',
                            ...props
                        }: FormInputErrorProps) {
    return (
        <p
            {...props}
            className={cn('text-sm text-destructive-foreground', className)}
        >
            {message}
        </p>
    );
}

export {
    FormContainer,
    FormFieldset,
    FormControl,
    FormLabel,
    FormPasswordInput,
    FormTextArea,
    FormInput,
    FormCheckbox,
    FormInputError

};
