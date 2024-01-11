// ===============
// Closure: START.
// ===============

(() => {
  // ==========
  // Constants.
  // ==========

  const BLUR = 'blur';
  const CLICK = 'click';
  const FOCUS = 'focus';
  const INPUT = 'input';
  const OBJECT = 'object';

  const BUTTON_SUBMIT = 'BUTTON_SUBMIT';
  const TEXTAREA_CSS = 'TEXTAREA_CSS';
  const TEXTAREA_JSON = 'TEXTAREA_JSON';

  const EXAMPLE_JSON = {
    base: {
      font: {
        family: ['Segoe UI', 'system-ui', 'sans-serif'],
        size: '16px',
      },
      lineHeight: 1.5,
    },
    theme: {
      light: {
        background: '#fff',
        text: '#333',
      },
      dark: {
        background: '#333',
        text: '#ccc',
      },
      contrast: {
        background: 'ButtonFace',
        text: 'ButtonText',
      },
    },
  };

  const exampleJson = JSON.stringify(EXAMPLE_JSON, null, 2);

  // =============
  // Get elements.
  // =============

  const buttonSubmit = document.getElementById(BUTTON_SUBMIT);
  const textareaCss = document.getElementById(TEXTAREA_CSS);
  const textareaJson = document.getElementById(TEXTAREA_JSON);

  // ============
  // Event: blur.
  // ============

  const handleBlur = (event) => {
    // Get value.
    const value = String(event?.target?.value || '').trim();

    // Target exists: YES.
    if (event?.target) {
      try {
        // Get JSON.
        let json = JSON.parse(value);
        json = JSON.stringify(json, null, 2);

        // Update.
        event.target.value = json;
      } catch (error) {
        // Update.
        event.target.value = value;
      }
    }
  };

  // =============
  // Event: click.
  // =============

  const handleClick = () => {
    // Get text.
    const text = textareaJson.value.trim();

    // Text exists: NO.
    if (!text) {
      // Update.
      textareaCss.textContent = '';

      // Early exit.
      return;
    }

    try {
      // Get JSON.
      const json = JSON.parse(text);

      // Inner CSS.
      const cssInner = jsonToCssVar(json).replaceAll('--', '  --');

      // Outer CSS.
      const cssOuter = `:root {\n${cssInner}}`;

      // Update.
      textareaCss.textContent = cssOuter;
    } catch (_error) {
      // Update.
      textareaCss.textContent = '⚠️ Sorry, JSON is invalid.';
    }
  };

  // =============
  // Event: focus.
  // =============

  const handleFocus = (event) => {
    // Select text.
    event?.target?.select?.();
  };

  // =============
  // Event: input.
  // =============

  const handleInput = (event) => {
    // Get value.
    const value = String(event?.target?.value || '').trim();

    try {
      window.sessionStorage.setItem(TEXTAREA_JSON, value);
    } catch (error) {
      // No-op.
    }
  };

  // ==================
  // Helper: is object.
  // ==================

  const isObject = (obj) => {
    // Expose boolean.
    return !!(obj && typeof obj === OBJECT && !Array.isArray(obj));
  };

  // ========================
  // Helper: JSON to CSS var.
  // ========================

  const jsonToCssVar = (json = {}, prefix = '-') => {
    // Loop through.
    const cssVar = Object.entries(json).reduce((oldStr, [key, value]) => {
      // Build string.
      let newStr = `${prefix}-${parseKey(key)}`;

      // Is object: YES.
      if (isObject(value)) {
        // Recursion.
        newStr = oldStr + jsonToCssVar(value, newStr);

        // Is array: YES.
      } else if (Array.isArray(value)) {
        // Expose string.
        newStr = `${oldStr}${newStr}: ${value.map(parseValue).join(', ')};\n`;

        // Fallback.
      } else {
        // Expose string.
        newStr = `${oldStr}${newStr}: ${parseValue(value)};\n`;
      }

      // Expose string.
      return newStr;

      // Blank accumulator.
    }, '');

    // Expose string.
    return cssVar;
  };

  // ==================
  // Helper: parse key.
  // ==================

  const parseKey = (key = '') => {
    // Clean up.
    let newKey = String(key);
    newKey = newKey.trim();
    newKey = newKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
    newKey = newKey.replace(/\s+/g, '-');
    newKey = newKey.replace(/_+/g, '-');
    newKey = newKey.replace(/-+/g, '-');
    newKey = newKey.toLowerCase();

    // Dash at start: YES.
    if (newKey.startsWith('-')) {
      // Update.
      newKey = newKey.slice(1);
    }

    // Dash at end: YES.
    if (newKey.endsWith('-')) {
      // Update.
      newKey = newKey.slice(0, -1);
    }

    // Expose string.
    return newKey;
  };

  // ============================
  // Helper: parse textarea JSON.
  // ============================

  const parseTextareaJson = () => {
    // Empty textarea: YES.
    if (!textareaJson.value) {
      try {
        // Get cached value.
        let cachedValue = window.sessionStorage.getItem(TEXTAREA_JSON) || '';
        cachedValue = cachedValue.trim();

        // Cached value exists: YES.
        if (cachedValue) {
          try {
            // Get JSON.
            let json = JSON.parse(cachedValue);
            json = JSON.stringify(json, null, 2);

            // Update.
            textareaJson.textContent = json;
          } catch (error) {
            // Update.
            textareaJson.textContent = cachedValue;
          }
        } else {
          // Update.
          textareaJson.textContent = exampleJson;
        }
      } catch (error) {
        // Update.
        textareaJson.textContent = exampleJson;
      }
    }
  };

  // ====================
  // Helper: parse value.
  // ====================

  const parseValue = (value = '') => {
    // Clean up.
    let newValue = String(value);
    newValue = newValue.trim();
    newValue = newValue.replace(/\s+/g, ' ');

    // Has spaces: YES.
    if (newValue.match(/\s/g)) {
      // Update.
      newValue = `'${newValue}'`;
    }

    // Expose string.
    return newValue;
  };

  // ===================
  // Helper: add events.
  // ===================

  const addEvents = () => {
    // Prevent doubles.
    removeEvents();

    // Add events.
    buttonSubmit.addEventListener(CLICK, handleClick);
    textareaCss.addEventListener(FOCUS, handleFocus);
    textareaJson.addEventListener(BLUR, handleBlur);
    textareaJson.addEventListener(INPUT, handleInput);
  };

  // ======================
  // Helper: remove events.
  // ======================

  const removeEvents = () => {
    // Remove events.
    buttonSubmit.removeEventListener(CLICK, handleClick);
    textareaCss.removeEventListener(FOCUS, handleFocus);
    textareaJson.removeEventListener(BLUR, handleBlur);
    textareaJson.removeEventListener(INPUT, handleInput);
  };

  // =================
  // Lifecycle: mount.
  // =================

  const onMount = () => {
    // Add events.
    addEvents();

    // Parse JSON.
    parseTextareaJson();
  };

  // ========
  // Kickoff.
  // ========

  onMount();
})();

// =============
// Closure: END.
// =============
