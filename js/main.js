let profile;
let skills;

$.getJSON("resources/data/profile.json", function (json) {
    profile = json;
    init();
    displayInfo(profile.workExperience, workTemplate, "workInfo");
    displayInfo(profile.education, educationTemplate, "educationInfo");
    displayInfo(profile.projects, projectTemplate, "projectInfo");
    displayInfo(profile.awards, awardTemplate, "awardInfo");
    displayInfo(profile.skills, skillTemplate, "skillInfo");
});

$.getJSON("resources/data/skills.json", function (json) {
    skills = json;
    //displaySkillsGraph();
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
    "<a href={{url}} target=\"_blank\" class=\"float-right btn btn-primary btn-sm margin5\">Open App</a>" +
    "<a href={{githubUrl}} target=\"_blank\" class=\"float-right btn btn-warning btn-sm margin5\">View on GitHub</a>" +
    "<span>{{description}}</span>" +
    "</div></div>";

const awardTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">{{name}}</h5>" +
    "<h6 class=\"float-right card-subtitle mb-2 text-muted\">{{date}}</h6>" +
    "<h6 class=\"card-subtitle mb-2 text-muted\">{{description}}</h6>" +
    "<p></p>" +
    "</div></div>";

const skillTemplate = "<div class=\"card w-100\">" +
    "<div class=\"card-body\">" +
    "<h4 class=\"card-title\">{{type}}</h4>" +
    "{{#list}}" +
    "<span class=\"badge badge-primary badge-pill skillBadge\">{{.}}</span>" +
    "{{/list}}" +
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

