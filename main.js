let data=[
    {
        name: "Arun Kumar",
        email: "arun@gmail.com",
        department: "CSE",
        year: "3rd Year"
    },
    {
        name: "Priya S",
        email: "priya@gmail.com",
        department: "ECE",
        year: "2nd Year"
    },
    {
        name: "Karthik R",
        email: "karthik@gmail.com",
        department: "IT",
        year: "4th Year"
    },
    {
        name: "Divya M",
        email: "divya@gmail.com",
        department: "EEE",
        year: "1st Year"
    },
    {
        name: "Santhosh K",
        email: "santhosh@gmail.com",
        department: "CSE",
        year: "2nd Year"
    },
    {
        name: "Nithya P",
        email: "nithya@gmail.com",
        department: "ECE",
        year: "3rd Year"
    },
    {
        name: "Vijay S",
        email: "vijay@gmail.com",
        department: "Mechanical",
        year: "4th Year"
    },
    {
        name: "Harini T",
        email: "harini@gmail.com",
        department: "IT",
        year: "1st Year"
    },
    {
        name: "Rahul D",
        email: "rahul@gmail.com",
        department: "CSE",
        year: "3rd Year"
    },
    {
        name: "Sneha V",
        email: "sneha@gmail.com",
        department: "Civil",
        year: "2nd Year"
    }
]
let students = JSON.parse(localStorage.getItem("students")) || data;

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");

function displayStudents() {

    studentTable.innerHTML = "";

    let count = 0;

    students.forEach(function(student, index) {

        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.year}</td>
                <td>
                    <button class="btn btn-info btn-sm action-btn" onclick="viewStudent(${index})">View</button>
                    <button class="btn btn-warning btn-sm action-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;

        studentTable.innerHTML += row;
        count++;
    });

    document.getElementById("totalStudents").innerText = count;

    let departments = [];

    students.forEach(function(student) {
        if (!departments.includes(student.department)) {
            departments.push(student.department);
        }
    });

    document.getElementById("totalDepartments").innerText = departments.length;
    document.getElementById("totalCourses").innerText = departments.length;

    if (count === 0) {
        document.getElementById("noStudents").classList.remove("d-none");
    } else {
        document.getElementById("noStudents").classList.add("d-none");
    }

    localStorage.setItem("students", JSON.stringify(students));
}

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let department = document.getElementById("studentDepartment").value;
    let year = document.getElementById("studentYear").value;

    let editIndex = document.getElementById("editIndex").value;

    let student = {
        name: name,
        email: email,
        department: department,
        year: year
    };

    if (editIndex === "") {
        students.push(student);
    } else {
        students[editIndex] = student;
    }

    displayStudents();

    studentForm.reset();

    document.getElementById("editIndex").value = "";

    document.getElementById("modalTitle").innerText = "Add Student";

    let modal = bootstrap.Modal.getInstance(document.getElementById("studentModal"));
    modal.hide();

});

function editStudent(index) {

    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentEmail").value = student.email;
    document.getElementById("studentDepartment").value = student.department;
    document.getElementById("studentYear").value = student.year;

    document.getElementById("editIndex").value = index;

    document.getElementById("modalTitle").innerText = "Edit Student";

    let modal = new bootstrap.Modal(document.getElementById("studentModal"));
    modal.show();
}

function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        displayStudents();
    }
}

function viewStudent(index) {

    let student = students[index];

    document.getElementById("studentDetails").innerHTML = `
        <h5>Name: ${student.name}</h5>
        <p>Email: ${student.email}</p>
        <p>Department: ${student.department}</p>
        <p>Year: ${student.year}</p>
    `;

    let modal = new bootstrap.Modal(document.getElementById("viewModal"));
    modal.show();
}

document.getElementById("addStudentButton").addEventListener("click", function() {

    studentForm.reset();

    document.getElementById("editIndex").value = "";

    document.getElementById("modalTitle").innerText = "Add Student";

});

document.getElementById("searchStudent").addEventListener("input", function() {

    let searchValue = this.value.toLowerCase();

    let rows = studentTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let name = rows[i].getElementsByTagName("td")[1].innerText.toLowerCase();

        if (name.includes(searchValue)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});

document.getElementById("departmentFilter").addEventListener("change", function() {

    let selectedDepartment = this.value;

    students.forEach(function(student, index) {

        let row = studentTable.getElementsByTagName("tr")[index];

        if (selectedDepartment === "" || student.department === selectedDepartment) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
});

displayStudents();
