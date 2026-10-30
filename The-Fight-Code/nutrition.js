document.addEventListener("DOMContentLoaded", function () {

    console.log("THE FIGHT CODE: Intelligent Nutrition Engine Loaded!");

    // ==========================================
    // 1. STORAGE HELPERS
    // ==========================================

    function getSavedData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Could not retrieve saved data:", error);
            return null;
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Could not save data:", error);
            alert("Your information could not be saved. Check your browser storage.");
            return false;
        }
    }

    // ==========================================
    // 2. NUTRITION DATABASE
    // ==========================================

    const sportNutrition = {
        "Boxing": {
            focus: [
                "Support repeated rounds of high-intensity movement.",
                "Include balanced meals that support footwork, speed and endurance.",
                "Plan suitable food and fluid intake around demanding sessions."
            ],
            foods: [
                "Whole grains such as oats, rice and wholemeal bread.",
                "Protein sources such as eggs, beans, fish and lean meat.",
                "Fruit and vegetables for dietary variety.",
                "Suitable sources of healthy fats such as nuts and seeds."
            ]
        },

        "Mixed Martial Arts": {
            focus: [
                "Support the varied demands of striking, grappling and conditioning.",
                "Maintain consistent meals around mixed training sessions.",
                "Include a variety of carbohydrate and protein sources."
            ],
            foods: [
                "Rice, potatoes, oats and other carbohydrate sources.",
                "Eggs, fish, beans, poultry and other protein sources.",
                "Fruit and vegetables.",
                "Nuts, seeds and other sources of healthy fats."
            ]
        },

        "Kickboxing": {
            focus: [
                "Support explosive striking, movement and repeated high-intensity efforts.",
                "Maintain consistent energy intake throughout training days.",
                "Consider meal timing around demanding sessions."
            ],
            foods: [
                "Oats, rice, potatoes and whole grains.",
                "Eggs, fish, beans and lean protein sources.",
                "Fruit and vegetables.",
                "Nuts, seeds and other balanced fat sources."
            ]
        },

        "Muay Thai": {
            focus: [
                "Support repeated striking, clinch work and conditioning.",
                "Pay attention to fluid intake during demanding sessions.",
                "Include balanced meals that support training and recovery."
            ],
            foods: [
                "Rice, oats, potatoes and other carbohydrate sources.",
                "Fish, eggs, beans and poultry.",
                "Fruit and vegetables.",
                "Nuts, seeds and other sources of healthy fats."
            ]
        },

        "Wrestling": {
            focus: [
                "Support strength, repeated explosive efforts and sustained activity.",
                "Maintain consistent nutrition during demanding training periods.",
                "Avoid extreme weight-cutting practices."
            ],
            foods: [
                "Rice, potatoes, oats and whole grains.",
                "Eggs, fish, beans and lean meat.",
                "Fruit and vegetables.",
                "Dairy or suitable alternatives, nuts and seeds."
            ]
        },

        "Brazilian Jiu-Jitsu": {
            focus: [
                "Support sustained grappling, muscular endurance and repeated efforts.",
                "Maintain consistent energy intake during long training sessions.",
                "Include balanced meals to support recovery between sessions."
            ],
            foods: [
                "Rice, oats, potatoes and whole grains.",
                "Eggs, fish, beans and poultry.",
                "Fruit and vegetables.",
                "Nuts, seeds and other healthy fat sources."
            ]
        }
    };

    // ==========================================
    // 3. GOAL ANALYSIS
    // ==========================================

    function analyseNutritionGoals(goalText) {
        const goal = goalText.toLowerCase();
        const recommendations = [];

        if (/energy|endurance|stamina|performance|conditioning/.test(goal)) {
            recommendations.push(
                "Prioritize consistent meals and adequate carbohydrate sources to support training energy."
            );
        }

        if (/muscle|strength|build|growth/.test(goal)) {
            recommendations.push(
                "Include varied protein sources throughout the day alongside sufficient overall food intake."
            );
        }

        if (/maintain|maintenance|stable weight/.test(goal)) {
            recommendations.push(
                "Focus on consistent eating habits, balanced meals and monitoring longer-term weight trends."
            );
        }

        if (/recovery|repair|recover/.test(goal)) {
            recommendations.push(
                "Combine adequate food intake with varied protein sources, carbohydrate sources and regular meals."
            );
        }

        if (/healthy|balanced|diet|nutrition/.test(goal)) {
            recommendations.push(
                "Aim for dietary variety, including fruit, vegetables, whole grains, protein sources and healthy fats."
            );
        }

        if (recommendations.length === 0) {
            recommendations.push(
                "Build a consistent eating routine that supports training, recovery and general wellbeing."
            );
        }

        return recommendations;
    }

    // ==========================================
    // 4. TRAINING-LEVEL GUIDANCE
    // ==========================================

    function getLevelGuidance(level) {
        const guidance = {
            "Beginner": "Build consistent eating habits and learn how nutrition supports regular training.",

            "Intermediate": "Pay closer attention to meal consistency, training demands and recovery habits.",

            "Advanced": "Coordinate nutrition habits with changes in training volume and competition preparation.",

            "Professional": "Consider working with a qualified sports dietitian to develop an individualized performance nutrition strategy."
        };

        return guidance[level] || "Focus on consistent, balanced nutrition habits.";
    }

    // ==========================================
    // 5. COLLECT FIGHTER INFORMATION
    // ==========================================

    function collectNutritionDetails() {
        return {
            level: document.getElementById("fighter-level").value,
            combatSport: document.getElementById("combat-sport").value,
            schedule: document.getElementById("schedule").value.trim(),
            designatedGoals: document.getElementById("designated-goals").value.trim(),
            weight: document.getElementById("weight").value,
            weightUnit: document.getElementById("weight-unit").value,
            requiredWeight: document.getElementById("required-weight").value,
            dietaryPreferences: document.getElementById("dietary-preferences").value.trim(),
            foodRestrictions: document.getElementById("food-restrictions").value.trim(),
            lastUpdated: new Date().toLocaleString()
        };
    }

    // ==========================================
    // 6. RESTORE SAVED INFORMATION
    // ==========================================

    function restoreNutritionDetails() {
        const saved = getSavedData("nutritionDetails");

        if (!saved) return;

        document.getElementById("fighter-level").value = saved.level || "";
        document.getElementById("combat-sport").value = saved.combatSport || "";
        document.getElementById("schedule").value = saved.schedule || "";
        document.getElementById("designated-goals").value = saved.designatedGoals || "";
        document.getElementById("weight").value = saved.weight || "";
        document.getElementById("weight-unit").value = saved.weightUnit || "kg";
        document.getElementById("required-weight").value = saved.requiredWeight || "";
        document.getElementById("dietary-preferences").value = saved.dietaryPreferences || "";
        document.getElementById("food-restrictions").value = saved.foodRestrictions || "";

        console.log("Nutrition details restored.");
    }

    // ==========================================
    // 7. REPORT DISPLAY HELPERS
    // ==========================================

    const output = document.getElementById("nutrition-output");

    function clearReport() {
        output.replaceChildren();
    }

    function addHeading(text) {
        const heading = document.createElement("h3");
        heading.textContent = text;
        output.appendChild(heading);
    }

    function addParagraph(text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        output.appendChild(paragraph);
    }

    function addList(items) {
        const list = document.createElement("ul");

        items.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });

        output.appendChild(list);
    }

    // ==========================================
    // 8. SAVE NUTRITION FORM
    // ==========================================

    const nutritionForm = document.getElementById("nutrition-form");

    nutritionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const details = collectNutritionDetails();

        if (!details.level || !details.combatSport || !details.designatedGoals) {
            alert("Please complete your training level, combat sport and nutrition goals.");
            return;
        }

        if (
            details.weight &&
            Number(details.weight) <= 0
        ) {
            alert("Please enter a valid current weight.");
            return;
        }

        if (
            details.requiredWeight &&
            Number(details.requiredWeight) <= 0
        ) {
            alert("Please enter a valid target weight.");
            return;
        }

        if (saveData("nutritionDetails", details)) {
            alert("Nutrition details saved successfully!");
        }
    });

    // ==========================================
    // 9. GENERATE INTELLIGENT NUTRITION REPORT
    // ==========================================

    document.getElementById("generate-nutrition-btn").addEventListener("click", function () {

        const details = getSavedData("nutritionDetails");

        clearReport();

        if (!details) {
            addParagraph("Please save your nutrition details before generating a plan.");
            return;
        }

        const sport = sportNutrition[details.combatSport];

        if (!sport) {
            addParagraph("Please select a supported combat sport and save your details again.");
            return;
        }

        // Fighter profile

        addHeading("FIGHTER NUTRITION PROFILE");

        addParagraph("Training level: " + details.level);
        addParagraph("Combat sport: " + details.combatSport);
        addParagraph("Nutrition goals: " + details.designatedGoals);

        if (details.weight) {
            addParagraph(
                "Recorded weight: " + details.weight + " " + details.weightUnit
            );
        }

        if (details.requiredWeight) {
            addParagraph(
                "Recorded target weight: " + details.requiredWeight + " " + details.weightUnit
            );
        }

        // Sport-specific guidance

        addHeading("SPORT-SPECIFIC NUTRITION FOCUS");
        addList(sport.focus);

        addHeading("SUGGESTED FOOD GROUPS");
        addList(sport.foods);

        // Goal analysis

        addHeading("GOAL-BASED RECOMMENDATIONS");
        addList(analyseNutritionGoals(details.designatedGoals));

        // Training-level analysis

        addHeading("TRAINING LEVEL GUIDANCE");
        addParagraph(getLevelGuidance(details.level));

        // Meal schedule

        addHeading("MEAL ROUTINE");

        if (details.schedule) {
            addParagraph("Your recorded meal routine: " + details.schedule);
        } else {
            addParagraph(
                "Establish a consistent meal routine that fits your daily schedule and training sessions."
            );
        }

        // Dietary preferences

        addHeading("DIETARY PREFERENCES AND RESTRICTIONS");

        addParagraph(
            "Preferences: " +
            (details.dietaryPreferences || "Not provided.")
        );

        addParagraph(
            "Restrictions: " +
            (details.foodRestrictions || "Not provided.")
        );

        // Weight safety

        addHeading("WEIGHT MANAGEMENT CONSIDERATIONS");

        if (details.weight && details.requiredWeight) {
            const current = Number(details.weight);
            const target = Number(details.requiredWeight);

            if (current === target) {
                addParagraph("Your recorded current and target weights are the same.");
            } else {
                addParagraph(
                    "Your recorded current and target weights differ. This tool does not calculate a weight-cutting plan or prescribe a rate of weight change. Discuss competition weight decisions with a qualified sports dietitian and coach."
                );
            }
        } else {
            addParagraph(
                "No complete current and target weight comparison was provided. Focus on performance, wellbeing and consistent nutrition rather than pursuing an arbitrary weight target."
            );
        }

        // Final guidance

        addHeading("IMPORTANT NUTRITION NOTES");

        addList([
            "Maintain appropriate fluid intake before, during and after training.",
            "Choose a varied diet that suits your needs, preferences and food availability.",
            "Avoid extreme restriction, dehydration and rapid weight-cutting methods.",
            "Seek a qualified sports dietitian for individualized nutrition advice, especially during competition preparation.",
            "Seek medical advice for food allergies, persistent digestive problems or other health concerns."
        ]);

        addParagraph(
            "This is a preliminary educational guide, not an individualized diet prescription or medical nutrition plan."
        );

        console.log("Nutrition report generated.");
    });

    // ==========================================
    // 10. INITIALIZE MODULE
    // ==========================================

    restoreNutritionDetails();

});
