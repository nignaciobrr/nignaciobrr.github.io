export const categories = ['Sustancia peligrosa', 'Sustancia no peligrosa', 'Residuo domiciliario', 'Residuo no peligroso', 'Residuo peligroso'];
export const statuses = ['Programado', 'En tránsito', 'Recibido', 'Cancelado'];
export const transitions = { Programado: ['En tránsito', 'Cancelado'], 'En tránsito': ['Recibido', 'Cancelado'], Recibido: [], Cancelado: [] };
export const initialLocations = [
  { id: 'rancagua', name: 'Casa matriz · Rancagua', address: 'Rancagua · Dirección por confirmar' },
  { id: 'quinta', name: 'Quinta Normal', address: 'Carlos Sage 768, Quinta Normal' },
];
export const hazardous = category => ['Sustancia peligrosa', 'Residuo peligroso'].includes(category);
export function validateTransfer(data, locations) {
  if (!data.material?.trim() || !data.responsible?.trim() || !data.date) throw new Error('Completa el material, la fecha y el responsable.');
  if (!categories.includes(data.category)) throw new Error('Selecciona un tipo de carga válido.');
  if (!locations.some(l => l.id === data.origin) || !locations.some(l => l.id === data.destination)) throw new Error('Selecciona sucursales válidas.');
  if (data.origin === data.destination) throw new Error('El origen y el destino deben ser diferentes.');
  if (!Number.isFinite(Number(data.quantity)) || Number(data.quantity) <= 0) throw new Error('La cantidad debe ser mayor que cero.');
  if (!['kg', 't', 'L', 'm³', 'unidades'].includes(data.unit)) throw new Error('Selecciona una unidad válida.');
}
export function changeStatus(transfer, status, actor, note, now = new Date().toISOString()) {
  if (!transitions[transfer.status]?.includes(status)) throw new Error('Este cambio de estado no está permitido.');
  if (!actor.trim()) throw new Error('Indica quién registra el cambio.');
  if (status === 'Recibido' && !note.trim()) throw new Error('Registra la recepción y las observaciones de entrega.');
  return { ...transfer, status, history: [...transfer.history, { status, actor: actor.trim(), note: note.trim(), at: now }] };
}
export function csvExport(rows, locations) {
  const name = id => locations.find(l => l.id === id)?.name || id;
  const cell = value => '"' + String(value ?? '').replace(/^[\s]*[=+@-]/, "'$&").replaceAll('"', '""') + '"';
  const headers = ['ID', 'Fecha', 'Tipo', 'Material', 'Cantidad', 'Unidad', 'Origen', 'Destino', 'Estado', 'Responsable', 'Transportista', 'Patente', 'Documento', 'Número ONU', 'Clasificación', 'HDS', 'Embalaje', 'Observaciones', 'Historial'];
  return '\uFEFF' + [headers, ...rows.map(t => [t.id,t.date,t.category,t.material,t.quantity,t.unit,name(t.origin),name(t.destination),t.status,t.responsible,t.carrier,t.plate,t.document,t.un,t.classification,t.sds,t.packaging,t.notes,JSON.stringify(t.history)])].map(row => row.map(cell).join(';')).join('\r\n');
}
export function demoTransfers() {
  const date = new Date().toLocaleDateString('en-CA');
  const make = (id, material, category, quantity, unit, status, origin, destination) => ({ id, material, category, quantity, unit, status, origin, destination, date, responsible: 'Equipo de demostración', carrier: 'Por asignar', plate: '', document: '', un: '', classification: '', sds: '', packaging: 'Por confirmar', notes: 'Registro ficticio para explorar el prototipo. No corresponde a un traslado real.', demo: true, history: [{status:'Programado',actor:'Demostración',note:'Registro ficticio creado',at:new Date().toISOString()}, ...(status !== 'Programado' ? [{status,actor:'Demostración',note:'Evento de ejemplo',at:new Date().toISOString()}] : [])] });
  return [
    make('DEMO-001','Envases vacíos contaminados','Residuo peligroso',120,'kg','En tránsito','rancagua','quinta'),
    make('DEMO-002','Material de embalaje','Residuo no peligroso',340,'kg','Programado','quinta','rancagua'),
    make('DEMO-003','Insumos de limpieza','Sustancia no peligrosa',48,'unidades','Recibido','rancagua','quinta'),
    make('DEMO-004','Residuos asimilables a domiciliarios','Residuo domiciliario',85,'kg','Programado','quinta','rancagua'),
  ];
}
