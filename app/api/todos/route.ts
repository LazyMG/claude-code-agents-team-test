import { NextResponse } from "next/server";
import { todos } from "./store";

export async function GET() {
  return NextResponse.json({ todos });
}

export async function POST(request: Request) {
  const body = await request.json();
  const text = body.text;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json(
      { error: "Text must not be empty or whitespace-only" },
      { status: 400 }
    );
  }

  const todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);

  return NextResponse.json({ todo }, { status: 201 });
}
