/* eslint eslint-plugin/require-meta-schema: error */

module.exports = {
  meta: {},
  create(context) {
    /* ... */
  },
};

module.exports = {
  meta: {schema: null},
  create(context) {
    /* ... */
  },
};

module.exports = {
  meta: {schema: []},
  create(context) {
    const options = context.options; /* using options when schema is empty */
  },
};
