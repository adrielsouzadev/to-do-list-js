let cont = 0

let input = document.getElementById('inputTask');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('taskList')

btnAdd.addEventListener("click", () => {
    let valueInput = input.value.trim();
    if (valueInput === "") return;

    ++cont;

    let card = document.createElement("div");
    card.classList.add("card");
    card.id = cont;

    let cardIcon = document.createElement("div")
    cardIcon.classList.add("card-icon");
    cardIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;

    let cardName = document.createElement("div");
    cardName.classList.add("card-name");
    cardName.textContent = valueInput;
    
    let cardButton = document.createElement("div");
    cardButton.classList.add("card-button");

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("delete");
    btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i> Deletar`;

    btnDelete.addEventListener("click", () => {
        cardRemove(card.id);
    });

    cardIcon.addEventListener("click", () => {
        markTask(card.id);
    })

    cardName.addEventListener("click", () => {
        markTask(card.id);
    })

    cardButton.appendChild(btnDelete);
    card.appendChild(cardIcon);
    card.appendChild(cardName);
    card.appendChild(cardButton);
    main.appendChild(card);

    input.value = "";
    input.focus();
});

const cardRemove = (id) => {
    let card = document.getElementById(id);
    if (card) card.remove();
};

const markTask = (id) => {
    const item = document.getElementById(id);
    if (!item) return;

    const icon = item.querySelector(".card-icon i");

    const isChecked = item.classList.toggle("checked");

    if (isChecked) {
        icon.classList.remove("fa-regular", "fa-circle");
        icon.classList.add("fa-solid", "fa-circle-check");
        main.appendChild(item);
    } else {
        icon.classList.remove("fa-solid", "fa-circle-check");
        icon.classList.add("fa-regular", "fa-circle");
    }
};

input.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        btnAdd.click();
    }
});