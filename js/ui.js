/**
 * Módulo para gerenciar a interface do usuário
 */
const UI = {
    // Elementos DOM
    elements: {
        taskInput: document.getElementById('taskInput'),
        addButton: document.getElementById('addButton'),
        taskList: document.getElementById('taskList'),
        filterButtons: document.querySelectorAll('.filter-button'),
        taskCountElement: document.getElementById('taskCount'),
        clearCompletedButton: document.getElementById('clearCompleted'),
        darkModeToggle: document.getElementById('darkModeToggle')
    },
    
    /**
     * Renderiza a lista de tarefas com base no filtro atual
     * @param {Array} tasks - Lista de tarefas
     * @param {String} currentFilter - Filtro atual ('all', 'active', 'completed')
     */
    renderTasks: function(tasks, currentFilter) {
        const taskList = this.elements.taskList;
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhuma tarefa ${currentFilter === 'all' ? 'encontrada' : 
                                        currentFilter === 'active' ? 'ativa' : 'concluída'}</h3>
                    <p>${currentFilter === 'all' ? 'Adicione uma nova tarefa para começar' : 
                        currentFilter === 'active' ? 'Todas as tarefas estão concluídas' : 
                        'Nenhuma tarefa foi concluída ainda'}</p>
                </div>
            `;
            return;
        }
        
        taskList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.dataset.id = task.id;
            
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-content">${task.text}</span>
                <div class="task-actions">
                    <button class="task-button edit-button">✏️</button>
                    <button class="task-button delete-button">🗑️</button>
                </div>
            `;
            
            taskList.appendChild(taskElement);
        });
    },
    
    /**
     * Atualiza o contador de tarefas restantes
     * @param {Array} tasks - Lista de tarefas
     */
    updateTaskCount: function(tasks) {
        const activeCount = tasks.filter(task => !task.completed).length;
        this.elements.taskCountElement.textContent = `${activeCount} tarefa${activeCount !== 1 ? 's' : ''} restante${activeCount !== 1 ? 's' : ''}`;
    },
    
    /**
     * Aplica o modo escuro à interface
     * @param {Boolean} isDarkMode - Se o modo escuro está ativado
     */
    applyDarkMode: function(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            this.elements.darkModeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            this.elements.darkModeToggle.textContent = '🌙';
        }
    },
    
    /**
     * Limpa o campo de entrada de tarefa
     */
    clearInput: function() {
        this.elements.taskInput.value = '';
        this.elements.taskInput.focus();
    },
    
    /**
     * Atualiza o estilo dos botões de filtro
     * @param {String} currentFilter - Filtro atual ('all', 'active', 'completed')
     */
    updateFilterButtons: function(currentFilter) {
        this.elements.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === currentFilter) {
                btn.classList.add('active');
            }
        });
    }
};