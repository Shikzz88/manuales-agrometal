// Crear el cartelito flotante dinámicamente por código para no romper tus HTMLs
const crearCartelStatus = () => {
  const div = document.createElement('div');
  div.id = 'sw-toast';
  div.style.position = 'fixed';
  div.style.bottom = '20px';
  div.style.left = '50%';
  div.style.transform = 'translateX(-50%)';
  div.style.backgroundColor = '#323232';
  div.style.color = '#ffffff';
  div.style.padding = '12px 24px';
  div.style.borderRadius = '8px';
  div.style.boxShadow = '0px 4px 10px rgba(0,0,0,0.3)';
  div.style.zIndex = '10000';
  div.style.fontFamily = 'Roboto, sans-serif';
  div.style.fontSize = '14px';
  div.style.transition = 'opacity 0.5s ease';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

const mostrarMensaje = (texto, colorFondo = '#323232', duracion = 0) => {
  let cartel = document.getElementById('sw-toast') || crearCartelStatus();
  cartel.innerText = texto;
  cartel.style.backgroundColor = colorFondo;
  cartel.style.display = 'block';
  cartel.style.opacity = '1';
  
  if (duracion > 0) {
    setTimeout(() => {
      cartel.style.opacity = '0';
      setTimeout(() => { cartel.style.display = 'none'; }, 500);
    }, duracion);
  }
};

// Registro del Service Worker y escucha de estados
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('SW registrado', reg);

        // Si el SW se está instalando por primera vez (descargando los manuales del array)
        if (reg.installing) {
          mostrarMensaje('⏳ Aguarde mientras se descargan los manuales para modo offline...', '#e65100'); // Naranja Agrometal/Alerta
          
          reg.installing.addEventListener('statechange', (e) => {
            if (e.target.state === 'installed') {
              mostrarMensaje('✅ ¡Manuales actualizados! Listo para usar sin internet.', '#2e7d32', 4000); // Verde éxito (4 seg)
            }
          });
        }
        
        // Si hay una actualización en background
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          mostrarMensaje('📥 Descargando nuevos procedimientos técnicos...', '#0288d1'); // Azul info
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              mostrarMensaje('✅ Nueva versión disponible y guardada offline.', '#2e7d32', 4000);
            }
          });
        });
      })
      .catch(err => console.warn('Error al registrar el SW', err));
  });
}