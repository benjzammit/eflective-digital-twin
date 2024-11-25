export const calculateMetricScore = (value) => {
    if (typeof value === 'string') {
      const lowercaseValue = value.toLowerCase();
      if (lowercaseValue === 'high' || lowercaseValue.includes('simple')) return 80;
      if (lowercaseValue === 'medium' || lowercaseValue.includes('moderate')) return 50;
      if (lowercaseValue === 'low' || lowercaseValue.includes('complex')) return 20;
      
      // For target audience
      if (lowercaseValue.includes('broad')) return 80;
      if (lowercaseValue.includes('niche')) return 50;
      if (lowercaseValue.includes('specialized')) return 20;
    }
    return 50; // default medium score
  };