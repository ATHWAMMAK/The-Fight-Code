document.addEventListener("DOMContentLoaded", function () {

console.log("THE FIGHT CODE: Intelligent Recovery Engine Loaded!");

// ==========================================
// 1. TEMPORARY STORAGE
// ==========================================

let savedRecoveryDetails = null;

// ==========================================
// 2. SPORT-SPECIFIC RECOVERY DATABASE
// ==========================================

const sportRecovery = {

"Boxing": {
focus: [
"Allow adequate recovery between demanding sparring sessions.",
"Include suitable rest after intensive footwork and conditioning work.",
"Use comfortable mobility work as appropriate to your training."
],
considerations: [
"Pay attention to accumulated fatigue from repeated rounds.",
"Head impacts require particular caution and appropriate medical assessment."
]
},

"MMA": {
focus: [
"Balance recovery across striking, wrestling and grappling sessions.",
"Allow time to recover after demanding full-contact practice.",
"Avoid stacking intense sessions without sufficient recovery."
],
considerations: [
"Different training disciplines can create different physical demands.",
"Head impacts, joint injuries and persistent pain require qualified assessment."
]
},

"Kickboxing": {
focus: [
"Allow recovery after demanding striking and conditioning sessions.",
"Include comfortable mobility work where appropriate.",
"Balance high-intensity training with lighter activity and rest."
],
considerations: [
"Monitor fatigue after repeated kicking and striking drills.",
"Do not train through significant pain or suspected injury."
]
},

"Muay Thai": {
focus: [
"Allow sufficient recovery after clinch, kicking and striking sessions.",
"Balance intensive pad work and sparring with lighter training days.",
"Include appropriate rest following demanding conditioning."
],
considerations: [
"Monitor accumulated physical fatigue across different training activities.",
"Seek assessment for persistent pain or suspected injury."
]
},

"Wrestling": {
focus: [
"Allow recovery after demanding grappling and conditioning sessions.",
"Balance strength work with lighter technical sessions.",
"Pay attention to accumulated muscular and joint fatigue."
],
considerations: [
"Avoid returning to intense training before an injury has been appropriately assessed.",
"Avoid extreme dehydration and rapid weight-cutting practices."
]
},

"Brazilian Jiu-Jitsu": {
focus: [
"Balance demanding rolling sessions with technical practice and rest.",
"Allow adequate recovery after intense grappling sessions.",
"Include comfortable mobility work where appropriate."
],
considerations: [
"Monitor joint discomfort and accumulated fatigue.",
"Do not ignore persistent pain or suspected joint injuries."
]
}

};

// ==========================================
// 3. TRAINING LEVEL GUIDANCE
// ==========================================

function getLevelGuidance(level) {

const guidance = {

"Beginner":
"Build a consistent recovery routine. Prioritize rest, comfortable movement and adequate sleep as training habits develop.",

"Intermediate":
"Monitor how you respond to training volume. Balance demanding sessions with lighter activity and recovery days.",

"Advanced":
"Pay attention to accumulated training fatigue and coordinate recovery with changes in training intensity.",

"Professional":
"Consider structured recovery monitoring with qualified coaches and appropriate healthcare professionals."

};

return guidance[level] ||
"Develop consistent recovery habits and monitor how you respond to training.";

}

// ==========================================
// 4. GOAL ANALYSIS
// ==========================================

function analyseRecoveryGoals(goalText) {

const goal = goalText.toLowerCase();
const recommendations = [];

if (/sleep|rest/.test(goal)) {
recommendations.push(
"Work towards a consistent sleep and rest routine that allows adequate recovery."
);
}

if (/fatigue|tired|energy/.test(goal)) {
recommendations.push(
"Review training demands, rest periods and sleep consistency. Persistent or unusual fatigue deserves professional assessment."
);
}

if (/mobility|flexibility|movement/.test(goal)) {
recommendations.push(
"Consider comfortable mobility activities that do not aggravate pain or existing limitations."
);
}

if (/injury|pain|rehabilitation|rehab/.test(goal)) {
recommendations.push(
"Have injuries and rehabilitation needs assessed by an appropriately qualified healthcare professional before changing training activity."
);
}

if (/performance|training|consistency/.test(goal)) {
recommendations.push(
"Coordinate recovery habits with your training schedule and avoid treating every session as a maximum-effort session."
);
}

if (recommendations.length === 0) {
recommendations.push(
"Build a consistent recovery routine around rest, sleep and appropriate training management."
);
}

return recommendations;

}

// ==========================================
// 5. COLLECT RECOVERY INFORMATION
// ==========================================

function collectRecoveryDetails() {

return {

level: document.getElementById("fighter-level").value,

combatSport: document.getElementById("combat-sport").value,

physicalCondition:
document.getElementById("physical-condition").value.trim(),

existingInjuries:
document.getElementById("existing-injuries").value.trim(),

sleepHours:
document.getElementById("sleep-hours").value,

fatigueLevel:
document.getElementById("fatigue-level").value,

schedule:
document.getElementById("schedule").value.trim(),

designatedGoals:
document.getElementById("designated-goals").value.trim(),

lastUpdated: new Date().toLocaleString()

};

}

// ==========================================
// 6. REPORT DISPLAY HELPERS
// ==========================================

const recoveryForm = document.getElementById("recovery-form");

const generateButton =
document.getElementById("generate-recovery-btn");

const output =
document.getElementById("recovery-output");

const recoveryResults =
document.getElementById("recovery-results");

function clearReport() {

output.replaceChildren();

if (recoveryResults) {
recoveryResults.hidden = true;
}

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
// 7. SAVE RECOVERY FORM
// ==========================================

if (recoveryForm) {

recoveryForm.addEventListener("submit", function (event) {

event.preventDefault();

const details = collectRecoveryDetails();

if (
!details.level ||
!details.combatSport ||
!details.designatedGoals
) {

alert(
"Please complete your training level, combat sport and recovery goals."
);

return;

}

if (details.sleepHours !== "") {

const hours = Number(details.sleepHours);

if (
!Number.isFinite(hours) ||
hours < 0 ||
hours > 24
) {

alert("Please enter a valid sleep duration between 0 and 24 hours.");

return;

}

}

savedRecoveryDetails = details;

clearReport();

alert("Recovery details saved successfully!");

console.log("Recovery details saved in temporary memory.");

});

}

// ==========================================
// 8. GENERATE RECOVERY REPORT
// ==========================================

if (generateButton && output) {

generateButton.addEventListener("click", function () {

clearReport();

if (!savedRecoveryDetails) {

addParagraph(
"Please save your recovery details before generating a guide."
);

if (recoveryResults) {
recoveryResults.hidden = false;
}

return;

}

const details = savedRecoveryDetails;

const sport = sportRecovery[details.combatSport];

if (!sport) {

addParagraph(
"Please select a supported combat sport and save your details again."
);

if (recoveryResults) {
recoveryResults.hidden = false;
}

return;

}

// ==========================================
// FIGHTER PROFILE
// ==========================================

addHeading("FIGHTER RECOVERY PROFILE");

addParagraph("Training level: " + details.level);

addParagraph("Combat sport: " + details.combatSport);

addParagraph("Recovery goals: " + details.designatedGoals);

// ==========================================
// SPORT-SPECIFIC RECOVERY
// ==========================================

addHeading("SPORT-SPECIFIC RECOVERY FOCUS");

addList(sport.focus);

addHeading("SPORT-SPECIFIC CONSIDERATIONS");

addList(sport.considerations);

// ==========================================
// TRAINING LEVEL
// ==========================================

addHeading("TRAINING LEVEL GUIDANCE");

addParagraph(getLevelGuidance(details.level));

// ==========================================
// PHYSICAL CONDITION
// ==========================================

addHeading("RECORDED PHYSICAL CONDITION");

addParagraph(
details.physicalCondition ||
"No physical condition information provided."
);

// ==========================================
// INJURY CONSIDERATIONS
// ==========================================

addHeading("INJURY AND PHYSICAL LIMITATION CONSIDERATIONS");

if (details.existingInjuries) {

addParagraph(
"Recorded information: " + details.existingInjuries
);

addParagraph(
"Do not use this report to diagnose or treat an injury. Arrange assessment with a qualified healthcare professional before returning to demanding training when an injury or limitation may affect safe participation."
);

} else {

addParagraph(
"No injuries or physical limitations were recorded. Continue to monitor your body and seek assessment if symptoms develop."
);

}

// ==========================================
// SLEEP AND REST
// ==========================================

addHeading("SLEEP AND REST");

if (details.sleepHours !== "") {

const hours = Number(details.sleepHours);

addParagraph(
"Recorded sleep: " + hours + " hours per night."
);

if (hours < 7) {

addParagraph(
"Your recorded sleep is below the usual 7–9 hour adult recommendation. Consider improving sleep consistency and allowing more time for rest."
);

} else if (hours <= 9) {

addParagraph(
"Your recorded sleep falls within the usual 7–9 hour adult recommendation. Consistency and sleep quality also matter."
);

} else {

addParagraph(
"Your recorded sleep exceeds 9 hours. Sleep needs vary, and additional sleep can be appropriate during demanding training periods. Consider how rested you feel."
);

}

} else {

addParagraph(
"Sleep information was not provided. Consider tracking sleep duration and consistency."
);

}

// ==========================================
// FATIGUE MONITORING
// ==========================================

addHeading("FATIGUE MONITORING");

if (details.fatigueLevel === "Low") {

addParagraph(
"You recorded low fatigue. Continue monitoring your response to training and maintain adequate recovery."
);

} else if (details.fatigueLevel === "Moderate") {

addParagraph(
"You recorded moderate fatigue. Review your training load, rest periods and sleep routine. Consider reducing intensity if recovery is insufficient."
);

} else if (details.fatigueLevel === "High") {

addParagraph(
"You recorded high fatigue. Avoid pushing through significant exhaustion. Reduce demanding activity and consider professional assessment, especially if fatigue is persistent, unusual or worsening."
);

} else {

addParagraph(
"No fatigue level was selected. Monitor energy, sleep and training tolerance regularly."
);

}

// ==========================================
// GOAL-BASED RECOMMENDATIONS
// ==========================================

addHeading("GOAL-BASED RECOVERY RECOMMENDATIONS");

addList(
analyseRecoveryGoals(details.designatedGoals)
);

// ==========================================
// TRAINING AND RECOVERY SCHEDULE
// ==========================================

addHeading("TRAINING AND RECOVERY SCHEDULE");

if (details.schedule) {

addParagraph(
"Recorded schedule: " + details.schedule
);

} else {

addParagraph(
"Plan recovery periods around demanding sessions. Avoid scheduling intense training every day without appropriate rest."
);

}

// ==========================================
// GENERAL RECOVERY PRINCIPLES
// ==========================================

addHeading("GENERAL RECOVERY PRINCIPLES");

addList([

"Maintain a consistent sleep routine.",

"Allow suitable rest between demanding training sessions.",

"Maintain adequate food and fluid intake.",

"Use comfortable low-intensity movement when appropriate.",

"Monitor persistent pain, unusual fatigue and changes in performance.",

"Seek qualified medical advice for injuries, persistent symptoms or concerns about returning to training."

]);

// ==========================================
// HEALTH AND SAFETY
// ==========================================

addHeading("IMPORTANT HEALTH AND SAFETY NOTICE");

addParagraph(
"Possible concussion, head injury, chest pain, fainting, severe breathing difficulty, new weakness or numbness, or other serious symptoms require prompt medical assessment. Do not use this guide to decide whether it is safe to continue training."
);

addParagraph(
"This is a preliminary educational recovery guide, not a medical diagnosis, rehabilitation prescription or substitute for professional healthcare."
);

// ==========================================
// REPORT INFORMATION
// ==========================================

addHeading("REPORT INFORMATION");

addParagraph(
"Last saved: " + details.lastUpdated
);

addParagraph(
"Report generated: " + new Date().toLocaleString()
);

if (recoveryResults) {
recoveryResults.hidden = false;
}

console.log("Recovery guide generated successfully.");

});

}

// ==========================================
// 9. INITIALISE RECOVERY MODULE
// ==========================================

if (recoveryForm) {
recoveryForm.reset();
}

clearReport();

console.log("Recovery Engine Initialised Successfully!");

});
