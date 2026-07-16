const getLocale = (): string => {
  return localStorage.getItem('language') === 'vi' ? 'vi-VN' : 'en-US';
};

export const formatDate = (dateStr: string | Date | undefined): string => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  const locale = getLocale();
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

export const formatDateTime = (dateStr: string | Date | undefined): string => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  const locale = getLocale();
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d);
};

export const formatRelativeTime = (dateStr: string | Date | undefined): string => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  const isVi = localStorage.getItem('language') === 'vi';

  if (diffSec < 60) {
    return isVi ? 'Vừa xong' : 'Just now';
  }
  if (diffMin < 60) {
    return isVi ? `${diffMin} phút trước` : `${diffMin}m ago`;
  }
  if (diffHr < 24) {
    return isVi ? `${diffHr} giờ trước` : `${diffHr}h ago`;
  }
  if (diffDay === 1) {
    return isVi ? 'Hôm qua' : 'Yesterday';
  }
  return formatDate(d);
};
