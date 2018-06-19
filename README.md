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
