import { addTask, filterTasks, loadTasks, setTaskStatus, updateTask } from './task-domain.js';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const feedback = document.querySelector('#form-feedback');
let editingTaskId = null;
let activeFilter = 'todas';

const priorityLabels = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };
const priorityClasses = { baixa: 'low', media: 'medium', alta: 'high' };

function updateCount(input, target, max) { target.textContent = `${input.value.length}/${max}`; }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }

function renderTasks() {
  const tasks = loadTasks(localStorage);
  const visibleTasks = filterTasks(tasks, activeFilter);
  taskCount.textContent = visibleTasks.length;
  if (!visibleTasks.length) {
    const message = tasks.length ? 'Nenhuma tarefa neste filtro' : 'Nenhuma tarefa ainda';
    const hint = tasks.length ? 'Escolha outro filtro para visualizar suas tarefas.' : 'Comece adicionando sua primeira tarefa ao fluxo.';
    taskList.innerHTML = `<div class="empty-state"><div class="empty-icon">☷</div><h3>${message}</h3><p>${hint}</p></div>`;
    return;
  }
  taskList.innerHTML = visibleTasks.slice().reverse().map((task) => `
    <article class="task-item ${task.status === 'concluida' ? 'is-complete' : ''}">
      <div class="task-item-top"><label class="completion-control"><input type="checkbox" data-status-id="${task.id}" ${task.status === 'concluida' ? 'checked' : ''} /><span>${task.status === 'concluida' ? 'Concluída' : 'Pendente'}</span></label><span class="priority-tag ${priorityClasses[task.priority] || 'medium'}">${priorityLabels[task.priority] || 'Média'}</span></div>
      <h3>${escapeHtml(task.title)}</h3>
      ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
      <div class="task-item-bottom"><time datetime="${task.createdAt}">Criada em ${new Date(task.createdAt).toLocaleDateString('pt-BR')}</time><button class="edit-button" type="button" data-edit-id="${task.id}">Editar</button></div>
    </article>`).join('');
}

function showError(message) { feedback.textContent = message; feedback.className = 'form-feedback error'; }
function showSuccess(message) { feedback.textContent = message; feedback.className = 'form-feedback success'; }

function setFormMode(editing, task = null) {
  editingTaskId = editing ? task.id : null;
  document.querySelector('#form-title').textContent = editing ? 'Editar tarefa' : 'O que precisa ser feito?';
  document.querySelector('.section-kicker').textContent = editing ? 'Atualizar tarefa' : 'Nova tarefa';
  document.querySelector('.step-badge').textContent = editing ? '02' : '01';
  document.querySelector('.primary-button').innerHTML = editing ? 'Salvar alterações' : '<span aria-hidden="true">+</span> Adicionar tarefa';
  document.querySelector('#cancel-edit').hidden = !editing;
  if (task) {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    form.querySelector(`[name="priority"][value="${task.priority}"]`).checked = true;
    updateCount(titleInput, document.querySelector('#title-count'), 100);
    updateCount(descriptionInput, document.querySelector('#description-count'), 500);
    titleInput.focus();
  }
}

function cancelEdit() {
  form.reset(); setFormMode(false); feedback.textContent = ''; feedback.className = 'form-feedback';
  updateCount(titleInput, document.querySelector('#title-count'), 100);
  updateCount(descriptionInput, document.querySelector('#description-count'), 500);
}

titleInput.addEventListener('input', () => updateCount(titleInput, document.querySelector('#title-count'), 100));
descriptionInput.addEventListener('input', () => updateCount(descriptionInput, document.querySelector('#description-count'), 500));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  try {
    const input = { title: data.get('title'), description: data.get('description'), priority: data.get('priority') };
    if (editingTaskId) { updateTask(localStorage, editingTaskId, input); showSuccess('Alterações salvas com sucesso.'); }
    else { addTask(localStorage, input); showSuccess('Tarefa adicionada com sucesso.'); }
    form.reset();
    setFormMode(false);
    updateCount(titleInput, document.querySelector('#title-count'), 100);
    updateCount(descriptionInput, document.querySelector('#description-count'), 500);
    renderTasks();
    titleInput.focus();
  } catch (error) { showError(error.message); }
});

document.querySelector('#cancel-edit').addEventListener('click', cancelEdit);
document.querySelector('.task-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
  renderTasks();
});
taskList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-edit-id]');
  if (!button) return;
  const task = loadTasks(localStorage).find((item) => item.id === button.dataset.editId);
  if (task) setFormMode(true, task);
});
taskList.addEventListener('change', (event) => {
  const control = event.target.closest('[data-status-id]');
  if (!control) return;
  setTaskStatus(localStorage, control.dataset.statusId, control.checked ? 'concluida' : 'pendente');
  renderTasks();
});

renderTasks();
