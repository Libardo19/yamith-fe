/**
 * Al RECARGAR una página pública se vuelve al inicio para que el hero y las
 * secciones se animen de nuevo (el navegador, por defecto, restaura la posición).
 * Va en línea y antes del contenido: tiene que correr antes de que el navegador
 * restaure el scroll. Atrás/adelante no se tocan: ahí sí conviene volver a donde ibas.
 */
const script = `(function () {
  try {
    var nav = performance.getEntriesByType('navigation')[0];
    if (!nav || nav.type !== 'reload') return;
    history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    var top = function () { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); };
    top();
    addEventListener('load', function () {
      top();
      setTimeout(function () { history.scrollRestoration = 'auto'; }, 0);
    }, { once: true });
  } catch (e) {}
})();`

export function ReloadToTop() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
