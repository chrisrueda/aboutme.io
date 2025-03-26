const projects = [
    {
        title: "Project One",
        description: "This is a description of Project One.",
    },
    {
        title: "Project Two",
        description: "This is a description of Project Two.",
    },
    {
        title: "Project Three",
        description: "This is a description of Project Three.",
    },
];

const publications = [
    {
        title: "Publication One",
        description: "This is a description of Publication One.",
    },
    {
        title: "Publication Two",
        description: "This is a description of Publication Two.",
    },
];

function displayProjects() {
    const projectList = document.getElementById("project-list");
    projects.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        projectList.appendChild(projectItem);
    });
}

function displayPublications() {
    const publicationList = document.getElementById("publication-list");
    publications.forEach(publication => {
        const publicationItem = document.createElement("div");
        publicationItem.innerHTML = `<h3>${publication.title}</h3><p>${publication.description}</p>`;
        publicationList.appendChild(publicationItem);
    });
}

displayProjects();
displayPublications();