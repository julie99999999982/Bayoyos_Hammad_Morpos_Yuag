

let getFormatTime = () => {
  // Create a new Date object
  const date = new Date();

  // Get the UTC time offset
  const timeOffset = 0; // in minutes

  // Calculate the local time in Hong Kong
  const localTime = new Date(date.getTime() + timeOffset * 60 * 1000);

  // Extract the individual components of the time
  const year = localTime.getFullYear();
  const month = String(localTime.getMonth() + 1).padStart(2, '0');
  const day = String(localTime.getDate()).padStart(2, '0');
  const hours = String(localTime.getHours()).padStart(2, '0');
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  const seconds = String(localTime.getSeconds()).padStart(2, '0');

  // Format the time string
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
  // Usage example:
  const currentTimeHK = getFormatTime();
  console.log(currentTimeHK);