let profile;
let skills;

$.getJSON("profile.json", function (json) {
    profile = json;
    init();
    displayInfo(profile.workExperience, workTemplate, "workInfo");
    displayInfo(profile.education, educationTemplate, "educationInfo");
    displayInfo(profile.projects, projectTemplate, "projectInfo");
    displayInfo(profile.awards, awardTemplate, "awardInfo");
});

$.getJSON("skills.json", function (json) {
    skills = json;
    displaySkillsGraph();
});

function init() {
    $("#titleName").text(profile.name);
    $("#aboutMeName").text(profile.name);
    $("#aboutMeDescription").text(profile.aboutMe);
}

/* Mustache Templates */
const workTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">{{position}}</h5>" +
    "<h6 class=\"float-right card-subtitle mb-2 text-muted\">{{datesEmpoyed}}</h6>" +
    "<h6 class=\"card-subtitle mb-2 text-muted\">{{company}}, {{location}}</h6>" +
    "<p class=\"card-text\">" +
    "<ul>" +
    "{{#jobDuties}}" +
    "<li>{{.}}</li>" +
    "{{/jobDuties}}" +
    "</ul>" +
    "</p>" +
    "</div></div>";

const educationTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">{{degree}}</h5>" +
    "<h6 class=\"float-right card-subtitle mb-2 text-muted\">{{timePeriod}}</h6>" +
    "<h6 class=\"card-subtitle mb-2 text-muted\">{{institution}}, {{location}}</h6>" +
    "<p>USA : {{usGpa}} | Germany : {{germanGpa}}</p>" +
    "</div></div>";

const projectTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">{{name}}</h5>" +
    "<h6 class=\"float-right card-subtitle mb-2 text-muted\"></h6>" +
    "<h6 class=\"card-subtitle mb-2 text-muted\"></h6>" +
    "<p>{{description}}</p>" +
    "<a href={{url}} target=\"_blank\" class=\"btn btn-primary margin5\">Open App</a>" +
    "<a href={{githubUrl}} target=\"_blank\" class=\"btn btn-warning margin5\">View on GitHub</a>" +
    "</div></div>";

const awardTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">{{name}}</h5>" +
    "<h6 class=\"float-right card-subtitle mb-2 text-muted\">{{date}}</h6>" +
    "<h6 class=\"card-subtitle mb-2 text-muted\">{{description}}</h6>" +
    "<p></p>" +
    "</div></div>";

/* Mustache Templates */

function displayInfo(dataArray, templateName, tagName) {
    dataArray.forEach(data => {
        let renderedHtml = Mustache.render(templateName, data);
        $("#" + tagName).append(renderedHtml);
    });
}

function displaySkillsGraph() {
    zingchart.MODULESDIR = 'https://cdn.zingchart.com/modules/';
    zingchart.render({
        id: 'skillChart',
        data: skills,
        height: 400,
        width: '100%'
    });
}

