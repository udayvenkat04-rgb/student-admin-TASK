// Load announcements from localStorage
function loadAnnouncements() {
    return JSON.parse(localStorage.getItem('announcements')) || [];
}

// Save announcements to localStorage
function saveAnnouncements(announcements) {
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

// Load students from localStorage
function loadStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Save students to localStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Load student count
function loadStudentCount() {
    return parseInt(localStorage.getItem('studentCount')) || 0;
}

// Save student count
function saveStudentCount(count) {
    localStorage.setItem('studentCount', count);
}

// Student signup
function studentSignup(name, password) {
    let students = loadStudents();
    if (students.some(s => s.name === name)) {
        alert('Student already exists. Please login.');
        return false;
    }
    students.push({ name: name, password: password });
    saveStudents(students);
    saveStudentCount(loadStudentCount() + 1);
    alert('Signup successful!');
    return true;
}

// Student login
function studentLogin(name, password) {
    let students = loadStudents();
    const student = students.find(s => s.name === name && s.password === password);
    if (student) {
        localStorage.setItem('currentStudent', name);
        return true;
    }
    return false;
}

// Display announcements (used in admin and student dashboards)
function displayAnnouncements() {
    const announcements = loadAnnouncements();
    const list = document.getElementById('announcementList');
    if (!list) return;
    list.innerHTML = '';
    announcements.forEach((ann) => {
        const li = document.createElement('li');
        li.textContent = ann;
        list.appendChild(li);
    });
}

// For admin dashboard
function addAnnouncement() {
    const input = document.getElementById('announcementInput');
    const text = input.value.trim();
    if (!text) {
        alert('Please enter an announcement.');
        return;
    }
    const announcements = loadAnnouncements();
    announcements.push(text);
    saveAnnouncements(announcements);
    input.value = '';
    displayAnnouncements();
}

function displayStudentCount() {
    const el = document.getElementById('studentCount');
    if (el) {
        el.textContent = loadStudentCount();
    }
}

// For student dashboard
function displayAnnouncementsForStudent() {
    displayAnnouncements();
}

// Initialize page behaviors
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('announcementInput')) {
        displayAnnouncements();
        displayStudentCount();
    } else if (document.getElementById('announcementList')) {
        displayAnnouncementsForStudent();
    }
});
