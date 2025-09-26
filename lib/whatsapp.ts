import { Cart, CartItem } from './types/cart';

// Format currency untuk Rupiah
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Generate pesan WhatsApp dari keranjang
export const generateWhatsAppMessage = (cart: Cart): string => {
  if (cart.items.length === 0) {
    return 'Keranjang kosong';
  }

  const branch = cart.branch || 'berau';
  const branchName = branch.charAt(0).toUpperCase() + branch.slice(1);
  const branchPhone = branch === 'berau' ? '6281234567890' : '6281234567891';
  
  // Header pesan
  let message = `🍹 *PESANAN ZATIARAS JUICE ${branchName.toUpperCase()}*\n\n`;
  message += `📅 Tanggal: ${new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}\n`;
  message += `🕐 Waktu: ${new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })}\n\n`;

  // Daftar item
  message += `📋 *DETAIL PESANAN:*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  cart.items.forEach((item, index) => {
    const sizeText = item.size ? ` (${item.size === 'regular' ? 'Regular' : 'Large'})` : '';
    message += `${index + 1}. *${item.name}*${sizeText}\n`;
    message += `   💰 Harga: ${formatCurrency(item.price)}\n`;
    message += `   🔢 Jumlah: ${item.quantity}x\n`;
    message += `   💵 Subtotal: ${formatCurrency(item.price * item.quantity)}\n`;
    if (item.description) {
      message += `   📝 Catatan: ${item.description}\n`;
    }
    message += `\n`;
  });

  // Total
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📦 Total Item: ${cart.totalItems}\n`;
  message += `💰 *TOTAL HARGA: ${formatCurrency(cart.totalPrice)}*\n\n`;

  // Informasi tambahan
  message += `ℹ️ *INFORMASI PENTING:*\n`;
  message += `• Pesanan akan diproses dalam 15-30 menit\n`;
  message += `• Pembayaran via transfer atau tunai\n`;
  message += `• Gratis ongkir untuk order minimal ${formatCurrency(25000)}\n`;
  message += `• Konfirmasi pesanan akan dikirim via WhatsApp\n\n`;

  // Footer
  message += `🙏 Terima kasih telah memilih Zatiaras Juice!\n`;
  message += `📍 Cabang: ${branchName}\n`;
  message += `📞 Phone: +${branchPhone}\n\n`;
  message += `_Pesan ini dibuat otomatis dari website Zatiaras Juice_`;

  return message;
};

// Generate URL WhatsApp dengan pesan
export const getWhatsAppUrl = (cart: Cart): string => {
  const branch = cart.branch || 'berau';
  const branchPhone = branch === 'berau' ? '6281234567890' : '6281234567891';
  const message = generateWhatsAppMessage(cart);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${branchPhone}?text=${encodedMessage}`;
};

// Format item untuk display di keranjang
export const formatCartItem = (item: CartItem): string => {
  const sizeText = item.size ? ` (${item.size === 'regular' ? 'Regular' : 'Large'})` : '';
  return `${item.name}${sizeText}`;
};
