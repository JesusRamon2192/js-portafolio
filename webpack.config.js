const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "main.js"
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\m?.js$/,
        //expresion regular
        //cual es elemento que vamos a tenr
        //Nosotros podemos usar el use con un objeto o un arreglo segun la configuracion 
        // del plugin
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, 
        'css-loader',
        'stylus-loader'
      ],
      }
    ]
  },
  //Seccion de plugins
  plugins: [
    //hacemos una instancia de lo que definimos en el inicio del archivo
      // le anadimos por parametro un objeto donde vamos a tener las 
        //configuraciones que le vamos anadir a nuestro plugin
    new HtmlWebpackPlugin({ 
      //Configuracion del plugin
      inject: true,
      //Inyecta el Bundle al template HTML
      template: './public/index.html',
      //La ruta al template HTML
      filename:'./index.html'
      //Nombre al final del archivo
    }),
    new MiniCssExtractPlugin(),
  ]
}