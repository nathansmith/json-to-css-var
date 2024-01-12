// =======================
// Class: JSON to CSS var.
// =======================

class jsonToCssVar {
  // ================
  // Method: convert.
  // ================

  static convert = ({
    // Props.
    json = {},
    cssIndent = '  ',
    cssPrefix = '--',
    cssSelector = ':root',
  }) => {
    // Get string.
    const oldStr = this.flatten(json);

    // Get list.
    const oldList = oldStr.split(';').sort();

    // Set later.
    const newList = [];

    // Loop through.
    oldList.forEach((item = '') => {
      // Item exists: YES.
      if (item) {
        // Add to list.
        newList.push(`${cssIndent}${cssPrefix}${item};`);
      }
    });

    // Get string.
    const newStr = newList.join('\n');

    // Expose string.
    return `${cssSelector} {\n${newStr}\n}`;
  };

  // =================================
  // Method: flatten JSON keys/values.
  // =================================

  static flatten = (json = {}, prevStr = '') => {
    // Set later.
    let mainStr = '';

    // Loop through.
    Object.entries(json).forEach(([key = '', value = '']) => {
      // Get string.
      let tempStr = this.parseKey(key);

      // String exists: YES.
      if (prevStr) {
        // Update.
        tempStr = `${prevStr}-${tempStr}`;
      }

      // Is object: YES.
      if (this.isObject(value)) {
        // Recursion.
        tempStr = this.flatten(value, tempStr);
      } else {
        // Clean up.
        const newValue = Array.isArray(value)
          ? value.map(this.parseValue).join(', ')
          : this.parseValue(value);

        // Update.
        tempStr = `${tempStr}: ${newValue};`;
      }

      // Add string.
      mainStr += tempStr;
    });

    // Expose string.
    return mainStr;
  };

  // ==================
  // Method: is object.
  // ==================

  static isObject = (obj = null) => {
    // Expose boolean.
    return !!(obj && typeof obj === 'object' && !Array.isArray(obj));
  };

  // ==================
  // Method: parse key.
  // ==================

  static parseKey = (key = '') => {
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

  // ====================
  // Helper: parse value.
  // ====================

  static parseValue = (value = '') => {
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
}
