export const calculateYearsOld = (birthdateString) => {
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


export const Greeting = () => {
  // Get the current local hour (0 to 23)
  const currentHour = new Date().getHours();
  
  let greetingText = '';

  // Determine the correct greeting based on 24-hour ranges
  if (currentHour < 12) {
    greetingText = 'Good Morning';
  } else if (currentHour < 18) {
    greetingText = 'Good Afternoon';
  } else {
    greetingText = 'Good Evening';
  }

  return greetingText;
};