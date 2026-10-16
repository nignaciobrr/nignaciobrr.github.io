import test from 'node:test';
import assert from 'node:assert/strict';
import { initialLocations, validateTransfer, changeStatus, csvExport } from '../src/model.js';
const transfer = { id:'CG-TEST', date:'2026-10-16', material:'Cartón', responsible:'Ignacio', quantity:10, unit:'kg', category:'Residuo no peligroso', origin:'rancagua', destination:'quinta', status:'Programado', history:[] };
test('admite un traslado y rechaza rutas iguales, cantidades inválidas y tipos desconocidos',()=>{
  assert.doesNotThrow(()=>validateTransfer(transfer,initialLocations));
  for(const patch of [{destination:'rancagua'},{quantity:0},{quantity:-5},{quantity:'abc'},{category:'Otra'},{unit:'desconocida'},{origin:'inexistente'},{responsible:' '}])assert.throws(()=>validateTransfer({...transfer,...patch},initialLocations));
});
test('conserva historial, exige responsable y recepción y cierra estados terminales',()=>{
  assert.throws(()=>changeStatus(transfer,'Recibido','Ana','Recibido'));
  assert.throws(()=>changeStatus(transfer,'En tránsito',' ','Salida'));
  const moving=changeStatus(transfer,'En tránsito','Ana','Salida de sucursal','2026-10-16T10:00:00Z');
  assert.equal(transfer.history.length,0);
  assert.throws(()=>changeStatus(moving,'Recibido','Pedro',''));
  const received=changeStatus(moving,'Recibido','Pedro','10 kg recibidos sin observaciones','2026-10-16T11:00:00Z');
  assert.equal(received.history.length,2);assert.equal(received.history[0].actor,'Ana');
  assert.throws(()=>changeStatus(received,'En tránsito','Ana','Reapertura'));
  const cancelled=changeStatus(transfer,'Cancelado','Ana','Cambio de planificación');
  assert.throws(()=>changeStatus(cancelled,'En tránsito','Ana','Salida'));
});
test('CSV conserva comillas, historial y neutraliza fórmulas de planilla',()=>{
  const csv=csvExport([{...transfer,material:'=HYPERLINK("x")',notes:'Texto; con "comillas"\ny salto'}],initialLocations);
  assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes("'=HYPERLINK"));assert.ok(csv.includes('""comillas""'));assert.ok(csv.includes('Casa matriz · Rancagua'));assert.ok(csv.includes('Historial'));
});
