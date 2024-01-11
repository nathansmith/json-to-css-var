# JSON to CSS var

This mini project converts JSON objects into namespaced CSS variables.

**BEFORE:**

```json
{
  "base": {
    "font": {
      "family": [
        "Segoe UI",
        "system-ui",
        "sans-serif"
      ],
      "size": "16px"
    },
    "line-height": 1.5
  },
  "theme": {
    "light": {
      "background": "#fff",
      "text": "#000"
    },
    "dark": {
      "background": "#333",
      "text": "#ccc"
    },
    "contrast": {
      "background": "ButtonFace",
      "text": "ButtonText"
    }
  }
}
```

**AFTER:**

```css
:root {
  --base-font-family: 'Segoe UI', system-ui, sans-serif;
  --base-font-size: 16px;
  --base-line-height: 1.5;
  --theme-light-background: #fff;
  --theme-light-text: #333;
  --theme-dark-background: #333;
  --theme-dark-text: #ccc;
  --theme-contrast-background: ButtonFace;
  --theme-contrast-text: ButtonText;
}
```
