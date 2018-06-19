# widget

Embeds an upcoming events widget on the current page using the following JavaScript snippet:

```javascript
+function (c, h, q) {
  (q = document.createElement("script")).type = "text/javascript";
  q.src = "//assets.culturehq.com/widget.js";
  q.onload = function () { CHQ(c, h) };
  document.getElementsByTagName("head")[0].appendChild(q);
}("#main", "token")
```

## Getting started

Ensure you have `node` and `yarn` installed. Run `yarn install` in the root of the repository to get the dependencies. Edit [`example/index.html`](example/index.html) and [`src/config.js`](src/config.js) as appropriate to get it to point to your local API using a valid bot token. Then, run `yarn start` to start the local server. You can view the widget at `http://localhost:8080`.
