import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Helper function to wrap components in React Query provider
function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Home Page", () => {
  it("renders the heading and mode toggles", () => {
    renderWithClient(<Home />);

    // Heading
    expect(
      screen.getByRole("heading", { name: /AI Code Review Assistant/i })
    ).toBeInTheDocument();

    // Radio buttons (exact label text)
    expect(screen.getByLabelText("Reviewer")).toBeInTheDocument();
    expect(screen.getByLabelText("Pair Programmer")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Extended Pair Programmer")
    ).toBeInTheDocument();
  });

  it("allows typing code into the textarea", async () => {
    renderWithClient(<Home />);

    const textarea = screen.getByPlaceholderText(
      /Paste your TypeScript \/ React code here/i
    );
    await userEvent.type(textarea, "const a = 1;");
    expect(textarea).toHaveValue("const a = 1;");
  });

  it("disables analyze button when textarea is empty", () => {
    renderWithClient(<Home />);
    const button = screen.getByRole("button", { name: /Analyze/i });
    expect(button).toBeDisabled();
  });

  it("enables analyze button when textarea has code", async () => {
    renderWithClient(<Home />);
    const textarea = screen.getByPlaceholderText(
      /Paste your TypeScript \/ React code here/i
    );
    const button = screen.getByRole("button", { name: /Analyze/i });

    await userEvent.type(textarea, "console.log('hello');");
    expect(button).not.toBeDisabled();
  });
});
