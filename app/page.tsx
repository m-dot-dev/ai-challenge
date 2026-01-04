"use client";

import AnalysisResult from "@/components/AnalysisResult";
import {
  AnalysisMode,
  CodeAnalysisRequest,
  CodeAnalysisResult,
} from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const API_ENDPOINT = "/api/analyze";

const modeDescriptions: Record<AnalysisMode, string> = {
  reviewer: "Reviews code for readability, structure, and maintainability.",
  pair: "Provides suggestions for improvements and identifies potential issues.",
  extendedPair:
    "Suggests improvements with actionable code snippets without overwriting your original code.",
};

export default function Home() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<AnalysisMode>("reviewer");

  const analyseCode = ({ code, mode }: CodeAnalysisRequest) =>
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, mode }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Analysis failed");
      return res.json();
    });

  const mutation = useMutation<
    CodeAnalysisResult,
    Error,
    { code: string; mode: AnalysisMode }
  >({
    mutationFn: analyseCode,
  });

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">AI Code Review Assistant</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Reviewer, Pair Engineer, and Extended Pair Engineer for TypeScript +
        React.
      </p>

      {/* Mode Toggle */}
      <div className="mb-2 flex gap-4">
        {(["reviewer", "pair", "extendedPair"] as AnalysisMode[]).map(
          (analysisMode) => {
            const displayName =
              analysisMode === "pair"
                ? "Pair Programmer"
                : analysisMode === "extendedPair"
                ? "Extended Pair Programmer"
                : analysisMode.charAt(0).toUpperCase() + analysisMode.slice(1);

            return (
              <label key={analysisMode} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={analysisMode}
                  checked={mode === analysisMode}
                  onChange={() => setMode(analysisMode)}
                />
                {displayName}
              </label>
            );
          }
        )}
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {modeDescriptions[mode]}
      </p>

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your TypeScript / React code here..."
        rows={16}
        className="w-full p-4 font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
      />

      <button
        onClick={() => mutation.mutate({ code, mode })}
        disabled={!code || mutation.status === "pending"}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.status === "pending" ? "Analyzing..." : "Analyze"}
      </button>

      {/* Error */}
      {mutation.error && (
        <p className="text-red-500 mt-2">{mutation.error.message}</p>
      )}

      {/* Analysis Result */}
      {mutation.data && <AnalysisResult result={mutation.data} />}
    </main>
  );
}
