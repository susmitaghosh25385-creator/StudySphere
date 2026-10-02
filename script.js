let progress = 0;


function generatePlan() {

    const subject =
        document.getElementById("subject").value.trim();

    const hours =
        Number(document.getElementById("hours").value);

    const goal =
        document.getElementById("goal").value;


    if (subject === "") {

        alert("Please enter a subject first.");

        return;
    }


    const routine =
        document.getElementById("routine");


    document.getElementById("planSection")
        .classList.remove("hidden");


    document.getElementById("planTitle")
        .innerText =
        `${subject} — Your Personalized Plan`;


    let tasks = [];


    if (goal === "learn") {

        tasks = [
            ["01", "Learn the basics", "Understand the fundamental concepts."],
            ["02", "Build your foundation", "Study important definitions and formulas."],
            ["03", "Practice examples", "Work through solved examples."],
            ["04", "Test yourself", "Try questions without looking at the solution."],
            ["05", "Review", "Revise everything you learned today."]
        ];

    }


    else if (goal === "exam") {

        tasks = [
            ["01", "Concept revision", "Review important concepts."],
            ["02", "Important formulas", "Create a quick formula sheet."],
            ["03", "Practice", "Solve exam-style questions."],
            ["04", "Timed test", "Attempt questions with a time limit."],
            ["05", "Mistake review", "Analyze your mistakes."]
        ];

    }


    else if (goal === "practice") {

        tasks = [
            ["01", "Warm-up", "Solve a few easy questions."],
            ["02", "Core practice", "Solve medium-level problems."],
            ["03", "Challenge", "Attempt difficult questions."],
            ["04", "Check answers", "Analyze your mistakes."],
            ["05", "Retry", "Solve the questions you missed."]
        ];

    }


    else {

        tasks = [
            ["01", "Quick concepts", "Review the main ideas."],
            ["02", "Formula review", "Review important formulas."],
            ["03", "Examples", "Look at important examples."],
            ["04", "Practice", "Solve selected questions."],
            ["05", "Final review", "Summarize everything."]
        ];

    }


    routine.innerHTML = "";


    tasks.forEach(task => {

        routine.innerHTML += `

            <div class="routine-card">

                <div class="routine-number">
                    ${task[0]}
                </div>

                <h3>${task[1]}</h3>

                <p>${task[2]}</p>

                <p style="margin-top:15px;">
                    ⏱️ ${Math.ceil((hours * 60) / 5)} minutes
                </p>

            </div>

        `;

    });


    document
        .getElementById("planSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}



function increaseProgress() {
    async function getStudyResources(subject) {

    const resourceBox =
        document.getElementById("apiResources");

    resourceBox.innerHTML = "<p>🔎 Finding resources...</p>";

    try {

        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(subject)}&limit=3`
        );

        const data = await response.json();

        resourceBox.innerHTML = `
            <h2>📚 Resources for ${subject}</h2>
        `;

        if (data.docs.length === 0) {

            resourceBox.innerHTML +=
                "<p>No resources found.</p>";

            return;
        }

        data.docs.slice(0, 3).forEach(book => {

            const title =
                book.title || "Unknown title";

            const author =
                book.author_name
                    ? book.author_name[0]
                    : "Unknown author";

            resourceBox.innerHTML += `

                <div class="resource-card">

                    <h3>${title}</h3>

                    <p>Author: ${author}</p>

                </div>

            `;

        });

    } catch (error) {

        resourceBox.innerHTML =
            "<p>⚠️ Could not load resources.</p>";

        console.error(error);
    }
}

    if (progress < 100) {

        progress += 20;

    }


    document
        .getElementById("progressFill")
        .style.width = progress + "%";


    document
        .getElementById("progressText")
        .innerText = progress + "%";
}
function askAI() {
    const question = document.getElementById("aiQuestion").value.trim();

    const responseBox = document.getElementById("aiResponse");

    if (question === "") {
        responseBox.innerHTML =
            "<p>⚠️ Please enter a question first.</p>";
        return;
    }

    responseBox.innerHTML =
        "<h3>🤖 StudySphere AI</h3>" +
        "<p>I received your question:</p>" +
        "<p><strong>" + question + "</strong></p>" +
        "<p>✨ AI connection is ready for the next step!</p>";
}

