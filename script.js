const validUsers = {
    "teacher1": "password1",
    "teacher2": "password2",
    "learner1": "password3",
    "learner2": "password4"
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username] === password) {
        alert("Welcome, " + username + "!");
        localStorage.setItem("username", username);
        window.location.href = "index.html";
    } else {
        document.getElementById("error-message").textContent = "Invalid username or password.";
    }
});

document.getElementById('createQuizForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const quizTitle = document.getElementById('quizTitle').value;
    const quizQuestion = document.getElementById('quizQuestion').value;
    const questionType = document.getElementById('questionType').value;

    const quiz = {
        title: quizTitle,
        question: quizQuestion,
        type: questionType
    };

    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    alert("Quiz created successfully!");
});

function loadLearners() {
    const learners = ["learner1", "learner2"];
    const learnersList = document.getElementById('learnersList');
    learnersList.innerHTML = '';

    learners.forEach(learner => {
        const li = document.createElement('li');
        li.textContent = learner;
        learnersList.appendChild(li);
    });
}

function loadResponses() {
    const responses = JSON.parse(localStorage.getItem('responses')) || [];
    const responsesList = document.getElementById('responsesList');
    responsesList.innerHTML = '';

    responses.forEach(response => {
        const li = document.createElement('li');
        li.textContent = `Quiz: ${response.quizTitle}, Learner: ${response.learner}, Response: ${response.answer}`;
        responsesList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('learnersList')) {
        loadLearners();
    }

    if (document.getElementById('responsesList')) {
        loadResponses();
    }
});