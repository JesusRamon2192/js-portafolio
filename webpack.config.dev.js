const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    assetModuleFilename: 'assets/images/[hash][ext][query]'
    //Esta instrucción hace que webpack le agregue un hash ( un hash es una serie de caracteres aleatorios) y su extencion por medio de esas variables en el string
  },
  mode: 'development',
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
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
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
            // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: "application/font-woff",
            // Especifica el tipo MIME con el que se alineará el archivo. 
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
            // ubuntu-regularhola.woff
            outputPath: "./assets/fonts/",
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: "./assets/fonts/",
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
            esModule: false,
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
          },
        }
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
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],
}