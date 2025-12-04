const NAV = {
  main: (active) => [
    { id: 'index', label: 'Inicio', href: 'index.html', active: active === 'index' },
    { id: 'staff', label: 'Staff', href: 'staff-index.html', active: active?.startsWith('staff') },
    { id: 'encargados', label: 'Encargados', href: 'encargados-index.html', active: active?.startsWith('encargado') },
    { id: 'operativo', label: 'Operativo', href: 'operativo-index.html', active: active?.startsWith('operativo') },
    { id: 'administracion', label: 'Administración', href: 'administracion-index.html', active: active?.startsWith('admin-') || active?.startsWith('administracion') },
    { id: 'gerencia', label: 'Gerencia', href: 'gerencia-index.html', active: active === 'gerencia-index' },
    { id: 'master', label: 'Master Data', href: 'panel-master.html', active: active === 'panel-master' },
  ],
  staff: (active) => [
    { id: 'staff-index', label: 'Inicio Staff', href: 'staff-index.html', active: active === 'staff-index' },
    { id: 'staff-cajas', label: 'Caja', href: 'staff-cajas.html', active: active === 'staff-cajas' },
    { id: 'staff-barra', label: 'Barra', href: 'staff-barra.html', active: active === 'staff-barra' },
    { id: 'staff-acreditadores', label: 'Acceso', href: 'staff-acreditadores.html', active: active === 'staff-acreditadores' },
  ],
  encargados: (active) => [
    { id: 'encargados-index', label: 'Inicio', href: 'encargados-index.html', active: active === 'encargados-index' },
    { id: 'encargado-caja', label: 'Caja', href: 'encargado-caja.html', active: active === 'encargado-caja' },
    { id: 'encargado-barra', label: 'Barra', href: 'encargado-barra-index.html', active: active?.startsWith('encargado-barra') },
    { id: 'encargado-limpieza', label: 'Limpieza', href: 'encargado-limpieza.html', active: active === 'encargado-limpieza' },
    { id: 'encargado-seguridad', label: 'Seguridad', href: 'encargado-seguridad.html', active: active === 'encargado-seguridad' },
  ],
  barra: (active) => [
    { id: 'encargado-barra-index', label: 'Panel Barra', href: 'encargado-barra-index.html', active: active === 'encargado-barra-index' },
    { id: 'encargado-barra-pedidos', label: 'Pedidos', href: 'encargado-barra-pedidos.html', active: active === 'encargado-barra-pedidos' },
    { id: 'encargado-barra-stock', label: 'Stock', href: 'encargado-barra-stock.html', active: active === 'encargado-barra-stock' },
    { id: 'encargado-barra-cierre-stock', label: 'Cierre de Stock', href: 'encargado-barra-cierre-stock.html', active: active === 'encargado-barra-cierre-stock' },
  ],
  operativo: (active) => [
    { id: 'operativo-index', label: 'Inicio Operativo', href: 'operativo-index.html', active: active === 'operativo-index' },
    { id: 'operativo-stock', label: 'Stock Noche', href: 'operativo-stock.html', active: active === 'operativo-stock' },
  ],
  administracion: (active) => [
    { id: 'administracion-index', label: 'Panel Administración', href: 'administracion-index.html', active: active === 'administracion-index' },
    { id: 'admin-pos', label: 'POS', href: 'admin-pos.html', active: active === 'admin-pos' },
    { id: 'admin-proveedores', label: 'Proveedores', href: 'admin-proveedores.html', active: active === 'admin-proveedores' },
    { id: 'admin-recetas', label: 'Recetas', href: 'admin-recetas.html', active: active === 'admin-recetas' },
    { id: 'admin-skus', label: 'SKUs', href: 'admin-skus.html', active: active === 'admin-skus' },
    { id: 'admin-cierre', label: 'Cierres', href: 'admin-cierre.html', active: active === 'admin-cierre' },
  ],
  master: (active) => [
    { id: 'panel-master', label: 'Master Data', href: 'panel-master.html', active: active === 'panel-master' },
    { id: 'admin-cargos', label: 'Cargos', href: 'admin-cargos.html', active: active === 'admin-cargos' },
    { id: 'admin-logs', label: 'Logs', href: 'admin-logs.html', active: active === 'admin-logs' },
    { id: 'admin-cierre', label: 'Cierres', href: 'admin-cierre.html', active: active === 'admin-cierre' },
  ],
  gerencia: (active) => [
    { id: 'gerencia-index', label: 'Panel Gerencia', href: 'gerencia-index.html', active: active === 'gerencia-index' },
  ],
};

const PAGE_CONFIG = {
  'index.html': { title: 'Panel principal', subtitle: 'Accesos rápidos', sectionTitle: 'Áreas operativas', sectionSubtitle: 'Selecciona tu rol', navigation: NAV.main('index') },
  'staff-index.html': { title: 'Staff', subtitle: 'Turno activo', sectionTitle: 'Mi puesto', sectionSubtitle: 'Selecciona tu flujo', navigation: NAV.staff('staff-index') },
  'staff-cajas.html': { title: 'Caja', subtitle: 'Staff', sectionTitle: 'Operaciones de caja', sectionSubtitle: 'Cobros y retiros', navigation: NAV.staff('staff-cajas') },
  'staff-barra.html': { title: 'Barra', subtitle: 'Staff', sectionTitle: 'Solicitudes y stock', sectionSubtitle: 'Flujo de barra', navigation: NAV.staff('staff-barra') },
  'staff-acreditadores.html': { title: 'Acceso', subtitle: 'Staff', sectionTitle: 'Control de puerta', sectionSubtitle: 'Listas y acreditación', navigation: NAV.staff('staff-acreditadores') },
  'encargados-index.html': { title: 'Encargados', subtitle: 'Panel', sectionTitle: 'Áreas', sectionSubtitle: 'Supervisión', navigation: NAV.encargados('encargados-index') },
  'encargado-caja.html': { title: 'Caja', subtitle: 'Encargado', sectionTitle: 'Validaciones', sectionSubtitle: 'Caja principal', navigation: NAV.encargados('encargado-caja') },
  'encargado-barra.html': { title: 'Barra', subtitle: 'Encargado', sectionTitle: 'Resumen', sectionSubtitle: 'Estado del turno', navigation: NAV.encargados('encargado-barra') },
  'encargado-barra-index.html': { title: 'Barra', subtitle: 'Encargado', sectionTitle: 'Panel', sectionSubtitle: 'Control de barra', navigation: NAV.barra('encargado-barra-index') },
  'encargado-barra-pedidos.html': { title: 'Pedidos', subtitle: 'Barra', sectionTitle: 'Reposición', sectionSubtitle: 'Solicitudes a depósito', navigation: NAV.barra('encargado-barra-pedidos') },
  'encargado-barra-stock.html': { title: 'Stock', subtitle: 'Barra', sectionTitle: 'Stock en barra', sectionSubtitle: 'Entradas y salidas', navigation: NAV.barra('encargado-barra-stock') },
  'encargado-barra-cierre-stock.html': { title: 'Cierre de stock', subtitle: 'Barra', sectionTitle: 'Recuento', sectionSubtitle: 'Control de fin de turno', navigation: NAV.barra('encargado-barra-cierre-stock') },
  'encargado-limpieza.html': { title: 'Limpieza', subtitle: 'Encargado', sectionTitle: 'Checklist', sectionSubtitle: 'Tareas del turno', navigation: NAV.encargados('encargado-limpieza') },
  'encargado-seguridad.html': { title: 'Seguridad', subtitle: 'Encargado', sectionTitle: 'Control de acceso', sectionSubtitle: 'Protocolo', navigation: NAV.encargados('encargado-seguridad') },
  'operativo-index.html': { title: 'Operativo', subtitle: 'Noche', sectionTitle: 'Panel operativo', sectionSubtitle: 'Dotación y métricas', navigation: NAV.operativo('operativo-index') },
  'operativo-stock.html': { title: 'Stock Operativo', subtitle: 'Noche', sectionTitle: 'Movimientos', sectionSubtitle: 'Control nocturno', navigation: NAV.operativo('operativo-stock') },
  'administracion-index.html': { title: 'Administración', subtitle: 'Backoffice', sectionTitle: 'Panel de gestión', sectionSubtitle: 'Finanzas y compras', navigation: NAV.administracion('administracion-index') },
  'admin-pos.html': { title: 'POS', subtitle: 'Administración', sectionTitle: 'Punto de venta', sectionSubtitle: 'Configuración y monitoreo', navigation: NAV.administracion('admin-pos') },
  'admin-proveedores.html': { title: 'Proveedores', subtitle: 'Administración', sectionTitle: 'Compras', sectionSubtitle: 'Gestión de proveedores', navigation: NAV.administracion('admin-proveedores') },
  'admin-recetas.html': { title: 'Recetas', subtitle: 'Administración', sectionTitle: 'Costos', sectionSubtitle: 'Desglose de recetas', navigation: NAV.administracion('admin-recetas') },
  'admin-skus.html': { title: 'SKUs', subtitle: 'Administración', sectionTitle: 'Catálogo', sectionSubtitle: 'Productos y precios', navigation: NAV.administracion('admin-skus') },
  'admin-cierre.html': { title: 'Cierres', subtitle: 'Administración', sectionTitle: 'Cierre operativo', sectionSubtitle: 'Resumen de caja', navigation: NAV.administracion('admin-cierre') },
  'panel-master.html': { title: 'Master Data', subtitle: 'Sistema', sectionTitle: 'Configuración', sectionSubtitle: 'Datos maestros', navigation: NAV.master('panel-master') },
  'admin-cargos.html': { title: 'Cargos', subtitle: 'Master data', sectionTitle: 'Roles y jornales', sectionSubtitle: 'Estructura salarial', navigation: NAV.master('admin-cargos') },
  'admin-logs.html': { title: 'Logs', subtitle: 'Master data', sectionTitle: 'Auditoría', sectionSubtitle: 'Eventos recientes', navigation: NAV.master('admin-logs') },
  'gerencia-index.html': { title: 'Gerencia', subtitle: 'Estrategia', sectionTitle: 'Panel ejecutivo', sectionSubtitle: 'Visión general', navigation: NAV.gerencia('gerencia-index') },
};

export function getPageConfig(filename) {
  return PAGE_CONFIG[filename] || { title: 'Panel', subtitle: 'Vista', sectionTitle: 'Contenido', sectionSubtitle: 'Página genérica', navigation: NAV.main() };
}
