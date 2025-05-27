import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function SecondBtn({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                "relative tracking-wider bg-brand hover:bg-brand-hover transition-colors duration-100 px-4 py-2 text-sm lg:text-base font-light text-white",
                className
            )}
        >
            {children}
        </button>
    );
}
