import { Children, isValidElement, ComponentPropsWithRef, ReactNode, cloneElement, ReactElement } from 'react';
import {
    unstable_PasswordToggleField as PasswordToggleFieldPrimitive,
    Label as LabelPrimitive
} from 'radix-ui';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';

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
            className={className}
            {...props}
        >
            {children}
        </Comp>
    );
}

interface FormControlProps extends ComponentPropsWithRef<'p'> {
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
    const Comp = asChild ? Slot : 'p';

    const enhancedChildren = Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
            const childProps = child.props as Record<string, unknown>;

            const isFormField =
                child.type === FormInput ||
                child.type === typeof FormPasswordInput ||
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
        <Comp className={className} {...props}>
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
            className={className}
            htmlFor={htmlFor}
            {...props}
        >
            {children}
        </LabelPrimitive.Root>
    );
}

interface FormPasswordInputProps extends ComponentPropsWithRef<typeof PasswordToggleFieldPrimitive.PasswordToggleField> {
    className?: string;
    inputClassName?: string;
    toggleClassName?: string;
    iconClassName?: string;
    name?: string;
}

function FormPasswordInput({
                               className,
                               inputClassName,
                               toggleClassName,
                               iconClassName,
                               name,
                               ...props
                           }: FormPasswordInputProps) {
    return (
        <PasswordToggleFieldPrimitive.PasswordToggleField
            id={name}
            {...props}
        >
            <div className={className}>
                <FormLabel htmlFor={name}>Password</FormLabel>
                <PasswordToggleFieldPrimitive.Input className={inputClassName} />
                <PasswordToggleFieldPrimitive.Toggle className={toggleClassName}>
                    <PasswordToggleFieldPrimitive.Icon
                        className={iconClassName}
                        visible={<EyeOpenIcon />}
                        hidden={<EyeClosedIcon />}
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
            className={className}
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
            className={className}
            placeholder={placeholder}
            {...props}
        />
    );
}

export {
    FormContainer,
    FormFieldset,
    FormControl,
    FormLabel,
    FormPasswordInput,
    FormTextArea,
    FormInput

};
