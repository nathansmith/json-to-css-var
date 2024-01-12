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
      } catch (_error) {
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
    const value = textareaJson.value.trim();

    // Value exists: NO.
    if (!value) {
      // Update.
      textareaCss.textContent = '';

      // Early exit.
      return;
    }

    try {
      // Get JSON.
      const json = JSON.parse(value);

      // Update.
      textareaCss.textContent = jsonToCssVar.convert({ json });
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
    } catch (_error) {
      // No-op.
    }
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
          } catch (_error) {
            // Update.
            textareaJson.textContent = cachedValue;
          }
        } else {
          // Update.
          textareaJson.textContent = exampleJson;
        }
      } catch (_error) {
        // Update.
        textareaJson.textContent = exampleJson;
      }
    }
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
