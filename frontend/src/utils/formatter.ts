export const formatPercent = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return '0%';
  return `${Math.round(value * 100)}%`;
};

export const formatNumber = (value: number | undefined, decimals = 2): string => {
  if (value === undefined || isNaN(value)) return '0';
  const locale = localStorage.getItem('language') === 'vi' ? 'vi-VN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
