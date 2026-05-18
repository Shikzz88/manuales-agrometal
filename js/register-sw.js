// Diseñado con la identidad visual de Agrometal
const crearCartelStatus = () => {
  const div = document.createElement('div');
  div.id = 'sw-toast';
  div.style.position = 'fixed';
  div.style.bottom = '30px';
  div.style.left = '50%';
  div.style.transform = 'translateX(-50%)';
  div.style.backgroundColor = '#1c1c1c'; // Gris oscuro premium de fondo
  div.style.color = '#ffffff';
  div.style.padding = '16px 28px';
  div.style.borderRadius = '24px'; // Bordes más redondeados modernos
  div.style.boxShadow = '0px 10px 25px rgba(0,0,0,0.4)';
  div.style.zIndex = '10000';
  div.style.fontFamily = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';
  div.style.fontSize = '14px';
  div.style.fontWeight = '500';
  div.style.border = '1px solid #4CAF50'; // Sutil borde verde
  div.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Animación fluida
  div.style.display = 'none';
  div.style.alignItems = 'center';
  div.style.gap = '12px';
  document.body.appendChild(div);
  return div;
};

const mostrarMensaje = (texto, colorBorde = '#4CAF50', duracion = 0) => {
  let cartel = document.getElementById('sw-toast') || crearCartelStatus();
  cartel.innerHTML = texto;
  cartel.style.borderColor = colorBorde;
  cartel.style.display = 'flex';
  cartel.style.opacity = '1';
  
  if (duracion > 0) {
    setTimeout(() => {
      cartel.style.opacity = '0';
      setTimeout(() => { cartel.style.display = 'none'; }, 500);
    }, duracion);
  }
};

// Registro y escucha del ciclo de vida
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        // Primera instalación (Descarga masiva de manuales con Wi-Fi)
        if (reg.installing) {
          mostrarMensaje('⚙️ <span style="color: #4CAF50; font-weight: bold;">Agrometal Offline:</span> Sincronizando manuales en el dispositivo...', '#4CAF50');
          
          reg.installing.addEventListener('statechange', (e) => {
            if (e.target.state === 'installed') {
              mostrarMensaje('✅ <span style="color: #4CAF50; font-weight: bold;">¡Academia Lista!</span> Todos los manuales guardados para el campo.', '#4CAF50', 5000);
            }
          });
        }
        
        // Cuando detecta que subiste manuales nuevos a GitHub
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          mostrarMensaje('📥 <span style="color: #2196F3;">Actualización:</span> Descargando nuevos procedimientos...', '#2196F3');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              mostrarMensaje('✅ <span style="color: #4CAF50; font-weight: bold;">Contenido Actualizado:</span> Cambios guardados offline.', '#4CAF50', 5000);
            }
          });
        });
      })
      .catch(err => console.warn('Error SW', err));
  });
}