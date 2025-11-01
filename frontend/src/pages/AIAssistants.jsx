const AIAssistants = () => {
  return (
    <div className="min-h-screen py-12 animate-fadeIn">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto animate-slideUp">
          <h1 className="text-4xl font-bold mb-4">AI Assistants</h1>
          <p className="text-gray-600 mb-8">
            Coming soon! Get personalized skincare recommendations powered by AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">Skin Insights</h3>
              <p className="text-gray-600">
                Upload a photo of your skin and get instant analysis with AI-powered insights
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">Claré</h3>
              <p className="text-gray-600">
                Get personalized skincare recommendations based on your skin concerns and goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistants;

