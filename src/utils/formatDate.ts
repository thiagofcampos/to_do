const verifyTypeofDate = (date: Date | string) => {
  if (typeof date !== typeof new Date()) {
    return new Date(date);
  }
  return date;
};

export const formatDate = (date: Date | string) => {
  const setTypeDate = verifyTypeofDate(date);
  const dateFormatted = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(setTypeDate));

  return dateFormatted;
};
