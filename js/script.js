const input = document.getElementById("inputTask");
const addButton = document.getElementById("btn-add");
const taskList = document.getElementById("taskList");

// CARREGA AS TAREFAS DO LOCALSTORAGE OU INICIA COM ARRAY VAZIO
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// MANTÉM O ID SEQUENCIAL MESMO APÓS RECARREGAR AS TAREFAS SALVAS
let counter = tasks.length ? tasks[tasks.length - 1].id : 0;

// SALVA AS TAREFAS NO LOCALSTORAGE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// RENDERIZA TODAS AS TAREFAS NA TELA
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = task.id;

        if (task.completed) {
            card.classList.add("checked");
        }

        const cardIcon = document.createElement("div");
        cardIcon.classList.add("card-icon");
        cardIcon.innerHTML = task.completed
            ? `<i class="fa-solid fa-circle-check"></i>`
            : `<i class="fa-regular fa-circle"></i>`;

        const cardName = document.createElement("div");
        cardName.classList.add("card-name");
        cardName.textContent = task.text;

        const cardButton = document.createElement("div");
        cardButton.classList.add("card-button");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i> Delete`;

        // EVENTOS DE MARCAR E DELETAR
        deleteButton.addEventListener("click", () => removeTask(task.id));
        cardIcon.addEventListener("click", () => toggleTask(task.id));
        cardName.addEventListener("click", () => toggleTask(task.id));

        cardButton.appendChild(deleteButton);
        card.append(cardIcon, cardName, cardButton);
        taskList.appendChild(card);
    });
}

// ADICIONA UMA NOVA TAREFA
addButton.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({
        id: ++counter,
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

// MARCA OU DESMARCA UMA TAREFA
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

// REMOVE UMA TAREFA
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// TECLA ENTER ADICIONA A TAREFA
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

// RENDERIZA AS TAREFAS AO CARREGAR A PÁGINA
renderTasks();
