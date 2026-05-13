const calculateYearsOld = (birthdateString) => {
  if (!birthdateString) return 0;

  const today = new Date();
  const birthDate = new Date(birthdateString);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Subtract one year if the birthday has not happened yet this year
  if (
    monthDifference < 0 || 
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    ageYears--;
  }

  return ageYears;
};

export default calculateYearsOld;