export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    // Extract last two digits of the year
    const lastTwoDigits = String(year).slice(-2);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}, ${month}, '${lastTwoDigits} at ${hours}:${minutes}`;
  };