document.addEventListener("DOMContentLoaded", function () {
    console.log("THE FIGHT CODE: Advanced Training Engine Loaded!");

    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const trainingForm = document.getElementById("training-form");
    const generateButton = document.getElementById("generate-training-btn");
    const trainingOutput = document.getElementById("training-output");

    if (!trainingForm || !generateButton || !trainingOutput) {
        console.error("Training module: required HTML elements are missing.");
        return;
    }

    // Temporary in-memory storage
    let savedTrainingDetails = null;

    // =====================================
    // 2. SPORT-SPECIFIC TRAINING DATABASE
    // =====================================

    const sportFocus = {
        "Boxing": [
            "Stance, guard, balance and boxing footwork.",
            "Punching combinations, accuracy and timing.",
            "Defensive movement: slipping, blocking and parrying.",
            "Pad work and controlled bag work.",
            "Boxing-specific conditioning."
        ],
        "MMA": [
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

    const supportedLevels = [
        "Beginner", "Intermediate", "Advanced", "Professional"
    ];

    const supportedSports = Object.keys(sportFocus);

    // =====================================
    // 3. COLLECT FIGHTER INFORMATION
    // =====================================

    function getSelectedDays() {
        return Array.from(
            document.querySelectorAll(
                'input[name="training_days"]:checked'
            )
        ).map(function (checkbox) {
            return checkbox.value;
        });
    }

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
    // 4. GOAL-BASED RECOMMENDATIONS
    // =====================================

    function getGoalFocus(goal) {
        const text = goal.toLowerCase();
        const recommendations = [];

        if (/strength|muscle/.test(text)) {
            recommendations.push(
                "Use progressive strength training with appropriate resistance.",
                "Develop strength while maintaining sound exercise technique."
            );
        }

        if (/power|explosive/.test(text)) {
            recommendations.push(
                "Develop explosive movement through suitable, controlled drills.",
                "Build power progressively under appropriate supervision."
            );
        }

        if (/speed|quickness|agility|footwork/.test(text)) {
            recommendations.push(
                "Practise footwork, coordination and movement patterns.",
                "Include short, controlled speed and reaction drills."
            );
        }

        if (/endurance|stamina|conditioning|cardio/.test(text)) {
            recommendations.push(
                "Develop aerobic conditioning progressively.",
                "Use sport-specific intervals with adequate recovery."
            );
        }

        if (/technique|technical|skill|defen[cs]e|guard/.test(text)) {
            recommendations.push(
                "Prioritise technical repetition and correct movement.",
                "Use controlled partner drills and coach-supervised feedback."
            );
        }

        if (/grappling|wrestling|takedown|submission/.test(text)) {
            recommendations.push(
                "Practise appropriate grappling positions and transitions.",
                "Develop takedown, control or submission skills relevant to your sport."
            );
        }

        if (/flexibility|mobility|movement/.test(text)) {
            recommendations.push(
                "Include regular mobility and suitable flexibility exercises."
            );
        }

        if (/balance|coordination/.test(text)) {
            recommendations.push(
                "Include balance, coordination and controlled movement drills."
            );
        }

        if (recommendations.length === 0) {
            recommendations.push(
                "Develop a balanced combination of technical practice, conditioning and recovery.",
                "Discuss your development priorities with your coach."
            );
        }

        return [...new Set(recommendations)];
    }

    // =====================================
    // 5. EXPERIENCE-LEVEL GUIDANCE
    // =====================================

    function getLevelGuidance(level) {
        const guidance = {
            "Beginner": [
                "Prioritise fundamental techniques and correct movement.",
                "Start with manageable training volume.",
                "Increase difficulty gradually as skills develop.",
                "Allow sufficient recovery between demanding sessions."
            ],
            "Intermediate": [
                "Develop consistency across technical and physical training.",
                "Gradually increase training complexity.",
                "Identify development areas through structured practice.",
                "Use coach feedback to improve performance."
            ],
            "Advanced": [
                "Structure training around specific performance goals.",
                "Coordinate technical, tactical and physical training.",
                "Monitor training load and recovery.",
                "Use regular performance reviews."
            ],
            "Professional": [
                "Prioritise structured performance development.",
                "Coordinate technical, tactical and physical preparation.",
                "Monitor workload, performance and recovery.",
                "Review the programme with your coaching team."
            ]
        };

        return guidance[level] || [
            "Establish a consistent training routine.",
            "Adjust difficulty according to experience and recovery.",
            "Seek guidance from a qualified coach."
        ];
    }

    // =====================================
    // 6. SESSION STRUCTURE
    // =====================================

    function getSessionStructure(duration) {
        const structures = {
            "30": [
                "5 minutes — Warm-up and movement preparation.",
                "20 minutes — Main technical training focus.",
                "5 minutes — Cool-down."
            ],
            "45": [
                "5 minutes — Warm-up and movement preparation.",
                "30 minutes — Main technical or conditioning focus.",
                "10 minutes — Cool-down and mobility."
            ],
            "60": [
                "10 minutes — Warm-up and movement preparation.",
                "35 minutes — Main training focus.",
                "10 minutes — Supporting drills or conditioning.",
                "5 minutes — Cool-down."
            ],
            "90": [
                "10 minutes — Warm-up and movement preparation.",
                "40 minutes — Main technical training focus.",
                "20 minutes — Supporting physical development.",
                "10 minutes — Controlled application or drills.",
                "10 minutes — Cool-down and mobility."
            ],
            "120": [
                "15 minutes — Warm-up and movement preparation.",
                "45 minutes — Main technical training focus.",
                "25 minutes — Supporting physical development.",
                "20 minutes — Controlled sport-specific practice.",
                "15 minutes — Cool-down and mobility."
            ]
        };

        return structures[String(duration)] || [];
    }

    // =====================================
    // 7. WEEKLY TRAINING STRUCTURE
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

        return trainingDays.slice(0, 5).map(function (day, index) {
            return {
                day: day,
                focus: sessionTypes[index].focus,
                details: sessionTypes[index].details
            };
        });
    }

    // =====================================
    // 8. REPORT DISPLAY HELPERS
    // =====================================

    function clearReport() {
        trainingOutput.replaceChildren();
    }

    function addHeading(text) {
        const heading = document.createElement("h3");
        heading.textContent = text;
        trainingOutput.appendChild(heading);
    }

    function addParagraph(text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        trainingOutput.appendChild(paragraph);
    }

    function addList(items) {
        const list = document.createElement("ul");

        items.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        trainingOutput.appendChild(list);
    }

    // =====================================
    // 9. SAVE FIGHTER INFORMATION
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

        if (!supportedLevels.includes(details.level)) {
            alert("Please select a supported training level.");
            return;
        }

        if (!supportedSports.includes(details.combatSport)) {
            alert("Please select a supported combat sport.");
            return;
        }

        if (!getSessionStructure(details.sessionDuration).length) {
            alert("Please select a valid session duration.");
            return;
        }

        if (details.trainingDays.length === 0) {
            alert("Please select at least one available training day.");
            return;
        }

        savedTrainingDetails = details;
        clearReport();

        alert("Fighter information saved successfully!");
    });

    // =====================================
    // 10. GENERATE TRAINING REGIMEN
    // =====================================

    function generateTrainingRegimen() {
        clearReport();

        const details = savedTrainingDetails;

        if (!details) {
            addParagraph(
                "Please save your fighter information before generating a training regimen."
            );
            return;
        }

        const sport = sportFocus[details.combatSport];

        if (!sport) {
            addParagraph(
                "Please select a supported combat sport and save your details again."
            );
            return;
        }

        const generatedAt = new Date().toLocaleString();
        const sessions = createTrainingSessions(details.trainingDays);

        // Executive summary
        addHeading("THE FIGHT CODE — TRAINING REGIMEN");
        addParagraph("Report generated: " + generatedAt);

        addHeading("EXECUTIVE SUMMARY");
        addParagraph(
            "This preliminary training template is based on your selected " +
            details.combatSport + " discipline, experience level and development goals."
        );

        addList([
            "Training level: " + details.level,
            "Combat sport: " + details.combatSport,
            "Development goals: " + details.designatedGoal,
            "Selected training days: " + details.trainingDays.join(", "),
            "Session duration: " + details.sessionDuration + " minutes"
        ]);

        // Sport focus
        addHeading("SPORT-SPECIFIC TRAINING FOCUS");
        addList(sport);

        // Goal analysis
        addHeading("PERSONALISED DEVELOPMENT PRIORITIES");
        addList(getGoalFocus(details.designatedGoal));

        // Level guidance
        addHeading("EXPERIENCE-LEVEL GUIDANCE");
        addList(getLevelGuidance(details.level));

        // Session structure
        addHeading("SESSION STRUCTURE");
        addList(getSessionStructure(details.sessionDuration));

        // Weekly schedule
        addHeading("WEEKLY TRAINING STRUCTURE");

        sessions.forEach(function (session) {
            addHeading(session.day + " — " + session.focus);
            addParagraph(session.details);
        });

        if (details.trainingDays.length > 5) {
            addHeading("ADDITIONAL AVAILABLE DAYS");
            addParagraph(
                details.trainingDays.slice(5).join(", ") +
                " — consider using these days for rest, light mobility or gentle recovery rather than automatically adding demanding sessions."
            );
        }

        // Recovery
        addHeading("RECOVERY AND PERFORMANCE");
        addList([
            "Allow adequate rest between demanding training sessions.",
            "Maintain regular sleep and balanced nutrition habits.",
            "Adjust training volume when fatigue accumulates.",
            "Discuss pain, injuries or persistent fatigue with an appropriate professional."
        ]);

        // Coaching note
        addHeading("COACHING NOTE");
        addParagraph(
            "Use this schedule as a starting template, not a fixed fight-camp programme. A qualified coach should adjust drills, intensity, sparring and workload to your ability, goals and recovery."
        );

        addParagraph("Last saved: " + details.lastUpdated);
        addParagraph("Report generated: " + generatedAt);
        addParagraph(
            "This is a preliminary educational training template, not an individualized coaching prescription or medical assessment."
        );

        console.log("Training regimen generated successfully.");
    }

    generateButton.addEventListener("click", generateTrainingRegimen);

    // =====================================
    // 11. INITIALISE MODULE
    // =====================================

    trainingForm.reset();
    clearReport();

    console.log("Training module initialised successfully.");
});