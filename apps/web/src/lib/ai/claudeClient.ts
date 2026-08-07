import Anthropic from "@anthropic-ai/sdk";

/**
 * Claude (Anthropic) chat completions. Replaces the earlier Kimi/Moonshot client — Kimi's
 * reasoning models added 15-45s+ of "thinking" latency to short structured tasks and had
 * undocumented quirks (forced temperature, tool_choice needed to trigger search, intermittent
 * server errors). Claude doesn't force reasoning by default, so these same short tasks run in
 * a few seconds. Set ANTHROPIC_API_KEY to enable; callers should treat a null return as
 * "AI unavailable" and degrade gracefully, same as the other optional data sources in
 * src/lib/data-sources.
 */

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return new Anthropic();
}

function splitSystem(messages: ChatMessage[]): { system?: string; rest: Anthropic.MessageParam[] } {
  const system = messages.find((m) => m.role === "system")?.content;
  const rest: Anthropic.MessageParam[] = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: "user", content: m.content }));
  return { system, rest };
}

function extractText(content: Anthropic.ContentBlock[]): string | null {
  const block = content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text : null;
}

/** Plain completion, no tools — used for short structured tasks (narrative summary, field extraction). */
export async function chatComplete(messages: ChatMessage[]): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  const { system, rest } = splitSystem(messages);

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system,
      messages: rest,
    });
    return extractText(response.content);
  } catch {
    return null;
  }
}

/**
 * Same as chatComplete, but lets Claude use the server-side web_search tool to ground its
 * answer in real, current pages. Uses Sonnet 5 (not Haiku) since web_search support is
 * confirmed on Sonnet 5/4.6 and the Opus line — see claude-api skill, typescript/tool-use.md.
 */
export async function chatCompleteWithWebSearch(messages: ChatMessage[]): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  const { system, rest } = splitSystem(messages);

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1500,
      system,
      tools: [{ type: "web_search_20260209", name: "web_search" }],
      messages: rest,
    });
    return extractText(response.content);
  } catch {
    return null;
  }
}
