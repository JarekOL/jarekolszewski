const ShimmerLoader = () => {
    return (
      <div className="shimmer-wrapper w-full h-full bg-zinc-200 overflow-hidden relative">
        <div className="shimmer absolute top-0 left-0 bottom-0 w-[90%] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
      </div>
    );
  };
  
  export default ShimmerLoader;