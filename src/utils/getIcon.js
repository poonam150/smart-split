export const getCategoryIcon = (description) => {
  const text = description.toLowerCase();
  
  if (text.includes('pizza') || text.includes('burger') || text.includes('food') || text.includes('lunch') || text.includes('dinner')) return '🍔';
  if (text.includes('uber') || text.includes('ola') || text.includes('taxi') || text.includes('cab') || text.includes('travel')) return '🚕';
  if (text.includes('movie') || text.includes('cinema') || text.includes('netflix')) return '🍿';
  if (text.includes('grocer') || text.includes('milk') || text.includes('veg')) return '🥦';
  if (text.includes('rent') || text.includes('wifi') || text.includes('bill')) return '🏠';
  
  return '💸'; // Default icon
};