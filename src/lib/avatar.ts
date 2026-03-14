/**
 * Generate a consistent color for a seller's avatar based on their name
 * Uses a simple hash to ensure the same seller always gets the same color
 */
export function getAvatarColor(name: string): string {
  const colors = [
    '#EF4444', // red-500
    '#F97316', // orange-500
    '#EAB308', // yellow-500
    '#22C55E', // green-500
    '#06B6D4', // cyan-500
    '#3B82F6', // blue-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Get the first letter of a name for avatar display
 */
export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
