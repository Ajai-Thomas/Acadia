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

        // Function to calculate and update the progress chart
        const updateProgressChart = () => {
            const totalTasks = scheduleData.reduce((acc, day) => acc + day.tasks.length, 0);
            const completedTasks = scheduleData.reduce((acc, day) => acc + day.tasks.filter(task => task.completed).length, 0);
            const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            const progressChart = document.querySelector('.progress-chart');
            const chartPercentageText = document.querySelector('.chart-percentage');
            const root = document.documentElement;

            if (progressChart && chartPercentageText) {
                chartPercentageText.textContent = `${percentage}%`;
                root.style.setProperty('--progress-percentage', `${percentage}%`);
                progressChart.style.background = `conic-gradient(var(--primary-color) 0% ${percentage}%, var(--border-color) ${percentage}% 100%)`;
            }
        };

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

        // Initial update of the progress chart
        updateProgressChart();

        const addTaskBtn = document.getElementById('add-task-btn');
        const newTaskInput = document.getElementById('new-task-input');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                const taskText = newTaskInput.value.trim();
                if (taskText !== '') {
                    // For now, we'll just show an alert. In the future, this would add a task to the schedule.
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
                    let botResponse = `I've noted that you want to: "${userMessage}". I'm still learning how to plan!`;
                    const lowerCaseMessage = userMessage.toLowerCase();

                    if (lowerCaseMessage.includes('add')) {
                        botResponse = "I can add tasks to your list, but I need to know which day! Please specify the day and the task.";
                    } else if (lowerCaseMessage.includes('plan')) {
                        botResponse = "I'm working on my smart scheduling algorithm now! In the meantime, you can add tasks manually.";
                    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                        botResponse = "Hello! How can I help you plan your day?";
                    } else if (lowerCaseMessage.includes('thank')) {
                        botResponse = "You're welcome! Let me know if you need anything else.";
                    }

                    const botMessageElem = document.createElement('div');
                    botMessageElem.className = 'chat-message bot';
                    botMessageElem.innerHTML = `<p>${botResponse}</p>`;
                    chatWindow.appendChild(botMessageElem);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                }, 1000);
            });
        }
        
    }
    // --- SHARED: Pop-up menu logic ---
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

    // --- D3 CHART LOGIC FOR TOTAL STUDY HOURS PAGE ---
    const studyHoursChart = document.getElementById('study-hours-chart');
    if (studyHoursChart) {
        const data = [
            { day: 'Mon', hours: 3 },
            { day: 'Tue', hours: 4.5 },
            { day: 'Wed', hours: 2.5 },
            { day: 'Thu', hours: 5 },
            { day: 'Fri', hours: 3.5 },
            { day: 'Sat', hours: 1 },
            { day: 'Sun', hours: 2 }
        ];

        const tableBody = document.querySelector('#study-hours-table tbody');
        data.forEach(d => {
            const row = tableBody.insertRow();
            row.innerHTML = `<td>${d.day}</td><td>${d.hours} hrs</td>`;
        });

        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };

        const svg = d3.select(studyHoursChart)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.day))
            .padding(0.2);
        
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => d.hours) + 1]);
        
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));
        
        svg.append('g')
            .call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.day))
            .attr('y', d => y(d.hours))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.hours))
            .attr('fill', 'var(--primary-color)');

        // Add tooltips
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        svg.selectAll('.bar')
            .on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${d.day}: ${d.hours} hrs`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', (d) => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }
});
