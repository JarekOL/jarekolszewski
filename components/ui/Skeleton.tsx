export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-300 ${className}`} />
    );
}
export function SkeletonFull() {
    return <div className="h-full w-full bg-zinc-300 animate-pulse" />;
}
export function Skeleton80vh() {
    return <div className="h-[80vh] bg-zinc-300 animate-pulse" />;
}
