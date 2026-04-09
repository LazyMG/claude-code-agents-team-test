import { NextResponse } from "next/server";
import { todos } from "../store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const body = await request.json();
  todo.completed = body.completed;

  return NextResponse.json({ todo });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todos.splice(index, 1);

  return new Response(null, { status: 204 });
}
