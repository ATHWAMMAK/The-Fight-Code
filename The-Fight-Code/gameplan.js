document.addEventListener("DOMContentLoaded", function () {

console.log("THE FIGHT CODE: Game Plan Module Loaded!");

// ==========================================
// 1. TEMPORARY IN-MEMORY STORAGE
// ==========================================

// Information exists only while this page session is open.
// Refreshing or closing the page clears it automatically.

const gamePlanSessionData = {};

function getSavedData(key) {
    return gamePlanSessionData[key] || null;
}

function saveData(key, data) {
    gamePlanSessionData[key] = data;
    return true;
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
        "angles", "lateral movement", "pivoting",
        "quick pivots", "agility", "ring movement"
    ],
    defence: [
        "guard", "blocking", "slipping",
        "parrying", "head movement", "defence",
        "defense", "high guard", "defensive reactions"
    ],
    striking: [
        "punching", "combinations", "jab",
        "cross", "hooks", "uppercuts", "power",
        "fast hands", "punching combinations"
    ],
    distance: [
        "range", "distance", "reach",
        "long range", "close range", "range control"
    ],
    countering: [
        "counterpunching", "countering",
        "counter attacks", "counter punches",
        "counter punching", "counter timing"
    ]
},

"MMA": {
    striking: [
        "punching", "kicking", "elbows",
        "knees", "striking", "striking defence",
        "striking defense", "combinations"
    ],
    grappling: [
        "grappling", "ground game",
        "submissions", "transitions",
        "ground control", "submission skills"
    ],
    takedowns: [
        "wrestling", "takedowns",
        "single leg", "double leg", "shooting",
        "takedown entries", "explosive entries"
    ],
    defence: [
        "takedown defence", "takedown defense",
        "guard", "escapes", "blocking", "sprawling",
        "defensive wrestling"
    ],
    positioning: [
        "cage control", "ground control",
        "positioning", "top control",
        "positional control", "cage positioning"
    ]
},

"Kickboxing": {
    movement: [
        "footwork", "mobility", "movement",
        "angles", "lateral movement", "agility"
    ],
    striking: [
        "punching", "kicking",
        "combinations", "striking",
        "kicking techniques", "powerful punches"
    ],
    defence: [
        "blocking", "guard",
        "kick checking", "parrying",
        "kick defence", "kick defense",
        "checking kicks"
    ],
    distance: [
        "range", "distance", "reach",
        "range control", "distance management"
    ],
    balance: [
        "balance", "stability", "posture"
    ]
},

"Muay Thai": {
    striking: [
        "punches", "kicks", "elbows",
        "knees", "striking", "knee strikes",
        "elbow strikes", "powerful knees",
        "powerful elbows"
    ],
    clinch: [
        "clinch", "clinch control",
        "clinch positioning", "clinch fighting"
    ],
    defence: [
        "blocking", "checking kicks",
        "kick checking", "guard",
        "defence", "defense"
    ],
    balance: [
        "balance", "posture", "stability"
    ],
    movement: [
        "footwork", "mobility", "movement",
        "angles", "lateral movement"
    ]
},

"Wrestling": {
    takedowns: [
        "single leg", "double leg",
        "single-leg", "double-leg",
        "single leg takedown",
        "double leg takedown",
        "takedowns", "shooting",
        "takedown entries"
    ],
    defence: [
        "sprawling", "sprawl",
        "takedown defence", "takedown defense",
        "defensive wrestling"
    ],
    positioning: [
        "control", "mat control",
        "positioning", "top control",
        "positional control"
    ],
    movement: [
        "stance", "footwork",
        "movement", "level changes",
        "quick level changes"
    ],
    scrambling: [
        "scrambling", "scrambles",
        "transitions", "scramble reactions"
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
        "armbars", "armbar",
        "joint locks", "triangle choke",
        "rear naked choke"
    ],
    defence: [
        "submission defence", "submission defense",
        "escapes", "defensive positioning",
        "positional escapes"
    ],
    positioning: [
        "positional control", "mount",
        "side control", "back control",
        "mount control"
    ]
}
};

// ==========================================
// 6. DYNAMIC SPORT ASSESSMENT
// ==========================================

function setupSportAssessment(selectId, containerId) {

    const sportSelect = document.getElementById(selectId);
    const container = document.getElementById(containerId);

    if (!sportSelect || !container) return;

    const assessmentCache = {};

    let renderedSport = null;

    function storeCurrentAnswers() {

        if (!renderedSport) return;

        const answers = {};

        container.querySelectorAll("textarea").forEach(function (field) {
            answers[field.name] = field.value;
        });

        assessmentCache[renderedSport] = answers;
    }

    function renderAssessment() {

        storeCurrentAnswers();

        const selectedSport = sportSelect.value;

        container.innerHTML = "";

        renderedSport = selectedSport;

        if (!sportAssessmentFields[selectedSport]) {
            renderedSport = null;
            return;
        }

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
    "opponent-sport-assessment"
);

setupSportAssessment(
    "your-combat-sport",
    "your-sport-assessment"
);

// ==========================================
// 7. FOOTAGE LINK MANAGEMENT
// ==========================================

function createFootageInput(container, prefix, name, count, value = "") {

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
    input.value = value;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    container.appendChild(wrapper);

    return input;
}

function setupFootageLinks(buttonId, containerId, prefix, name) {

    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    if (!button || !container) return;

    button.addEventListener("click", function () {

        const count =
            container.querySelectorAll('input[type="url"]').length + 1;

        createFootageInput(
            container,
            prefix,
            name,
            count
        );
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
// 9. INITIALISE EMPTY PAGE
// ==========================================

// No saved profiles are restored.
// All forms, assessment containers, footage links
// and reports start empty after every page load.

const opponentForm = document.getElementById("opponent-form");
const yourForm = document.getElementById("your-details-form");

if (opponentForm) {
    opponentForm.reset();
}

if (yourForm) {
    yourForm.reset();
}

[
    "opponent-sport-assessment",
    "your-sport-assessment",
    "opponent-footage-links-container",
    "your-footage-links-container",
    "gameplan-output"
].forEach(function (id) {

    const element = document.getElementById(id);

    if (element) {
        element.innerHTML = "";
    }
});

// ==========================================
// 10. SAVE FIGHTER PROFILES TEMPORARILY
// ==========================================

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
            alert("Opponent information saved for this session!");
        }
    });
}

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
            alert("Your fighter information saved for this session!");
        }
    });
}

// ==========================================
// 11. IMPROVED COMPARISON ENGINE
// ==========================================

const sportAliases = {

"Boxing": {
    movement: [
        "speed", "quickness", "explosive speed",
        "slow reactions", "slow movement",
        "poor footwork", "mobility", "agility"
    ],
    defence: [
        "weak guard", "poor defence",
        "slow defensive reactions", "open guard",
        "poor head movement"
    ],
    striking: [
        "punching power", "fast hands",
        "slow hands", "weak punches",
        "strong combinations"
    ],
    distance: [
        "poor range control", "distance management",
        "reach advantage", "poor distance management"
    ],
    countering: [
        "counter punching", "slow counters",
        "poor counter timing"
    ]
},

"MMA": {
    striking: [
        "fast hands", "striking power",
        "slow striking", "poor striking defence"
    ],
    grappling: [
        "ground game", "submission skills",
        "weak grappling", "poor ground control"
    ],
    takedowns: [
        "explosive takedowns", "weak takedowns",
        "poor takedown entries", "strong wrestling"
    ],
    defence: [
        "weak takedown defence", "poor sprawls",
        "weak defensive wrestling"
    ],
    positioning: [
        "poor cage control", "weak positional control",
        "poor ground positioning"
    ]
},

"Kickboxing": {
    movement: [
        "speed", "quickness", "slow reactions",
        "poor footwork", "agility"
    ],
    striking: [
        "punching power", "kicking power",
        "fast combinations", "slow combinations"
    ],
    defence: [
        "weak guard", "poor kick defence",
        "slow defensive reactions"
    ],
    distance: [
        "poor range control", "reach advantage",
        "distance management"
    ],
    balance: [
        "poor stability", "weak balance",
        "unstable movement"
    ]
},

"Muay Thai": {
    striking: [
        "powerful kicks", "strong knees",
        "fast elbows", "weak striking"
    ],
    clinch: [
        "weak clinch", "poor clinch control",
        "strong clinch control"
    ],
    defence: [
        "weak guard", "poor kick checking",
        "slow defensive reactions"
    ],
    balance: [
        "poor balance", "unstable posture",
        "weak stability"
    ],
    movement: [
        "speed", "quickness", "slow movement",
        "poor footwork"
    ]
},

"Wrestling": {
    takedowns: [
        "explosive entries", "strong single leg",
        "strong double leg", "weak takedown entries"
    ],
    defence: [
        "weak sprawl", "poor takedown defence",
        "weak defensive wrestling"
    ],
    positioning: [
        "poor mat control", "weak positional control",
        "strong top control"
    ],
    movement: [
        "slow reactions", "poor stance",
        "poor mobility", "quick level changes"
    ],
    scrambling: [
        "weak scrambling", "slow transitions",
        "poor scramble reactions"
    ]
},

"Brazilian Jiu-Jitsu": {
    guard: [
        "weak guard retention", "poor guard",
        "strong guard control"
    ],
    passing: [
        "weak guard passing", "poor passing",
        "strong passing ability"
    ],
    submissions: [
        "strong submission game", "weak submissions",
        "poor finishing ability"
    ],
    defence: [
        "weak submission defence", "poor escapes",
        "weak defensive positioning"
    ],
    positioning: [
        "weak positional control", "poor mount control",
        "weak side control", "poor back control"
    ]
}
};

function normalizeText(value) {

    return (value || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function splitItems(value) {

    return (value || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);
}

function identifyCategories(items, sport) {

    const terminology = sportTerminology[sport] || {};
    const aliases = sportAliases[sport] || {};

    const categories = [];
    const allTerms = {};

    Object.entries(terminology).forEach(
        function ([category, keywords]) {

            allTerms[category] = [
                ...(allTerms[category] || []),
                ...keywords
            ];
        }
    );

    Object.entries(aliases).forEach(
        function ([category, keywords]) {

            allTerms[category] = [
                ...(allTerms[category] || []),
                ...keywords
            ];
        }
    );

    items.forEach(function (item) {

        const normalizedItem = normalizeText(item);

        Object.entries(allTerms).forEach(
            function ([category, keywords]) {

                const matches = keywords.some(function (keyword) {

                    const normalizedKeyword = normalizeText(keyword);

                    return normalizedKeyword &&
                        (" " + normalizedItem + " ").includes(
                            " " + normalizedKeyword + " "
                        );
                });

                if (matches && !categories.includes(category)) {
                    categories.push(category);
                }
            }
        );
    });

    return categories;
}

function analyseFighter(fighter, opponent) {

    const sport = fighter.combatSport;

    const fighterStrengths = splitItems(fighter.strengths);
    const fighterWeaknesses = splitItems(fighter.weaknesses);

    const opponentStrengths = splitItems(opponent.strengths);
    const opponentWeaknesses = splitItems(opponent.weaknesses);

    const fighterTendencies = splitItems(fighter.tendencies);
    const opponentTendencies = splitItems(opponent.tendencies);

    const fighterStrengthCategories =
        identifyCategories(fighterStrengths, sport);

    const fighterWeaknessCategories =
        identifyCategories(fighterWeaknesses, sport);

    const opponentStrengthCategories =
        identifyCategories(opponentStrengths, sport);

    const opponentWeaknessCategories =
        identifyCategories(opponentWeaknesses, sport);

    const fighterTendencyCategories =
        identifyCategories(fighterTendencies, sport);

    const opponentTendencyCategories =
        identifyCategories(opponentTendencies, sport);

    const fighterAssessmentNotes =
        Object.values(fighter.sportAssessment || {})
            .filter(value => typeof value === "string" && value.trim());

    const opponentAssessmentNotes =
        Object.values(opponent.sportAssessment || {})
            .filter(value => typeof value === "string" && value.trim());

    const fighterAssessmentCategories =
        identifyCategories(fighterAssessmentNotes, sport);

    const opponentAssessmentCategories =
        identifyCategories(opponentAssessmentNotes, sport);

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

    const assessmentOpportunities =
        fighterAssessmentCategories.filter(category =>
            opponentAssessmentCategories.includes(category)
        );

    const assessmentDifferences =
        fighterAssessmentCategories.filter(category =>
            !opponentAssessmentCategories.includes(category)
        );

    const opponentAssessmentDifferences =
        opponentAssessmentCategories.filter(category =>
            !fighterAssessmentCategories.includes(category)
        );

    return {

        fighterStrengths,
        fighterWeaknesses,

        opponentStrengths,
        opponentWeaknesses,

        fighterStrengthCategories,
        fighterWeaknessCategories,

        opponentStrengthCategories,
        opponentWeaknessCategories,

        sharedStrengths,
        potentialRisks,
        overlappingTendencies,

        fighterAssessmentNotes,
        opponentAssessmentNotes,

        fighterAssessmentCategories,
        opponentAssessmentCategories,

        assessmentOpportunities,
        assessmentDifferences,
        opponentAssessmentDifferences
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
// 12A. TACTICAL RECOMMENDATION ENGINE
// ==========================================

function generateTacticalRecommendations(sport, analysis) {

    const recommendations = {

"Boxing": {
    movement: "Explore lateral movement, angle creation and controlled pivots during technical practice.",
    defence: "Review defensive positioning, guard discipline and head movement.",
    striking: "Practise accurate punching combinations and controlled transitions between punches.",
    distance: "Review range management and the ability to maintain a suitable fighting distance.",
    countering: "Practise recognising openings and developing appropriately timed counter-punching."
},

"MMA": {
    striking: "Review transitions between striking techniques and the ability to maintain defensive awareness.",
    grappling: "Develop positional awareness, controlled grappling transitions and submission defence.",
    takedowns: "Practise technically sound takedown entries and appropriate takedown defence.",
    defence: "Develop defensive reactions, guard awareness and supervised takedown-defence drills.",
    positioning: "Review cage positioning, positional control and transitions between positions."
},

"Kickboxing": {
    movement: "Develop footwork, lateral movement and controlled angle changes.",
    striking: "Practise coordinated punching and kicking combinations with technical accuracy.",
    defence: "Improve defensive positioning, guard discipline and kick-defence technique.",
    distance: "Practise range management and maintaining appropriate striking distance.",
    balance: "Develop stability, posture and balance during kicking and movement drills."
},

"Muay Thai": {
    striking: "Develop technical coordination of punches, kicks, knees and elbows under qualified coaching.",
    clinch: "Practise clinch positioning, posture and controlled clinch transitions.",
    defence: "Review guard discipline, defensive positioning and safe kick-checking technique.",
    balance: "Improve posture, stability and balance during striking and defensive movements.",
    movement: "Develop controlled footwork, mobility and movement between striking exchanges."
},

"Wrestling": {
    takedowns: "Practise technically sound single-leg and double-leg entries under qualified supervision.",
    defence: "Develop sprawl technique, defensive positioning and takedown awareness.",
    positioning: "Improve positional awareness, mat control and controlled transitions.",
    movement: "Develop stance discipline, footwork and technically sound level changes.",
    scrambling: "Practise controlled scrambling, transitions and positional recovery."
},

"Brazilian Jiu-Jitsu": {
    guard: "Develop guard retention, positional awareness and controlled guard transitions.",
    passing: "Practise technically sound guard-passing sequences against appropriate resistance.",
    submissions: "Develop submission mechanics, positional control and responsible finishing technique.",
    defence: "Improve submission awareness, defensive positioning and escape fundamentals.",
    positioning: "Develop positional control, mount stability, side control and back-control transitions."
}
};

    const sportRecommendations = recommendations[sport];

    if (!sportRecommendations) {
        return ["Select a supported combat sport before generating recommendations."];
    }

    const results = [];

    (analysis.sharedStrengths || []).forEach(category => {

        const key = String(category).toLowerCase();

        if (sportRecommendations[key]) {
            results.push(
                "Potential opportunity to explore: " +
                sportRecommendations[key]
            );
        }
    });

    (analysis.potentialRisks || []).forEach(category => {

        const key = String(category).toLowerCase();

        if (sportRecommendations[key]) {
            results.push(
                "Area requiring attention: Review " +
                key +
                " and develop appropriate defensive responses through supervised practice."
            );
        }
    });

    if (results.length === 0) {
        results.push(
            "Insufficient matched observations for specific tactical recommendations. Gather more technical observations before drawing conclusions."
        );
    }

    return [...new Set(results)];
}

// ==========================================
// 12B. TRAINING PRIORITY ENGINE
// ==========================================

function generateTrainingPriorities(sport, analysis) {

    const trainingGuidance = {

"Boxing": {
    movement: "Footwork, lateral movement and pivoting drills.",
    defence: "Guard discipline, slipping, blocking and defensive reactions.",
    striking: "Punching accuracy, combination practice and technical execution.",
    distance: "Range control and distance-management drills.",
    countering: "Counter-punching timing and reaction drills."
},

"MMA": {
    striking: "Striking combinations, defensive awareness and transitions.",
    grappling: "Ground control, positional transitions and submission defence.",
    takedowns: "Takedown entries, technical execution and takedown defence.",
    defence: "Sprawling, defensive wrestling and positional recovery.",
    positioning: "Cage positioning, ground control and positional awareness."
},

"Kickboxing": {
    movement: "Footwork, lateral movement and controlled mobility.",
    striking: "Punching and kicking combinations.",
    defence: "Guard discipline, blocking and kick-defence technique.",
    distance: "Range management and distance-control exercises.",
    balance: "Stability, posture and balance during movement."
},

"Muay Thai": {
    striking: "Technical development of punches, kicks, knees and elbows.",
    clinch: "Clinch positioning, posture and controlled transitions.",
    defence: "Guard discipline, kick checking and defensive positioning.",
    balance: "Posture, stability and balance during striking.",
    movement: "Footwork, mobility and controlled movement."
},

"Wrestling": {
    takedowns: "Single-leg, double-leg and technically sound takedown entries.",
    defence: "Sprawling, takedown defence and defensive positioning.",
    positioning: "Mat control, top control and positional awareness.",
    movement: "Stance discipline, footwork and level changes.",
    scrambling: "Scrambling, transitions and positional recovery."
},

"Brazilian Jiu-Jitsu": {
    guard: "Guard retention and guard-position transitions.",
    passing: "Guard-passing fundamentals and positional progression.",
    submissions: "Submission mechanics and positional control.",
    defence: "Submission defence, escapes and defensive positioning.",
    positioning: "Mount, side control, back control and positional transitions."
}
};

    const sportPriorities = trainingGuidance[sport];

    if (!sportPriorities) {
        return ["Select a supported combat sport before generating training priorities."];
    }

    const results = [];

    (analysis.fighterWeaknessCategories || []).forEach(category => {

        const key = String(category).toLowerCase();

        if (sportPriorities[key]) {
            results.push(sportPriorities[key]);
        }
    });

    if (results.length === 0) {
        results.push(
            "Continue developing technical fundamentals and review your performance with a qualified coach."
        );
    }

    return [...new Set(results)];
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

        if (
            !fighter.combatSport ||
            fighter.combatSport !== opponent.combatSport
        ) {

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
        // GAME PLAN REPORT OVERVIEW
        // ----------------------------------

        addHeading(output, "THE FIGHT CODE");
        addHeading(output, "PRELIMINARY FIGHT PLAN REPORT");

        addParagraph(output, "Combat sport: " + sport);

        addParagraph(
            output,
            "Your fighter: " + (fighter.name || "Not provided")
        );

        addParagraph(
            output,
            "Opponent: " + (opponent.name || "Not provided")
        );

        addParagraph(
            output,
            "Report generated: " + new Date().toLocaleString()
        );

        // ----------------------------------
        // EXECUTIVE SUMMARY
        // ----------------------------------

        addHeading(output, "EXECUTIVE SUMMARY");

        addParagraph(
            output,
            "This report compares the information supplied for both fighters, identifies potential technical opportunities and areas requiring attention, and provides preliminary sport-specific training recommendations."
        );

        addParagraph(
            output,
            "Potential strength-opportunity matches identified: " +
            analysis.sharedStrengths.length
        );

        addParagraph(
            output,
            "Potential risk categories identified: " +
            analysis.potentialRisks.length
        );

        addParagraph(
            output,
            "Shared technical assessment categories: " +
            analysis.assessmentOpportunities.length
        );

        // ----------------------------------
        // YOUR FIGHTER PROFILE
        // ----------------------------------

        addHeading(output, "YOUR FIGHTER PROFILE");

        addParagraph(output, "Name: " + (fighter.name || "Not provided"));
        addParagraph(output, "Sport: " + sport);
        addParagraph(output, "Fighter type: " + (fighter.fighterType || "Not provided"));
        addParagraph(output, "Stance: " + (fighter.stance || "Not provided"));
        addParagraph(output, "Tendencies: " + (fighter.tendencies || "Not provided"));

        addHeading(output, "YOUR STRENGTHS");
        addList(output, analysis.fighterStrengths);

        addHeading(output, "YOUR AREAS TO IMPROVE");
        addList(output, analysis.fighterWeaknesses);

        // ----------------------------------
        // OPPONENT PROFILE
        // ----------------------------------

        addHeading(output, "OPPONENT PROFILE");

        addParagraph(output, "Name: " + (opponent.name || "Not provided"));
        addParagraph(output, "Fighter type: " + (opponent.fighterType || "Not provided"));
        addParagraph(output, "Stance: " + (opponent.stance || "Not provided"));
        addParagraph(output, "Tendencies: " + (opponent.tendencies || "Not provided"));

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
        // SPORT-SPECIFIC ASSESSMENT COMPARISON
        // ----------------------------------

        addHeading(output, "SPORT-SPECIFIC ASSESSMENT COMPARISON");

        addHeading(output, "SHARED TECHNICAL AREAS");

        addList(
            output,
            analysis.assessmentOpportunities.map(category =>
                "Both fighter assessments contain observations related to " +
                category + ". Review this area further with a coach."
            )
        );

        addHeading(output, "YOUR DISTINCT TECHNICAL OBSERVATIONS");

        addList(output, analysis.assessmentDifferences);

        addHeading(output, "OPPONENT'S DISTINCT TECHNICAL OBSERVATIONS");

        addList(output, analysis.opponentAssessmentDifferences);

        // ----------------------------------
        // YOUR SPORT ASSESSMENT
        // ----------------------------------

        addHeading(output, "YOUR SPORT-SPECIFIC ASSESSMENT");

        const fighterNotes =
            Object.values(guidance.fighterNotes)
                .filter(Boolean);

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
            Object.values(guidance.opponentNotes)
                .filter(Boolean);

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

        const tacticalRecommendations =
            generateTacticalRecommendations(sport, analysis);

        addHeading(output, "PRIORITY AREAS REQUIRING ATTENTION");

        addList(
            output,
            analysis.potentialRisks.length
                ? analysis.potentialRisks.map(category =>
                    "Review the " + category +
                    " category carefully. Your identified weakness may overlap with an opponent strength."
                )
                : ["No potential risk categories were identified from the supplied profile information."]
        );

        addHeading(output, "POTENTIAL TACTICAL OPPORTUNITIES");

        addList(
            output,
            analysis.sharedStrengths.length
                ? analysis.sharedStrengths.map(category =>
                    "Explore how your " + category +
                    " strengths may be relevant to the opponent's observed weaknesses."
                )
                : ["No strength-opportunity matches were identified from the supplied profile information."]
        );

        addHeading(output, "ADDITIONAL TACTICAL RECOMMENDATIONS");

        addList(output, tacticalRecommendations);

        addParagraph(
            output,
            "These are preliminary, rule-based suggestions derived from entered observations. They are not confirmed weaknesses or guaranteed tactics. A qualified coach should review them before implementation."
        );

        // ----------------------------------
        // TRAINING PRIORITIES
        // ----------------------------------

        addHeading(output, "TRAINING PRIORITIES");

        const trainingPriorities =
            generateTrainingPriorities(sport, analysis);

        addHeading(output, "PRIORITY 1 — AREAS FOR IMPROVEMENT");

        addList(
            output,
            analysis.fighterWeaknessCategories.length
                ? analysis.fighterWeaknessCategories.map(category =>
                    "Review and develop your " + category +
                    " skills through appropriate, supervised practice."
                )
                : ["No specific improvement categories were identified from the supplied profile."]
        );

        addHeading(output, "PRIORITY 2 — SPORT-SPECIFIC DEVELOPMENT");

        addList(output, trainingPriorities);

        addHeading(output, "PRIORITY 3 — PERFORMANCE DEVELOPMENT");

        addList(output, [
            "Monitor technical progress and review performance regularly.",
            "Practise skills under appropriately qualified coaching supervision.",
            "Adapt training volume and intensity to experience, physical condition and recovery.",
            "Update fighter assessments as new observations become available."
        ]);

        addParagraph(
            output,
            "Training priorities should be adapted to the fighter's experience, physical condition, available recovery time and qualified coaching guidance."
        );

        // ----------------------------------
        // FOOTAGE LINKS
        // ----------------------------------

        addHeading(output, "YOUR FOOTAGE LINKS");

        addList(
            output,
            Array.isArray(fighter.footage) && fighter.footage.length
                ? fighter.footage
                : ["No footage links provided."]
        );

        addHeading(output, "OPPONENT FOOTAGE LINKS");

        addList(
            output,
            Array.isArray(opponent.footage) && opponent.footage.length
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
