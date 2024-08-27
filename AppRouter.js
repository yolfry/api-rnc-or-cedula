import { Router } from "express";
import fetch from "node-fetch"; // Importa la librería de fetch para hacer solicitudes HTTP
import { checkRNC } from "./CheckRNC.js";
import { cleanData } from "./helper.js";
import cors from "cors";

const AppRouter = Router();

AppRouter.get("/", cors(), (req, res, next) => {
  return res.status(403).json({ error: "You cannot belong here" });
});

AppRouter.get("/api/checkRNC/:rnc", async (req, res, next) => {
  const rnc = req.params.rnc;

  await checkRNC(rnc)
    .then((response) => {
      const splitInformation = response.split("\n");

      return res.status(200).json({
        rnc: cleanData(splitInformation[0]).split("-").join(""),
        socialName: cleanData(splitInformation[1]),
        comercialName: cleanData(splitInformation[2]),
        status: cleanData(splitInformation[5]),
      });
    })
    .catch(() => {
      return res.status(404).json({ error: "This RNC doesnt exist" });
    });
});

AppRouter.get("/api/checkCedula/:cedula", async (req, res, next) => {
  const cedula = req.params.cedula;

  try {
    const response = await fetch(
      `https://api.digital.gob.do/v3/cedulas/${cedula}/validate`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while validating the cedula" });
  }
});

export default AppRouter;
