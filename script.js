const quizData = [
    {
      question: 'Which desert is the largest in the world?',
      options: ['Gobi', 'Sahara', 'Kalahari', 'Antarctic Desert'],
      answer: 'Sahara',
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
      answer: 'Mars',
    },
    {
      question: 'In which year did the Berlin Wall fall?',
      options: ['1985', '1989', '1991', '1995'],
      answer: '1989',
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ['Elephant', 'Giraffe', 'Blue Whale', 'Gorilla'],
      answer: 'Blue Whale',
    },
    {
      question: 'Which planet is known as the "Blue Planet"?',
      options: ['Mars', 'Earth', 'Venus', 'Jupiter'],
      answer: 'Earth',
    },
    {
      question: 'Who painted the famous artwork "Starry Night"?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      answer: 'Vincent van Gogh',
    },
    {
      question: 'Which country is home to the worlds tallest mountain',
      options: ['China', 'India', 'Nepal', 'Pakistan'],
      answer: 'Au',
    },
    {
      question: 'Which river is the longest in the world?',
      options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
      answer: 'Nile',
    },
    {
      question: 'Which country is known as the "Land of the Rising Sun"?',
      options: ['China', 'India', 'Japan', 'Canada'],
      answer: 'Japan',
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean'],
      answer: 'Pacific Ocean',
    },
  ];
  
   
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  

// Your existing JavaScript code here

function showAlert(message) {
    var overlay = document.getElementById('overlay');
    var customAlert = document.getElementById('customAlert');
    var alertMessage = document.getElementById('alertMessage');

    // Set the message
    alertMessage.innerHTML = message;

    // Show the overlay and alert
    overlay.style.display = 'block';
    customAlert.style.display = 'block';

    // Automatically close the alert after 2000 milliseconds (2 seconds)
    setTimeout(closeAlert, 2000);
  }

  function closeAlert() {
    var overlay = document.getElementById('overlay');
    var customAlert = document.getElementById('customAlert');

    // Hide the overlay and alert
    overlay.style.display = 'none';
    customAlert.style.display = 'none';
  }

  // Example usage:
  showAlert("Are You Ready!");


  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
        showAlert('Correct Answer!');
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
        showAlert('Wrong Answer! The correct answer is: ' + quizData[currentQuestion].answer);
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';

    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;

    // Add comments based on the score
    if (score > 9) {
        resultContainer.innerHTML += '<br>You are great!';
    } else if (score > 5) {
        resultContainer.innerHTML += '<br>Good try!';
    } else {
        resultContainer.innerHTML += '<br>Need improvement.';
    }
}

  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();