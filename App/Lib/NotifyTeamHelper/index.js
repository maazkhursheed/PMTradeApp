module.exports.ticketNumbers = logResponse => {
  if (logResponse) {
    const regex = /ENTS-\d+(\.\d)*/g;
    let onlyTicketNumbers = logResponse.toString().match(regex);
    if (onlyTicketNumbers) {
      onlyTicketNumbers = onlyTicketNumbers
        .toString()
        .split(",")
        .filter((item, i, allItems) => {
          return i === allItems.indexOf(item);
        })
        .toString();
      return onlyTicketNumbers;
    }
  }
  return null;
};
