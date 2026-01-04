import { render, screen } from "@testing-library/react";
import AnalysisResult from "@/components/AnalysisResult";

const mockResult = {
  readability: ["Variable names could be clearer."],
  structure: ["Avoid mixing API logic and UI."],
  maintainability: ["Use proper typing instead of any."],
  positiveNote: "Good use of hooks.",
  suggestions: ["Rename ambiguous variables."],
};

describe("AnalysisResult Component", () => {
  it("renders categories and positive note", () => {
    render(<AnalysisResult result={mockResult} />);

    expect(screen.getByText(/Readability/i)).toBeInTheDocument();
    expect(screen.getByText(/Structure/i)).toBeInTheDocument();
    expect(screen.getByText(/Maintainability/i)).toBeInTheDocument();
    expect(screen.getByText(/Positive note/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Variable names could be clearer./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Good use of hooks./i)).toBeInTheDocument();
  });
});
