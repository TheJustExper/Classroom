import React, { useState, useEffect, useContext } from "react";
import MDEditor from '@uiw/react-md-editor';
import faker from "faker";

import { ContentDelete } from "../../Popups";
import { firestore, auth } from "../../../../../../firebase";
import { UserContext, hasRole } from "../../../../../../providers/UserProvider";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import InputWithIcon from "../../../../../../components/commentInput/CommentInput";
import Error404Page from "../../../Error404/Error404.js";

import Doc from "../../../../../../styles/icons/files/doc.png";
import Xls from "../../../../../../styles/icons/files/xls.png";
import Pdf from "../../../../../../styles/icons/files/pdf.png";

import "./QuizView.style.scss";

export default (props) => {

    const { id, quizId } = useParams();
    const { user, loading } = useContext(UserContext);

    // Normal states for the assignment view

    const [ quiz, setQuiz ] = useState({});

    const [ quizState, setQuizState ] = useState({
        currentQuestion: 0,
        questionAnswers: [],
        selectedAnswers: [],
    });

    const [ isTeacher, setIsTeacher ] = useState(false);

    const addQuiz = async () => {
        let itemRefs = firestore.collection('classrooms').doc(id);
        let quizzesRefs = itemRefs.collection("quizzes");

        await quizzesRefs.add({
            description: "",
            startDate: Date.now(),
            endDate: Date.now(),
            questions: [
                {
                    question: "What is your ideal workspace?",
                    values: [
                        "A place where people don't question my authority",
                        "A place where i'm the CEO",
                        "One that's organized, structured and has workplace policies set."
                    ],
                    answers: [0]
                },
                {
                    question: "What is your ideal workspace?",
                    values: [
                        "A place where people don't question my authority",
                        "A place where i'm the CEO",
                        "One that's organized, structured and has workplace policies set."
                    ],
                    answers: [0]
                },
                {
                    question: "What is your ideal workspace?",
                    values: [
                        "A place where people don't question my authority",
                        "A place where i'm the CEO",
                        "One that's organized, structured and has workplace policies set."
                    ],
                    answers: [0]
                },
                {
                    question: "What is your ideal workspace?",
                    values: [
                        "A place where people don't question my authority",
                        "A place where i'm the CEO",
                        "One that's organized, structured and has workplace policies set."
                    ],
                    answers: [0]
                },
            ]
        });
    }

    const nextQuestion = () => {
        if (quiz.questions[quizState.currentQuestion + 1] == undefined) return;

        setQuizState(prev => ({
            selectedAnswers: [],
            currentQuestion: quizState.currentQuestion + 1,
            questionAnswers: [...prev.questionAnswers, quizState.selectedAnswers]
        }));

        console.log(quizState)
    }

    const previousQuestion = () => {
        setQuizState(prev => ({ 
            ...prev,
            currentQuestion: quizState.currentQuestion - 1,
        }));
    }

    const selectedAnswer = (answer) => {
        const answers = quiz.questions[quizState.currentQuestion].answers.length;

        if (quizState.selectedAnswers.includes(answer)) {
            setQuizState(prev => ({
                ...prev,
                selectedAnswers: prev.selectedAnswers.filter(ans => ans != answer)
            }))
        } else {
            if (quizState.selectedAnswers.length == answers) return;

            setQuizState(prev => ({
                ...prev,
                selectedAnswers: [...prev.selectedAnswers, answer]
            }));
        }

    }

    useEffect(async () => {
        if (id == null || quizId == null) return; 
        
        let itemRefs = firestore.collection('classrooms').doc(id);
        let quizzesRefs = itemRefs.collection("quizzes").doc(quizId);

        const doc = await quizzesRefs.get();

        if (doc.exists) return setQuiz(doc.data());

        setQuiz(false);

    }, [ loading ]);

    if (!quiz) return (
        <div className="itemContent">
            <div className="itemContent__inner">
                <Error404Page/>
            </div>
        </div>
    )

    if (!quiz.questions) return "";

    return (
        <div className="itemContent">
            <div className="itemContent__inner itemContent__inner--fullHeight">

                <div className="quiz__view">
                    <div className="quiz__bar">
                        { quiz.questions.map((__, index) => <div className={"quiz__progress" + ( index <= quizState.currentQuestion ? " quiz__progress--current" : "" ) }></div> )}
                    </div>

                    <div className="quiz__container">

                        <div className="quiz__text">
                            <b>Question { quizState.currentQuestion + 1 } / { quiz.questions.length }</b>
                            <h1>{ quiz.questions[quizState.currentQuestion].question }</h1>
                        </div>

                        <div className="quiz__questions">
                            { quiz.questions[quizState.currentQuestion].values.map((value, index) => {
                                const selected = quizState.selectedAnswers.includes(value);

                                return <div className={"quiz__question " + ( selected && "quiz__question--selected" ) } onClick={() => selectedAnswer(value) }>{ index + 1 } - { value }</div>
                            })}
                        </div>

                        <div className="quiz__buttons">
                            <button onClick={() => previousQuestion()}><i className="fa fa-arrow-left"></i> Previous</button>
                            <button className={quizState.selectedAnswers.length !== quiz.questions[quizState.currentQuestion].answers.length && "inactive" } onClick={() => nextQuestion() }> { quiz.questions[quizState.currentQuestion + 1] != undefined ? "Next Question" : "Finish Quiz" } <i className="fa fa-arrow-right"></i></button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}