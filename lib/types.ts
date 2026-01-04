// Modes
export type AnalysisMode = "reviewer" | "pair" | "extendedPair";

// Base result (common for all modes)
interface BaseAnalysisResult {
  readability: string[];
  structure: string[];
  maintainability: string[];
  positiveNote: string;
}

// Reviewer mode result
export interface ReviewerResult extends BaseAnalysisResult {
  suggestions?: never;
}

// Pair mode result
export interface PairResult extends BaseAnalysisResult {
  suggestions?: string[]; // textual suggestions only
}

// Extended pair mode result
export interface ExtendedPairResult extends BaseAnalysisResult {
  suggestions: {
    description: string;
    codeSnippet?: string;
  }[];
}

// Union type for API response
export type CodeAnalysisResult =
  | ReviewerResult
  | PairResult
  | ExtendedPairResult;

export interface CodeAnalysisRequest {
  code: string;
  mode: AnalysisMode;
}
