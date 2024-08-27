import puppeteer from "puppeteer";

export const checkRNC = async (rnc) => {
  const url =
    "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx";

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    );

    await page.goto(url);

    await page.evaluate(function (rnc) {
      document
        .getElementById("cphMain_txtRNCCedula")
        .setAttribute("value", rnc);
      document.getElementById("cphMain_btnBuscarPorRNC").click();
    }, rnc);

    const res = await page
      .waitForSelector("tbody", { timeout: 7000 })
      .then(async (e) => await e.getProperty("innerText"));

    await browser.close();

    return res.jsonValue();
  } catch (error) {
    console.log(error);
  }
};
