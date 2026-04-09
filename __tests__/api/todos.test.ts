import { GET, POST } from '@/app/api/todos/route';
import { PATCH, DELETE } from '@/app/api/todos/[id]/route';
import { todos } from '@/app/api/todos/store';

beforeEach(() => {
  todos.length = 0;
  todos.push(
    { id: '1', text: '우유 사기', completed: false, createdAt: '2026-04-09T00:00:00.000Z' },
    { id: '2', text: 'Next.js 공부하기', completed: true, createdAt: '2026-04-09T00:01:00.000Z' },
  );
});

describe('GET /api/todos', () => {
  it('returns initial todos (2 items)', async () => {
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.todos).toHaveLength(2);
    expect(data.todos[0].text).toBe('우유 사기');
    expect(data.todos[1].text).toBe('Next.js 공부하기');
  });
});

describe('POST /api/todos', () => {
  it('creates a new todo with valid text', async () => {
    const req = new Request('http://localhost/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test todo' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data.todo.text).toBe('Test todo');
    expect(data.todo.completed).toBe(false);
    expect(data.todo.id).toBeDefined();
    expect(data.todo.createdAt).toBeDefined();
    expect(todos).toHaveLength(3);
  });

  it('returns 400 for empty text', async () => {
    const req = new Request('http://localhost/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it('returns 400 for whitespace-only text', async () => {
    const req = new Request('http://localhost/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '   ' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

describe('PATCH /api/todos/[id]', () => {
  it('toggles completed status', async () => {
    const req = new Request('http://localhost/api/todos/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    const res = await PATCH(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.todo.completed).toBe(true);
    expect(data.todo.id).toBe('1');
  });

  it('returns 404 for non-existent id', async () => {
    const req = new Request('http://localhost/api/todos/999', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    const res = await PATCH(req, { params: Promise.resolve({ id: '999' }) });
    const data = await res.json();
    expect(res.status).toBe(404);
    expect(data.error).toBeDefined();
  });
});

describe('DELETE /api/todos/[id]', () => {
  it('deletes a todo', async () => {
    const req = new Request('http://localhost/api/todos/1', { method: 'DELETE' });
    const res = await DELETE(req, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(204);
    expect(todos).toHaveLength(1);
    expect(todos.find(t => t.id === '1')).toBeUndefined();
  });

  it('returns 404 for non-existent id', async () => {
    const req = new Request('http://localhost/api/todos/999', { method: 'DELETE' });
    const res = await DELETE(req, { params: Promise.resolve({ id: '999' }) });
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });
});
