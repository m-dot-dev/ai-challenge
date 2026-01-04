import { openai, parseAIResponse } from "@/lib/openaiClient";
import { buildPrompt } from "@/lib/promptBuilder";
import { CodeAnalysisRequest, CodeAnalysisResult } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, mode } = (await req.json().catch((e: Error) => {
      return NextResponse.json({ error: e.message }, { status: 400 });
    })) as CodeAnalysisRequest;

    const prompt = buildPrompt(code, mode);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("Empty LLM response");

    const result: CodeAnalysisResult = parseAIResponse(content);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}
