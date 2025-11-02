let score = 0;
let usedQuestions = new Set();

const board = document.getElementById("question-board");
const selectedQuestionBlock = document.getElementById("selected-question-block");
const answersBlock = document.getElementById("answers-block");
const quizQuestion = document.getElementById("quiz-question");
const answersDiv = document.getElementById("answers");
const scoreDisplay = document.getElementById("score");

function renderBoard() {
  board.innerHTML = "";
  for (const topic in quizData) {
    const topicDiv = document.createElement("div");
    topicDiv.classList.add("topic");
    topicDiv.innerHTML = `<h3>${topic}</h3>`;
    quizData[topic].forEach((q, index) => {
      const btn = document.createElement("button");
      const key = `${topic}-${index}`;
      btn.textContent = `${q.points} баллов`;

      if (usedQuestions.has(key)) {
        btn.classList.add("locked");
        btn.disabled = true;
      }

      btn.onclick = () => {
        if (!usedQuestions.has(key)) {
          startQuiz(topic, index);
        }
      };

      topicDiv.appendChild(btn);
    });
    board.appendChild(topicDiv);
  }
}

function startQuiz(topic, index) {
  const questionData = quizData[topic][index];
  board.classList.add("hidden");
  selectedQuestionBlock.classList.remove("hidden");
  answersBlock.classList.remove("hidden");

  quizQuestion.textContent = questionData.question;
  answersDiv.innerHTML = "";

  questionData.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(topic, index, i);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(topic, index, selected) {
  const questionData = quizData[topic][index];
  const key = `${topic}-${index}`;

  if (selected === questionData.correct) {
    score += questionData.points;
  }

  usedQuestions.add(key);
  scoreDisplay.textContent = `Очки: ${score}`;

  selectedQuestionBlock.classList.add("hidden");
  answersBlock.classList.add("hidden");
  board.classList.remove("hidden");

  renderBoard();
}

renderBoard();
