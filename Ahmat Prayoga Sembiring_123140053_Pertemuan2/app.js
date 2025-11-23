// ============================================
// PERSONAL DASHBOARD APP - ES6+ IMPLEMENTATION
// ============================================

class Task {
  constructor(id, title, deadline, priority, subject, completed = false) {
    this.id = id;
    this.title = title;
    this.deadline = deadline;
    this.priority = priority;
    this.subject = subject;
    this.completed = completed;
    this.createdAt = new Date();
  }
}

class Note {
  constructor(id, title, content, category) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.createdAt = new Date();
  }
}

class Schedule {
  constructor(id, name, time, location, instructor) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.location = location;
    this.instructor = instructor;
    this.createdAt = new Date();
  }
}

// Main Application Class
class DashboardApp {
  constructor() {
    this.tasks = [];
    this.notes = [];
    this.schedules = [];
    this.init();
  }

  init = async () => {
    this.loadDataFromStorage();
    this.attachEventListeners();
    this.startClock();
    this.renderAllItems();
    await this.loadInitialData();
  };

  attachEventListeners = () => {
    const scheduleForm = document.getElementById('schedule-form');
    const taskForm = document.getElementById('task-form');
    const noteForm = document.getElementById('note-form');
    const navTabs = document.querySelectorAll('.nav-tab');

    scheduleForm.addEventListener('submit', (e) => this.handleAddSchedule(e));
    taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
    noteForm.addEventListener('submit', (e) => this.handleAddNote(e));

    navTabs.forEach((tab) => {
      tab.addEventListener('click', () => this.switchTab(tab));
    });
  };

  loadDataFromStorage = () => {
    try {
      const storedTasks = localStorage.getItem('dashboard_tasks');
      const storedNotes = localStorage.getItem('dashboard_notes');
      const storedSchedules = localStorage.getItem('dashboard_schedules');

      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks).map((t) => new Task(t.id, t.title, t.deadline, t.priority, t.subject, t.completed));
      }

      if (storedNotes) {
        this.notes = JSON.parse(storedNotes).map((n) => new Note(n.id, n.title, n.content, n.category));
      }

      if (storedSchedules) {
        this.schedules = JSON.parse(storedSchedules).map((s) => new Schedule(s.id, s.name, s.time, s.location, s.instructor));
      }
    } catch (error) {
      console.error('[v0] Error loading data from storage:', error);
    }
  };

  saveToStorage = () => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(this.tasks));
    localStorage.setItem('dashboard_notes', JSON.stringify(this.notes));
    localStorage.setItem('dashboard_schedules', JSON.stringify(this.schedules));
  };

  loadInitialData = async () => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Add sample data jika kosong
        if (this.tasks.length === 0 && this.notes.length === 0 && this.schedules.length === 0) {
          this.schedules.push(new Schedule(1, 'Pemrograman Web', '09:00', 'Ruang 101', 'Prof. Ahmad'), new Schedule(2, 'Database', '13:00', 'Ruang 205', 'Dr. Siti'));

          this.tasks.push(new Task(1, 'Tugas HTML/CSS', '2024-01-15', 'high', 'Pemrograman Web'), new Task(2, 'Baca Chapter 5', '2024-01-20', 'medium', 'Database'));

          this.notes.push(new Note(1, 'Tips Belajar', 'Konsistensi adalah kunci kesuksesan', 'idea'));

          this.saveToStorage();
        }
        resolve();
      }, 300);
    });
  };

  handleAddSchedule = (e) => {
    e.preventDefault();

    const name = document.getElementById('schedule-name').value.trim();
    const time = document.getElementById('schedule-time').value;
    const location = document.getElementById('schedule-location').value.trim();
    const instructor = document.getElementById('schedule-instructor').value.trim();

    if (!name || !time) {
      alert('Harap isi nama kelas dan waktu!');
      return;
    }

    const newSchedule = new Schedule(Date.now(), name, time, location || 'Tidak ditentukan', instructor || 'Tidak ditentukan');

    this.schedules.push(newSchedule);
    this.saveToStorage();
    this.renderSchedules();
    document.getElementById('schedule-form').reset();
  };

  handleAddTask = (e) => {
    e.preventDefault();

    const title = document.getElementById('task-title').value.trim();
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;
    const subject = document.getElementById('task-subject').value.trim();

    if (!title || !deadline) {
      alert('Harap isi judul tugas dan deadline!');
      return;
    }

    const newTask = new Task(Date.now(), title, deadline, priority, subject || 'Umum', false);

    this.tasks.push(newTask);
    this.saveToStorage();
    this.renderTasks();
    document.getElementById('task-form').reset();
  };

  handleAddNote = (e) => {
    e.preventDefault();

    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    const category = document.getElementById('note-category').value;

    if (!title || !content) {
      alert('Harap isi judul dan isi catatan!');
      return;
    }

    const newNote = new Note(Date.now(), title, content, category);

    this.notes.push(newNote);
    this.saveToStorage();
    this.renderNotes();
    document.getElementById('note-form').reset();
  };

  deleteSchedule = (id) => {
    this.schedules = this.schedules.filter((s) => s.id !== id);
    this.saveToStorage();
    this.renderSchedules();
  };

  deleteTask = (id) => {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
  };

  deleteNote = (id) => {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveToStorage();
    this.renderNotes();
  };

  toggleTaskCompletion = (id) => {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage();
      this.renderTasks();
      this.updateStats();
    }
  };

  renderSchedules = () => {
    const scheduleList = document.getElementById('schedule-list');

    if (this.schedules.length === 0) {
      scheduleList.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">📅</div>
                    <p>Tidak ada jadwal. Tambahkan jadwal kelas Anda sekarang!</p>
                </div>
            `;
      return;
    }

    scheduleList.innerHTML = this.schedules
      .map(
        (schedule) => `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${schedule.name}</h3>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">⏰ ${schedule.time}</div>
                    <div class="card-meta-item">📍 ${schedule.location}</div>
                </div>
                <div class="card-content">
                    <strong>Dosen:</strong> ${schedule.instructor}
                </div>
                <div class="card-actions">
                    <button class="btn btn-danger" onclick="app.deleteSchedule(${schedule.id})">Hapus</button>
                </div>
            </div>
        `
      )
      .join('');
  };

  renderTasks = () => {
    const taskList = document.getElementById('task-list');

    if (this.tasks.length === 0) {
      taskList.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">✓</div>
                    <p>Tidak ada tugas. Mulai tambahkan tugas baru Anda!</p>
                </div>
            `;
      return;
    }

    taskList.innerHTML = this.tasks
      .map(
        (task) => `
            <div class="card" style="border-left-color: ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'}">
                <div class="card-header">
                    <div style="flex: 1;">
                        <h3 class="card-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? '#9ca3af' : 'inherit'}">
                            ${task.title}
                        </h3>
                    </div>
                    <span class="card-badge badge-${task.priority}">
                        ${this.getPriorityLabel(task.priority)}
                    </span>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">📚 ${task.subject}</div>
                    <div class="card-meta-item">📅 ${task.deadline}</div>
                </div>
                <div class="card-actions">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" class="card-checkbox" ${task.completed ? 'checked' : ''} onchange="app.toggleTaskCompletion(${task.id})">
                        <span style="font-size: 0.9rem;">${task.completed ? 'Selesai' : 'Lanjutkan'}</span>
                    </label>
                    <button class="btn btn-danger" onclick="app.deleteTask(${task.id})">Hapus</button>
                </div>
            </div>
        `
      )
      .join('');
  };

  renderNotes = () => {
    const noteList = document.getElementById('note-list');

    if (this.notes.length === 0) {
      noteList.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">📝</div>
                    <p>Tidak ada catatan. Buat catatan baru Anda sekarang!</p>
                </div>
            `;
      return;
    }

    noteList.innerHTML = this.notes
      .map(
        (note) => `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${note.title}</h3>
                    <span class="card-badge badge-${note.category}">
                        ${this.getCategoryLabel(note.category)}
                    </span>
                </div>
                <div class="card-content">
                    ${note.content}
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">📅 ${new Date(note.createdAt).toLocaleDateString('id-ID')}</div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-danger" onclick="app.deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `
      )
      .join('');
  };

  getPriorityLabel = (priority) => {
    const labels = { high: 'Prioritas Tinggi', medium: 'Prioritas Sedang', low: 'Prioritas Rendah' };
    return labels[priority] || priority;
  };

  getCategoryLabel = (category) => {
    const labels = {
      personal: 'Personal',
      academic: 'Akademik',
      project: 'Proyek',
      idea: 'Ide',
    };
    return labels[category] || category;
  };

  renderAllItems = () => {
    this.renderSchedules();
    this.renderTasks();
    this.renderNotes();
    this.updateStats();
  };

  updateStats = () => {
    const completedTasks = this.tasks.filter((t) => t.completed).length;
    const totalTasks = this.tasks.length;

    document.getElementById('stat-schedules').textContent = this.schedules.length;
    document.getElementById('stat-tasks').textContent = totalTasks;
    document.getElementById('stat-completed').textContent = completedTasks;
    document.getElementById('stat-notes').textContent = this.notes.length;

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${completedTasks}/${totalTasks} tugas selesai`;
  };

  switchTab = (tab) => {
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');
    const tabName = tab.getAttribute('data-tab');
    document.getElementById(tabName).classList.add('active');
  };

  startClock = () => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', { hour12: false });
      const dateString = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      document.getElementById('current-time').textContent = timeString;
      document.getElementById('current-date').textContent = dateString;
    };

    updateTime();
    setInterval(updateTime, 1000);
  };
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new DashboardApp();
});
