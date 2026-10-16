# Clever Group · Trazabilidad de traslados

Prototipo para revisar el registro de sustancias y residuos entre sucursales. Aplicación estática en español, compatible con Netlify. No es un sistema productivo ni acredita cumplimiento normativo.

La interfaz usa naranja `#f58a25`, negro `#171515` y blanco, tomando como referencia la imagen de CleverGroup facilitada para el prototipo. Los archivos SVG de `public/` son una reconstrucción vectorial de esa referencia, con tipografía aproximada; pueden sustituirse por los archivos oficiales cuando estén disponibles.

## Desarrollo

Requiere Node.js 22.12 o posterior compatible con Vite 7 (ver `package-lock.json`).

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Si la caché habitual no es escribible, usar `npm ci --cache /tmp/clever-npm-cache`. En este entorno se verificaron las pruebas con el Chromium preinstalado: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Como alternativa, instalar un navegador con `PLAYWRIGHT_BROWSERS_PATH=/workspace/.cache/ms-playwright npx playwright install chromium` y ejecutar las pruebas con la misma variable; la descarga de Playwright puede estar bloqueada por la red.

## Netlify

Importar este repositorio en Netlify: `netlify.toml` define `npm run build` y el directorio `dist`. También se puede subir manualmente el contenido de `dist` después de compilar. No requiere claves, funciones ni base de datos. La publicación no se realiza automáticamente desde este prototipo.

## Funcionalidades

- Registro con origen, destino, categoría, material, cantidad/unidad, fecha, responsable, transporte y referencias documentales.
- Estados Programado → En tránsito → Recibido; cancelación desde estados abiertos; historial con fecha, nombre y observaciones. La recepción exige una observación.
- Filtros por texto, estado y categoría; exportación CSV de los resultados filtrados con historial y protección de fórmulas.
- Dos sucursales iniciales: Casa matriz en Rancagua (dirección pendiente) y Carlos Sage 768, Quinta Normal. Se pueden agregar puntos.
- Sugerencias editables de materiales y embalajes. Los campos de peligro se muestran según categoría.
- Inicio vacío; ejemplos ficticios únicamente al pulsar “Cargar ejemplos de demostración”.

## Límites de la revisión

Datos en `localStorage`, bajo la clave `clever-trazabilidad-v1`, separados por navegador y dominio. No hay autenticación, sincronización ni respaldo remoto. Borrar almacenamiento elimina registros. El CSV es una exportación de consulta, no un respaldo restaurable desde la aplicación. No hay adjuntos, firma, control de identidad ni historial inviolable; las referencias HDS y folios son texto. Usar información ficticia durante la evaluación.

Ver [criterios y revisión normativa pendiente](docs/campos-y-alcance.md). Próximas decisiones: sucursales definitivas, catálogos de materiales, responsables de despacho/recepción, campos obligatorios por categoría, base de datos compartida y permisos.
