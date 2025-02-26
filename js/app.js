/**
 * Arquivo principal que inicializa a aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    // Estado da aplicação
    let darkMode = Storage.getDarkMode();
    
    // Inicializa a UI
    UI.applyDarkMode(darkMode);
    
    // Inicializa o gerenciador de tarefas
    TaskManager.init();
    
    // Event Listeners
    
    // Adicionar tarefa
    UI.elements.addButton.addEventListener('click', function() {
        const taskText = UI.elements.taskInput.value;
        TaskManager.addTask(taskText);
        UI.clearInput();
    });
    
    // Adicionar tarefa com Enter
    UI.elements.taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = UI.elements.taskInput.value;
            TaskManager.addTask(taskText);
            UI.clearInput();
        }
    });
    
    // Manipular ações de tarefa (toggle, edit, delete)
    UI.elements.taskList.addEventListener('click', function(e) {
        const taskItem = e.target.closest('.task-item');
        
        if (!taskItem) return;
        
        const taskId = parseInt(taskItem.dataset.id);
        
        if (e.target.classList.contains('task-checkbox')) {
            TaskManager.toggleTaskStatus(taskId);
        } else if (e.target.classList.contains('delete-button')) {
            TaskManager.deleteTask(taskId);
        } else if (e.target.classList.contains('edit-button')) {
            const task = TaskManager.tasks.find(task => task.id === taskId);
            const newText = prompt('Editar tarefa:', task.text);
            if (newText) {
                TaskManager.editTask(taskId, newText);
            }
        }
    });
    
    // Filtrar tarefas
    UI.elements.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            TaskManager.setFilter(filter);
        });
    });
    
    // Limpar tarefas concluídas
    UI.elements.clearCompletedButton.addEventListener('click', function() {
        TaskManager.clearCompleted();
    });
    
    // Toggle modo escuro
    UI.elements.darkModeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        Storage.saveDarkMode(darkMode);
        UI.applyDarkMode(darkMode);
    });
});