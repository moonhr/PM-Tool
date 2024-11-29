//* electron forge 설정파일. 빌드 및 패키징에 관한 설정을 정의
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: {
          module: {
            rules: [
              {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
              },
            ],
          },
          entry: "./src/main/main.ts",
          resolve: {
            extensions: [".ts", ".js"], // Include TypeScript and JavaScript
          },
          output: {
            filename: "[name].js", // Output filename (e.g., main.js)
          },
        },
        renderer: {
          config: {
            module: {
              rules: [
                {
                  test: /\.(ts|tsx)$/,
                  use: [
                    {
                      loader: "babel-loader",
                      options: {
                        presets: [
                          ["@babel/preset-react", { runtime: "automatic" }], // 자동 JSX 변환 활성화
                          "@babel/preset-env",
                          "@babel/preset-typescript",
                        ],
                      },
                    },
                  ],
                  exclude: /node_modules/,
                },
                {
                  test: /\.css$/,
                  use: ["style-loader", "css-loader"],
                },
              ],
            },
            resolve: {
              extensions: [".ts", ".tsx", ".js", ".jsx"],
            },
          },
          entryPoints: [
            {
              name: "main_window",
              html: "./src/public/index.html",
              js: "./src/renderer/renderer.tsx",
              preload: {
                js: "./src/main/preload.ts",
              },
            },
          ],
        },
      },
    },
  ],
};
