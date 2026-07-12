// =======================================
// Ashbal Interactive Portal
// app.js
// =======================================
let currentSubject = "";
let currentQuestionIndex = 0;
let userScore = 0;

let timer = null;
let timeLeft = 300; // 5 دقائق

// قاعدة البيانات
const quizDatabase = {
    math: {
        title: "الرياضيات",
        icon: "📐",
        questions: [
            {
                q: "إذا كان حقل مستطيل الشكل محيطه 120م وطوله 40م، فما هو عرضه؟",
                a: ["20م", "30م", "15م", "25م"],
                c: 0
            },
            {
                q: "احسب القيمة التالية: 25% من العدد 800 تساوي؟",
                a: ["150", "200", "250", "300"],
                c: 1
            },
            {
                q: "اشترى تاجر بضاعة بـ 5000 دج وباعها بربح 15%، كم ثمن البيع؟",
                a: ["5500", "5750", "6000", "5250"],
                c: 1
            }
        ]
    },

    arabic: {
        title: "اللغة العربية",
        icon: "✍️",
        questions: [
            {
                q: "ما إعراب الفعل (ينير) في جملة: العلم ينير العقول؟",
                a: [
                    "فعل مضارع مرفوع",
                    "فعل ماض",
                    "اسم مجرور",
                    "مبتدأ"
                ],
                c: 0
            },
            {
                q: "جمع كلمة صحراء هو:",
                a: [
                    "صحاري",
                    "صحراوات",
                    "صحاريون",
                    "أصحر"
                ],
                c: 1
            }
        ]
    },

    physics: {
        title: "العلوم الفيزيائية",
        icon: "🧪",
        questions: [
            {
                q: "وحدة قياس التوتر الكهربائي هي:",
                a: [
                    "الأمبير",
                    "الفولت",
                    "الأوم",
                    "الواط"
                ],
                c: 1
            },
            {
                q: "التحول من الحالة الصلبة إلى الغاز يسمى:",
                a: [
                    "التسامي",
                    "الانصهار",
                    "التجمد",
                    "التكاثف"
                ],
                c: 0
            }
        ]
    },

    biology: {
        title: "علوم الطبيعة",
        icon: "🔬",
        questions: [
            {
                q: "العضو المسؤول عن امتصاص الغذاء هو:",
                a: [
                    "المعدة",
                    "المعي الدقيق",
                    "المعي الغليظ",
                    "المرئ"
                ],
                c: 1
            },
            {
                q: "المنتج الأول في السلسلة الغذائية هو:",
                a: [
                    "النبات",
                    "الحيوان",
                    "الفطر",
                    "الإنسان"
                ],
                c: 0
            }
        ]
    }
};

// ================================

let currentSubject = "";
let currentQuestionIndex = 0;
let userScore = 0;

// ================================

function switchTab(tab){

    const tabQuiz=document.getElementById("tabQuiz");
    const tabGuide=document.getElementById("tabGuide");

    const sectionQuiz=document.getElementById("sectionQuiz");
    const sectionGuide=document.getElementById("sectionGuide");

    if(tab==="quiz"){

        tabQuiz.classList.add("bg-amber-500","text-slate-900");
        tabGuide.classList.remove("bg-amber-500","text-slate-900");

        sectionQuiz.classList.remove("hidden");
        sectionGuide.classList.add("hidden");

    }else{

        tabGuide.classList.add("bg-amber-500","text-slate-900");
        tabQuiz.classList.remove("bg-amber-500","text-slate-900");

        sectionGuide.classList.remove("hidden");
        sectionQuiz.classList.add("hidden");

        exitQuiz();
    }

}

// ================================

function switchGuideTab(id){

    document.querySelectorAll(".guide-content-block")
    .forEach(el=>el.classList.add("hidden"));

    document.querySelectorAll(".guide-tab-btn")
    .forEach(btn=>{

        btn.classList.remove("bg-amber-500","text-slate-900");
        btn.classList.add("bg-slate-800","text-slate-400");

    });

    document.getElementById("sub-"+id).classList.remove("hidden");

    document.getElementById("btn-"+id)
    .classList.remove("bg-slate-800","text-slate-400");

    document.getElementById("btn-"+id)
    .classList.add("bg-amber-500","text-slate-900");

}

// ================================

function startQuiz(subject){

    currentSubject=subject;
    currentQuestionIndex=0;
    userScore=0;

    document.getElementById("subjectView").classList.add("hidden");
    document.getElementById("resultView").classList.add("hidden");
    document.getElementById("quizView").classList.remove("hidden");

    document.getElementById("subjectTitle").innerText=
        quizDatabase[subject].title;

    document.getElementById("subjectIcon").innerText=
        quizDatabase[subject].icon;

    timeLeft = 300;
startTimer();
    showQuestion();

}

// ================================

function showQuestion(){

    const data=quizDatabase[currentSubject];

    const question=data.questions[currentQuestionIndex];

    document.getElementById("questionText").innerHTML=question.q;

    document.getElementById("progressText").innerHTML=
        `السؤال ${currentQuestionIndex+1} من ${data.questions.length}`;

    document.getElementById("progressBar").style.width=
        ((currentQuestionIndex+1)/data.questions.length*100)+"%";

    const container=document.getElementById("optionsContainer");

    container.innerHTML="";

    question.a.forEach((answer,index)=>{

        const btn=document.createElement("button");

        btn.className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-xl";

        btn.innerHTML=answer;

        btn.onclick=()=>checkAnswer(index);

        container.appendChild(btn);

    });

}

// ================================

function checkAnswer(index){

    const question=
    quizDatabase[currentSubject].questions[currentQuestionIndex];

    if(index===question.c){

        userScore+=Math.round(
            100/
            quizDatabase[currentSubject].questions.length
        );

    }

    currentQuestionIndex++;

    if(currentQuestionIndex<
        quizDatabase[currentSubject].questions.length){

        showQuestion();

    }else{

        endQuiz();

    }

}

// ================================

function endQuiz(){

    if(userScore>100)
        userScore=100;

    document.getElementById("quizView").classList.add("hidden");

    document.getElementById("resultView").classList.remove("hidden");

    document.getElementById("finalScoreText").innerHTML=userScore;

}

// ================================

function exitQuiz(){

    document.getElementById("quizView").classList.add("hidden");

    document.getElementById("resultView").classList.add("hidden");

    document.getElementById("subjectView").classList.remove("hidden");

}
