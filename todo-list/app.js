const addForm = document.querySelector('.add');
const todos = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    todos.innerHTML += html;
};

addForm.addEventListener('submit', e => {
    e.preventDefault();

    let userInput = addForm.add.value.trim();
    if(userInput.length){
        generateTemplate(userInput);
        addForm.reset();
    };
});

// Delete todos
todos.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

// filter todos
const filterTodos = term => {
    Array.from(todos.children)
        .filter(todo => {
            // Negates result so that it only keep item if it doesn't contain term
            return !todo.textContent.includes(term);
        });
};

// search keyup event
search.addEventListener('keyup', () => {
    const searchTerm = search.value.trim();
    filterTodos(searchTerm);
});

