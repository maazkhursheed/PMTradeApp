const TICKET_TYPES = ["bug", "feat", "review", "auto", "task", "refactor", "support", "bump", "other"];
module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "plugin/scope": ({ scope }) => {
          const isValid = scope && scope.match(/\d{2}\.\d{1,2}\.\d+/);
          return [isValid, "Provide version number in format xx.xx.x"];
        },
        "plugin/subject": ({ subject, type }) => {
          const ticketType = ["bug", "feat", "auto", "task", "support"].some(value => value === type);
          const isValid = ticketType ? subject && subject.match(/ENTS-\d{4}/) : true;
          return [isValid, "Provide ticket number"];
        },
      },
    },
  ],
  rules: {
    "type-enum": [2, "always", TICKET_TYPES],
    "body-max-line-length": [0],
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"],
    "plugin/scope": [2, "always"],
    "subject-empty": [2, "never"],
    "subject-case": [0, "never"],
    "plugin/subject": [2, "always"],
    "body-empty": [1, "never"],
  },
};
