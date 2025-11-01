const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;

