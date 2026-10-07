import test from 'node:test';
import assert from 'node:assert/strict';
import { addTask, createTask, loadTasks, PRIORITIES, STORAGE_KEY } from '../src/task-domain.js';

function storage() { const data = new Map(); return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }; }

test('cadastra uma tarefa válida com valores normalizados', () => { const task = createTask({ title: '  Estudar  ', description: '  capítulo 1 ', priority: 'alta' }, new Date('2026-01-01')); assert.equal(task.title, 'Estudar'); assert.equal(task.description, 'capítulo 1'); assert.equal(task.priority, 'alta'); assert.equal(task.status, 'pendente'); assert.equal(task.createdAt, '2026-01-01T00:00:00.000Z'); assert.ok(task.id); });
test('rejeita título vazio e limites inválidos', () => { assert.throws(() => createTask({ title: '   '}), /título/); assert.throws(() => createTask({ title: 'a'.repeat(101)}), /100/); assert.throws(() => createTask({ title: 'ok', description: 'a'.repeat(501)}), /500/); });
test('usa média como padrão e aceita apenas prioridades permitidas', () => { assert.equal(createTask({ title: 'Tarefa' }).priority, 'media'); for (const priority of PRIORITIES) assert.equal(createTask({ title: 'Tarefa', priority }).priority, priority); assert.throws(() => createTask({ title: 'Tarefa', priority: 'urgente' }), /prioridade/); });
test('persiste tarefas, cria IDs únicos e preserva anteriores', () => { const store = storage(); const first = addTask(store, { title: 'Primeira' }, new Date('2026-01-01')); const second = addTask(store, { title: 'Segunda' }, new Date('2026-01-02')); const tasks = loadTasks(store); assert.equal(tasks.length, 2); assert.notEqual(first.id, second.id); assert.equal(tasks[0].status, 'pendente'); assert.equal(JSON.parse(store.getItem(STORAGE_KEY)).length, 2); });
