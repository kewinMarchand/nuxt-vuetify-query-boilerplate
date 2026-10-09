const RETRY_AFTER_SECONDS = 3600

const MAINTENANCE_PAGE = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Site en maintenance</title>
<style>
body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #fff; color: #111; }
main { max-width: 560px; padding: 24px; }
h1 { font-size: 32px; margin: 0 0 16px; }
p { font-size: 16px; line-height: 1.6; }
</style>
</head>
<body>
<main>
<h1>Site en maintenance</h1>
<p>Le site est momentanément indisponible pour une opération de maintenance. Merci de revenir dans une heure environ.</p>
</main>
</body>
</html>`

export default defineEventHandler((event) => {
  if (process.env.MAINTENANCE !== '1') return
  setResponseStatus(event, 503)
  setHeader(event, 'retry-after', RETRY_AFTER_SECONDS)
  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  return MAINTENANCE_PAGE
})
