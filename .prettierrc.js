module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: "all",
  endOfLine: "lf",
  importOrder: ["^@app/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "tsx", "jsx", "decorators-legacy"]
};
