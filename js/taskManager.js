/**
 * Módulo para gerenciar as tarefas
 */
const TaskManager = {
    tasks: [],
    currentFilter: 'all',
    
    /**
     * Inicializa o gerenciador de tarefas
     */
    init: function() {
        this.tasks = Storage.getTasks();
        this.render();
    },
    
    /**
     * Renderiza a lista de tarefas e atualiza a UI
     */
    render: function() {
        UI.renderTasks(this.tasks, this.currentFilter);
        UI.updateTaskCount(this.tasks);
    },
    
    /**
     * Adiciona uma nova tarefa
     * @param {String} text - Texto da tarefa
     */
    addTask: function(text) {
        if (!text.trim()) return;
        
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date()
        };
        
        this.tasks.push(newTask);
        this.save();
        this.render();
    },
    
    /**
     * Alterna o status de uma tarefa
     * @param {Number} taskId - ID da tarefa
     */
    toggleTaskStatus: function(taskId) {
        this.tasks = this.tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        this.save();
        this.render();
    },
    
    /**
     * Exclui uma tarefa
     * @param {Number} taskId - ID da tarefa
     */
    deleteTask: function(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.save();
        this.render();
    },
    
    /**
     * Edita uma tarefa
     * @param {Number} taskId - ID da tarefa
     * @param {String} newText - Novo texto da tarefa
     */
    editTask: function(taskId, newText) {
        if (!newText.trim()) return;
        
        this.tasks = this.tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, text: newText.trim() };
            }
            return task;
        });
        
        this.save();
        this.render();
    },
    
    /**
     * Define o filtro atual
     * @param {String} filter - Filtro ('all', 'active', 'completed')
     */
    setFilter: function(filter) {
        this.currentFilter = filter;
        UI.updateFilterButtons(filter);
        this.render();
    },
    
    /**
     * Limpa todas as tarefas concluídas
     */
    clearCompleted: function() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.save();
        this.render();
    },
    
    /**
     * Salva as tarefas no armazenamento
     */
    save: function() {
        Storage.saveTasks(this.tasks);
    }
};