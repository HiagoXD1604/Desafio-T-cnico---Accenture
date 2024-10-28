const { exec } = require('child_process');

// Inicia o servidor Selenium
const seleniumServer = exec('node cypress/testes_Selenium/server.js'); // Use o caminho relativo correto

// Aguarde o servidor iniciar
seleniumServer.stdout.on('data', (data) => {
    console.log(data);
    if (data.includes('Selenium server running at')) {
        console.log('Selenium server is up and running. Starting the test...');

        // Execute o teste Selenium aqui
        exec('curl -X POST http://localhost:3001/run-test', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing test: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
            console.log(`Test result: ${stdout}`);
        });
    }
});

// Se o servidor falhar, registre um erro
seleniumServer.stderr.on('data', (data) => {
    console.error(`Selenium server error: ${data}`);
});

// Encerra o servidor ao finalizar o teste
process.on('exit', () => {
    seleniumServer.kill();
});
