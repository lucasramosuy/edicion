# edición.

![pnpm](https://img.shields.io/badge/pnpm-10.17.1-f69220) ![Estático](https://img.shields.io/badge/sitio-estático-4b59a1)

**El mismo día. Otros años.** Un archivo editorial para recorrer normas uruguayas por el día y mes en que se publicaron en el Diario Oficial. Datos de [Normativa](https://lucasramos.uy/normativa/api/), fuente oficial IMPO.

## Alcance

No es todo el Diario Oficial. Solo muestra normas del corpus publicado de Normativa cuya ficha tiene una fecha de publicación válida. Promulgación y publicación son datos distintos: la búsqueda usa únicamente `fecha_publicacion`.

- Hoy se calcula en **America/Montevideo**, aunque el visitante esté en otro país.
- Selector de día/mes, anterior/siguiente e "Ir a hoy"; 29 de febrero incluido.
- URL compartible por query string, por ejemplo `?dia=16&mes=1`.
- Resultados por año, del más reciente al más antiguo, con enlaces a Normativa y al artículo fuente en IMPO. Los extractos son texto original del primer artículo, no resúmenes automáticos; pueden cortarse a 420 caracteres.
- Sin coincidencias no significa que no hubo publicaciones. Fallo de carga es un estado separado con reintento.
- Sin cuentas, rastreo, cookies propias, API keys ni servidor de datos. La página carga las fuentes desde el mismo dominio y el índice estático desde su hosting.

## Desarrollo

Node.js 22 y pnpm 10.17.1:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm indexar
pnpm dev
pnpm build
pnpm preview
pnpm playtest
```

`build` usa el snapshot versionado de `public/data/index.json`; `indexar` lo regenera desde la API publicada. Así se puede revisar el resultado del índice y hacer builds locales sin red. CI siempre regenera antes de compilar. Un fallo de red aborta la actualización: no publica un índice parcial ni reemplaza silenciosamente fechas desconocidas por promulgación.

El generador lee el catálogo, la ficha de cada norma y el JSON de su primer artículo. Valida identidad de norma y fechas reales. No usa `actualizado` ni `fecha_scraping`. Limitación: la fecha es la del documento informado por la primera ficha del corpus; no reconstruye publicaciones de todas las reformas o versiones históricas. `excluded` deja constancia de normas sin fecha válida o sin artículos.

## Diseño

Identidad aprobada: papel `#f5f3ec`, tinta `#262925`, índigo lavado `#4b59a1`. Space Grotesk, DM Mono y Source Serif 4 self-hosted desde `/brand/kit-fonts.css`. Flechas SVG, acciones con controles propios, selector en diálogo estilizado, foco visible y etiquetas para lectores de pantalla. Sigue [BRAND.md](https://github.com/lucasramosuy/brand).

## Publicación, pendiente de configurar

El workflow comprueba PRs sin publicarlos; al mergear `main`, y cada miércoles, regenera el índice y publica en GitHub Pages. Es un sitio estático público para no consumir minutos privados de Actions; no requiere servicios pagos ni tokens nuevos. Para activar:

1. Configurar Pages del repo con **GitHub Actions**.
2. Confirmar que el plan/repositorio admite Pages sin costo.
3. Configurar el router existente para servir `/edicion/` desde el Pages de este repo. Este repo no cambia el Worker de otros proyectos.
4. Añadir la entrada en `/links` y registrar el acento en el brand kit mediante sus propios PRs.

No está publicado por el solo hecho de abrir el PR. Los permisos de Pages del workflow solo son efectivos en deploy; no afectan producción durante el playtest.

## Pruebas

- Tests de fechas reales, leap year, cambio de año, Montevideo y agrupación por publicación.
- Playtest del bundle en 320/390/1280: selector, fecha inexistente, 29/02, navegación, retorno a hoy, Escape, error de carga y reintento, sin overflow ni errores JS.
- `playtest/` contiene capturas y reporte local (excluido de git). Playwright usa Chrome del sistema por defecto; definir `CHROME_BIN` si hace falta otra ruta.

## Roadmap

- Publicar después del merge y del alta de la ruta.
- Si Normativa suma una fecha por norma a su catálogo, simplificar el generador.
- Mejorar el archivo con más normas: no ampliar artificialmente su cobertura.
