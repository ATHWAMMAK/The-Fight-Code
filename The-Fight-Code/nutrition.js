document.addEventListener("DOMContentLoaded", function () {
    console.log("THE FIGHT CODE: Intelligent Nutrition Engine Loaded!");

    // ==========================================
    // 1. SELECT HTML ELEMENTS
    // ==========================================

    const nutritionForm = document.getElementById("nutrition-form");
    const generateButton = document.getElementById("generate-nutrition-btn");
    const nutritionOutput = document.getElementById("nutrition-output");

    if (!nutritionForm || !generateButton || !nutritionOutput) {
        console.error("Nutrition module: required HTML elements are missing.");
        return;
    }

    // Temporary in-memory storage
    let savedNutritionDetails = null;

    // ==========================================
    // 2. SPORT-SPECIFIC NUTRITION DATABASE
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
                "Suitable sources of healthy fats."
            ],
            mealTiming: [
                "Maintain regular meals throughout the day.",
                "Allow time to eat and digest before demanding boxing sessions.",
                "Include a balanced meal or snack after training."
            ],
            hydration: [
                "Drink fluids regularly throughout the day.",
                "Pay attention to fluid intake during demanding sessions.",
                "Replace fluids after training according to individual needs."
            ]
        },

        "MMA": {
            focus: [
                "Support the varied demands of striking, grappling and conditioning.",
                "Maintain consistent meals around mixed training sessions.",
                "Include a variety of carbohydrate and protein sources."
            ],
            foods: [
                "Rice, potatoes, oats and other carbohydrate sources.",
                "Eggs, fish, beans, poultry and other protein sources.",
                "Fruit and vegetables.",
                "Suitable sources of healthy fats."
            ],
            mealTiming: [
                "Plan regular meals around striking and grappling sessions.",
                "Allow appropriate digestion time before intense training.",
                "Include balanced food after demanding sessions."
            ],
            hydration: [
                "Maintain consistent fluid intake throughout the day.",
                "Consider the demands of longer or multiple training sessions.",
                "Avoid using dehydration as a method of making weight."
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
                "Suitable sources of healthy fats."
            ],
            mealTiming: [
                "Maintain regular meals to support training consistency.",
                "Plan suitable meals and snacks around demanding sessions.",
                "Include balanced food to support recovery."
            ],
            hydration: [
                "Drink regularly before and after training.",
                "Pay attention to fluid loss during demanding sessions.",
                "Avoid deliberate fluid restriction."
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
                "Suitable sources of healthy fats."
            ],
            mealTiming: [
                "Keep meals consistent across training days.",
                "Allow appropriate digestion time before clinch and conditioning sessions.",
                "Eat balanced meals after training."
            ],
            hydration: [
                "Maintain regular fluid intake.",
                "Pay particular attention to fluid loss during demanding sessions.",
                "Avoid dehydration-based weight management."
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
            ],
            mealTiming: [
                "Maintain a consistent eating routine during training periods.",
                "Plan food around demanding wrestling sessions.",
                "Avoid skipping meals to force rapid weight changes."
            ],
            hydration: [
                "Maintain normal hydration throughout the day.",
                "Replace fluids lost through demanding exercise.",
                "Never use dehydration or fluid restriction to make weight."
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
                "Suitable sources of healthy fats."
            ],
            mealTiming: [
                "Plan meals around longer rolling and drilling sessions.",
                "Allow sufficient digestion time before training.",
                "Maintain consistent meals on recovery days."
            ],
            hydration: [
                "Drink fluids regularly throughout the day.",
                "Pay attention to fluid loss during longer sessions.",
                "Replace fluids after training."
            ]
        }
    };

    const supportedLevels = [
        "Beginner", "Intermediate", "Advanced", "Professional"
    ];

    const supportedSports = Object.keys(sportNutrition);

    // ==========================================
    // 3. NUTRITION GOAL ANALYSIS
    // ==========================================

    function analyseNutritionGoals(goalText) {
        const goal = goalText.toLowerCase();
        const recommendations = [];

        if (/energy|endurance|stamina|performance|conditioning|cardio/.test(goal)) {
            recommendations.push(
                "Prioritise consistent meals and suitable carbohydrate sources to support training energy."
            );
        }

        if (/muscle|strength|build|growth/.test(goal)) {
            recommendations.push(
                "Include varied protein sources throughout the day alongside sufficient overall food intake."
            );
        }

        if (/power|explosive/.test(goal)) {
            recommendations.push(
                "Maintain balanced meals that support demanding physical activity and recovery."
            );
        }

        if (/maintain|maintenance|stable weight/.test(goal)) {
            recommendations.push(
                "Focus on consistent eating habits, balanced meals and monitoring longer-term weight trends."
            );
        }

        if (/weight|cut|lose|loss|gain/.test(goal)) {
            recommendations.push(
                "Discuss weight-management goals with a qualified sports dietitian. Avoid rapid weight changes and restrictive practices."
            );
        }

        if (/recovery|repair|recover/.test(goal)) {
            recommendations.push(
                "Combine adequate food intake with varied protein and carbohydrate sources and regular meals."
            );
        }

        if (/healthy|balanced|diet|nutrition/.test(goal)) {
            recommendations.push(
                "Aim for dietary variety, including fruit, vegetables, whole grains, protein sources and healthy fats."
            );
        }

        if (/hydration|water|fluid/.test(goal)) {
            recommendations.push(
                "Maintain regular fluid intake and adjust appropriately for training conditions and individual needs."
            );
        }

        if (/meal|routine|consistency|schedule/.test(goal)) {
            recommendations.push(
                "Develop a consistent meal routine that fits your daily schedule and training sessions."
            );
        }

        if (/vitamin|mineral|micronutrient/.test(goal)) {
            recommendations.push(
                "Include a variety of fruit, vegetables and other nutrient-rich foods."
            );
        }

        if (recommendations.length === 0) {
            recommendations.push(
                "Build a consistent eating routine that supports training, recovery and general wellbeing."
            );
        }

        return [...new Set(recommendations)];
    }

    // ==========================================
    // 4. TRAINING-LEVEL GUIDANCE
    // ==========================================

    function getLevelGuidance(level) {
        const guidance = {
            "Beginner":
                "Build consistent eating habits and learn how nutrition supports regular training.",

            "Intermediate":
                "Pay closer attention to meal consistency, training demands and recovery habits.",

            "Advanced":
                "Coordinate nutrition habits with changes in training volume and competition preparation.",

            "Professional":
                "Consider working with a qualified sports dietitian to develop an individualised performance nutrition strategy."
        };

        return guidance[level] || "Focus on consistent, balanced nutrition habits.";
    }

    // ==========================================
    // 5. COLLECT FIGHTER INFORMATION
    // ==========================================

    function collectNutritionDetails() {
        return {
            level: document.getElementById("fighter-level").value.trim(),
            combatSport: document.getElementById("combat-sport").value.trim(),
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
    // 6. PERSONALISE FOOD RECOMMENDATIONS
    // ==========================================

    function getAdjustedFoodRecommendations(sport, details) {
        const preferences =
            (details.dietaryPreferences + " " + details.foodRestrictions)
                .toLowerCase();

        let foods = sport.foods.slice();

        const vegan = /vegan/.test(preferences);
        const vegetarian = vegan || /vegetarian/.test(preferences);
        const dairyFree = /dairy.free|lactose.free|lactose intolerant/.test(preferences);
        const glutenFree = /gluten.free|coeliac|celiac/.test(preferences);
        const nutFree = /nut.free|nut allergy|peanut allergy|tree nut/.test(preferences);
        const fishFree = /fish allergy|seafood allergy|fish.free|seafood.free/.test(preferences);
        const eggFree = /egg allergy|egg.free/.test(preferences);

        if (vegetarian) {
            foods = foods.filter(function (food) {
                return !/fish|poultry|lean meat/.test(food);
            });
        }

        if (vegan) {
            foods = foods.map(function (food) {
                if (/eggs|beans|fish|poultry|lean meat/.test(food)) {
                    return "Plant-based protein sources such as beans, lentils, chickpeas and tofu.";
                }
                return food;
            });

            foods = foods.filter(function (food) {
                return !/dairy/.test(food);
            });
        }

        if (dairyFree) {
            foods = foods.filter(function (food) {
                return !/dairy/.test(food);
            });
            foods.push("Suitable dairy-free alternatives where appropriate.");
        }

        if (fishFree) {
            foods = foods.filter(function (food) {
                return !/fish/.test(food);
            });
        }

        if (eggFree) {
            foods = foods.filter(function (food) {
                return !/eggs/.test(food);
            });
        }

        if (glutenFree) {
            foods = foods.map(function (food) {
                if (/whole grains|wholemeal bread/.test(food)) {
                    return "Gluten-free carbohydrate options such as rice, potatoes, quinoa and certified gluten-free oats.";
                }
                return food;
            });
        }

        if (nutFree) {
            foods = foods.filter(function (food) {
                return !/nuts|seeds/.test(food);
            });
            foods.push("Suitable alternatives such as avocado or olive oil, if tolerated.");
        }

        if (vegetarian && !vegan) {
            foods.push("Vegetarian protein options such as beans, lentils, tofu and suitable dairy products.");
        }

        if (vegan) {
            foods.push("Choose varied plant-based protein sources such as beans, lentils, chickpeas and tofu.");
        }

        return [...new Set(foods)];
    }

    // ==========================================
    // 7. REPORT DISPLAY HELPERS
    // ==========================================

    function clearReport() {
        nutritionOutput.replaceChildren();
    }

    function addHeading(text) {
        const heading = document.createElement("h3");
        heading.textContent = text;
        nutritionOutput.appendChild(heading);
    }

    function addParagraph(text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        nutritionOutput.appendChild(paragraph);
    }

    function addList(items) {
        const list = document.createElement("ul");

        items.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        nutritionOutput.appendChild(list);
    }

    // ==========================================
    // 8. SAVE NUTRITION INFORMATION
    // ==========================================

    nutritionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const details = collectNutritionDetails();

        if (!details.level || !details.combatSport || !details.designatedGoals) {
            alert("Please complete your training level, combat sport and nutrition goals.");
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

        if (details.weight) {
            const weight = Number(details.weight);

            if (!Number.isFinite(weight) || weight <= 0) {
                alert("Please enter a valid current weight.");
                return;
            }
        }

        if (details.requiredWeight) {
            const targetWeight = Number(details.requiredWeight);

            if (!Number.isFinite(targetWeight) || targetWeight <= 0) {
                alert("Please enter a valid target weight.");
                return;
            }
        }

        if (details.weight && details.requiredWeight &&
            details.weightUnit !== document.getElementById("weight-unit").value) {
            alert("Please check that your weight units are consistent.");
            return;
        }

        savedNutritionDetails = details;
        clearReport();

        alert("Nutrition details saved successfully!");
    });

    // ==========================================
    // 9. GENERATE NUTRITION REPORT
    // ==========================================

    function generateNutritionPlan() {
        clearReport();

        const details = savedNutritionDetails;

        if (!details) {
            addParagraph(
                "Please save your nutrition details before generating a plan."
            );
            return;
        }

        const sport = sportNutrition[details.combatSport];

        if (!sport) {
            addParagraph(
                "Please select a supported combat sport and save your details again."
            );
            return;
        }

        const generatedAt = new Date().toLocaleString();

        // Executive summary
        addHeading("THE FIGHT CODE — NUTRITION PLAN");
        addParagraph("Report generated: " + generatedAt);

        addHeading("EXECUTIVE SUMMARY");
        addParagraph(
            "This preliminary nutrition guide is based on your selected combat sport, training level and stated nutrition goals."
        );

        addList([
            "Training level: " + details.level,
            "Combat sport: " + details.combatSport,
            "Nutrition goals: " + details.designatedGoals
        ]);

        // Sport-specific focus
        addHeading("SPORT-SPECIFIC NUTRITION FOCUS");
        addList(sport.focus);

        // Personalised food suggestions
        addHeading("PERSONALISED FOOD SUGGESTIONS");
        addList(getAdjustedFoodRecommendations(sport, details));

        // Goal analysis
        addHeading("GOAL-BASED RECOMMENDATIONS");
        addList(analyseNutritionGoals(details.designatedGoals));

        // Training level
        addHeading("TRAINING LEVEL GUIDANCE");
        addParagraph(getLevelGuidance(details.level));

        // Meal timing
        addHeading("MEAL TIMING GUIDANCE");
        addList(sport.mealTiming);

        // Hydration
        addHeading("HYDRATION GUIDANCE");
        addList(sport.hydration);

        // Meal routine
        addHeading("MEAL ROUTINE");
        addParagraph(
            details.schedule
                ? "Your recorded meal routine: " + details.schedule
                : "Establish a consistent meal routine that fits your daily schedule and training sessions."
        );

        // Dietary preferences and restrictions
        addHeading("DIETARY PREFERENCES AND RESTRICTIONS");

        addParagraph(
            "Preferences: " +
            (details.dietaryPreferences || "Not provided.")
        );

        addParagraph(
            "Restrictions: " +
            (details.foodRestrictions || "Not provided.")
        );

        if (details.dietaryPreferences || details.foodRestrictions) {
            addParagraph(
                "Important: Review every food suggestion against your individual dietary needs and restrictions. This tool cannot verify product ingredients, food labels or cross-contamination."
            );
        }

        // Weight considerations
        addHeading("WEIGHT MANAGEMENT CONSIDERATIONS");

        if (details.weight && details.requiredWeight) {
            const current = Number(details.weight);
            const target = Number(details.requiredWeight);

            addParagraph(
                "Recorded current weight: " + current + " " + details.weightUnit
            );

            addParagraph(
                "Recorded target weight: " + target + " " + details.weightUnit
            );

            if (current === target) {
                addParagraph(
                    "Your recorded current and target weights are the same."
                );
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

        // Key priorities
        addHeading("IMPORTANT NUTRITION NOTES");

        addList([
            "Maintain appropriate fluid intake before, during and after training.",
            "Choose a varied diet that suits your needs, preferences and food availability.",
            "Avoid extreme restriction, dehydration and rapid weight-cutting methods.",
            "Seek a qualified sports dietitian for individualised nutrition advice, especially during competition preparation.",
            "Seek medical advice for food allergies, persistent digestive problems or other health concerns."
        ]);

        // Report information
        addHeading("REPORT INFORMATION");
        addParagraph("Last saved: " + details.lastUpdated);
        addParagraph("Report generated: " + generatedAt);

        addParagraph(
            "This is a preliminary educational guide, not an individualised diet prescription or medical nutrition plan."
        );

        console.log("Nutrition report generated successfully.");
    }

    generateButton.addEventListener("click", generateNutritionPlan);

    // ==========================================
    // 10. INITIALISE MODULE
    // ==========================================

    nutritionForm.reset();
    clearReport();

    console.log("Nutrition module initialised successfully.");
});