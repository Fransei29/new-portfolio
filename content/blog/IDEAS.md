# Ideas de posts

Temas sacados de proyectos que ya construiste. La ventaja es que no hay que investigar nada: ya tenés el código, las decisiones y los errores. Escribir sobre lo que hiciste rinde más que escribir sobre lo que se supone que hay que hacer.

Ordenados por facilidad de escritura, no por potencial de tráfico.

---

## 1. Mercado Pago en Next.js: el flujo completo con webhooks

**Proyecto:** a.cer0
**Ángulo:** casi toda la documentación en inglés ignora Mercado Pago, y la oficial no muestra el flujo completo con confirmación por webhook y estados intermedios.
**Contenido:** crear la preferencia, redirigir, recibir el webhook, verificar la firma, actualizar el pedido. El caso que nadie documenta: qué pasa si el webhook llega antes que el redirect.
**Por qué rankea:** búsqueda con mucha intención y poca competencia en inglés. Sos de Argentina, es tu ventaja natural.

## 2. Transferencia bancaria como método de pago: el flujo que ningún tutorial cubre

**Proyecto:** a.cer0
**Ángulo:** fuera de EE.UU. y Europa la transferencia sigue siendo enorme, y no hay pasarela que la maneje. Hay que construir el flujo de confirmación manual.
**Contenido:** estados del pedido, panel para que el admin confirme o rechace, mails automáticos en cada transición, qué hacer con los pedidos que nunca se pagan.
**Por qué rankea:** casi nadie escribió esto. Búsqueda chica pero sin competencia.

## 3. Revocar un JWT al instante sin guardar sesiones

**Proyecto:** a.cer0 (token versioning)
**Ángulo:** el problema clásico de los JWT es que no se pueden revocar hasta que expiran. La solución con versionado es simple y poco conocida.
**Contenido:** un entero en la tabla de usuarios, incluirlo en el payload, compararlo al validar. Al incrementarlo, todos los tokens de ese usuario mueren. Comparación honesta contra sesiones en Redis.
**Por qué rankea:** "how to revoke jwt" tiene volumen alto y sostenido.

## 4. Qué aprendí construyendo 20 proyectos con Next.js App Router

**Proyecto:** todos
**Ángulo:** post de experiencia acumulada, no tutorial. Los que mejor funcionan son concretos y admiten errores.
**Contenido:** cuándo Server Component y cuándo no, el error de poner `'use client'` demasiado arriba, cuándo `force-dynamic` es necesario y cuándo es pereza, qué patrones repetís siempre.
**Por qué rankea:** los posts de experiencia se comparten mucho más que los tutoriales. Bueno para LinkedIn.

## 5. Subida y OCR de documentos: procesar PDFs sin bloquear el request

**Proyecto:** Comply DQ
**Ángulo:** procesar archivos pesados en serverless tiene límites de tiempo y memoria que nadie menciona hasta que te los chocás.
**Contenido:** subida directa a storage, procesamiento en background, polling o webhooks para avisar cuando terminó, qué hacer con los archivos corruptos.
**Por qué rankea:** problema real y recurrente, con soluciones dispersas.

## 6. Multi-tenancy en una plataforma de administración de consorcios

**Proyecto:** Bellum
**Ángulo:** decisión arquitectónica con trade-offs reales: una base por tenant, un esquema por tenant, o discriminador por columna.
**Contenido:** por qué elegiste lo que elegiste, cómo aislás los datos, qué pasa cuando un tenant crece mucho más que el resto.
**Por qué rankea:** búsqueda de nicho pero con lectores de alto valor (gente construyendo SaaS).

## 7. De EmailJS a envío server-side: por qué las claves no van en el navegador

**Proyecto:** este mismo sitio
**Ángulo:** lo acabás de hacer, está fresco, y el error es extremadamente común.
**Contenido:** por qué EmailJS es cómodo pero expone credenciales, cómo se ve el ataque, la migración a una ruta de API, double opt-in y por qué importa para la entregabilidad.
**Por qué rankea:** mucha gente arranca con EmailJS y en algún momento busca cómo salir.

## 8. Rate limiting sin Redis: hasta dónde llega el estado en memoria

**Proyecto:** este mismo sitio
**Ángulo:** post corto y honesto sobre una solución imperfecta pero suficiente.
**Contenido:** la implementación en memoria, por qué en serverless el límite es por instancia, cuándo eso alcanza y cuándo hay que migrar a Upstash.
**Por qué rankea:** "rate limiting nextjs" tiene volumen y la mayoría de las respuestas asumen Redis desde el minuto cero.

---

## Cómo encarar la escritura

**Empezá por el 1 o el 7.** El 1 porque es donde tenés ventaja competitiva real (Mercado Pago + inglés). El 7 porque lo hiciste esta semana y lo tenés fresco.

**Sobre la frecuencia:** dos posts buenos por mes rinden más que ocho apurados. Google premia la constancia, y un post flojo te resta autoridad.

**Estructura que funciona:**
1. El problema concreto que tuviste (no teoría)
2. Qué intentaste primero y por qué no alcanzó
3. La solución, con código real
4. Qué te costó — los trade-offs honestos convencen más que vender la solución
5. Cuándo NO usar este enfoque

**Sobre el bilingüe:** escribí primero en el idioma que te salga más natural y después traducí. No traduzcas literal — adaptá los ejemplos.

**Antes de publicar:** revisá que `description` tenga entre 120 y 155 caracteres, que el slug contenga la búsqueda objetivo, y que haya al menos un enlace interno a otro post o a un proyecto.
