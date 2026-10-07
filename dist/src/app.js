import { addTask, loadTasks } from './task-domain.js';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const feedback = document.querySelector('#form-feedback');

const priorityLabels = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };
const priorityClasses = { baixa: 'low', media: 'medium', alta: 'high' };

function updateCount(input, target, max) { target.textContent = `${input.value.length}/${max}`; }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }

function renderTasks() {
  const tasks = loadTasks(localStorage);
  taskCount.textContent = tasks.length;
  if (!tasks.length) {
    taskList.innerHTML = '<div class="empty-state"><div class="empty-icon">☷</div><h3>Nenhuma tarefa ainda</h3><p>Comece adicionando sua primeira tarefa ao fluxo.</p></div>';
    return;
  }
  taskList.innerHTML = tasks.slice().reverse().map((task) => `
    <article class="task-item">
      <div class="task-item-top"><span class="task-status"><i></i> Pendente</span><span class="priority-tag ${priorityClasses[task.priority] || 'medium'}">${priorityLabels[task.priority] || 'Média'}</span></div>
      <h3>${escapeHtml(task.title)}</h3>
      ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
      <time datetime="${task.createdAt}">Criada em ${new Date(task.createdAt).toLocaleDateString('pt-BR')}</time>
    </article>`).join('');
}

function showError(message) { feedback.textContent = message; feedback.className = 'form-feedback error'; }
function showSuccess(message) { feedback.textContent = message; feedback.className = 'form-feedback success'; }

titleInput.addEventListener('input', () => updateCount(titleInput, document.querySelector('#title-count'), 100));
descriptionInput.addEventListener('input', () => updateCount(descriptionInput, document.querySelector('#description-count'), 500));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  try {
    addTask(localStorage, { title: data.get('title'), description: data.get('description'), priority: data.get('priority') });
    form.reset();
    updateCount(titleInput, document.querySelector('#title-count'), 100);
    updateCount(descriptionInput, document.querySelector('#description-count'), 500);
    showSuccess('Tarefa adicionada com sucesso.');
    renderTasks();
    titleInput.focus();
  } catch (error) { showError(error.message); }
});

renderTasks();
