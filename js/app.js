/* ==========================================
   Ashbal Platform v1.0
   Main Application
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Ashbal Platform Loaded");

});

/* ==========================
   Main Navigation
========================== */

function switchTab(tab){

    const tabQuiz = document.getElementById("tabQuiz");
    const tabGuide = document.getElementById("tabGuide");

    const sectionQuiz = document.getElementById("sectionQuiz");
    const sectionGuide = document.getElementById("sectionGuide");

    if(tab==="quiz"){

        tabQuiz.classList.add("bg-amber-500","text-slate-950");

        tabGuide.classList.remove("bg-amber-500","text-slate-950");

        sectionQuiz.classList.remove("hidden");

        sectionGuide.classList.add("hidden");

    }

    else{

        tabGuide.classList.add("bg-amber-500","text-slate-950");

        tabQuiz.classList.remove("bg-amber-500","text-slate-950");

        sectionGuide.classList.remove("hidden");

        sectionQuiz.classList.add("hidden");

    }

}
