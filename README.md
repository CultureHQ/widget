# widget

[![Build Status](https://travis-ci.com/CultureHQ/widget.svg?token=kQUiABmGkzyHdJdMnCnv&branch=master)](https://travis-ci.com/CultureHQ/widget)

Embeds an upcoming events widget on the current page through a combination of:

```html
<div id="chq" />
```

and the following JavaScript snippet:

```javascript
<script>
  +function (c, h, q) {
    (q = document.createElement("script")).type = "text/javascript";
    q.src = "https://assets.culturehq.com/widget.js";
    q.onload = function () { CHQ(c, h) };
    document.getElementsByTagName("head")[0].appendChild(q);
  }("#chq" /* your selector */, "token" /* your API token */)
</script>
```

## Getting started

Ensure you have `node` and `yarn` installed. Run `yarn install` in the root of the repository to get the dependencies. Edit [`example/index.html`](example/index.html) and [`src/config.js`](src/config.js) as appropriate to get it to point to your local API using a valid bot token. Then, run `yarn start` to start the local server. You can view the widget at `http://localhost:8081`.

## Content Security Policy

Note that in order for this to be embedded on a page, the following additions to the hosting webpage's CSP will need to be made:

```
style-src 'unsafe-inline';
script-src 'unsafe-inline' https://assets.culturehq.com;
connect-src https://api.culturehq.com;
img-src https://uploads.culturehq.com;
```
