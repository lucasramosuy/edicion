# SRS · edición.

## Objetivo

Mostrar qué normas del corpus de Normativa tienen una fecha de publicación cuyo día y mes coincide con la fecha elegida, sin importar el año. Producto público independiente, gratuito, identidad editorial aprobada.

## Requisitos funcionales

1. Abrir por defecto el día actual en Montevideo; aceptar `dia`/`mes` en URL si son válidos.
2. Permitir anterior/siguiente en calendario perpetuo (incluido 29/02), elegir fecha y volver a hoy.
3. Agrupar resultados por año descendente, cada norma una vez.
4. Mostrar nombre/documento, publicación, promulgación por separado cuando existe, extracto del primer artículo y enlaces a fuentes.
5. Explicar que el corpus no equivale al archivo completo del Diario Oficial.
6. Mostrar cantidad indexada, exclusiones y fecha del snapshot. No inventar fechas.
7. Distinguir sin resultados de error de carga, con reintento para este último.
8. Generar snapshot completo en build de CI; una falla de red bloquea publicación, no genera datos parciales.

## Datos y límites

Fuente: API v1 publicada de Normativa. Solo `fecha_publicacion` estricta `DD/MM/YYYY`, verificada como fecha real. Se usa el primer artículo de cada norma y se valida su `norma`. No se presume la publicación de reformas ni se infiere de promulgación o scraping. Las normas sin fecha válida se excluyen con motivo.

## Interfaz

Mobile-first con comprobación 320, 390 y 1280. Papel/tinta/índigo; wordmark `edición.` con punto índigo y enlace a raíz. Fuentes del kit self-hosted, no Google Fonts ni sistema visibles. Selector propio, sin confirmaciones nativas; navegación accesible por teclado, diálogo Escape, foco visible, aviso de pestaña externa y texto de estado.

## Arquitectura y operación

Vite + JavaScript ES modules, pnpm, datos estáticos JSON. Sin backend, secretos, cuentas, persistencia de usuario ni analytics. GitHub Pages y router actual bajo `/edicion/`; alta de Pages/ruta pendiente. PR revisado por Lucas; nunca publicar implementación directa en main. CI verifica PR, publica solo main/schedule/manual. Regeneración semanal sin pagar un servicio.

## Aceptación

- Ley 18.437 aparece el 16/01/2009, no el 12/12/2008 por su promulgación.
- La fecha actual usa Montevideo alrededor de medianoche UTC.
- 31/04 es rechazada; 29/02 se admite; 31/12 siguiente es 01/01.
- Fechas sin registros muestran aclaración, no falsa ausencia histórica.
- Fallo de indexación deja deploy fallido; fallo de fetch cliente da reintento.
- Navegación y controles funcionan a 320/390/1280 sin overflow ni errores JS.
- Capturas del bundle inspeccionadas antes del PR; límites de hosting reportados sin fingir publicación.
