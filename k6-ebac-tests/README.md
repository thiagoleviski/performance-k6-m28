# First Steps - Configuração


### `npm init`

Instalar todos os packages necessários:

### `copia e cola todas as linhas abaixo no terminal`
npm install --save-dev \
webpack \
webpack-cli \
k6 \
babel-loader@8.0.4 \
@babel/core \
@babel/preset-env \
core-js

### `instalar a biblioteca dot env`
npm install dotenv

### `criar um arquivo webpack.config.js`

Copia e cola esta configuração dentro do arquivo webpack.config.js (Importante lembrar que a configuração abaixo foi modificada especificamente para este projeto):

require('dotenv').config()                      /// config adicionada para este projeto
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV ,                  /// variável buscanda dentro do arquivo .env
  entry: {
    user: './simulations/user.test.js'          /// modificado para este projeto
  },
  output: {
    path: path.resolve(__dirname, 'dist'),      // eslint-disable-line
    libraryTarget: 'commonjs',
    filename: '[name].test.js',                 /// arquivo modificado de .bundle.js para .test.js
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};

### `modificar o script do arquivo package.json`
A estrutura do parâmetro "script" deve ser como o exemplo abaixo, pois executando `npm test` ele executa o pretest e em seguida o test:

  "scripts": {
    "pretest": "webpack",
    "test": "k6 run simulations/user.test.js"
  }

  ### `configuração do babel para poder usar variáveis com # `
  Criar um arquivo na raíz chamado .babelrc e colar a configuração abaixo dentro do arquivo:

  {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns":"usage",
                "corejs":3
            }
        ]
    ]
}