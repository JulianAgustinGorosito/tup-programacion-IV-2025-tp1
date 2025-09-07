import express  from "express";

const app = express();
const port = 3000;

app.use(express.json());

let alumnos = [];

app.get("/alumnos", function(req, res){
    res.json({ sucess: true, data: alumnos})
});

app.get("/alumnos/:nombre", function (req, res) {
  const nombre = req.params.nombre;

  const encontrados = alumnos.filter(function (a) {
    return a.nombre === nombre;
  });

  if (encontrados.length === 0) {
    return res.status(404).json({ success: false, error: "alumno no encontrado" });
  }

  const alumno = encontrados[0];
  const prom = (alumno.notas[0] + alumno.notas[1] + alumno.notas[2]) / 3;

  let condicion = "aprobado";
  if (prom < 6) condicion = "reprobado";
  if (prom >= 8) condicion = "promocionado";

  res.json({
    success: true,
    data: {
      nombre: alumno.nombre,
      notas: alumno.notas,
      promedio: prom,
      condicion: condicion
    }
  });
});

app.post("/alumnos", function (req, res) {
  const nombre = req.body.nombre;
  const notas = req.body.notas;

  if (!nombre || !notas || notas.length !== 3) {
    return res.status(400).json({ success: false, error: "datos invlidos" });
  }

  const duplicado = alumnos.filter(function (a) {
    return a.nombre === nombre;
  });

  if (duplicado.length > 0) {
    return res
      .status(409)
      .json({ success: false, error: "ya existe un alumno con ese nombre" });
  }

  const nuevo = { nombre: nombre, notas: notas };
  alumnos.push(nuevo);

  res.status(201).json({ success: true, data: nuevo });
});

app.put("/alumnos/:nombre", function (req, res) {
  const nombre = req.params.nombre;

  const encontrados = alumnos.filter(function (a) {
    return a.nombre === nombre;
  });

  if (encontrados.length === 0) {
    return res.status(404).json({ success: false, error: "alumno no encontrado" });
  }

  const alumno = encontrados[0];

  if (req.body.nombre) {
    alumno.nombre = req.body.nombre;
  }
  if (req.body.notas && req.body.notas.length === 3) {
    alumno.notas = req.body.notas;
  }

  res.json({ success: true, data: alumno });
});

app.delete("/alumnos/:nombre", function (req, res) {
  const nombre = req.params.nombre;

  const restantes = alumnos.filter(function (a) {
    return a.nombre !== nombre;
  });

  if (restantes.length === alumnos.length) {
    return res.status(404).json({ success: false, error: "alumno no encontrado" });
  }

  alumnos = restantes;
  res.json({ success: true, msg: "alumno eliminado" });
});

app.listen(port, function () {
  console.log(`La aplicación está funcionando en ${port}`);
});