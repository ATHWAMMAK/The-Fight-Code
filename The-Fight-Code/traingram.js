document.addEventListener("DOMContentLoaded", function () {

    console.log("THE FIGHT CODE: Advanced Training Engine Loaded!");

    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const trainingForm = document.getElementById("training-form");
    const generateButton = document.getElementById("generate-training-btn");
    const trainingOutput = document.getElementById("training-output");

    // =====================================
    // 2. STORAGE FUNCTIONS
    // =====================================

    function getSavedData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Error retrieving information:", error);
            return null;
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Error saving information:", error);
            alert("Unable to save your information.");
            return false;
        }
    }

    // =====================================
    // 3. COLLECT SELECTED TRAINING DAYS
    // =====================================

    function getSelectedDays() {

        const checkboxes = document.querySelectorAll(
            'input[name="training_days"]:checked'
        );

        return Array.from(checkboxes).map(function (checkbox) {
            return checkbox.value;
        });
    }

    // =====================================
    // 4. COLLECT FIGHTER INFORMATION
    // =====================================

    function collectTrainingDetails() {

        return {
            level: document.getElementById("level").value.trim(),

            combatSport: document.getElementById("combat-sport").value.trim(),

            designatedGoal: document.getElementById("designated-goal").value.trim(),

            trainingDays: getSelectedDays(),

            sessionDuration: document.getElementById("session-duration").value,

            lastUpdated: new Date().toLocaleString()
        };
    }

    // =====================================
    // 5. RESTORE SAVED INFORMATION
    // =====================================

    function restoreTrainingDetails() {

        const savedDetails = getSavedData("trainingDetails");

        if (!savedDetails) return;

        document.getElementById("level").value =
            savedDetails.level || "";

        document.getElementById("combat-sport").value =
            savedDetails.combatSport || "";

        document.getElementById("designated-goal").value =
            savedDetails.designatedGoal || "";

        document.getElementById("session-duration").value =
            savedDetails.sessionDuration || "";

        const savedDays = savedDetails.trainingDays || [];

        document.querySelectorAll(
            'input[name="training_days"]'
        ).forEach(function (checkbox) {

            checkbox.checked = savedDays.includes(checkbox.value);

        });
    }

    // =====================================
    // 6. SAVE FIGHTER INFORMATION
    // =====================================

    trainingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const details = collectTrainingDetails();

        if (
            !details.level ||
            !details.combatSport ||
            !details.designatedGoal ||
            !details.sessionDuration
        ) {
            alert("Please complete all fighter information.");
            return;
        }

        if (details.trainingDays.length === 0) {
            alert("Please select at least one available training day.");
            return;
        }

        if (saveData("trainingDetails", details)) {
            alert("Fighter information saved successfully!");
        }
    });

    // =====================================
    // 7. SPORT-SPECIFIC TRAINING DATABASE
    // =====================================

    const sportFocus = {

        "Boxing": [
            "Stance, guard, balance and boxing footwork.",
            "Punching combinations, accuracy and timing.",
            "Defensive movement: slipping, blocking and parrying.",
            "Pad work and controlled bag work.",
            "Boxing-specific conditioning."
        ],

        "Mixed Martial Arts": [
            "Striking fundamentals: punches, kicks, knees and elbows.",
            "Wrestling entries, takedown defence and positional control.",
            "Brazilian Jiu-Jitsu fundamentals and positional transitions.",
            "Clinch work and controlled transitions between disciplines.",
            "MMA-specific movement and conditioning."
        ],

        "Kickboxing": [
            "Punching and kicking combinations.",
            "Distance management and footwork.",
            "Defensive movement and counterattacking.",
            "Pad work and controlled bag work.",
            "Kickboxing-specific conditioning."
        ],

        "Muay Thai": [
            "Punches, kicks, knees and elbow techniques.",
            "Clinch fundamentals and positional control.",
            "Checking kicks and defensive movement.",
            "Pad work and technical combinations.",
            "Muay Thai-specific conditioning."
        ],

        "Wrestling": [
            "Stance, motion and level changes.",
            "Takedown entries, finishes and defence.",
            "Positional control and escapes.",
            "Technical drilling and controlled partner practice.",
            "Wrestling-specific strength and conditioning."
        ],

        "Brazilian Jiu-Jitsu": [
            "Guard retention and guard passing.",
            "Escapes, transitions and positional control.",
            "Submission defence and technical fundamentals.",
            "Controlled positional sparring.",
            "Grappling-specific mobility and conditioning."
        ]
    };

    // =====================================
    // 8. GOAL-SPECIFIC RECOMMENDATIONS
    // =====================================

    function getGoalFocus(goal) {

        const lowerGoal = goal.toLowerCase();
        const recommendations = [];

        if (
            lowerGoal.includes("strength") ||
            lowerGoal.includes("power")
        ) {
            recommendations.push(
                "Progressive strength training using appropriate resistance.",
                "Developing power through technically sound exercises."
            );
        }

        if (
            lowerGoal.includes("speed") ||
            lowerGoal.includes("agility") ||
            lowerGoal.includes("footwork")
        ) {
            recommendations.push(
                "Footwork and coordination exercises.",
                "Short, controlled speed and reaction drills."
            );
        }

        if (
            lowerGoal.includes("endurance") ||
            lowerGoal.includes("stamina") ||
            lowerGoal.includes("conditioning")
        ) {
            recommendations.push(
                "Progressive aerobic conditioning.",
                "Sport-specific interval training with adequate recovery."
            );
        }

        if (
            lowerGoal.includes("technique") ||
            lowerGoal.includes("skill") ||
            lowerGoal.includes("defence") ||
            lowerGoal.includes("defense")
        ) {
            recommendations.push(
                "Technical repetition focusing on correct movement.",
                "Controlled partner drills and coach-supervised feedback."
            );
        }

        if (
            lowerGoal.includes("flexibility") ||
            lowerGoal.includes("mobility")
        ) {
            recommendations.push(
                "Regular mobility and appropriate flexibility exercises."
            );
        }

        if (recommendations.length === 0) {
            recommendations.push(
                "Develop a balanced combination of technical practice, conditioning and recovery.",
                "Discuss your development priorities with your coach."
            );
        }

        return recommendations;
    }

    // =====================================
    // 9. EXPERIENCE-LEVEL GUIDANCE
    // =====================================

    function getLevelGuidance(level) {

        switch (level) {

            case "Beginner":
                return [
                    "Prioritise fundamental techniques and correct movement.",
                    "Start with manageable training volume.",
                    "Increase difficulty gradually as your skills develop.",
                    "Allow sufficient recovery between demanding sessions."
                ];

            case "Intermediate":
                return [
                    "Develop consistency across technical and physical training.",
                    "Gradually increase training complexity.",
                    "Identify weaknesses through structured practice.",
                    "Use coach feedback to improve performance."
                ];

            case "Advanced":
                return [
                    "Develop a structured programme around specific performance goals.",
                    "Coordinate technical, tactical and physical training.",
                    "Monitor training load and recovery.",
                    "Use regular performance reviews."
                ];

            case "Professional":
                return [
                    "Prioritise structured performance development.",
                    "Coordinate technical, tactical and physical preparation.",
                    "Monitor workload, performance and recovery.",
                    "Review the programme with your coaching team."
                ];

            default:
                return [
                    "Establish a consistent training routine.",
                    "Adjust difficulty according to experience and recovery.",
                    "Seek guidance from a qualified coach."
                ];
        }
    }

    // =====================================
    // 10. DETERMINE SESSION STRUCTURE
    // =====================================

    function getSessionStructure(duration) {

        const minutes = Number(duration);

        if (minutes === 30) {
            return [
                "5 minutes — Warm-up and movement preparation.",
                "20 minutes — Main technical training focus.",
                "5 minutes — Cool-down."
            ];
        }

        if (minutes === 45) {
            return [
                "5 minutes — Warm-up and movement preparation.",
                "30 minutes — Main technical or conditioning focus.",
                "10 minutes — Cool-down and mobility."
            ];
        }

        if (minutes === 60) {
            return [
                "10 minutes — Warm-up and movement preparation.",
                "35 minutes — Main training focus.",
                "10 minutes — Supporting drills or conditioning.",
                "5 minutes — Cool-down."
            ];
        }

        if (minutes === 90) {
            return [
                "10 minutes — Warm-up and movement preparation.",
                "40 minutes — Main technical training focus.",
                "20 minutes — Supporting physical development.",
                "10 minutes — Controlled application or drills.",
                "10 minutes — Cool-down and mobility."
            ];
        }

        if (minutes === 120) {
            return [
                "15 minutes — Warm-up and movement preparation.",
                "45 minutes — Main technical training focus.",
                "25 minutes — Supporting physical development.",
                "20 minutes — Controlled sport-specific practice.",
                "15 minutes — Cool-down and mobility."
            ];
        }

        return [];
    }

    // =====================================
    // 11. BUILD WEEKLY TRAINING STRUCTURE
    // =====================================

    function createTrainingSessions(trainingDays) {

        const sessionTypes = [
            {
                focus: "Technical Development",
                details: "Develop fundamental techniques, accuracy and movement."
            },
            {
                focus: "Strength and Conditioning",
                details: "Work on appropriate strength exercises and physical conditioning."
            },
            {
                focus: "Skill Development",
                details: "Improve coordination, technical repetition and controlled drills."
            },
            {
                focus: "Sport-Specific Practice",
                details: "Apply techniques through appropriate coach-supervised practice."
            },
            {
                focus: "Technical Review and Mobility",
                details: "Review technique and work on appropriate mobility exercises."
            }
        ];

        // Limit the default plan to five training sessions.
        // Remaining available days can be used for recovery.

        const selectedDays = trainingDays.slice(0, 5);

        return selectedDays.map(function (day, index) {

            return {
                day: day,
                focus: sessionTypes[index].focus,
                details: sessionTypes[index].details
            };
        });
    }

    // =====================================
    // 12. DISPLAY FUNCTIONS
    // =====================================

    function addHeading(container, text) {

        const heading = document.createElement("h3");
        heading.textContent = text;
        container.appendChild(heading);
    }

    function addParagraph(container, text) {

        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        container.appendChild(paragraph);
    }

    function addList(container, items) {

        const list = document.createElement("ul");

        items.forEach(function (item) {

            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);

        });

        container.appendChild(list);
    }

    // =====================================
    // 13. GENERATE TRAINING REGIMEN
    // =====================================

    function generateTrainingRegimen() {

        const details = getSavedData("trainingDetails");

        if (!details) {
            alert("Please save your fighter information first.");
            return;
        }

        if (
            !details.level ||
            !details.combatSport ||
            !details.designatedGoal ||
            !details.sessionDuration ||
            !Array.isArray(details.trainingDays) ||
            details.trainingDays.length === 0
        ) {
            alert("Your fighter information is incomplete. Please update and save it.");
            return;
        }

        const selectedSport = sportFocus[details.combatSport];

        if (!selectedSport) {
            alert("Please select a supported combat sport.");
            return;
        }

        const sessionStructure = getSessionStructure(
            details.sessionDuration
        );

        const weeklySessions = createTrainingSessions(
            details.trainingDays
        );

        // Clear previous results.

        trainingOutput.innerHTML = "";

        // FIGHTER PROFILE

        addHeading(trainingOutput, "FIGHTER PROFILE");

        addParagraph(trainingOutput, "Training Level: " + details.level);

        addParagraph(trainingOutput, "Combat Sport: " + details.combatSport);

        addParagraph(trainingOutput, "Training Goals: " + details.designatedGoal);

        addParagraph(
            trainingOutput,
            "Available Training Days: " + details.trainingDays.join(", ")
        );

        addParagraph(
            trainingOutput,
            "Session Duration: " + details.sessionDuration + " minutes"
        );

        // SPORT-SPECIFIC TRAINING

        addHeading(trainingOutput, "SPORT-SPECIFIC TRAINING FOCUS");

        addList(trainingOutput, selectedSport);

        // GOAL-BASED DEVELOPMENT

        addHeading(trainingOutput, "GOAL-BASED DEVELOPMENT");

        addList(trainingOutput, getGoalFocus(details.designatedGoal));

        // EXPERIENCE-LEVEL GUIDANCE

        addHeading(trainingOutput, "EXPERIENCE-LEVEL GUIDANCE");

        addList(trainingOutput, getLevelGuidance(details.level));

        // SESSION STRUCTURE

        addHeading(trainingOutput, "SESSION STRUCTURE");

        addList(trainingOutput, sessionStructure);

        // WEEKLY TRAINING PROGRAMME

        addHeading(trainingOutput, "YOUR WEEKLY TRAINING PROGRAMME");

        weeklySessions.forEach(function (session) {

            const dayHeading = document.createElement("h4");

            dayHeading.textContent = session.day + " — " + session.focus;

            const dayDetails = document.createElement("p");

            dayDetails.textContent = session.details;

            trainingOutput.appendChild(dayHeading);
            trainingOutput.appendChild(dayDetails);

        });

        // RECOVERY

        addHeading(trainingOutput, "RECOVERY AND PERFORMANCE");

        addList(trainingOutput, [
            "Prioritise sufficient sleep and recovery.",
            "Increase training volume and intensity gradually.",
            "Monitor fatigue and take additional rest when needed.",
            "Use unassigned days for recovery rather than automatically adding more sessions.",
            "Discuss your training load with a qualified coach."
        ]);

        // COACHING NOTE

        addHeading(trainingOutput, "COACHING NOTE");

        addParagraph(
            trainingOutput,
            "This is a preliminary training template based on the information you supplied. It is not a validated coaching prescription or medical programme. A qualified combat sports coach should review and adapt it to your experience, training demands and recovery needs."
        );

        // DISPLAY RESULTS

        trainingOutput.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // =====================================
    // 14. GENERATOR BUTTON
    // =====================================

    generateButton.addEventListener("click", generateTrainingRegimen);

    // =====================================
    // 15. RESTORE SAVED INFORMATION
    // =====================================

    restoreTrainingDetails();

});
