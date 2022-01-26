const path = require("path");
const myLoader = require("./myLoader");
const webpack = require("webpack");
const childProcess = require("child_process");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve("./src/app.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     use: [
      //         path.resolve('./myLoader.js')
      //     ]
      // }
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Base64 포맷으로 이미지 불러오기
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 20kb
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      // banner: '이것은 배너입니다!!'
      banner: `
            commit version : ${childProcess.execSync(
              "git rev-parse --short HEAD"
            )}
            committer : ${childProcess.execSync("git config user.name")}
            last build : ${new Date().toLocaleDateString()}
            `,
    }),
  ],
};
