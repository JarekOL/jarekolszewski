import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function MainBtn({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                "relative font-semibold bg-brand hover:bg-brand-nav transition-colors px-4 py-2 text-xs lg:text-sm text-white uppercase border",
                className
            )}
        >
            {children}
        </button>
    );
}
