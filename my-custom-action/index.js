const fs = require("fs").promises;

async function main() {
  // Obtener el resultado desde las variables de entorno
  const outcome = process.env.INPUT_RESULT || "failure"; // Default en caso de error
  console.log(`Resultado recibido: ${outcome}`);

  // Seleccionar el badge correspondiente
  let badge;
  if (outcome === "success") {
    badge = "![Tested with Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)";
  } else {
    badge = "![Test Failure](https://img.shields.io/badge/test-failure-red)";
  }
  console.log(`Badge seleccionado: ${badge}`);

  // Ruta del archivo README.md
  const readmePath = "./README.md";

  try {
    // Leer contenido del README.md
    let readmeContent = await fs.readFile(readmePath, "utf-8");

    // Buscar el marcador donde agregar el badge
    const badgeMarker = "RESULTAT DELS ÚLTIMS TESTS";
    const badgeRegex = new RegExp(`(${badgeMarker})(.*)`, "s");

    // Actualizar el contenido con el badge
    if (badgeRegex.test(readmeContent)) {
      readmeContent = readmeContent.replace(
        badgeRegex,
        `$1\n${badge}`
      );
    } else {
      readmeContent += `\n\n${badgeMarker}\n${badge}`;
    }

    // Escribir el contenido actualizado
    await fs.writeFile(readmePath, readmeContent, "utf-8");
    console.log("Badge agregado correctamente al README.md");
  } catch (error) {
    console.error("Error actualizando README.md:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error en la función principal:", error);
  process.exit(1);
});
