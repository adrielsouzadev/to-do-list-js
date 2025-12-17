const input = document.getElementById('inputTask');
const btnAdd = document.getElementById('btn-add');
const main = document.getElementById('taskList')

btnAdd.addEventListener("click", () => {
    //PEGAR O VALOR DIGITADO NO INPUT
    let valueInput = input.value.trim();

    //SE NÃO FOR VAZIO
    if (valueInput === "") return;{

        //CRIANDO ELEMENTOS
        const card = document.createElement("div");
        card.classList.add("card");

        const cardIcon = document.createElement("div")
        cardIcon.classList.add("card-icon");
        cardIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;

        const cardName = document.createElement("div");
        cardName.classList.add("card-name");
        cardName.textContent = valueInput;
        
        const cardButton = document.createElement("div");
        cardButton.classList.add("card-button");

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete");
        btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i> Deletar`;

        // ADICIONANDO EVENTO NO BOTÃO DELETE
        btnDelete.addEventListener("click", () => {
            card.remove();
        });

        // ADICIONANDO ELEMENTOS NO HTML
        cardButton.appendChild(btnDelete);
        card.appendChild(cardIcon);
        card.appendChild(cardName);
        card.appendChild(cardButton);
        main.appendChild(card);
        
        //ZERAR OS CAMPOS
        input.value = "";
        input.focus();
    }
});

input.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        btnAdd.click();
    }
});