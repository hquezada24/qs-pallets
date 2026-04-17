const isPastDate = (date: string): boolean => {
  return new Date(date) < new Date();
};

export default isPastDate;
