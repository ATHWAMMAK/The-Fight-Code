document.addEventListener("DOMContentLoaded", function () {

    console.log("THE FIGHT CODE: Game Plan Module Loaded!");

    // ==========================================
    // 1. STORAGE HELPERS
    // ==========================================

    function getSavedData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Error loading saved data:", error);
            return null;
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Unable to save information. Check your browser storage.");
            return false;
        }
    }

    // ==========================================
    // 2. REPORT HELPERS
    // ==========================================

    function addHeading(container, title) {
        const heading = document.createElement("h3");
        heading.textContent = title;
        container.appendChild(heading);
    }

    function addParagraph(container, content) {
        const paragraph = document.createElement("p");
        paragraph.textContent = content || "Not provided.";
        container.appendChild(paragraph);
    }

    function addList(container, items) {
        const list = document.createElement("ul");

        const safeItems = items && items.length
            ? items
            : ["No information provided."];

        safeItems.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        container.appendChild(list);
    }

    // ==========================================
    // 3. SPORT-SPECIFIC ASSESSMENT QUESTIONS
    // ==========================================

    const sportAssessmentFields = {

        "Boxing": [
            "Preferred punching combinations",
            "Footwork and movement patterns",
            "Defensive habits",
            "Preferred fighting range",
            "Counter-punching tendencies"
        ],

        "MMA": [
            "Striking preferences",
            "Takedown preferences",
            "Takedown defence",
            "Ground control and grappling",
            "Cage positioning and transitions"
        ],

        "Kickboxing": [
            "Preferred kicking techniques",
            "Punching combinations",
            "Kick defence and checking",
            "Movement and balance",
            "Preferred fighting range"
        ],

        "Muay Thai": [
            "Clinch preferences",
            "Knee and elbow techniques",
            "Kicking patterns",
            "Defensive habits",
            "Balance and posture"
        ],

        "Wrestling": [
            "Preferred takedown entries",
            "Single-leg and double-leg techniques",
            "Takedown defence",
            "Positional control",
            "Scrambling ability"
        ],

        "Brazilian Jiu-Jitsu": [
            "Preferred guard positions",
            "Guard passing ability",
            "Submission preferences",
            "Submission defence",
            "Positional control and escapes"
        ]
    };

    // ==========================================
    // 4. SPORT-SPECIFIC TECHNICAL GUIDANCE
    // ==========================================

    const sportAnalysis = {

        "Boxing": {
            focus: [
                "Evaluate distance management and range control.",
                "Assess footwork, angles and ring positioning.",
                "Review defensive habits and counter opportunities.",
                "Examine combination selection and punch recovery."
            ],

            questions: [
                "Does the opponent retreat in predictable patterns?",
                "How does the opponent respond after combinations?",
                "Which defensive openings have been observed?"
            ]
        },

        "MMA": {
            focus: [
                "Evaluate transitions between striking and grappling.",
                "Assess takedown entries and takedown defence.",
                "Review cage positioning and control.",
                "Examine transitions between standing and ground positions."
            ],

            questions: [
                "Does the opponent favour striking or grappling?",
                "How does the opponent react to takedown attempts?",
                "Which transitions appear vulnerable?"
            ]
        },

        "Kickboxing": {
            focus: [
                "Assess kicking and punching range.",
                "Review kick defence and checking habits.",
                "Examine transitions between punches and kicks.",
                "Evaluate balance and movement after attacks."
            ],

            questions: [
                "Does the opponent favour punches or kicks?",
                "How does the opponent respond to low kicks?",
                "Are there predictable movement patterns?"
            ]
        },

        "Muay Thai": {
            focus: [
                "Evaluate clinch positioning and control.",
                "Assess balance during kicking exchanges.",
                "Review defensive responses to knees and elbows.",
                "Examine combinations involving punches, kicks and knees."
            ],

            questions: [
                "Does the opponent favour clinch exchanges?",
                "How does the opponent respond to body kicks?",
                "Are balance or posture weaknesses observable?"
            ]
        },

        "Wrestling": {
            focus: [
                "Assess stance, level changes and movement.",
                "Review offensive and defensive takedown technique.",
                "Evaluate positional control and mat returns.",
                "Examine reactions during scrambles."
            ],

            questions: [
                "Which takedown entries does the opponent favour?",
                "How does the opponent defend takedowns?",
                "What patterns appear during scrambles?"
            ]
        },

        "Brazilian Jiu-Jitsu": {
            focus: [
                "Evaluate guard retention and guard passing.",
                "Assess positional advancement and control.",
                "Review submission defence and escape habits.",
                "Examine transitions between dominant positions."
            ],

            questions: [
                "Which guard positions does the opponent prefer?",
                "How does the opponent react to passing attempts?",
                "Which positional transitions create difficulties?"
            ]
        }
    };

    // ==========================================
    // 5. SPORT-SPECIFIC TERMINOLOGY
    // ==========================================

    const sportTerminology = {

        "Boxing": {
            movement: [
                "footwork", "mobility", "movement",
                "angles", "lateral movement", "pivoting"
            ],
            defence: [
                "guard", "blocking", "slipping",
                "parrying", "head movement", "defence"
            ],
            striking: [
                "punching", "combinations", "jab",
                "cross", "hooks", "uppercuts", "power"
            ],
            distance: [
                "range", "distance", "reach",
                "long range", "close range"
            ],
            countering: [
                "counterpunching", "countering",
                "counter attacks", "counter punches"
            ]
        },

        "MMA": {
            striking: [
                "punching", "kicking", "elbows",
                "knees", "striking"
            ],
            grappling: [
                "grappling", "ground game",
                "submissions", "transitions"
            ],
            takedowns: [
                "wrestling", "takedowns",
                "single leg", "double leg", "shooting"
            ],
            defence: [
                "takedown defence", "guard",
                "escapes", "blocking", "sprawling"
            ],
            positioning: [
                "cage control", "ground control",
                "positioning", "top control"
            ]
        },

        "Kickboxing": {
            movement: [
                "footwork", "mobility", "movement",
                "angles", "lateral movement"
            ],
            striking: [
                "punching", "kicking",
                "combinations", "striking"
            ],
            defence: [
                "blocking", "guard",
                "kick checking", "parrying"
            ],
            distance: [
                "range", "distance", "reach"
            ],
            balance: [
                "balance", "stability", "posture"
            ]
        },

        "Muay Thai": {
            striking: [
                "punches", "kicks", "elbows",
                "knees", "striking"
            ],
            clinch: [
                "clinch", "clinch control",
                "clinch positioning"
            ],
            defence: [
                "blocking", "checking kicks",
                "guard", "defence"
            ],
            balance: [
                "balance", "posture", "stability"
            ],
            movement: [
                "footwork", "mobility", "movement"
            ]
        },

        "Wrestling": {
            takedowns: [
                "single leg", "double leg",
                "takedowns", "shooting"
            ],
            defence: [
                "sprawling", "takedown defence",
                "defensive wrestling"
            ],
            positioning: [
                "control", "mat control",
                "positioning", "top control"
            ],
            movement: [
                "stance", "footwork",
                "movement", "level changes"
            ],
            scrambling: [
                "scrambling", "scrambles",
                "transitions"
            ]
        },

        "Brazilian Jiu-Jitsu": {
            guard: [
                "guard", "guard retention",
                "closed guard", "open guard"
            ],
            passing: [
                "guard passing", "passing",
                "pass the guard"
            ],
            submissions: [
                "submissions", "chokes",
                "armbars", "joint locks"
            ],
            defence: [
                "submission defence", "escapes",
                "defensive positioning"
            ],
            positioning: [
                "positional control", "mount",
                "side control", "back control"
            ]
        }
    };

    // ==========================================
    // 6. DYNAMIC SPORT ASSESSMENT
    // ==========================================

    function setupSportAssessment(selectId, containerId, profileKey) {

        const sportSelect = document.getElementById(selectId);
        const container = document.getElementById(containerId);

        if (!sportSelect || !container) return;

        let assessmentCache = {};

        const savedProfile = getSavedData(profileKey);

        if (savedProfile && savedProfile.sportAssessment) {
            assessmentCache[savedProfile.combatSport] =
                savedProfile.sportAssessment;
        }

        function storeCurrentAnswers() {

            const currentSport = sportSelect.value;

            if (!currentSport) return;

            const answers = {};

            container.querySelectorAll("textarea").forEach(function (field) {
                answers[field.name] = field.value;
            });

            assessmentCache[currentSport] = answers;
        }

        function renderAssessment() {

            storeCurrentAnswers();

            const selectedSport = sportSelect.value;

            container.innerHTML = "";

            if (!sportAssessmentFields[selectedSport]) return;

            addHeading(
                container,
                selectedSport + " Technical Assessment"
            );

            sportAssessmentFields[selectedSport].forEach(function (question, index) {

                const wrapper = document.createElement("div");
                wrapper.className = "form-group";

                const label = document.createElement("label");
                const input = document.createElement("textarea");

                const fieldName = "assessment_" + index;

                label.textContent = question;
                label.htmlFor = selectId + "-" + fieldName;

                input.id = selectId + "-" + fieldName;
                input.name = fieldName;
                input.placeholder = "Enter observations...";
                input.rows = 2;

                input.value =
                    assessmentCache[selectedSport]?.[fieldName] || "";

                wrapper.appendChild(label);
                wrapper.appendChild(input);

                container.appendChild(wrapper);
            });
        }

        sportSelect.addEventListener("change", renderAssessment);

        if (sportSelect.value) {
            renderAssessment();
        }
    }

    setupSportAssessment(
        "opponent-combat-sport",
        "opponent-sport-assessment",
        "opponentDetails"
    );

    setupSportAssessment(
        "your-combat-sport",
        "your-sport-assessment",
        "yourDetails"
    );

    // ==========================================
    // 7. FOOTAGE LINK MANAGEMENT
    // ==========================================

    function setupFootageLinks(buttonId, containerId, prefix, name) {

        const button = document.getElementById(buttonId);
        const container = document.getElementById(containerId);

        if (!button || !container) return;

        button.addEventListener("click", function () {

            const count =
                container.querySelectorAll('input[type="url"]').length + 1;

            const wrapper = document.createElement("div");
            wrapper.className = "footage-input-group";

            const label = document.createElement("label");
            const input = document.createElement("input");

            label.textContent = "Footage Link " + count;
            label.htmlFor = prefix + "-footage-" + count;

            input.type = "url";
            input.id = prefix + "-footage-" + count;
            input.name = name;
            input.placeholder = "Paste footage URL";

            wrapper.appendChild(label);
            wrapper.appendChild(input);

            container.appendChild(wrapper);
        });
    }

    setupFootageLinks(
        "add-opponent-footage-btn",
        "opponent-footage-links-container",
        "opponent",
        "opponent_footage[]"
    );

    setupFootageLinks(
        "add-your-footage-btn",
        "your-footage-links-container",
        "your",
        "your_footage[]"
    );

    function collectFootage(containerId) {

        const container = document.getElementById(containerId);

        if (!container) return [];

        return Array.from(
            container.querySelectorAll('input[type="url"]')
        )
            .map(input => input.value.trim())
            .filter(Boolean);
    }

    // ==========================================
    // 8. COLLECT FIGHTER INFORMATION
    // ==========================================

    function collectProfile(form, assessmentContainerId, footageContainerId) {

        const prefix =
            form.id === "opponent-form" ? "opponent_" : "your_";

        function getValue(field) {
            const input = form.elements.namedItem(prefix + field);
            return input ? input.value.trim() : "";
        }

        const assessmentContainer =
            document.getElementById(assessmentContainerId);

        const sportAssessment = {};

        if (assessmentContainer) {

            assessmentContainer.querySelectorAll("textarea").forEach(function (field) {
                sportAssessment[field.name] = field.value.trim();
            });
        }

        return {
            name: getValue("name"),
            combatSport: getValue("combat_sport"),
            fighterType: getValue("fighter_type"),
            stance: getValue("fighter_stance"),
            tendencies: getValue("fighter_tendencies"),
            strengths: getValue("fighter_strengths"),
            weaknesses: getValue("fighter_weaknesses"),
            sportAssessment: sportAssessment,
            footage: collectFootage(footageContainerId),
            lastUpdated: new Date().toISOString()
        };
    }

    // ==========================================
    // 9. RESTORE SAVED FIGHTER PROFILES
    // ==========================================

    function restoreProfile(
        formId,
        profileKey,
        assessmentContainerId,
        footageContainerId,
        addButtonId
    ) {

        const form = document.getElementById(formId);
        const profile = getSavedData(profileKey);

        if (!form || !profile) return;

        const prefix =
            formId === "opponent-form" ? "opponent_" : "your_";

        const fields = {
            name: "name",
            combatSport: "combat_sport",
            fighterType: "fighter_type",
            stance: "fighter_stance",
            tendencies: "fighter_tendencies",
            strengths: "fighter_strengths",
            weaknesses: "fighter_weaknesses"
        };

        Object.entries(fields).forEach(function ([property, field]) {

            const input = form.elements.namedItem(prefix + field);

            if (input && profile[property] !== undefined) {
                input.value = profile[property];
            }
        });

        const sportSelect =
            form.elements.namedItem(prefix + "combat_sport");

        if (sportSelect) {
            sportSelect.dispatchEvent(new Event("change"));
        }

        const assessmentContainer =
            document.getElementById(assessmentContainerId);

        if (assessmentContainer && profile.sportAssessment) {

            Object.entries(profile.sportAssessment).forEach(function ([name, value]) {

                const field = assessmentContainer.querySelector(
                    '[name="' + name + '"]'
                );

                if (field) field.value = value;
            });
        }

        const footageContainer =
            document.getElementById(footageContainerId);

        const addButton = document.getElementById(addButtonId);

        if (footageContainer && addButton && profile.footage) {

            profile.footage.forEach(function (url, index) {

                if (index > 0) {
                    addButton.click();
                }

                const inputs =
                    footageContainer.querySelectorAll('input[type="url"]');

                if (inputs[index]) {
                    inputs[index].value = url;
                }
            });
        }
    }

    restoreProfile(
        "opponent-form",
        "opponentDetails",
        "opponent-sport-assessment",
        "opponent-footage-links-container",
        "add-opponent-footage-btn"
    );

    restoreProfile(
        "your-details-form",
        "yourDetails",
        "your-sport-assessment",
        "your-footage-links-container",
        "add-your-footage-btn"
    );

    // ==========================================
    // 10. SAVE FIGHTER PROFILES
    // ==========================================

    const opponentForm = document.getElementById("opponent-form");

    if (opponentForm) {

        opponentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const profile = collectProfile(
                opponentForm,
                "opponent-sport-assessment",
                "opponent-footage-links-container"
            );

            if (!profile.combatSport) {
                alert("Please select the opponent's combat sport.");
                return;
            }

            if (saveData("opponentDetails", profile)) {
                alert("Opponent information saved successfully!");
            }
        });
    }

    const yourForm = document.getElementById("your-details-form");

    if (yourForm) {

        yourForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const profile = collectProfile(
                yourForm,
                "your-sport-assessment",
                "your-footage-links-container"
            );

            if (!profile.combatSport) {
                alert("Please select your combat sport.");
                return;
            }

            if (saveData("yourDetails", profile)) {
                alert("Your fighter information saved successfully!");
            }
        });
    }

    // ==========================================
    // 11. COMPARISON ENGINE
    // ==========================================

    function analyseFighter(fighter, opponent) {

        function splitItems(value) {

            return (value || "")
                .split(",")
                .map(item => item.trim().toLowerCase())
                .filter(Boolean);
        }

        const sport = fighter.combatSport;
        const terminology = sportTerminology[sport] || {};

        function identifyCategories(items) {

            const categories = [];

            items.forEach(function (item) {

                Object.entries(terminology).forEach(function ([category, keywords]) {

                    const matches = keywords.some(function (keyword) {

                        return item.includes(keyword) ||
                            keyword.includes(item);
                    });

                    if (matches && !categories.includes(category)) {
                        categories.push(category);
                    }
                });
            });

            return categories;
        }

        const fighterStrengths = splitItems(fighter.strengths);
        const fighterWeaknesses = splitItems(fighter.weaknesses);

        const opponentStrengths = splitItems(opponent.strengths);
        const opponentWeaknesses = splitItems(opponent.weaknesses);

        const fighterStrengthCategories =
            identifyCategories(fighterStrengths);

        const fighterWeaknessCategories =
            identifyCategories(fighterWeaknesses);

        const opponentStrengthCategories =
            identifyCategories(opponentStrengths);

        const opponentWeaknessCategories =
            identifyCategories(opponentWeaknesses);

        const fighterTendencyCategories =
            identifyCategories(splitItems(fighter.tendencies));

        const opponentTendencyCategories =
            identifyCategories(splitItems(opponent.tendencies));

        const sharedStrengths =
            fighterStrengthCategories.filter(category =>
                opponentWeaknessCategories.includes(category)
            );

        const potentialRisks =
            fighterWeaknessCategories.filter(category =>
                opponentStrengthCategories.includes(category)
            );

        const overlappingTendencies =
            fighterTendencyCategories.filter(category =>
                opponentTendencyCategories.includes(category)
            );

        return {
            fighterStrengths,
            fighterWeaknesses,
            opponentStrengths,
            opponentWeaknesses,
            sharedStrengths,
            potentialRisks,
            overlappingTendencies
        };
    }

    // ==========================================
    // 12. SPORT-SPECIFIC GUIDANCE
    // ==========================================

    function getSportGuidance(sport, fighter, opponent) {

        const guidance = sportAnalysis[sport];

        if (!guidance) {

            return {
                focus: ["Select a supported combat sport."],
                questions: [],
                fighterNotes: {},
                opponentNotes: {}
            };
        }

        return {
            focus: guidance.focus,
            questions: guidance.questions,
            fighterNotes: fighter.sportAssessment || {},
            opponentNotes: opponent.sportAssessment || {}
        };
    }

    // ==========================================
    // 13. GENERATE GAME PLAN
    // ==========================================

    const generateButton =
        document.getElementById("generate-gameplan-btn");

    const output =
        document.getElementById("gameplan-output");

    if (generateButton && output) {

        generateButton.addEventListener("click", function () {

            const fighter = getSavedData("yourDetails");
            const opponent = getSavedData("opponentDetails");

            output.innerHTML = "";

            if (!fighter || !opponent) {

                addHeading(output, "Missing Information");

                addParagraph(
                    output,
                    "Please complete and save both fighter profiles before generating a game plan."
                );

                return;
            }

            if (fighter.combatSport !== opponent.combatSport) {

                addHeading(output, "Combat Sport Mismatch");

                addParagraph(
                    output,
                    "Your selected combat sport and the opponent's selected combat sport must match."
                );

                return;
            }

            const sport = fighter.combatSport;

            const analysis = analyseFighter(fighter, opponent);

            const guidance = getSportGuidance(
                sport,
                fighter,
                opponent
            );

            // ----------------------------------
            // YOUR FIGHTER PROFILE
            // ----------------------------------

            addHeading(output, "YOUR FIGHTER PROFILE");

            addParagraph(output, "Name: " + (fighter.name || "Not provided"));
            addParagraph(output, "Sport: " + sport);
            addParagraph(output, "Fighter type: " + fighter.fighterType);
            addParagraph(output, "Stance: " + fighter.stance);
            addParagraph(output, "Tendencies: " + fighter.tendencies);

            addHeading(output, "YOUR STRENGTHS");
            addList(output, analysis.fighterStrengths);

            addHeading(output, "YOUR AREAS TO IMPROVE");
            addList(output, analysis.fighterWeaknesses);

            // ----------------------------------
            // OPPONENT PROFILE
            // ----------------------------------

            addHeading(output, "OPPONENT PROFILE");

            addParagraph(output, "Name: " + (opponent.name || "Not provided"));
            addParagraph(output, "Fighter type: " + opponent.fighterType);
            addParagraph(output, "Stance: " + opponent.stance);
            addParagraph(output, "Tendencies: " + opponent.tendencies);

            addHeading(output, "OPPONENT STRENGTHS");
            addList(output, analysis.opponentStrengths);

            addHeading(output, "OBSERVED OPPONENT WEAKNESSES");
            addList(output, analysis.opponentWeaknesses);

            // ----------------------------------
            // SPORT-SPECIFIC TECHNICAL ANALYSIS
            // ----------------------------------

            addHeading(
                output,
                sport.toUpperCase() + " TECHNICAL ANALYSIS"
            );

            addList(output, guidance.focus);

            // ----------------------------------
            // FIGHTER COMPARISON
            // ----------------------------------

            addHeading(output, "FIGHTER COMPARISON");

            addHeading(output, "POTENTIAL STRENGTH-OPPORTUNITY MATCHES");

            addList(
                output,
                analysis.sharedStrengths.map(category =>
                    "Your strength may be relevant to an observed opponent weakness in the " +
                    category + " category."
                )
            );

            addHeading(output, "POTENTIAL RISKS");

            addList(
                output,
                analysis.potentialRisks.map(category =>
                    "Your identified weakness may overlap with an opponent strength in the " +
                    category + " category."
                )
            );

            addHeading(output, "SHARED FIGHTING TENDENCIES");

            addList(
                output,
                analysis.overlappingTendencies.map(category =>
                    "Both profiles contain observations related to " + category + "."
                )
            );

            // ----------------------------------
            // YOUR SPORT ASSESSMENT
            // ----------------------------------

            addHeading(output, "YOUR SPORT-SPECIFIC ASSESSMENT");

            const fighterNotes =
                Object.values(guidance.fighterNotes).filter(Boolean);

            addList(
                output,
                fighterNotes.length
                    ? fighterNotes
                    : ["No assessment observations provided."]
            );

            // ----------------------------------
            // OPPONENT SPORT ASSESSMENT
            // ----------------------------------

            addHeading(output, "OPPONENT SPORT-SPECIFIC ASSESSMENT");

            const opponentNotes =
                Object.values(guidance.opponentNotes).filter(Boolean);

            addList(
                output,
                opponentNotes.length
                    ? opponentNotes
                    : ["No assessment observations provided."]
            );

            // ----------------------------------
            // TACTICAL CONSIDERATIONS
            // ----------------------------------

            addHeading(output, "TACTICAL CONSIDERATIONS");

            addList(output, guidance.questions);

            addParagraph(
                output,
                "Use these questions to investigate patterns in training footage and coach observations. They are not confirmed weaknesses."
            );

            // ----------------------------------
            // TRAINING PRIORITIES
            // ----------------------------------

            addHeading(output, "TRAINING PRIORITIES");

            addList(output, [
                "Develop the technical strengths identified in your assessment.",
                "Address the improvement areas identified in your profile.",
                "Practise sport-specific skills under qualified coaching supervision.",
                "Review technical performance and update your assessment regularly."
            ]);

            // ----------------------------------
            // FOOTAGE LINKS
            // ----------------------------------

            addHeading(output, "YOUR FOOTAGE LINKS");

            addList(
                output,
                fighter.footage.length
                    ? fighter.footage
                    : ["No footage links provided."]
            );

            addHeading(output, "OPPONENT FOOTAGE LINKS");

            addList(
                output,
                opponent.footage.length
                    ? opponent.footage
                    : ["No footage links provided."]
            );

            // ----------------------------------
            // COACH REVIEW
            // ----------------------------------

            addHeading(output, "COACH REVIEW");

            addParagraph(
                output,
                "This report is a preliminary, rule-based coaching aid based on information entered by the user. It does not automatically analyse footage or establish an opponent's weaknesses. A qualified coach should verify observations and approve tactical and training decisions."
            );

            addParagraph(
                output,
                "Generated: " + new Date().toLocaleString()
            );

            console.log("Game plan generated successfully.");

        });
    }

});

