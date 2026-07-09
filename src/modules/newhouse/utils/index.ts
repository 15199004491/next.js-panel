import type { Newhouse } from '../models';

export const formatPrice = (price: number): string => {
  if (price >= 100000000) return `${(price / 100000000).toFixed(2)}B`;
  if (price >= 10000) return `${(price / 10000).toFixed(0)}K`;
  return price.toFixed(0);
};

export const getStatusText = (status: Newhouse['status']): string => {
  const map: Record<Newhouse['status'], string> = { available: 'Available', sold: 'Sold', reserved: 'Reserved' };
  return map[status];
};

export const getStatusColor = (status: Newhouse['status']): string => {
  const map: Record<Newhouse['status'], string> = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-gray-100 text-gray-800',
    reserved: 'bg-yellow-100 text-yellow-800',
  };
  return map[status];
};

export const getBedroomsText = (bedrooms: number): string => {
  const map: Record<number, string> = { 1: '1 Bedroom', 2: '2 Bedrooms', 3: '3 Bedrooms', 4: '4 Bedrooms', 5: '5 Bedrooms' };
  return map[bedrooms] || `${bedrooms} Bedrooms`;
};

export const generateAddress = (address: string): string => address.length > 20 ? address.slice(0, 20) + '...' : address;