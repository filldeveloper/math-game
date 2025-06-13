import { tocarSomAcerto, tocarSomErro } from './sounds.js';

// DOM Elements
const problemContainer = document.getElementById('problem-container');
const answerInput = document.getElementById('answer-input');
const checkButton = document.getElementById('check-button');
const nextButton = document.getElementById('next-button');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score');
const operationButtons = document.querySelectorAll('.operator-button');

// Game State
let currentProblem = {};
let score = 0;
const MAX_NUMBER = 10;
let selectedOperator = '+';

// Seleciona operador
function selectOperator(operator) {
    selectedOperator = operator;
    operationButtons.forEach(button => button.classList.remove('selected'));
    document.querySelector(`[data-operator="${operator}"]`).classList.add('selected');
    score = 0;
    scoreDisplay.textContent = score;
    generateProblem();
}

// Gera novo problema
function generateProblem() {
    let num1, num2, answer;
    if (selectedOperator === '+') {
        num1 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        num2 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        answer = num1 + num2;
    } else if (selectedOperator === '-') {
        num1 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
    } else if (selectedOperator === '×') {
        num1 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        num2 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        answer = num1 * num2;
    } else if (selectedOperator === '÷') {
        do {
            num2 = Math.floor(Math.random() * MAX_NUMBER) + 1;
            num1 = num2 * (Math.floor(Math.random() * MAX_NUMBER) + 1);
        } while (num1 === 0 || num2 === 0);
        answer = num1 / num2;
    }
    currentProblem = { num1, num2, operator: selectedOperator, answer };
    problemContainer.textContent = `${num1} ${selectedOperator} ${num2} = ?`;
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'mt-6 h-8 text-2xl font-semibold';
    answerInput.value = '';
    answerInput.disabled = false;
    answerInput.focus();
    checkButton.style.display = 'block';
    nextButton.style.display = 'none';
}

// Checa resposta
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    feedbackMessage.classList.remove('fade-in');
    void feedbackMessage.offsetWidth;
    if (isNaN(userAnswer)) {
        feedbackMessage.textContent = 'Digite um número!';
        feedbackMessage.className += ' text-orange-500 fade-in';
        return;
    }
    if (userAnswer === currentProblem.answer) {
        score++;
        feedbackMessage.textContent = 'Correto! 🎉';
        feedbackMessage.className += ' text-green-500 fade-in';
        scoreDisplay.textContent = score;
        tocarSomAcerto();
        answerInput.disabled = true;
        checkButton.style.display = 'none';
        nextButton.style.display = 'block';
        nextButton.focus();
    } else {
        feedbackMessage.textContent = 'Ops! Tente de novo.';
        feedbackMessage.className += ' text-red-500 fade-in';
        answerInput.focus();
        answerInput.select();
        tocarSomErro();
    }
}

// Eventos
operationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        selectOperator(event.target.dataset.operator);
    });
});
checkButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', generateProblem);
answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !answerInput.disabled) {
        checkAnswer();
    } else if (event.key === 'Enter' && nextButton.style.display === 'block') {
        generateProblem();
    }
});
window.onload = generateProblem;