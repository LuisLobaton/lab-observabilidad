# Laboratorio de Observabilidad

## Arquitectura del Stack
- Prometheus: Recolección y almacenamiento de métricas.
- Loki: Base de datos centralizada para logs.
- Grafana Alloy: Recolección de registros de contenedores.
- Grafana: Dashboard de visualización y gestión de alertas.

## Ejecución
Para levantar el entorno completo, ejecutar en la raíz del proyecto:
docker compose up -d --build

## Configuración del Laboratorio
El laboratorio incluye:
- Dashboards para monitoreo de CPU (host y contenedor).
- Visualización de logs de aplicación e infraestructura.
- Sistema de alarmas configurado para dispararse al superar el 50% de uso de CPU.
- Integración de Webhooks para cierre de ciclo Alarma-Log.
