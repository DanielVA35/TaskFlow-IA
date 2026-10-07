export const STORAGE_KEY = 'taskflow-ia.tasks';
export const PRIORITIES = ['baixa', 'media', 'alta'];

export function createTask(input, now = new Date()) {
  const title = String(input.title ?? '').trim();
  const description = String(input.description ?? '').trim();
  const priority = input.priority || 'media';

  if (!title) throw new Error('Informe um título para a tarefa.');
  if (title.length > 100) throw new Error('O título deve ter no máximo 100 caracteres.');
  if (description.length > 500) throw new Error('A descrição deve ter no máximo 500 caracteres.');
  if (!PRIORITIES.includes(priority)) throw new Error('Selecione uma prioridade válida.');

  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    description,
    priority,
    status: 'pendente',
    createdAt: now.toISOString()
  };
}

export function loadTasks(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const tasks = raw ? JSON.parse(raw) : [];
    return Array.isArray(tasks) ? tasks : [];
  } catch {
    return [];
  }
}

export function saveTasks(storage, tasks) {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(storage, input, now) {
  const tasks = loadTasks(storage);
  const task = createTask(input, now);
  saveTasks(storage, [...tasks, task]);
  return task;
}
