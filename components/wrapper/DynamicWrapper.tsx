"use client";

import dynamic, { Loader } from "next/dynamic";
import { ReactNode } from "react";

type DynamicComponentProps<T extends object> = {
    loader: Loader<T>;
    loadingFallback?: ReactNode;
    props?: T;
};

export default function DynamicComponent<T extends object>({
    loader,
    loadingFallback = <div className="animate-pulse h-40 w-full bg-gray-100" />,
    props,
}: DynamicComponentProps<T>) {
    const LoadedComponent = dynamic(loader, {
        ssr: false,
        loading: () => <>{loadingFallback}</>,
    });

    return <LoadedComponent {...(props as T)} />;
}
