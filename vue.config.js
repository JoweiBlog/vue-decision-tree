module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-decision-tree" : "/",
  css: {
    extract: false
  }
};
