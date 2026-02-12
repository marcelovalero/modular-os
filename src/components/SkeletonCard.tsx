
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-56 bg-gray-300 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
