export function requiredField(text) {
    console.log(text);
    const re = /\S+@\S+\.\S+/
    if (!text) return 'This input field is required'
    // if (!re.test(text)) return 'Ooops! We need a valid email address.'
    return ''
  }
  