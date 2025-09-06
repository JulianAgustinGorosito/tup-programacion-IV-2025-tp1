import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let calculos = [];
let nextId = 1;

app.get("/calculos", function (req, res) {
  let salida = calculos.map(function (c) {
    return {
      id: c.id,
      base: c.base,
      altura: c.altura,
      magnitud: c.magnitud,
      resultado: c.resultado,
      tipo: c.base === c.altura ? "cuadrado" : "rectangulo"
    };
  });

  const tipo = req.query.tipo;
  if (tipo) {
    salida = salida.filter(function (c) {
      return c.tipo === tipo;
    });
  }

  res.json({ success: true, data: salida });
});

app.post("/rectangulos/perimetros", function (req, res) {
  const base = parseInt(req.body.base);
  const altura = parseInt(req.body.altura);

  const perimetro = 2 * (base + altura);

  const calculo = {
    id: nextId++,
    base: base,
    altura: altura,
    magnitud: "perimetro",
    resultado: perimetro
  };

  calculos.push(calculo);

  res.status(201).json({
    success: true,
    data: {
      id: calculo.id,
      base: calculo.base,
      altura: calculo.altura,
      magnitud: calculo.magnitud,
      resultado: calculo.resultado,
      tipo: base === altura ? "cuadrado" : "rectangulo"
    }
  });
});

app.post("/rectangulos/superficies", function (req, res) {
  const base = parseInt(req.body.base);
  const altura = parseInt(req.body.altura);

  const superficie = base * altura;

  const calculo = {
    id: nextId++,
    base: base,
    altura: altura,
    magnitud: "superficie",
    resultado: superficie
  };

  calculos.push(calculo);

  res.status(201).json({
    success: true,
    data: {
      id: calculo.id,
      base: calculo.base,
      altura: calculo.altura,
      magnitud: calculo.magnitud,
      resultado: calculo.resultado,
      tipo: base === altura ? "cuadrado" : "rectangulo"
    }
  });
});

app.listen(port, function () {
  console.log(`La aplicación esta funcionando en ${port}`);
});
