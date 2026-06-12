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

## Respuestas a Preguntas del Laboratorio

1. ¿Por qué necesitamos Loki además de Prometheus si ya tenemos /metrics?
- Porque Prometheus nos da los números, por ejemplo: cuántos errores hubo, pero no nos dice qué pasó exactamente y Loki guarda el texto detallado que son los logs, permitiéndonos leer qué mensaje de error salió o qué hizo la aplicación.

2. ¿Qué ventaja aporta que las fuentes de datos de Grafana estén aprovisionadas como código y no creadas a mano?
- La ventaja es que no dependes de tu memoria ni de hacer clics manuales ya que si algún día se borra tu configuración, con solo volver a desplegar el código, Grafana se configura solo, como estaba antes, y también, es más rápido, evita errores humanos y es totalmente repetible.

3. El panel "CPU contenedor" y el panel "CPU host" pueden mostrar valores muy distintos. ¿Por qué? ¿Cuál usarías para alertar sobre una aplicación concreta?
- El "CPU contenedor" mide solo el esfuerzo de la aplicación, mientras que el "CPU host" mide el esfuerzo de toda tu máquina
- Para alertar sobre una aplicación concreta creo que usaría el "CPU contenedor", porque así voy a saber exactamente si es mi código el que está consumiendo recursos y no otra cosa que esté pasando en el servidor.

4. ¿Qué diferencia hay entre el evaluation interval y el pending period de una alarma?
- El evaluation interval es cada cuánto tiempo Grafana pregunta si algo anda mal, por ejemplo: cada 10 segundos. El pending period es el tiempo en el que si el sistema detecta un error, no dispara la alarma de inmediato; espera un periodo de por ejemplo 30 segundos para ver si el error persiste, esto evita que lleguen alertas por picos de trabajo momentáneos que se solucionan solos.
