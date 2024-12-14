export const filterPersonas = (personas, filters) => {
  return personas.filter(persona => {
    // If no filters are active, return all personas
    if (Object.values(filters).every(filter => !filter)) return true;

    // Age Group filter
    if (filters.ageGroup) {
      const age = persona.age;
      const ageRange = filters.ageGroup;
      if (ageRange === '65+') {
        if (age < 65) return false;
      } else {
        const [min, max] = ageRange.split('-').map(Number);
        if (!(age >= min && age <= max)) return false;
      }
    }

    // Income filter
    if (filters.income) {
      const income = persona.income || '';
      
      if (income.includes('€')) {
        if (filters.income === 'Low' && !income.includes('Less than') && 
            parseInt(income.match(/\d+/g)[0]) >= 30000) return false;
        if (filters.income === 'Middle' && !income.includes('€30,000 - €39,999') && 
            !income.includes('€40,000')) return false;
        if (filters.income === 'High' && 
            parseInt(income.match(/\d+/g)[0]) <= 40000) return false;
      } else if (income.includes('£')) {
        if (filters.income === 'Low' && !income.includes('Less than') && 
            parseInt(income.match(/\d+/g)[0]) >= 50000) return false;
        if (filters.income === 'Middle' && !income.includes('£50,000 - £70,000')) return false;
        if (filters.income === 'High' && 
            parseInt(income.match(/\d+/g)[0]) <= 70000) return false;
      }
    }

    // Gender filter
    if (filters.gender && 
        !persona.gender?.toLowerCase().includes(filters.gender.toLowerCase())) {
      return false;
    }

    // Country Code filter
    if (filters.countryCode && 
        persona.country_code !== filters.countryCode) {
      return false;
    }

    // Location filter
    if (filters.location && 
        !persona.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    return true;
  });
}; 