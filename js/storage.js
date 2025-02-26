/**
 * Módulo para gerenciar o armazenamento de dados do aplicativo
 */
const Storage = {
    /**
     * Recupera as tarefas do localStorage
     * @returns {Array} Array de tarefas
     */
    getTasks: function() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    },
    
    /**
     * Salva as tarefas no localStorage
     * @param {Array} tasks - Array de tarefas para salvar
     */
    saveTasks: function(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    
    /**
     * Recupera a preferência de modo escuro
     * @returns {Boolean} true se o modo escuro estiver ativado
     */
    getDarkMode: function() {
        return localStorage.getItem('darkMode') === 'true';
    },
    
    /**
     * Salva a preferência de modo escuro
     * @param {Boolean} isDarkMode - Se o modo escuro está ativado
     */
    saveDarkMode: function(isDarkMode) {
        localStorage.setItem('darkMode', isDarkMode);
    }
};