export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (username) => {
  if (!username) return '';
  const names = username.split(' ');
  let initials = '';
  for (let i = 0; i < names.length; i++) {
    initials += names[i][0];
  }
  return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
  if (filterType === 'search') {
    return 'No stories found';
  } else if (filterType === 'date') {
    return 'No stories found for this date range';
  }
};
