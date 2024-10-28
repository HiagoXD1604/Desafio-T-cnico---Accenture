const express = require('express');
const { Builder, By, until } = require('selenium-webdriver');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/run-test', async (req, res) => {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    console.log('Browser launched');

    await driver.get('https://demoqa.com/browser-windows');
    console.log('Navigated to demo page');

    // Espera até que o botão esteja clicável
    const button = await driver.wait(until.elementLocated(By.css('#windowButton')), 10000);
    await driver.wait(until.elementIsVisible(button), 10000);
    await driver.wait(until.elementIsEnabled(button), 10000);
    
    // Role até o botão usando JavaScript
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);

    // Aguarde um breve intervalo para garantir que o scroll terminou
    await driver.sleep(500);
    
    await button.click();
    console.log('Clicked on the window button');

    // Trocar para a nova janela
    const windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]);
    console.log('Switched to new window');

    // Verifique a mensagem na nova janela
    const message = await driver.findElement(By.tagName('body')).getText();
    console.log('Message in new window:', message);

    // Feche a nova janela
    await driver.close();
    console.log('Closed new window');

    // Voltar para a janela original
    await driver.switchTo().window(windows[0]);
    console.log('Switched back to original window');

    res.send({ message });
  } catch (error) {
    console.error('Error running Selenium test:', error);
    res.status(500).send('Error running Selenium test');
  } finally {
    if (driver) {
      await driver.quit();
      console.log('Browser closed');
    }
  }
});

app.listen(port, () => {
  console.log(`Selenium server running at http://localhost:${port}`);
});
