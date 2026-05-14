# KommentSection — Google Apps Script Backend

## Código para Google Apps Script

Copia y pega esto en el editor de scripts de Google Sheets.

```javascript
// ============================================================
// KommentSection — Backend de comentarios para Verano Media
// ============================================================

// Configuración
const SHEET_NAME = 'Comentarios';
const HEADERS = ['Timestamp', 'Nombre', 'Email', 'Comentario', 'Artículo (Slug)', 'Estado', 'Notas'];

// ─── POST: Recibir un nuevo comentario ─────────────────────

function doPost(e) {
  try {
    // Soporta JSON y form-urlencoded
    let params;
    if (e.postData && e.postData.type === 'application/json') {
      params = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      params = e.parameter;
    } else {
      throw new Error('No data received');
    }

    // Validación
    const name = (params.name || '').trim();
    const email = (params.email || '').trim();
    const comment = (params.comment || '').trim();
    const article = (params.article || '').trim();

    const errors = [];
    if (!name) errors.push('El nombre es obligatorio');
    if (!email) errors.push('El correo es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Correo inválido');
    if (!comment) errors.push('El comentario es obligatorio');
    if (!article) errors.push('Falta el artículo');

    if (errors.length > 0) {
      return respond({ success: false, errors }, 400);
    }

    // Escribir en la hoja
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0066CC');
      headerRange.setFontColor('#FFFFFF');
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      comment,
      article,
      'Pendiente',  // Estado: Pendiente → Aprobado → Rechazado
      ''
    ]);

    // Opcional: enviar notificación por correo
    // MailApp.sendEmail({
    //   to: Session.getActiveUser().getEmail(),
    //   subject: `Nuevo comentario en "${article}" — ${name}`,
    //   body: `De: ${name} (${email})\n\nComentario:\n${comment}\n\nArtículo: ${article}`
    // });

    return respond({
      success: true,
      message: 'Comentario recibido. Gracias por tu opinión.'
    });

  } catch (err) {
    return respond({ success: false, errors: [err.message] }, 500);
  }
}

// ─── GET: Obtener comentarios aprobados de un artículo ─────

function doGet(e) {
  try {
    const article = e.parameter.article || '';
    if (!article) {
      return respond({ success: false, errors: ['Falta el artículo'] }, 400);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return respond({ success: true, data: [] });
    }

    const data = sheet.getDataRange().getValues();
    const rows = data.slice(1); // Saltar encabezados

    const comments = rows
      .filter(row => {
        const rowArticle = String(row[4] || '').trim().toLowerCase();
        const rowStatus = String(row[5] || '').trim();
        return rowArticle === article.toLowerCase() && rowStatus === 'Aprobado';
      })
      .map(row => ({
        timestamp: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
        name: row[1],
        comment: row[3],
        // NO incluimos email por privacidad
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Más recientes primero
      .slice(0, 50); // Máximo 50 comentarios visibles

    return respond({ success: true, data: comments });

  } catch (err) {
    return respond({ success: false, errors: [err.message] }, 500);
  }
}

// ─── Utilerías ─────────────────────────────────────────────

function respond(payload, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Instrucciones de Setup (5 minutos)

### Paso 1: Crear la hoja de cálculo
1. Ve a [sheets.new](https://sheets.new)
2. Renómbrala: **"Verano Media — Comentarios del Blog"**
3. Copia el **ID** de la URL: `https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit`

### Paso 2: Crear el script
1. En la hoja, ve a **Extensiones → Apps Script**
2. Borra el código por defecto y pega el código de arriba
3. Presiona **Ctrl+S** para guardar, nómbralo **"KommentSection"**

### Paso 3: Desplegar
1. Haz clic en **"Implementar" → "Nueva implementación"**
2. Tipo: **"Aplicación web"**
3. Ejecutar como: **"Yo"** (tu cuenta)
4. Quién tiene acceso: **"Cualquier usuario"** (necesario para recibir comentarios anónimos)
5. Haz clic en **"Implementar"**
6. **Copia la URL** que aparece (algo como `https://script.google.com/macros/s/AKf.../exec`)
7. Autoriza la app cuando te pida permisos

### Paso 4: Conectar con el blog
La URL que copiaste se configura en el componente React. Abre `src/components/KommentSection.tsx` y pega la URL en la constante `APPS_SCRIPT_URL`.

### Flujo de moderación
1. Los comentarios llegan como **"Pendiente"** en la columna F
2. Para aprobar: cambia "Pendiente" → **"Aprobado"** en la celda
3. Para rechazar: cambia "Pendiente" → **"Rechazado"** (no se muestra)
4. Solo los comentarios **"Aprobado"** aparecen en el blog

### Columnas de la hoja
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Nombre | Email | Comentario | Artículo (Slug) | Estado | Notas |
