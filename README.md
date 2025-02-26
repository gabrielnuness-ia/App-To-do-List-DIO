# App-simpletodo-DIO
Aplicativo simples de lista de tarefas com objetivo de criar uma documentação completa e robusta, visando conclusão do Bootcamp Microsoft.

![inside the app] (https://ibb.co/V0s5TdKr)

# Documentação do Aplicativo SimpleTodo

## Sumário
1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Funcionalidades](#funcionalidades)
4. [Interface do Usuário](#interface-do-usuário)
5. [Armazenamento de Dados](#armazenamento-de-dados)
6. [Fluxo de Trabalho](#fluxo-de-trabalho)
7. [Funções JavaScript](#funções-javascript)
8. [Questões de Acessibilidade](#questões-de-acessibilidade)
9. [Opções de Expansão](#opções-de-expansão)
10. [Depuração e Manutenção](#depuração-e-manutenção)

## Visão Geral

O SimpleTodo é um aplicativo de gerenciamento de tarefas que permite aos usuários criar, gerenciar e rastrear suas tarefas diárias. O aplicativo foi desenvolvido usando tecnologias web padrão (HTML, CSS e JavaScript) para garantir compatibilidade com a maioria dos navegadores modernos.

### Tecnologias Utilizadas
- HTML5
- CSS3 (com variáveis CSS para temas)
- JavaScript (ES6+)
- Armazenamento Local (localStorage)

## Estrutura do Projeto

O projeto é composto por um único arquivo HTML que contém todo o código necessário, organizado nas seguintes seções:

```
index.html
├── <head> - Metadados e estilos CSS
├── <body> - Estrutura da interface
│   ├── .container - Contêiner principal
│   │   ├── header - Cabeçalho com título e toggle de tema
│   │   ├── .task-form - Formulário para adicionar tarefas
│   │   ├── .filters - Botões de filtro de tarefas
│   │   ├── .task-list - Lista de tarefas
│   │   └── .stats - Contador de tarefas e botões de ação
└── <script> - Código JavaScript
```

## Funcionalidades

### Core
- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Editar tarefas existentes
- Excluir tarefas
- Filtrar tarefas por status (todas, ativas, concluídas)
- Limpar todas as tarefas concluídas
- Modo escuro (Dark Mode)

### Persistência de Dados
- Todas as tarefas são salvas no localStorage do navegador
- As preferências de tema (claro/escuro) são salvas

## Interface do Usuário

### Componentes
1. **Cabeçalho**
   - Título do aplicativo
   - Botão de alternar modo escuro/claro

2. **Formulário de Adição**
   - Campo de entrada de texto
   - Botão "Adicionar"

3. **Filtros**
   - Todas as tarefas
   - Tarefas ativas
   - Tarefas concluídas

4. **Lista de Tarefas**
   - Itens de tarefa com checkbox, texto e botões de ação
   - Estado vazio com mensagem informativa

5. **Barra de Status**
   - Contador de tarefas restantes
   - Botão "Limpar concluídas"

### Esquema de Cores
O aplicativo utiliza um esquema de cores com alto contraste para melhor acessibilidade:

```css
:root {
    --primary: #3a86ff;    /* Azul primário */
    --secondary: #8338ec;  /* Roxo secundário */
    --success: #06d6a0;    /* Verde sucesso */
    --danger: #ef476f;     /* Vermelho perigo */
    --warning: #ffd166;    /* Amarelo alerta */
    --dark: #1a1a2e;       /* Escuro para texto */
    --light: #f8f9fa;      /* Claro para fundo */
}
```

## Armazenamento de Dados

### Modelo de Dados
Cada tarefa é representada por um objeto JavaScript com a seguinte estrutura:

```javascript
{
    id: Number,        // Identificador único (timestamp)
    text: String,      // Texto da tarefa
    completed: Boolean, // Status de conclusão (true/false)
    createdAt: Date    // Data de criação
}
```

### Persistência
- **localStorage**: As tarefas são serializadas como JSON e armazenadas no localStorage do navegador
- **Chaves utilizadas**:
  - `tasks`: Array de objetos de tarefas
  - `darkMode`: Preferência de tema (boolean)

## Fluxo de Trabalho

### Inicialização
1. O evento `DOMContentLoaded` dispara a inicialização
2. As tarefas são carregadas do localStorage (se existirem)
3. As preferências de tema são aplicadas
4. A interface é renderizada com os dados existentes

### Adição de Tarefas
1. O usuário insere texto no campo de entrada
2. Ao clicar em "Adicionar" ou pressionar Enter:
   - Uma nova tarefa é criada com um ID único
   - A tarefa é adicionada ao array de tarefas
   - As tarefas são salvas no localStorage
   - A interface é atualizada

### Gerenciamento de Tarefas
- **Conclusão**: Clicar no checkbox alterna o status de `completed`
- **Edição**: Clicar no botão de edição abre um prompt para modificar o texto
- **Exclusão**: Clicar no botão de exclusão remove a tarefa do array

### Filtros
Clicar em um filtro:
1. Define o filtro atual (`all`, `active`, ou `completed`)
2. Atualiza a visualização da lista de tarefas
3. Altera o estilo dos botões de filtro

## Funções JavaScript

### Funções Principais

#### `addTask()`
Adiciona uma nova tarefa à lista.

#### `handleTaskAction(e)`
Manipula cliques em itens da lista de tarefas.

#### `toggleTaskStatus(taskId)`
Alterna o status de conclusão de uma tarefa.

#### `deleteTask(taskId)`
Remove uma tarefa da lista.

#### `editTask(taskId)`
Abre um prompt para editar uma tarefa.

#### `renderTasks()`
Renderiza a lista de tarefas baseada no filtro atual.

#### `updateTaskCount()`
Atualiza o contador de tarefas restantes.

#### `clearCompleted()`
Remove todas as tarefas concluídas.

#### `saveTasks()`
Salva as tarefas no localStorage.

#### `toggleDarkMode()`
Alterna entre os modos claro e escuro.

#### `applyDarkMode()`
Aplica o estilo correspondente ao modo atual.

## Questões de Acessibilidade

### Implementadas
- Alto contraste entre texto e fundo
- Tamanhos de fonte adequados (mínimo 14px)
- Áreas de clique generosas (mínimo 44x44px)
- Feedback visual em interações
- Suporte para navegação por teclado

### Possíveis Melhorias
- Adicionar atributos ARIA para melhor suporte a leitores de tela
- Implementar suporte para teclas de atalho
- Adicionar textos alternativos para ícones

## Opções de Expansão

### Backend
Para implementar sincronização entre dispositivos, considere uma das seguintes opções:

1. **API REST** com Express.js e MongoDB:
   - Crie endpoints para CRUD de tarefas
   - Adicione autenticação de usuários

2. **Firebase**:
   - Firestore para armazenamento de dados
   - Authentication para gerenciamento de usuários

3. **Backend Serverless**:
   - AWS Lambda + DynamoDB
   - Vercel Serverless Functions

### Funcionalidades Adicionais
- Categorias/etiquetas para tarefas
- Tarefas recorrentes
- Datas de vencimento e lembretes
- Priorização de tarefas
- Suporte a subtarefas

## Depuração e Manutenção

### Problemas Comuns
1. **Dados não sendo salvos**:
   - Verifique se o localStorage está disponível
   - Verifique permissões de armazenamento do navegador

2. **Problemas de renderização**:
   - Inspecione o DOM para verificar a estrutura
   - Verifique os logs do console para erros

3. **Comportamento inesperado em dispositivos móveis**:
   - Teste em vários dispositivos e navegadores
   - Verifique estilos responsivos

### Manutenção
- Execute testes regularmente em diferentes navegadores
- Atualize as dependências conforme necessário
- Considere adicionar transpilação (Babel) para melhor compatibilidade
