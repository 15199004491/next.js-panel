export const formatTimestamp = (timestamp: number | string): string => {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const generateTimestamp = (daysAgo: number = 0): number => {
  const now = Date.now();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return now - daysAgo * millisecondsPerDay;
};

export const calculateDaysOnMarket = (createdAt: number): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day';
  if (diffDays < 30) return `${diffDays} days`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? 's' : ''}`;
};