import { CodeAnalysisResult } from "@/lib/types";

// Category Component
function Category({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Analysis Result Component
function AnalysisResult({ result }: { result: CodeAnalysisResult }) {
  const suggestions = result.suggestions || [];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>

      <Category title="Readability" items={result.readability} />
      <Category title="Structure" items={result.structure} />
      <Category title="Maintainability" items={result.maintainability} />

      {suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Suggestions</h3>
          {suggestions.map((s, idx) => {
            if (typeof s === "object") {
              // Extended Pair Mode
              return (
                <div
                  key={idx}
                  className="mb-4 p-4 border border-gray-300 rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
                >
                  <p className="text-gray-900 dark:text-gray-100 mb-2">
                    <strong>What to do:</strong> {s.description}
                  </p>
                  {s.codeSnippet && (
                    <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-x-auto text-gray-800 dark:text-gray-100">
                      {s.codeSnippet}
                    </pre>
                  )}
                </div>
              );
            }

            // Pair Mode: string
            return (
              <div
                key={idx}
                className="mb-2 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {s}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-gray-900 dark:text-gray-100">
        <strong>Positive note:</strong> {result.positiveNote}
      </p>
    </section>
  );
}

export default AnalysisResult;
