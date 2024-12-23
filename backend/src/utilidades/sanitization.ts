export const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') 
      .replace(/javascript:/gi, '') 
      .replace(/on\w+=/gi, '') 
      .replace(/&#/g, '') 
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };