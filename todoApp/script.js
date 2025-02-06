document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Sayfa yüklendiğinde localStorage'dan görevleri yükle
    loadTasks();

    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTaskToLocalStorage(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                saveTaskToLocalStorage(taskText);
                taskInput.value = '';
            }
        }
    });

    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.textContent = taskText;

        if (isCompleted) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Sil';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        });

        li.addEventListener('click', function () {
            li.classList.toggle('completed');
            updateTaskStatusInLocalStorage(taskText, li.classList.contains('completed'));
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // LocalStorage'dan görevleri yükle
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }

    // LocalStorage'a görev ekle
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // LocalStorage'dan görev sil
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // LocalStorage'da görevin tamamlanma durumunu güncelle
    function updateTaskStatusInLocalStorage(taskText, isCompleted) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.text === taskText) {
                task.completed = isCompleted;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});