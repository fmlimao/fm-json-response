# fm-json-response

Um modulo para retornar um JSON em sua aplicação.

## Instalação

```bash
npm i fm-json-response --save
```

## Como usar

```javascript

const FmJsonResponse = require('./index');


// Inicio a classe dentro de uma variável.
const JsonResponse = new FmJsonResponse;


// O método "generate" retorna o JSON formatado.
console.log(JsonResponse.generate());
/*
{
  code: 200,
  error: false,
  messages: []
}
*/


// Podemos adicionar campos de formulário, para retornar ao usuário possíveis erros validação.
JsonResponse.addFields(['name', 'email', 'password']);
console.log(JsonResponse.generate());
/*
{
  code: 200,
  error: false,
  messages: [],
  form: {
    name: { error: false, messages: [] },
    email: { error: false, messages: [] },
    password: { error: false, messages: [] }
  }
}
*/


// Simulando um erro na validação do e-mail.
if (true) {
    JsonResponse.setFieldError('email', true, 'E-mail inválido.');
}

console.log(JsonResponse.generate());
/*
{
  code: 200,
  error: false,
  messages: [],
  form: {
    name: { error: false, messages: [] },
    email: { error: true, messages: [ 'E-mail inválido.' ] },
    password: { error: false, messages: [] }
  }
}
*/


// Podemos passar outras variávels em nosso retorno, como o objeto do usuário que alguém esteja tentando recuperar.
JsonResponse.addContent('users', [
    {
        id: 432165,
        name: 'Leandro Macedo',
    },
]);
console.log(JsonResponse.generate());
/*
{
  code: 200,
  error: false,
  messages: [],
  content: {
    users: [
      {
          id: 432165,
          name: 'Leandro Macedo'
      }
    ]
  }
}
*/


// E por final, alterar as variáveis de erro e de código:
JsonResponse.setError(true);
JsonResponse.setCode(400);

// Podemos passar uma mensagem neste mesmos métodos.
JsonResponse.setError(true, 'Mensagem opcional.');
JsonResponse.setCode(400, 'Outra mensagem opcional.');

console.log(JsonResponse.generate());
/*
{
  code: 400,
  error: true,
  messages: [ 'Mensagem opcional.', 'Outra mensagem opcional.' ]
}
*/

```
