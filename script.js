const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openModal(content) {
  modalBody.innerHTML = content;
  modal.classList.add("show");
}

document.querySelectorAll(".project-btn").forEach(button => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;

    if (project === "grades") {
      openModal(`
        <h2>Student Grade Calculator</h2>
        <p style="color:#a7adba;margin:8px 0 18px">Enter three grades to calculate the average.</p>
        <input class="demo-input" id="grade1" type="number" min="0" max="100" placeholder="Grade 1">
        <input class="demo-input" id="grade2" type="number" min="0" max="100" placeholder="Grade 2">
        <input class="demo-input" id="grade3" type="number" min="0" max="100" placeholder="Grade 3">
        <button class="demo-button" id="calcGrade">Calculate</button>
        <h3 id="gradeResult" style="margin-top:18px"></h3>`);
      document.getElementById("calcGrade").onclick = () => {
        const grades = [1,2,3].map(n => Number(document.getElementById("grade"+n).value));
        const result = document.getElementById("gradeResult");
        if (grades.some(g => !Number.isFinite(g) || g < 0 || g > 100)) {
          result.textContent = "Please enter valid grades from 0 to 100.";
          return;
        }
        const avg = grades.reduce((a,b) => a+b, 0) / 3;
        result.textContent = `Average: ${avg.toFixed(2)} — ${avg >= 75 ? "Passed ✓" : "Needs Improvement"}`;
      };
    }

    if (project === "todo") {
      openModal(`
        <h2>To-Do List</h2>
        <p style="color:#a7adba;margin:8px 0 18px">Add a task and manage your simple list.</p>
        <input class="demo-input" id="taskInput" placeholder="e.g. Study JavaScript">
        <button class="demo-button" id="addTask">Add Task</button>
        <ul id="todoList"></ul>`);
      const input = document.getElementById("taskInput");
      const list = document.getElementById("todoList");
      document.getElementById("addTask").onclick = () => {
        const value = input.value.trim();
        if (!value) return;
        const li = document.createElement("li");
        li.innerHTML = `<span>${escapeHtml(value)}</span><button class="demo-button remove">Done</button>`;
        li.querySelector(".remove").onclick = () => li.remove();
        list.appendChild(li);
        input.value = "";
        input.focus();
      };
    }

    if (project === "budget") {
      openModal(`
        <h2>Simple Budget Tracker</h2>
        <p style="color:#a7adba;margin:8px 0 18px">Record income and expenses to see the balance.</p>
        <input class="demo-input" id="income" type="number" min="0" placeholder="Income">
        <input class="demo-input" id="expense" type="number" min="0" placeholder="Expense">
        <button class="demo-button" id="calcBudget">Check Balance</button>
        <h3 id="budgetResult" style="margin-top:18px"></h3>`);
      document.getElementById("calcBudget").onclick = () => {
        const income = Number(document.getElementById("income").value) || 0;
        const expense = Number(document.getElementById("expense").value) || 0;
        const balance = income - expense;
        document.getElementById("budgetResult").textContent =
          `Balance: ₱${balance.toLocaleString("en-PH", {minimumFractionDigits:2})}`;
      };
    }
  });
});

closeModal.onclick = () => modal.classList.remove("show");
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
