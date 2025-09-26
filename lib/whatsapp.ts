// Format currency untuk Rupiah
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Generate URL WhatsApp untuk pesanan langsung
export const getWhatsAppUrl = (productName: string, branch: 'berau' | 'samarinda'): string => {
  const branchNumber = branch === 'berau' ? '6285255555555' : '6285255555556';
  const branchName = branch === 'berau' ? 'Berau' : 'Samarinda';
  const message = `Halo! Saya ingin memesan ${productName} dari Zatiaras Juice ${branchName}.`;
  return `https://wa.me/${branchNumber}?text=${encodeURIComponent(message)}`;
};