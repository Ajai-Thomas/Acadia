document.addEventListener('DOMContentLoaded', () => {

    // --- SHARED: Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const body = document.body;
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.checked = true;
            } else {
                body.classList.remove('dark-mode');
                themeToggle.checked = false;
            }
        };

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
        applyTheme();
    }

    // --- PRE-LOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1800);
        });
    }

    // --- LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const pageTransition = document.getElementById('page-transition');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;
            
            emailInput.classList.remove('input-error');
            emailError.textContent = '';
            passwordInput.classList.remove('input-error');
            passwordError.textContent = '';
            
            if (emailInput.value.trim() === '' || !/\S+@\S+\.\S+/.test(emailInput.value)) {
                emailInput.classList.add('input-error');
                emailError.textContent = 'Please enter a valid email.';
                isValid = false;
            }
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('input-error');
                passwordError.textContent = 'Password is required.';
                isValid = false;
            }
            if (isValid) {
                if (pageTransition) {
                    pageTransition.classList.add('active');
                }
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }
        });
    }

    // --- DASHBOARD PAGE LOGIC ---
    const scheduleGrid = document.getElementById('schedule-grid');
    if (scheduleGrid) {
        const scheduleData = [
            { day: 'Monday', tasks: [{ name: 'Data Structures - Ch. 4', completed: true }, { name: 'Review Calculus Notes', completed: true }, { name: 'Start Physics Lab Report', completed: false }] },
            { day: 'Tuesday', tasks: [{ name: 'Algorithms - Sorting', completed: true }, { name: 'Finish Physics Lab Report', completed: false }] },
            { day: 'Wednesday', tasks: [{ name: 'Calculus Problem Set 3', completed: false }, { name: 'Team Project Meeting', completed: true }, { name: 'Data Structures - Trees', completed: false }] },
            { day: 'Thursday', tasks: [{ name: 'Prepare for Friday Quiz', completed: false }, { name: 'Algorithms - Graphs', completed: false }] },
            { day: 'Friday', tasks: [{ name: 'Calculus Quiz', completed: false }, { name: 'Submit Physics Lab Report', completed: false }] },
            { day: 'Saturday', tasks: [{ name: 'Review week\'s material', completed: false }, { name: 'Plan next week\'s schedule', completed: false }] },
        ];

        scheduleData.forEach(dayData => {
            const card = document.createElement('div');
            card.className = 'day-card';
            const taskListHTML = dayData.tasks.map(task => `
                <li class="task-item">
                    <input type="checkbox" id="${task.name.replace(/\s+/g, '-')}" ${task.completed ? 'checked' : ''}>
                    <label for="${task.name.replace(/\s+/g, '-')}" class="${task.completed ? 'completed' : ''}">${task.name}</label>
                </li>
            `).join('');
            card.innerHTML = `<div class="card-header"><h3>${dayData.day}</h3></div><ul class="task-list">${taskListHTML}</ul>`;
            scheduleGrid.appendChild(card);
        });

        const addTaskBtn = document.getElementById('add-task-btn');
        const newTaskInput = document.getElementById('new-task-input');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                const taskText = newTaskInput.value.trim();
                if (taskText !== '') {
                    alert(`Task added: "${taskText}"`);
                    newTaskInput.value = '';
                }
            });
        }

        const chatSendBtn = document.getElementById('chat-send-btn');
        const chatInput = document.getElementById('chat-input');
        const chatWindow = document.getElementById('chat-window');
        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => {
                const userMessage = chatInput.value.trim();
                if (userMessage === '') return;
                
                const userMessageElem = document.createElement('div');
                userMessageElem.className = 'chat-message user';
                userMessageElem.innerHTML = `<p>${userMessage}</p>`;
                chatWindow.appendChild(userMessageElem);
                
                chatInput.value = '';
                chatWindow.scrollTop = chatWindow.scrollHeight;
                
                setTimeout(() => {
                    const botMessageElem = document.createElement('div');
                    botMessageElem.className = 'chat-message bot';
                    botMessageElem.innerHTML = `<p>I've noted that you want to: "${userMessage}". I'm still learning how to plan!</p>`;
                    chatWindow.appendChild(botMessageElem);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                }, 1000);
            });
        }
        
        const menuBtn = document.getElementById('menu-btn');
        const popupMenu = document.getElementById('popup-menu');
        if (menuBtn && popupMenu) {
            menuBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                popupMenu.classList.toggle('show');
            });
            window.addEventListener('click', (event) => {
                if (!popupMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                    popupMenu.classList.remove('show');
                }
            });
        }
    }
});