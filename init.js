// init.js
// Conexión a la base de datos (esto crea automáticamente la base de datos si no existe)
dbTFG = db.getSiblingDB('miBaseDeDatos');

// Crear las colecciones necesarias
dbTFG.createCollection("trip");
//db.createCollection("extensionPlaces");

// Verificar si las colecciones fueron creadas correctamente
if (dbTFG.getCollectionNames().includes('trip') 
  //&& db.getCollectionNames().includes('extensionPlaces')
) {
    console.log("✅ Colecciones 'trip' creadas correctamente.");
} else {
    console.log("❌ Error al crear las colecciones.");
}

dbTFG.trip.insertMany([{
  "user": null,
  "date": "2025-05-21 15:19:03",
  "location": "Madrid",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Lagos"
  ],
  "travelPlan": {
    "estimacion_ahorro": {
      "tiempo_ahorrado": "20",
      "energia_ahorrada": "2.4 kwh",
      "horas_estimadas_ahorradas": 3.5
    },
    "lugar_visita": {
      "nombre": "Madrid",
      "coordenadas": {
        "latitud": 40.416775,
        "longitud": -3.70379
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Lagos"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo del Prado",
            "descripcion": "Uno de los museos más importantes del mundo, con una destacada colección de arte europeo, desde el siglo XII hasta el siglo XIX.",
            "actividades": [
              "Visitar la colección permanente",
              "Asistir a una visita guiada especializada"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.413751,
              "longitud": -3.692672
            }
          },
          {
            "nombre": "Museo Reina Sofía",
            "descripcion": "Museo dedicado al arte del siglo XX, con obras de Picasso, Dalí y Joan Miró.",
            "actividades": [
              "Ver 'El Guernica' de Picasso",
              "Explorar la galería de arte contemporáneo"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.406317,
              "longitud": -3.692874
            }
          },
          {
            "nombre": "Jardín Botánico",
            "descripcion": "Lugar ideal para pasear y disfrutar de la naturaleza en plena ciudad, con estanques y zonas ajardinadas.",
            "actividades": [
              "Pasear por los senderos ajardinados",
              "Visitar el invernadero y zonas de estanques"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Lagos",
            "coordenadas": {
              "latitud": 40.417825,
              "longitud": -3.679184
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Palacio de Cristal",
            "descripcion": "Estructura situada dentro del Parque del Retiro, usada para diversas exposiciones de arte. Su estanque proporciona un entorno de lagos.",
            "actividades": [
              "Visitar las exposiciones temporales",
              "Pasear por la zona de lagos del parque"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Lagos",
            "coordenadas": {
              "latitud": 40.415948,
              "longitud": -3.689931
            }
          },
          {
            "nombre": "Museo Nacional Centro de Arte Reina Sofía",
            "descripcion": "Museo nacional de arte del siglo XX.",
            "actividades": [
              "Explorar la galería de arte contemporáneo",
              "Visitar la sección de arte moderno"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.406317,
              "longitud": -3.692874
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo Thyssen-Bornemisza",
            "descripcion": "Museo con una impresionante colección de pintura clásica y moderna.",
            "actividades": [
              "Visitar la colección permanente",
              "Asistir a una visita guiada especializada"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.418118,
              "longitud": -3.691887
            }
          },
          {
            "nombre": "Casa de Campo",
            "descripcion": "Barrio madrileño popular como parque Oficina Real de Acuñación de Moneda y Juego de Cancha Real",
            "actividades": [
              "Hacer paseos en bote en los lagos",
              "Visitar la casa de Campo o el Teleférico del Parque Madrid."
            ],
            "duracion_visita": "3 horas 30 minutos",
            "gusto_asociado": "Lagos",
            "coordenadas": {
              "latitud": 40.41268,
              "longitud": -3.921278
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo Sorolla",
            "descripcion": "Museo dedicado al pintor Joaquín Sorolla con una colección de sus principales obras",
            "actividades": [
              "Visitar una colección permanente",
              "Asistir a una visita guiada especializada"
            ],
            "duracion_visita": "1 hora 30 minutos",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.406553,
              "longitud": -3.677539
            }
          },
          {
            "nombre": "Estanque Grande del Parque del Retiro",
            "descripcion": "Parque concurrido y principal pulmón verde de Madrid.",
            "actividades": [
              "Pasear en barca por el estanque",
              "Visitar la estatua del Ángel Caído"
            ],
            "duracion_visita": "3 horas 30 minutos",
            "gusto_asociado": "Lagos",
            "coordenadas": {
              "latitud": 40.415948,
              "longitud": -3.689931
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Jardín del Buen Retiro",
            "descripcion": "Uno de los espacios verdes más importantes de la ciudad de Madrid con el estanque principal",
            "actividades": [
              "Visitar el estanque Principal del Parque",
              "Tser un paseo por los senderos"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Lagos",
            "coordenadas": {
              "latitud": 40.416667,
              "longitud": -3.691667
            }
          },
          {
            "nombre": "Paseo del Prado (Museo Arqueológico Nacional)",
            "descripcion": "Museo nacional con una grandísima fuente de antigúedad",
            "actividades": [
              "Visitar la Sala de Kush o Santa Basiliada",
              "Ver la sala Préhistoria"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.4011,
              "longitud": -3.7207
            }
          }
        ]
      }
    ]
  },
  "cost": 2655
},{
  "user": null,
  "date": "2025-05-12 15:43:42",
  "location": "Logroño, La Rioja, España",
  "startDate": "2025-04-10",
  "endDate": "2025-04-14",
  "categories": [
    "Monumentos históricos",
    "Montañas",
    "Zoológicos"
  ],
  "travelPlan": {
    "estimacion_ahorro": {
      "tiempo_ahorrado": "15%",
      "energia_ahorrada": "0.05 KWh",
      "horas_estimadas_ahorradas": 4
    },
    "lugar_visita": {
      "nombre": "Logroño, La Rioja, España",
      "coordenadas": {
        "latitud": 42.46272,
        "longitud": -2.44797
      }
    },
    "duracion_viaje": 4,
    "gustos_usuario": [
      "Monumentos históricos",
      "Montañas",
      "Zoológicos"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Catedral de Santa María de la Redonda",
            "descripcion": "Una impresionante catedral con una fachada barroca y gótica.",
            "actividades": [
              "Visita guiada al interior de la catedral",
              "Exploración de la arquitectura exterior"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Monumentos históricos",
            "coordenadas": {
              "latitud": 42.465268,
              "longitud": -2.446488
            }
          },
          {
            "nombre": "Parque del Espolón",
            "descripcion": "Un parque urbano con vistas al río Ebro y zonas de descanso.",
            "actividades": [
              "Paseo por el parque",
              "Observación de la naturaleza"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Montañas",
            "coordenadas": {
              "latitud": 42.461943,
              "longitud": -2.444138
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Sierra de la Demanda",
            "descripcion": "Una cadena montañosa perfecta para la senderismo y la observación de la fauna.",
            "actividades": [
              "Rutas de senderismo",
              "Punto de observación de aves"
            ],
            "duracion_visita": "4.5 horas",
            "gusto_asociado": "Montañas",
            "coordenadas": {
              "latitud": 42.24888,
              "longitud": -3.15946
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Monasterio de San Juan de Ortega",
            "descripcion": "Un monasterio histórico con arquitectura románica.",
            "actividades": [
              "Visita al monasterio",
              "Exploración del jardín"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Monumentos históricos",
            "coordenadas": {
              "latitud": 42.67514,
              "longitud": -3.40221
            }
          },
          {
            "nombre": "Sierra de Celtigera",
            "descripcion": "Una zona de senderismo con vistas espectaculares.",
            "actividades": [
              "Senderismo",
              "Observación de la flora y fauna"
            ],
            "duracion_visita": "2.5 horas",
            "gusto_asociado": "Montañas",
            "coordenadas": {
              "latitud": 42.62963,
              "longitud": -3.82349
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Zoológico de La Rioja",
            "descripcion": "Un zoológico que alberga una variedad de especies animales.",
            "actividades": [
              "Recorrido por las instalaciones",
              "Actividades educativas para niños"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Zoológicos",
            "coordenadas": {
              "latitud": 42.4,
              "longitud": -2.5
            }
          }
        ]
      }
    ]
  },
  "cost": 0
}]);