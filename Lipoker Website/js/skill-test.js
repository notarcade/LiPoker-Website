const questions = document.querySelectorAll(".question");
let currentQuestion = 0;
let totalScore = 0;

questions[currentQuestion].classList.add("active");

document.querySelectorAll(".options button").forEach(button => {
  button.addEventListener("click", () => {
    const score = parseInt(button.getAttribute("data-score"));
    totalScore += score;

    // Remove selected from siblings
    const siblings = button.parentElement.querySelectorAll("button");
    siblings.forEach(sib => sib.classList.remove("selected"));
    button.classList.add("selected");

    // Delay before showing next
    setTimeout(() => {
      questions[currentQuestion].classList.remove("active");
      currentQuestion++;

      if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add("active");
      } else {
        showResult();
      }
    }, 300);
  });
});

function showResult() {
  const quiz = document.getElementById("quiz-container");
  const resultBox = document.getElementById("result");

  quiz.classList.add("fade-out");

  setTimeout(() => {
    quiz.classList.add("hidden");

    let resultText = "";
    let level = "";

    if (totalScore <= 3) {
      resultText = "You're a Beginner!";
      level = "Beginner";
    } else if (totalScore <= 7) {
      resultText = "You're Intermediate!";
      level = "Intermediate";
    } else {
      resultText = "You're an Expert! Let's review.";
      level = "Expert";
    }

    resultBox.innerHTML = `
      <p>${resultText}</p>
      <button class="goto-course" onclick="goToCourse('${level.toLowerCase()}')">Go to ${level} Course</button>
      <br>
      <button class="restart" onclick="restartQuiz()">Not what you expected? Retake the quiz.</button>
    `;

    resultBox.classList.remove("hidden");
    resultBox.classList.add("fade-in");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 400);
}

function goToCourse(level) {
  window.location.href = `/learn/courses/${level}.html`;
}

function restartQuiz() {
  totalScore = 0;
  currentQuestion = 0;
  document.getElementById("result").classList.add("hidden");

  const quiz = document.getElementById("quiz-container");
  quiz.classList.remove("hidden");
  quiz.classList.remove("fade-out"); // ✅ FIX: remove fade-out effect

  questions.forEach(q => q.classList.remove("active"));
  questions[0].classList.add("active");

  document.querySelectorAll(".options button").forEach(btn => btn.classList.remove("selected"));
}