module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // pnpm test
        modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
        loose: true,
        targets: {
          browsers: "defaults",
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"],
}
