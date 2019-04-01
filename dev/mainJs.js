import css from "./mainCss.css";

const questions = [
    {
        id: 1,
        question: "Co jest Charakterystyczne dla roślin z rodziny dzbanecznikowatych?",
        answers: [
            {
                answer: "Gromadzą zapasy wody w liściach przypominających dzbany.",
                correct: false
            },
            {
                answer: "Są mięsożerne - żywią się owadami.",
                correct: true
            },
            {
                answer: "Wytwarzają smaczny nektar, który gromadzony jest w liściach-dzbanach.",
                correct: false
            }
        ]
    },
    {
        id: 2,
        question: "Gdzie obecnie znajduje się jeden z najsłynniejszych obrazów Leonarda da Vinvi Mona Lisa?",
        answers: [
            {
                answer: "W Instytucie Smithsona w Waszyngtonie",
                correct: false
            },
            {
                answer: "W the Metropolitan Museum of Art w Nowym Jorku",
                correct: false
            },
            {
                answer: "W paryskim Luwrze",
                correct: true
            }
        ]
    },
    {
        id: 3,
        question: "Która z tych rzek była związana z cywilizacją Mezopotamii?",
        answers: [
            {
                answer: "Eufrat",
                correct: true
            },
            {
                answer: "Tybr",
                correct: false
            },
            {
                answer: "Nil",
                correct: false
            }
        ]
    },
    {
        id: 4,
        question: "Która substancja nie jest materiałem wybuchowym?",
        answers: [
            {
                answer: "Dynamit",
                correct: false
            },
            {
                answer: "Karbonit",
                correct: false
            },
            {
                answer: "Cyjanowodór",
                correct: true
            }
        ]
    },
    {
        id: 5,
        question: "Barok charakteryzował:",
        answers: [
            {
                answer: "Lekkość, czyste barwy, nawiązania do antyku",
                correct: false
            },
            {
                answer: "Przepych, kontastrowość, mistycyzm",
                correct: true
            },
            {
                answer: "Minimalizm, prostota, symetria",
                correct: false
            }
        ]
    },
    {
        id: 6,
        question: "Cechą bajki jako utworu literackiego jest:",
        answers: [
            {
                answer: "Alegoryczność",
                correct: true
            },
            {
                answer: "Animizacja",
                correct: false
            },
            {
                answer: "Groteska",
                correct: false
            }
        ]
    },
    {
        id: 7,
        question: "Maria Skłodowska-Cure przyczyniła się do odkrycia:",
        answers: [
            {
                answer: "Rubin",
                correct: false
            },
            {
                answer: "Rad",
                correct: true
            },
            {
                answer: "Ruten",
                correct: false
            }
        ]
    },
    {
        id: 8,
        question: "Która z rzek nie przepływa przez Amerykę Południową",
        answers: [
            {
                answer: "Orinoko",
                correct: false
            },
            {
                answer: "Amur",
                correct: true
            },
            {
                answer: "Jurua",
                correct: false
            }
        ]
    },
    {
        id: 9,
        question: "Wskaż imiesłów przymiotnikowy czynny: ",
        answers: [
            {
                answer: "Pisać",
                correct: false
            },
            {
                answer: "Napisawszy",
                correct: false
            },
            {
                answer: "Piszący",
                correct: true
            }
        ]
    },
    {
        id: 10,
        question: "Rzymski bóg, opiekun sztuki lekarskiej, to:",
        answers: [
            {
                answer: "Asklepios",
                correct: false
            },
            {
                answer: "Virtus",
                correct: false
            },
            {
                answer: "Eskulap",
                correct: true
            }
        ]
    }
]

let questionsNumbers = [],
    questionAnswer = 0,
    points = 0,
    answersButtons = document.querySelectorAll('.answers__answer'),
    resetButton = document.querySelector(`.container__reset`);

/**
 * Draws Number from 1 to 10
 * @return {number}
 */
const drawNumber = () => {
    return Math.floor((Math.random() * 10) + 1);
}

/**
 *  Draws numbers and add them to questionNumbers array
 */
const setNumbers = () => {

    for (let i = 0; i < 4; i++) {

        let number = drawNumber(),
            duplicate = false;

        questionsNumbers.forEach((value) => {
            if (value == number) {
                duplicate = true;
                i--;
            }
        })

        if (!duplicate) {
            questionsNumbers.push(number);
        }
    }
}

/**
 * Sets question text
 * @param {string} question
 */
const setQuestionText = question => document.querySelector(`.container__question`).innerHTML = question;

/**
 * Sets answers text and correct answer values
 * @param {string} question
 * @param {number} answerNumber
 * @param {boolean} correct
 */
const setAnswerText = (question, answerNumber, correct) => {

    let answerButtons = document.querySelectorAll(`.answers__answer`);

    answerButtons[answerNumber].innerHTML = question;
    answerButtons[answerNumber].setAttribute(`correct`, correct);

}

/**
 * Displaying questions and answers
 * @param {number} questionNumber
 */
const displayQuestion = (questionNumber) => {

    let question = questions[questionNumber];

    setQuestionText(question.question);
    setAnswerText(question.answers[0].answer, 0, question.answers[0].correct);
    setAnswerText(question.answers[1].answer, 1, question.answers[1].correct)
    setAnswerText(question.answers[2].answer, 2, question.answers[2].correct)

}

const setResultPointsText = () => {

    document.querySelector(`.result__points`).innerHTML = ` ${points} &nbsp;/&nbsp;4`;

}

const resetGame = () => {

    points = 0;
    questionAnswer = 0;
    questionsNumbers = [];
    setResultPointsText();
    setNumbers();
    displayQuestion(questionsNumbers[questionAnswer]);

}

const win = () => {

    if (points < 4) {
        points++;
        setResultPointsText();

        if (questionAnswer < 3) {
            questionAnswer++;
            displayQuestion(questionsNumbers[questionAnswer]);
        }

    } else {

        resetGame();

    }

}

const loose = () => {

    if (points < 4) {

        if (questionAnswer < 3) {
            questionAnswer++;
            displayQuestion(questionsNumbers[questionAnswer]);
        }

    } else {

        resetGame();

    }
}

const checkWin = (correct) => {

    let correctBoolean = (correct == `true`);
    correctBoolean ? win() : loose();

}

const setButtonsClickEvents = () => {

    answersButtons.forEach(element => {
        element.addEventListener(`click`, (e) => {
            checkWin(e.target.getAttribute(`correct`));
        })
    })

}

resetButton.addEventListener(`click`, resetGame);


setNumbers();
displayQuestion(questionsNumbers[questionAnswer]);
setButtonsClickEvents();
setResultPointsText();
