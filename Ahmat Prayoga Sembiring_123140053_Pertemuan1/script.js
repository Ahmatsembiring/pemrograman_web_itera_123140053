
const TaskManager = {
  tasks: [],
  currentFilter: "all",
  currentCourseFilter: "",
  searchQuery: "",
  editingTaskId: null,

  // Inisialisasi aplikasi
  init() {
    this.loadTasks()
    this.setupEventListeners()
    this.render()
  },

  // ===== STORAGE OPERATIONS =====
  loadTasks() {
    const stored = localStorage.getItem("tasks")
    this.tasks = stored ? JSON.parse(stored) : []
  },

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
  },

  // ===== TASK OPERATIONS =====
  addTask(taskData) {
    const newTask = {
      id: Date.now(),
      name: taskData.name.trim(),
      course: taskData.course.trim(),
      deadline: taskData.deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    this.tasks.unshift(newTask)
    this.saveTasks()
    this.showToast("Tugas berhasil ditambahkan!", "success")
    return newTask
  },

  updateTask(id, taskData) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.name = taskData.name.trim()
      task.course = taskData.course.trim()
      task.deadline = taskData.deadline
      this.saveTasks()
      this.showToast("Tugas berhasil diperbarui!", "success")
    }
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.saveTasks()
    this.showToast("Tugas berhasil dihapus!", "success")
  },

  toggleTaskComplete(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveTasks()
      const message = task.completed ? "Tugas ditandai selesai!" : "Tugas ditandai belum selesai!"
      this.showToast(message, "success")
    }
  },

  // ===== FILTERING & SEARCHING =====
  getFilteredTasks() {
    return this.tasks.filter((task) => {
      // Filter berdasarkan status
      if (this.currentFilter === "pending" && task.completed) return false
      if (this.currentFilter === "completed" && !task.completed) return false

      // Filter berdasarkan mata kuliah
      if (this.currentCourseFilter && task.course !== this.currentCourseFilter) {
        return false
      }

      // Filter berdasarkan pencarian
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        return task.name.toLowerCase().includes(query) || task.course.toLowerCase().includes(query)
      }

      return true
    })
  },

  getUniqueCourses() {
    return [...new Set(this.tasks.map((t) => t.course))].sort()
  },

  // ===== STATISTICS =====
  getStats() {
    return {
      total: this.tasks.length,
      completed: this.tasks.filter((t) => t.completed).length,
      pending: this.tasks.filter((t) => !t.completed).length,
    }
  },

  // ===== VALIDATION =====
  validateTaskForm(data) {
    const errors = {}

    // Validasi nama tugas
    if (!data.name || data.name.trim() === "") {
      errors.name = "Nama tugas tidak boleh kosong"
    } else if (data.name.trim().length < 3) {
      errors.name = "Nama tugas minimal 3 karakter"
    } else if (data.name.trim().length > 100) {
      errors.name = "Nama tugas maksimal 100 karakter"
    }

    // Validasi mata kuliah
    if (!data.course || data.course.trim() === "") {
      errors.course = "Mata kuliah tidak boleh kosong"
    } else if (data.course.trim().length < 3) {
      errors.course = "Mata kuliah minimal 3 karakter"
    } else if (data.course.trim().length > 50) {
      errors.course = "Mata kuliah maksimal 50 karakter"
    }

    // Validasi deadline
    if (!data.deadline) {
      errors.deadline = "Deadline tidak boleh kosong"
    } else {
      const deadlineDate = new Date(data.deadline)
      const now = new Date()
      if (deadlineDate <= now) {
        errors.deadline = "Deadline harus lebih besar dari waktu sekarang"
      }
    }

    return errors
  },

  displayValidationErrors(errors, prefix = "") {
    // Hapus semua error message terlebih dahulu
    document.querySelectorAll(".error-message").forEach((el) => {
      el.classList.remove("show")
      el.textContent = ""
    })

    // Hapus semua error class dari input
    document.querySelectorAll("input.error").forEach((el) => {
      el.classList.remove("error")
    })

    // Tampilkan error baru
    Object.keys(errors).forEach((field) => {
      const errorElement = document.getElementById(`${prefix}${field}Error`)
      const inputElement = document.getElementById(`${prefix}${field}`)

      if (errorElement) {
        errorElement.textContent = errors[field]
        errorElement.classList.add("show")
      }

      if (inputElement) {
        inputElement.classList.add("error")
      }
    })
  },

  // ===== UI RENDERING =====
  render() {
    this.updateStats()
    this.renderTasks()
    this.updateCourseFilter()
  },

  updateStats() {
    const stats = this.getStats()
    document.getElementById("totalTasks").textContent = stats.total
    document.getElementById("pendingTasks").textContent = stats.pending
    document.getElementById("completedTasks").textContent = stats.completed
  },

  renderTasks() {
    const tasksList = document.getElementById("tasksList")
    const filteredTasks = this.getFilteredTasks()

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = '<div class="empty-state">📭 Tidak ada tugas yang sesuai dengan filter.</div>'
      return
    }

    tasksList.innerHTML = filteredTasks.map((task) => this.createTaskElement(task)).join("")

    // Attach event listeners
    tasksList.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.toggleTaskComplete(Number.parseInt(e.target.dataset.id))
        this.render()
      })
    })

    tasksList.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.openEditModal(Number.parseInt(e.target.dataset.id))
      })
    })

    tasksList.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
          this.deleteTask(Number.parseInt(e.target.dataset.id))
          this.render()
        }
      })
    })
  },

  createTaskElement(task) {
    const deadline = new Date(task.deadline)
    const now = new Date()
    const isOverdue = deadline < now && !task.completed
    const deadlineClass = isOverdue ? "overdue" : ""

    const formattedDeadline = deadline.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    return `
            <div class="task-item ${task.completed ? "completed" : ""}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? "checked" : ""}
                    data-id="${task.id}"
                >
                <div class="task-content">
                    <div class="task-name">${this.escapeHtml(task.name)}</div>
                    <div class="task-course">📖 ${this.escapeHtml(task.course)}</div>
                    <div class="task-deadline ${deadlineClass}">
                        🕐 ${formattedDeadline}
                        ${isOverdue ? " (TERLAMBAT)" : ""}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-edit btn-small" data-id="${task.id}">✏️ Edit</button>
                    <button class="btn btn-danger btn-small" data-id="${task.id}">🗑️ Hapus</button>
                </div>
            </div>
        `
  },

  updateCourseFilter() {
    const courseFilter = document.getElementById("courseFilter")
    const courses = this.getUniqueCourses()
    const currentValue = courseFilter.value

    courseFilter.innerHTML = '<option value="">Semua Mata Kuliah</option>'
    courses.forEach((course) => {
      const option = document.createElement("option")
      option.value = course
      option.textContent = course
      courseFilter.appendChild(option)
    })

    courseFilter.value = currentValue
  },

  // ===== MODAL OPERATIONS =====
  openEditModal(taskId) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) return

    this.editingTaskId = taskId
    document.getElementById("editTaskName").value = task.name
    document.getElementById("editCourseName").value = task.course
    document.getElementById("editDeadline").value = task.deadline

    document.getElementById("editModal").classList.add("active")
  },

  closeEditModal() {
    document.getElementById("editModal").classList.remove("active")
    this.editingTaskId = null
    this.displayValidationErrors({}, "edit")
  },

  // ===== UTILITY FUNCTIONS =====
  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  },

  showToast(message, type = "info") {
    const toast = document.getElementById("toast")
    toast.textContent = message
    toast.className = `toast show ${type}`

    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  },

  // ===== EVENT LISTENERS SETUP =====
  setupEventListeners() {
    // Form submission
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleAddTask()
    })

    // Edit form submission
    document.getElementById("editForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleEditTask()
    })

    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        this.currentFilter = e.target.dataset.filter
        this.render()
      })
    })

    // Search input
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchQuery = e.target.value
      this.render()
    })

    // Course filter
    document.getElementById("courseFilter").addEventListener("change", (e) => {
      this.currentCourseFilter = e.target.value
      this.render()
    })

    // Modal close buttons
    document.getElementById("closeModal").addEventListener("click", () => {
      this.closeEditModal()
    })

    document.getElementById("cancelEdit").addEventListener("click", () => {
      this.closeEditModal()
    })

    // Close modal when clicking outside
    document.getElementById("editModal").addEventListener("click", (e) => {
      if (e.target.id === "editModal") {
        this.closeEditModal()
      }
    })
  },

  handleAddTask() {
    const taskData = {
      name: document.getElementById("taskName").value,
      course: document.getElementById("courseName").value,
      deadline: document.getElementById("deadline").value,
    }

    const errors = this.validateTaskForm(taskData)

    if (Object.keys(errors).length > 0) {
      this.displayValidationErrors(errors)
      return
    }

    this.displayValidationErrors({})
    this.addTask(taskData)

    // Reset form
    document.getElementById("taskForm").reset()
    this.render()
  },

  handleEditTask() {
    const taskData = {
      name: document.getElementById("editTaskName").value,
      course: document.getElementById("editCourseName").value,
      deadline: document.getElementById("editDeadline").value,
    }

    const errors = this.validateTaskForm(taskData)

    if (Object.keys(errors).length > 0) {
      this.displayValidationErrors(errors, "edit")
      return
    }

    this.displayValidationErrors({}, "edit")
    this.updateTask(this.editingTaskId, taskData)
    this.closeEditModal()
    this.render()
  },
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener("DOMContentLoaded", () => {
  TaskManager.init()
})
