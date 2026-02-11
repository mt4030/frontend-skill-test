
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
<div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
<div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />

      </div>
    </div>
  );
}
