# Habrahabr timer with anti procrastination features

Ever wonder how much time you spend on [habr.com](https://habr.com/)? Don't worry, this project got you covered. Requires special extension for the Chrome browser.

# Installing

Install CJS extension for Chrome: [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to control. Click on the link "your own external scripts", add [this url](https://cdn.jsdelivr.net/gh/oleg-prikhodko/34_timemachine@v0.3/index.js). Don`t forget to press "enable cjs for this host" to enable custom JS.

Extension will inject 3 minute timer to the top-left corner of your browser window. After timer runs out - alerts containing motivational messages will popup every 30 seconds.

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
