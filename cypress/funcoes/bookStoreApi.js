const BASE_URL = 'https://demoqa.com';

class login {
    email(){
      return cy.get('input[type="email"]')
     }
    senha(){
     return cy.get('input[type="password"]')
      }
     entrar(){
      return cy.get('btn').contains('Entrar')
      }
   }
  
  export default login