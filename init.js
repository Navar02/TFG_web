// init.js
// Conexión a la base de datos (esto crea automáticamente la base de datos si no existe)
db = db.getSiblingDB('miBaseDeDatos'); // Reemplázalo con el nombre de tu base de datos

// Crear las colecciones necesarias
db.createCollection("trip");
db.createCollection("extensionPlaces");

// Verificar si las colecciones fueron creadas correctamente
if (db.getCollectionNames().includes('trip') && db.getCollectionNames().includes('extensionPlaces')) {
    print("✅ Colecciones 'trip' y 'extensionPlaces' creadas correctamente.");
} else {
    print("❌ Error al crear las colecciones.");
}