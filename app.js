const todoInput=document.getElementById('todoInput')
// console.log(todoInput);
const todoList=document.getElementById('todoList');
// console.log(todoList);
const addButton=document.querySelector('.addBtn');

const savedTodosJson=localStorage.getItem("todos");
const savedTodos=savedTodosJson ? JSON.parse(savedTodosJson): [];

// const savedTodos=JSON.parse(localStorage.getItem("todos")) || [];

for(const todo of savedTodos){
    addTodotoList(todo);
}
function addTodo() { 
    const todoText=todoInput.value.trim();
    console.log(todoText);
    if(todoText=="") {
        return;
    }
    const todo={
        id: Date.now(),
        text:todoText,
        completed:false

    };
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos));
    addTodotoList(todo);
    todoInput.value="";

 }
 //listeye ekleme fonksiyonu
 function addTodotoList(todo){
const li=document.createElement("li");
li.setAttribute('id',todo.id);
li.innerHTML=`
<span title="${todo.text}">${todo.text}</span>
            <button onclick="toggleComplete(${todo.id})"><i class="fa-solid fa-check"></i> </button>
            <button onclick="editTodo(${todo.id})"><i class="fa-regular fa-pen-to-square"></i> </button>
            <button onclick="removeTodo(${todo.id})" ><i class="fa-solid fa-trash"></i> </button>

`;
li.classList.toggle('completed',todo.completed);
todoList.appendChild(li);
// Completed todo sayısını güncelle
updateCompletedCount();

 }
 function updateCompletedCount() {
    const completedTodos = document.querySelectorAll('.completed').length;
    const countDisplay = document.getElementById('completed-count');
    if (countDisplay) {
        countDisplay.textContent = `Completed Todos: ${completedTodos}`;
    }
}

 addButton.addEventListener('click',addTodo);
 todoInput.addEventListener('keypress',function(event){
    if(event.key=='Enter'){
        addTodo();
    }
 });



 //görevin tamamlandı durmunu değiştirmek için fonksiyon
 function toggleComplete(id){
const todo=savedTodos.find(todo => todo.id===id);
todo.completed= !todo.completed //true ise false false ise true yap
localStorage.setItem("todos",JSON.stringify(savedTodos));
const todoElement=document.getElementById(id);
todoElement.classList.toggle('completed',todo.completed);

 }

 //görevi düzenleme fonksiyonu
//  function editTodo(id){
//     const todo=savedTodos.find(todo=>todo.id===id);
//  const newText=prompt('görevi düzenle',todo.text);
//  if(newText !==null){
//     todo.text=newText.trim();
//     localStorage.setItem("todos",JSON.stringify(savedTodos));
//     const todoElement=document.getElementById(id);
//     todoElement.querySelector('span').textContent=newText;


//  }}
 
 function editTodo(id) {
    // Find the todo item by ID
    const todo = savedTodos.find(todo => todo.id === id);
    
    // Get the todo element from the DOM
    const todoElement = document.getElementById(id);
    
    // Get the span element that contains the todo text
    const todoTextElement = todoElement.querySelector('span');
    
    // Create an input field and set its value to the current todo text
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = todo.text;
    
    // Replace the span with the input field
    todoTextElement.replaceWith(inputField);
    
    // Focus on the input field
    inputField.focus();
    
    // Add an event listener for the "Enter" key
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // Get the new text from the input field
            const newText = inputField.value.trim();
            
            // Update the todo text if the new text is not empty
            if (newText !== '') {
                todo.text = newText;
                
                // Update the localStorage
                localStorage.setItem("todos", JSON.stringify(savedTodos));
                
                // Replace the input field with the updated span
                const updatedSpan = document.createElement('span');
                updatedSpan.textContent = newText;
                inputField.replaceWith(updatedSpan);
            }
        }
    });
    
    // Add an event listener for the "Escape" key to cancel editing
    inputField.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
            // Replace the input field with the original span
            inputField.replaceWith(todoTextElement);
        }
    });
}



 
 //Görevi listeden kaldırma
 function removeTodo(id){
    
    const todoElement=document.getElementById(id);
    todoElement.style.animation='fadeOut 0.3 ease';
    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex(todo=>todo.id===id),1);
        localStorage.setItem("todos",JSON.stringify(savedTodos));
        todoElement.remove();
    },300)

 }




const tarih=document.querySelector('.tarih');

const updateDateBtn=document.querySelector('.datebtn');
updateDateBtn.addEventListener('click',function(){
    const date=new Date();
    console.log(date);
    let day = date.getDate(); // Günü almak için getDate() kullanılır
    console.log(day);
   
    let month = date.getMonth() + 1; // Ayı doğru şekilde almak için +1 eklenir
    let year = date.getFullYear();
    tarih.innerHTML=`${day}/${month}/${month}`
})
