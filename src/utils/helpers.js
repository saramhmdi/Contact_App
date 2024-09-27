const validationRules = {
    firstName: {
      pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
      minLength: 2,
      message: "First Name must be at least 2 letters long and contain only letters.",
    },
    lastName: {
      pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
      minLength: 2,
      message: "Last Name must be at least 2 letters long and contain only letters.",
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address.",
    },
    phone: {
      pattern: /^(?:\+98\s?9\d{2}|\(0\)\s?9\d{2}|09\d{2})\s?\d{3}\s?\d{4}$/,
      minLength: 11,
      message: "Please enter a valid mobile phone number.",
    },
  };
  
  const validateField = (name, value) => {
    const rules = validationRules[name];
  
    if (!rules) return "";
  
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return rules.message;
    }
  
    if (!rules.pattern.test(value)) {
      return rules.message;
    }
  
    return "";
  };
  
  const validateFields = (contact) => {
    const newErrors = {};
    Object.keys(contact).forEach((key) => {
      const error = validateField(key, contact[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };
  
  export { validateField, validateFields };
  