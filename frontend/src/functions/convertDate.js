 export const convertDate = (isoDate) => {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return dt + "-" + month + "-" + year;
};
  
export const timeAgo = (isoDate) => {
  let date1 = new Date();
  let date2 = new Date(isoDate);
  var hours = (date1 - date2) / 36e5;
  if (hours <= 1) {
    return `${ Math.floor(hours * 60)}  minutes `;
  }
  if (hours >= 8640) {
    return `${Math.floor(hours / 8640)}  years`;
  }
  if (hours >= 720) {
    return `${Math.floor(hours / 720)}  months`;
  }
  if (hours >= 24) {
    return `${ Math.floor(hours/24)}  days `
  }
  
  return `${Math.floor(hours)}  hours `
  
}