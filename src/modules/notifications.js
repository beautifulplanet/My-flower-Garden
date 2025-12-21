// src/modules/notifications.js - Notification System

/**
 * Show a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - How long to show (ms), default 3000
 */
export function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notifications');
  
  // Fallback: log to console if container doesn't exist
  if (!container) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    return;
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span class="notification-icon">${getNotificationIcon(type)}</span>
    <span class="notification-message">${message}</span>
  `;
  
  // Add to container
  container.appendChild(notification);
  
  // Trigger animation
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Auto-remove after duration
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hiding');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

/**
 * Get icon for notification type
 * @param {string} type - Notification type
 * @returns {string} - Emoji icon
 */
function getNotificationIcon(type) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || icons.info;
}

/**
 * Clear all notifications
 */
export function clearAllNotifications() {
  const container = document.getElementById('notifications');
  if (container) {
    container.innerHTML = '';
  }
}

/**
 * Show a quick flash message (shorter duration)
 * @param {string} message - Message to show
 * @param {string} type - Notification type
 */
export function flashMessage(message, type = 'info') {
  showNotification(message, type, 1500);
}
