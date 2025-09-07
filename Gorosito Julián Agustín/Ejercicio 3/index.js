const express = require("express");
const app = express();
app.use(express.json());

let tareas = [];

app.get("/tareas", (req, res) => {
  const { completada } = req.query;

  if (completada === "true") {
    return res.json(tareas.filter(t => t.completada));
  }

  if (completada === "false") {
    return res.json(tareas.filter(t => !t.completada));
  }

  res.json(tareas);
});

app.post("/tareas", (req, res) => {
  const { nombre, completada } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "la tarea necesita un nombre" });
  }

  const repetida = tareas.find(
    t => t.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (repetida) {
    return res.status(400).json({ error: "ya existe una tarea con ese nombre" });
  }

  const tarea = {
    nombre,
    completada: completada || false
  };

  tareas.push(tarea);

  res.status(201).json(tarea);
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`aplicación funcionando en http://localhost:${puerto}`);
});
