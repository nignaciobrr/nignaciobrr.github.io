# Propuesta de registro y alcance

## Campos para revisar con la operación

| Grupo | Datos propuestos | Propósito |
| --- | --- | --- |
| Identificación | ID, fecha programada, responsable | Distinguir el movimiento y su programación |
| Ruta | Sucursal de origen y destino | Identificar despacho y recepción |
| Carga | Categoría, nombre del material, cantidad, unidad y embalaje | Describir lo trasladado sin sumar unidades incompatibles |
| Transporte | Transportista/conductor, patente | Identificar a cargo de quién y en qué vehículo se mueve |
| Peligrosidad | Número ONU si corresponde, clasificación y referencia HDS | Apoyar la revisión del material; no inferir peligrosidad por su nombre |
| Documentación | Guía, manifiesto u otro folio | Vincular el registro operativo con respaldos externos |
| Seguimiento | Estado, fecha de evento, nombre y observación | Conservar una secuencia de despacho y recepción |

Estas son decisiones de diseño, no una lista de obligaciones legales verificadas. Cantidad es declarada; se debe evaluar separar cantidad despachada y recibida, diferencias, rechazo parcial, incidentes y múltiples materiales por traslado. Cada registro actual representa un solo material.

## Investigación normativa pendiente

Se intentó acceder a fuentes oficiales desde este entorno. Las solicitudes HTTPS a BCN, RETC y SIDREP devolvieron `Tunnel connection failed: 403 Forbidden`; no se consultó su contenido. No debe presentarse este prototipo como validado contra la normativa chilena vigente.

Fuentes a consultar y validar con prevención de riesgos / medioambiente:

- Biblioteca del Congreso Nacional, [LeyChile](https://www.bcn.cl/leychile/): revisar aplicabilidad y texto vigente del DS 148 sobre residuos peligrosos, DS 298 sobre transporte de cargas peligrosas y DS 43 sobre almacenamiento de sustancias peligrosas, según la operación. La aplicabilidad no se determina en este prototipo.
- Ministerio del Medio Ambiente, [RETC](https://retc.mma.gob.cl/): determinar sistemas y declaraciones aplicables al tipo de residuo, establecimiento y movimiento.
- Ministerio de Salud, [SIDREP](https://sidrep.minsal.cl/): confirmar declaración y seguimiento de residuos peligrosos cuando corresponda.

Antes de uso real: confirmar identificaciones de generador, transportista y destinatario; RUT y autorizaciones aplicables; clasificación de residuos y peligrosidad; datos de emergencia; documentación exigida, cantidades, unidades y criterios de cierre. No se codifican reglas legales sin revisión.

## Alcance de la primera versión

El nombre digitado no verifica la identidad de una persona. Los tiempos corresponden al reloj del dispositivo; no constituyen sellos de tiempo certificados. El historial es local y puede modificarse desde el navegador. No se garantiza cumplimiento documental, seguridad operacional ni trazabilidad entre dispositivos.

No publicar datos reales sensibles hasta definir autenticación, autorización, almacenamiento, respaldo, retención y revisión operativa. Netlify sirve la interfaz; el prototipo no envía los registros a un servidor.
