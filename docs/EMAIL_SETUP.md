# Setup de email y newsletter

El código está listo y probado. Falta lo que solo se puede hacer desde tu cuenta: crear el proyecto en Resend y verificar el dominio por DNS. Toma unos 20 minutos, más la propagación.

Hasta completar el paso 2, los envíos van a fallar con un error de dominio no verificado. Es esperable.

---

## 1. Crear la cuenta

Registrate en [resend.com](https://resend.com). El plan gratuito da 3.000 mails por mes y 100 por día — de sobra para arrancar.

## 2. Verificar el dominio

En **Domains → Add Domain**, cargá `francoseiler.com`.

Resend te va a mostrar tres registros para cargar en tu proveedor de DNS (donde tengas el dominio: Vercel, Cloudflare, NIC.ar, etc.):

| Tipo | Para qué sirve |
| --- | --- |
| `MX` | Recibe los reportes de rebote |
| `TXT` (SPF) | Autoriza a Resend a enviar en tu nombre |
| `TXT` (DKIM) | Firma criptográfica de cada mail |

Copiá los valores exactos que te da Resend — son únicos de tu cuenta.

La propagación tarda entre 15 minutos y unas horas. El estado en Resend pasa a **Verified** cuando está listo.

> **Por qué importa:** sin SPF y DKIM, Gmail y Outlook mandan tus mails directo a spam. Con un newsletter eso es fatal: una vez que te marcan como spam, recuperarse es muy difícil.

### DMARC (recomendado, no obligatorio)

Cuando el dominio esté verificado, agregá un registro TXT más:

```
Nombre:  _dmarc.francoseiler.com
Valor:   v=DMARC1; p=none; rua=mailto:seilerfranco317@gmail.com
```

`p=none` solo monitorea, sin rechazar nada. Después de unas semanas sin problemas, podés endurecerlo a `p=quarantine`.

## 3. Crear la audiencia del newsletter

En **Audiences → Create Audience**, ponele un nombre (ej. "Blog"). Copiá el ID que aparece en la URL: es el `RESEND_AUDIENCE_ID`.

## 4. Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

```bash
cp .env.example .env.local
```

Para el secreto de los tokens:

```bash
openssl rand -base64 32
```

`.env.local` está en `.gitignore` — no se commitea nunca.

**En Vercel**, cargá las mismas variables en Settings → Environment Variables. Las de `.env.local` solo aplican en tu máquina.

## 5. Probar

```bash
npm run dev
```

- Contacto: mandá un mensaje desde `/contact` y fijate que llegue a `CONTACT_INBOX`.
- Newsletter: suscribite desde `/blog`, abrí el mail de confirmación, hacé clic. Deberías aparecer en la audiencia de Resend.
- Baja: usá el enlace de unsubscribe de cualquier mail y verificá que quede marcado como `unsubscribed`.

---

## Cómo mandar un newsletter

El sitio junta suscriptores, pero el envío se hace desde Resend — así no hay que construir un panel de administración.

1. Entrá a **Broadcasts → Create Broadcast**.
2. Elegí la audiencia.
3. Escribí el mail. Incluí siempre `{{{RESEND_UNSUBSCRIBE_URL}}}` — Resend lo reemplaza por el enlace de baja de cada persona.
4. Mandate una prueba a vos primero.
5. Enviá.

### Qué mandar

Lo que mejor funciona es un mail corto por artículo nuevo: título, dos o tres líneas de por qué vale la pena, y el enlace. No hace falta reproducir el post entero — el objetivo es que vuelvan al sitio.

---

## Arquitectura

```
Formulario de suscripción
  → POST /api/newsletter/subscribe
      valida, aplica rate limit, y manda mail de confirmación
      (NO da de alta todavía)
  → clic en el mail
  → GET /api/newsletter/confirm?token=...
      valida la firma HMAC y da de alta en Resend
  → redirige a /newsletter/confirmed
```

**Por qué double opt-in.** Sin él, cualquiera puede suscribir la dirección de otra persona. Esa persona marca el mail como spam, y esas quejas destruyen la reputación del dominio — que es lo que determina si tus mails llegan a la bandeja de entrada. Además es requisito del GDPR.

**Por qué tokens firmados.** El token lleva el email y la acción firmados con HMAC-SHA256. Así no hace falta una tabla de pendientes: si la firma valida, el pedido es auténtico. Sin firma, conocer una dirección alcanzaría para darla de baja.

**Rate limiting.** Es en memoria, por instancia. Frena el abuso casual pero no un ataque distribuido, porque en serverless cada instancia tiene su propio contador. Si algún día hace falta, se migra a Upstash Redis sin tocar las rutas.

## Costos

| Volumen | Precio |
| --- | --- |
| Hasta 3.000 mails/mes | Gratis |
| Hasta 50.000 mails/mes | USD 20/mes |

Con 500 suscriptores y un envío semanal son 2.000 mails al mes: entra en el plan gratuito.
