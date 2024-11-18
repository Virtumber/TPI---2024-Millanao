document.addEventListener("DOMContentLoaded", function() {
  const folderToggles = document.querySelectorAll('.folder-toggle');
  
  folderToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
          const nested = this.nextElementSibling;
          if (nested.style.display === 'block') {
              nested.style.display = 'none';
              this.querySelector('i').classList.remove('fa-caret-up');
              this.querySelector('i').classList.add('fa-caret-down');
          } else {
              nested.style.display = 'block';
              this.querySelector('i').classList.remove('fa-caret-down');
              this.querySelector('i').classList.add('fa-caret-up');
          }
      });
  });
});
// Mostrar/ocultar el menú de notificaciones
const bellIcon = document.getElementById('bell-icon');
const notificationMenu = document.getElementById('notification-menu');

bellIcon.addEventListener('click', function() {
    // Alterna la visibilidad del menú de notificaciones
    if (notificationMenu.style.display === 'none' || notificationMenu.style.display === '') {
        notificationMenu.style.display = 'block';
    } else {
        notificationMenu.style.display = 'none';
    }
});

// Mostrar/ocultar el menú de usuario (para cerrar sesión)
const userIcon = document.getElementById('user-icon');
const userMenu = document.getElementById('user-menu');

userIcon.addEventListener('click', function() {
    // Alterna la visibilidad del menú de usuario
    if (userMenu.style.display === 'none' || userMenu.style.display === '') {
        userMenu.style.display = 'block';
    } else {
        userMenu.style.display = 'none';
    }
});

// Ocultar el menú cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    if (!event.target.matches('#bell-icon')) {
        notificationMenu.style.display = 'none';
    }
    if (!event.target.matches('#user-icon')) {
        userMenu.style.display = 'none';
    }
});
