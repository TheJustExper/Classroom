const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000;

app.use(cors())

const projects = [{
    title: "Full Stack Application",
    link: "full-stack-application",
    description: "123",
    date: "06/07/2021",
    technologies: ["react"],
}];

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/projects", (req, res) => {
    res.json(projects);
});

app.get("/project/:id", (req, res) => {
    const project = projects.find(p => p.link == req.params.id);

    if (project) {
        res.json(project);
    } else {
        res.json({ error: 404 });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})