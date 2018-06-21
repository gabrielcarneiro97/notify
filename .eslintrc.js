module.exports = {
  "env": {
    "browser": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "jsx-a11y"
  ],
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      "specialLink": ["hrefLeft", "hrefRight"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }]
  },
};
