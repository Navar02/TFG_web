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
  "date": "2025-04-07 14:07:15",
  "location": "Barcelona",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Barcelona",
      "coordenadas": {
        "latitud": 41.3851,
        "longitud": 2.1734
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo Picasso",
            "descripcion": "Museo dedicado a las obras del famoso pintor Pablo Picasso.",
            "actividades": [
              "Visitar las diferentes salas de exposición",
              "Asistir a talleres de arte",
              "Explorar la arquitectura del edificio"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.3868,
              "longitud": 2.1867
            }
          },
          {
            "nombre": "Parque de la Ciudadela",
            "descripcion": "Uno de los parques más famosos de Barcelona, ideal para pasear y relajarse.",
            "actividades": [
              "Pasear por los jardines",
              "Visitar el Zoológico",
              "Explorar el Museo de la Ciudadela"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.3833,
              "longitud": 2.2028
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo Nacional de Arte de Cataluña",
            "descripcion": "Gran museo que alberga una vasta colección de arte catalán.",
            "actividades": [
              "Visitar las salas de arte románico",
              "Explorar el arte moderno y contemporáneo",
              "Disfrutar de las vistas desde la terraza"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.411,
              "longitud": 2.171
            }
          },
          {
            "nombre": "Parque Güell",
            "descripcion": "Parque diseñado por Antoni Gaudí con vistas panorámicas de Barcelona.",
            "actividades": [
              "Visitar la sala hipóstila",
              "Explorar los shelters y el banco sinuoso",
              "Tomar fotos en los miradores"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.4138,
              "longitud": 2.1526
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "MACBA (Museo de Arte Contemporáneo de Barcelona)",
            "descripcion": "Museo dedicado al arte contemporáneo con exposiciones innovadoras.",
            "actividades": [
              "Visitar las exposiciones temporales",
              "Explorar la colección permanente",
              "Participar en actividades educativas"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.3857,
              "longitud": 2.1688
            }
          },
          {
            "nombre": "Jardines de la comandancia",
            "descripcion": "Jardines perfectos para dar un paseo tranquilo después de visitar tantis maqu de gran interé veroverar barbacoa.",
            "actividades": [
              "Pasear por los jardines",
              "Descansar en las áreas verdes"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.3833,
              "longitud": 2.1528
            }
          },
          {
            "nombre": "Plaza de toros La Monumental",
            "descripcion": "Miguel Ángel Blázquez",
            "actividades": [
              "Barrigón"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Sacale punta al",
            "coordenadas": {
              "latitud": 41.404,
              "longitud": 2.1865
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Fundación Joan Miró",
            "descripcion": "Museo dedicado al artista Joan Miró, con obras y colección permanente.",
            "actividades": [
              "Visitar las salas de Miró",
              "Excursión en la obra",
              "Visita guiada de Thyssen"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.3923,
              "longitud": 2.1289
            }
          },
          {
            "nombre": "Parque del Laberinto de Horta",
            "descripcion": "El jardín más antiguo de Barcelona, con un laberinto de setos.",
            "actividades": [
              "Explorar el laberinto",
              "Pasear por los jardines",
              "Visitar la pérgola"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.4245,
              "longitud": 2.1647
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Fundación Antoni Tàpies",
            "descripcion": "Museo dedicado al artista Antoni Tàpies.",
            "actividades": [
              "Visitar las exposiciones temporales",
              "Explorar el edificio",
              "Participar en actividades educativas"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.3968,
              "longitud": 2.1764
            }
          },
          {
            "nombre": "Parque del Forum",
            "descripcion": "Parque moderno con vistas al mar Mediterráneo.",
            "actividades": [
              "Pasear por los jardines",
              "Visitar el Centro de Arte Contemporáneo",
              "Relajarse en la playa"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.4086,
              "longitud": 2.2111
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-07 14:12:17",
  "location": "logroño",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Logroño",
      "coordenadas": {
        "latitud": 42.4633,
        "longitud": -2.4316
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de La Rioja",
            "descripcion": "Museo que ofrece una visión general de la historia, arte y cultura de La Rioja.",
            "actividades": [
              "Visitar las exposiciones permanentes",
              "Asistir a una exposición temporal",
              "Participar en un taller"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.4648,
              "longitud": -2.4516
            }
          },
          {
            "nombre": "Parque del Espolón",
            "descripcion": "Un parque protagonizado por un largo paseo arbolado, conocido como el paseo del Espolón.",
            "actividades": [
              "Pasear por el parque",
              "Sentarse en un banco a disfrutar del paisaje",
              "Feedear a los patos"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.4625,
              "longitud": -2.438
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Fundación Dalí - Museo Escuela de Logroño",
            "descripcion": "Centro cultural que alberga obras del famoso artista Salvador Dalí.",
            "actividades": [
              "Ver las obras de Salvador Dalí",
              "Participar en un taller de arte",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.4689,
              "longitud": -2.4519
            }
          },
          {
            "nombre": "Parque de la Herradura",
            "descripcion": "Espacio verde amplio y tranquilo, ideal para un día de relax.",
            "actividades": [
              "Pasear por los senderos",
              "Disfrutar de un picnic",
              "Observar aves"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.4505,
              "longitud": -2.4308
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo de la Confluencia",
            "descripcion": "Un museo dedicado a la arqueología de la región, ubicado cerca del río Ebro.",
            "actividades": [
              "Explorar las exposiciones arqueológicas",
              "Apreciar los hallazgos históricos",
              "Ver un documental sobre la región"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.4588,
              "longitud": -2.4597
            }
          },
          {
            "nombre": "Jardín de Braulio Foz",
            "descripcion": "Jardín al aire libre conocido por su variedad floral y paisajismo elaborado.",
            "actividades": [
              "Disfrutar de la flora variada",
              "Tomar fotos",
              "Contemplar la fuente"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.4599,
              "longitud": -2.4329
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Centro de Arte y Cultura de Logroño",
            "descripcion": "Espacio dedicado a la promoción y exhibición de arte y cultura contemporánea.",
            "actividades": [
              "Visitar una exposición contemporánea",
              "Asistir a una charla o taller",
              "Participar en eventos culturales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.4654,
              "longitud": -2.4422
            }
          },
          {
            "nombre": "Parque de cespedes",
            "descripcion": "Lugar ideal para tomar el sol.",
            "actividades": [
              "Tumbarse a tomar el sol",
              "Hablar con amigos"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.4462,
              "longitud": -2.4558
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Museo Wine",
            "descripcion": "Museo que presentara la historia del vino en la zona.",
            "actividades": [
              "Pasear por la bodega",
              "Beberse una copa de vino"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.4518,
              "longitud": -2.4963
            }
          },
          {
            "nombre": "Parque del Ayuntamiento",
            "descripcion": "Parque protagonizado por fuentes, esculturas y ramas.",
            "actividades": [
              "Pasear y ver fuentes",
              "Sentarse en un banco a disfrutar del paisaje",
              "Feedear a los patos"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.465,
              "longitud": -2.4284
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-07 14:13:01",
  "location": "Calahorra",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Calahorra",
      "coordenadas": {
        "latitud": 42.331,
        "longitud": -2.4286
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de la Concejalía de Cultura",
            "descripcion": "Museo que alberga exposiciones temporales y permanentes sobre la historia y la cultura de Calahorra.",
            "actividades": [
              "Visitar exposiciones temporales",
              "Explorar la sección de arqueología",
              "Participar en talleres culturales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.331,
              "longitud": -2.4286
            }
          },
          {
            "nombre": "Paseo Príncipe de Viana",
            "descripcion": "Un paseo peatonal junto al río Cidacos, ideal para caminar y disfrutar de las vistas.",
            "actividades": [
              "Pasear junto al río",
              "Tomar un café en alguna terraza",
              "Hacer fotos del paisaje"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.328,
              "longitud": -2.4461
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de La Rioja",
            "descripcion": "Museo que ofrece una visión completa de la historia y la cultura de La Rioja, con colecciones arqueológicas y etnográficas.",
            "actividades": [
              "Explorar las colecciones permanentes",
              "Visitar exposiciones temporales",
              "Participar en actividades educativas"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.268,
              "longitud": -1.958
            }
          },
          {
            "nombre": "Parque del Espolón",
            "descripcion": "Uno de los parques más emblemáticos de Calahorra, ideal para un picnic o un paseo tranquilo.",
            "actividades": [
              "Hacer un picnic",
              "Jugar con niños en el parque infantil",
              "Pasear por los jardines"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.327,
              "longitud": -2.44
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo Iberia Vetus",
            "descripcion": "Museo arqueológico que ofrece una mirada a la época prerromana en la región, con una colección de objetos antiguos.",
            "actividades": [
              "Explorar la colección de arte prerromano",
              "Participar en visitas guiadas",
              "Ver documentos arqueológicos"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.331,
              "longitud": -2.4207
            }
          },
          {
            "nombre": "Parque de la Rivereña",
            "descripcion": "Un parque cerca del río Cidacos, perfecto para disfrutar del aire libre y hacer deporte.",
            "actividades": [
              "Jogging",
              "Pasear junto al río",
              "Relajarse en el césped"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.311,
              "longitud": -2.4378
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo del Feural",
            "descripcion": "Este museo para equipos ferroviarios representa la historia del trabajo y la sociedad norteña.",
            "actividades": [
              "Reconocimiento histórico de maquinaria antigua",
              "Documentos históricos",
              "Recorridos virtuales comunes."
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 42.34,
              "longitud": -2.4374
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque Nuevo",
            "descripcion": "Espacio verde y recreativo donde se desarrollan actividades de ocio, deporte y naturaleza",
            "actividades": [
              "Deportes de campo",
              "Paseos interminables",
              "Deporte común"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 42.325,
              "longitud": -2.4231
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 12:02:28",
  "location": "Zaragoza",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Zaragoza",
      "coordenadas": {
        "latitud": 41.648823,
        "longitud": -0.889085
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Zaragoza",
            "descripcion": "Museo que alberga una vasta colección de arte y arqueología, incluyendo piezas de la antigua Cesaraugusta.",
            "actividades": [
              "Visitar la exposición permanente",
              "Asistir a talleres educativos",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.649029,
              "longitud": -0.894758
            }
          },
          {
            "nombre": "Parque Grande José Antonio Labordeta",
            "descripcion": "El parque urbano más grande de Zaragoza, ideal para paseos y actividades al aire libre.",
            "actividades": [
              "Pasear por los jardines",
              "Visitar el estanque",
              "Realizar un picnic"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.63552,
              "longitud": -0.899594
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de las Termas",
            "descripcion": "Museo que muestra los restos de unas termas romanas y ofrece una visión de la vida cotidiana en la antigua César Augusta.",
            "actividades": [
              "Explorar las ruinas de las termas",
              "Visitar las exposiciones asociadas",
              "Aprender sobre la historia romana"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648999,
              "longitud": -0.88894
            }
          },
          {
            "nombre": "Paseo de la Independencia",
            "descripcion": "Una de las principales avenidas de Zaragoza, llena de tiendas, cafés y edificios históricos.",
            "actividades": [
              "Ir de compras",
              "Tomar un café en una terraza",
              "Admirar la arquitectura"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.642544,
              "longitud": -0.884784
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo Goya – Colección Ibercaja",
            "descripcion": "Museo dedicado a Francisco de Goya, con una colección importante de sus obras.",
            "actividades": [
              "Visitar las exposiciones permanentes",
              "Asistir a conferencias y talleres",
              "Explorar las exhibiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.651632,
              "longitud": -0.885372
            }
          },
          {
            "nombre": "Parque de la Bombarda",
            "descripcion": "Pequeño pero encantador parque en el centro de Zaragoza, ideal para un descanso tranquilo.",
            "actividades": [
              "Leer un libro bajo la sombra",
              "Pasear por los senderos",
              "Admirar la vegetación"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.647085,
              "longitud": -0.885776
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo Diocesano de Zaragoza",
            "descripcion": "Museo que albergue arte sacro y una impresionante colección de tapices.",
            "actividades": [
              "Visitar la colección de arte sacro",
              "Admirar los tapices",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648868,
              "longitud": -0.885614
            }
          },
          {
            "nombre": "Jardín Botánico de Zaragoza",
            "descripcion": "Un entorno tranquilo para disfrutar de la flora local y exótica.",
            "actividades": [
              "Observar las plantas y flores",
              "Realizar un paseo relajante",
              "Participar en visitas guiadas"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.652324,
              "longitud": -0.876432
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Museo del Forum",
            "descripcion": "Museo que ofreci una visión completa del proceso de evolución de la ciudad a lo largo de la historia",
            "actividades": [
              "Visitar las exposiciones arqueológicas",
              "Participar en actividades educativas",
              "Explorar los restos históricos"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.652103,
              "longitud": -0.876759
            }
          },
          {
            "nombre": "Huerta Santa Fe",
            "descripcion": "Un lugar ideal para vivir la cultura urbana y disfrutar del río Ebro.",
            "actividades": [
              "Pasear por el río",
              "Disfrutar del ambiente bares y restaurantes",
              "Participar en actividades culturales"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.64779766951387,
              "longitud": -0.899846709050103
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 12:03:56",
  "location": "Zaragoza",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Zaragoza",
      "coordenadas": {
        "latitud": 41.648823,
        "longitud": -0.888171
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Zaragoza",
            "descripcion": "El Museo de Zaragoza alberga una vasta colección de arte y arqueología de la región.",
            "actividades": [
              "Explorar la exposición arqueológica",
              "Visitar la sección de arte moderno",
              "Asistir a una conferencia"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.647627,
              "longitud": -0.886358
            }
          },
          {
            "nombre": "Parque José Antonio Labordeta",
            "descripcion": "Un parque urbano ideal para pasear y relajarse, con áreas verdes y lagos.",
            "actividades": [
              "Paseo por los senderos",
              "Alquiler de botes en el lago",
              "Picnic en el parque"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.661108,
              "longitud": -0.933401
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo volvieron Torres",
            "descripcion": "Este museo muestra la historia y artistas locales en la capital del alto Aragón.",
            "actividades": [
              "Ver las exposiciones de arte contemporáneo",
              "Participar en talleres artísticos",
              "Visitar la tienda de souvenirs"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.650572,
              "longitud": -0.897354
            }
          },
          {
            "nombre": "Jardín Botánico de Zaragoza",
            "descripcion": "Un jardín botánico con una amplia variedad de plantas y flores, perfecto para los amantes de la naturaleza.",
            "actividades": [
              "Visitar las diferentes secciones botánicas",
              "Participar en una visita guiada",
              "Relajarse en las áreas de picnic"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.640786,
              "longitud": -0.899873
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo del Foro de Caesaraugusta",
            "descripcion": "Este museo ofrece una interesante excursión por los restos de una antigua ciudad romana.",
            "actividades": [
              "Explorar los restos arqueológicos",
              "Visitar el anfiteatro",
              "Participar en una visita guiada"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.646231,
              "longitud": -0.898778
            }
          },
          {
            "nombre": "Parque del Agua Luis Buñuel",
            "descripcion": "Un parque acuático con fuentes, puentes y áreas de juego para todas las edades.",
            "actividades": [
              "Pasear por los senderos",
              "Disfrutar de las fuentes de agua",
              "Picarnic en las áreas de descanso"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.653386,
              "longitud": -0.915076
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo Goya - Colegio de San Vicente de Paúl",
            "descripcion": "Un espacio dedicado al estudio de la obra de Francisco de Goya.",
            "actividades": [
              "Ver las exposiciones permanentes y temporales",
              "Participar en actividades educativas",
              "Visitar la tienda del museo"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.637557,
              "longitud": -0.905829
            }
          },
          {
            "nombre": "Parque de los Resultanos",
            "descripcion": "Ideal para los más pequeños, con kioscos, áreas de juego y un lugar para picnics con familiares.",
            "actividades": [
              "España del pequeño",
              "Moverse entre zonas naturales",
              "Observar las estrellas en el planetario"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.649462,
              "longitud": -0.881659
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque Grande José Antonio Labordeta",
            "descripcion": "Es uno de los más grandes de España, con jardines, lagos y zonas de recreo.",
            "actividades": [
              "Observar exposición de animales",
              "Visitar jardines rosales y peces",
              "Picarnic en el parque"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.637146,
              "longitud": -0.873593
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 12:14:07",
  "location": "Zaragoza",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Zaragoza",
      "coordenadas": {
        "latitud": 41.648823,
        "longitud": -0.889085
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Zaragoza",
            "descripcion": "Museo que alberga una vasta colección de arte y arqueología, incluyendo piezas de la antigua Cesaraugusta.",
            "actividades": [
              "Visitar la exposición permanente",
              "Asistir a talleres educativos",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.649029,
              "longitud": -0.894758
            }
          },
          {
            "nombre": "Parque Grande José Antonio Labordeta",
            "descripcion": "El parque urbano más grande de Zaragoza, ideal para paseos y actividades al aire libre.",
            "actividades": [
              "Pasear por los jardines",
              "Visitar el estanque",
              "Realizar un picnic"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.63552,
              "longitud": -0.899594
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de las Termas",
            "descripcion": "Museo que muestra los restos de unas termas romanas y ofrece una visión de la vida cotidiana en la antigua César Augusta.",
            "actividades": [
              "Explorar las ruinas de las termas",
              "Visitar las exposiciones asociadas",
              "Aprender sobre la historia romana"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648999,
              "longitud": -0.88894
            }
          },
          {
            "nombre": "Paseo de la Independencia",
            "descripcion": "Una de las principales avenidas de Zaragoza, llena de tiendas, cafés y edificios históricos.",
            "actividades": [
              "Ir de compras",
              "Tomar un café en una terraza",
              "Admirar la arquitectura"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.642544,
              "longitud": -0.884784
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo Goya – Colección Ibercaja",
            "descripcion": "Museo dedicado a Francisco de Goya, con una colección importante de sus obras.",
            "actividades": [
              "Visitar las exposiciones permanentes",
              "Asistir a conferencias y talleres",
              "Explorar las exhibiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.651632,
              "longitud": -0.885372
            }
          },
          {
            "nombre": "Parque de la Bombarda",
            "descripcion": "Pequeño pero encantador parque en el centro de Zaragoza, ideal para un descanso tranquilo.",
            "actividades": [
              "Leer un libro bajo la sombra",
              "Pasear por los senderos",
              "Admirar la vegetación"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.647085,
              "longitud": -0.885776
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo Diocesano de Zaragoza",
            "descripcion": "Museo que albergue arte sacro y una impresionante colección de tapices.",
            "actividades": [
              "Visitar la colección de arte sacro",
              "Admirar los tapices",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648868,
              "longitud": -0.885614
            }
          },
          {
            "nombre": "Jardín Botánico de Zaragoza",
            "descripcion": "Un entorno tranquilo para disfrutar de la flora local y exótica.",
            "actividades": [
              "Observar las plantas y flores",
              "Realizar un paseo relajante",
              "Participar en visitas guiadas"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.652324,
              "longitud": -0.876432
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Museo del Forum",
            "descripcion": "Museo que ofreci una visión completa del proceso de evolución de la ciudad a lo largo de la historia",
            "actividades": [
              "Visitar las exposiciones arqueológicas",
              "Participar en actividades educativas",
              "Explorar los restos históricos"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.652103,
              "longitud": -0.876759
            }
          },
          {
            "nombre": "Huerta Santa Fe",
            "descripcion": "Un lugar ideal para vivir la cultura urbana y disfrutar del río Ebro.",
            "actividades": [
              "Pasear por el río",
              "Disfrutar del ambiente bares y restaurantes",
              "Participar en actividades culturales"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.64779766951387,
              "longitud": -0.899846709050103
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 12:15:18",
  "location": "Zaragoza",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Zaragoza",
      "coordenadas": {
        "latitud": 41.648823,
        "longitud": -0.889085
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Zaragoza",
            "descripcion": "Museo que alberga una vasta colección de arte y arqueología, incluyendo piezas de la antigua Cesaraugusta.",
            "actividades": [
              "Visitar la exposición permanente",
              "Asistir a talleres educativos",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.649029,
              "longitud": -0.894758
            }
          },
          {
            "nombre": "Parque Grande José Antonio Labordeta",
            "descripcion": "El parque urbano más grande de Zaragoza, ideal para paseos y actividades al aire libre.",
            "actividades": [
              "Pasear por los jardines",
              "Visitar el estanque",
              "Realizar un picnic"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.63552,
              "longitud": -0.899594
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de las Termas",
            "descripcion": "Museo que muestra los restos de unas termas romanas y ofrece una visión de la vida cotidiana en la antigua César Augusta.",
            "actividades": [
              "Explorar las ruinas de las termas",
              "Visitar las exposiciones asociadas",
              "Aprender sobre la historia romana"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648999,
              "longitud": -0.88894
            }
          },
          {
            "nombre": "Paseo de la Independencia",
            "descripcion": "Una de las principales avenidas de Zaragoza, llena de tiendas, cafés y edificios históricos.",
            "actividades": [
              "Ir de compras",
              "Tomar un café en una terraza",
              "Admirar la arquitectura"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.642544,
              "longitud": -0.884784
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo Goya – Colección Ibercaja",
            "descripcion": "Museo dedicado a Francisco de Goya, con una colección importante de sus obras.",
            "actividades": [
              "Visitar las exposiciones permanentes",
              "Asistir a conferencias y talleres",
              "Explorar las exhibiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.651632,
              "longitud": -0.885372
            }
          },
          {
            "nombre": "Parque de la Bombarda",
            "descripcion": "Pequeño pero encantador parque en el centro de Zaragoza, ideal para un descanso tranquilo.",
            "actividades": [
              "Leer un libro bajo la sombra",
              "Pasear por los senderos",
              "Admirar la vegetación"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.647085,
              "longitud": -0.885776
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo Diocesano de Zaragoza",
            "descripcion": "Museo que albergue arte sacro y una impresionante colección de tapices.",
            "actividades": [
              "Visitar la colección de arte sacro",
              "Admirar los tapices",
              "Explorar las exposiciones temporales"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.648868,
              "longitud": -0.885614
            }
          },
          {
            "nombre": "Jardín Botánico de Zaragoza",
            "descripcion": "Un entorno tranquilo para disfrutar de la flora local y exótica.",
            "actividades": [
              "Observar las plantas y flores",
              "Realizar un paseo relajante",
              "Participar en visitas guiadas"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.652324,
              "longitud": -0.876432
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Museo del Forum",
            "descripcion": "Museo que ofreci una visión completa del proceso de evolución de la ciudad a lo largo de la historia",
            "actividades": [
              "Visitar las exposiciones arqueológicas",
              "Participar en actividades educativas",
              "Explorar los restos históricos"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.652103,
              "longitud": -0.876759
            }
          },
          {
            "nombre": "Huerta Santa Fe",
            "descripcion": "Un lugar ideal para vivir la cultura urbana y disfrutar del río Ebro.",
            "actividades": [
              "Pasear por el río",
              "Disfrutar del ambiente bares y restaurantes",
              "Participar en actividades culturales"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.64779766951387,
              "longitud": -0.899846709050103
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 12:18:08",
  "location": "Calatayud",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Calatayud",
      "coordenadas": {
        "latitud": 41.0577,
        "longitud": -1.6619
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Centro de Interpretación de la Traición de Calatayud",
            "descripcion": "Museo que relata la historia de la traición de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones",
              "Visita al jardín botánico"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0446,
              "longitud": -1.6636
            }
          },
          {
            "nombre": "Parque de la Alameda",
            "descripcion": "Espacio verde con áreas de descanso y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visitando el estanque"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0523,
              "longitud": -1.6699
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de Calatayud",
            "descripcion": "Museo que muestra la historia y cultura de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0663,
              "longitud": -1.6683
            }
          },
          {
            "nombre": "Salto de Baños",
            "descripcion": "Parque natural con impresionantes caídas de agua",
            "actividades": [
              "Ruta senderista",
              "Picnic",
              "Visita a los miradores"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0341,
              "longitud": -1.6676
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Castillo Mayor",
            "descripcion": "Ruinas del antiguo castillo de Calatayud con vistas panorámicas",
            "actividades": [
              "Visita a las ruinas",
              "Fotografía",
              "Exploración del entorno"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0553,
              "longitud": -1.6643
            }
          },
          {
            "nombre": "Parque Ribota",
            "descripcion": "Jardín público con áreas de juego y paseo",
            "actividades": [
              "Paseo por el parque",
              "Descanso en áreas verdes",
              "Juegos infantiles"
            ],
            "duracion_visita": "1.5 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0519,
              "longitud": -1.6649
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Casa Natal de Buenaventura Díaz",
            "descripcion": "Museo que rinde homenaje al héroe local Buenaventura Díaz",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.046,
              "longitud": -1.6686
            }
          },
          {
            "nombre": "Convento de San Francisco",
            "descripcion": "Antiguo convento con visitas que incluyen la ermita de la Virgen de la Peña",
            "actividades": [
              "Visita a la ermita",
              "Exploración del convento",
              "Visita al museo"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0517,
              "longitud": -1.6639
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque Oropesa",
            "descripcion": "Jardín con áreas de recreo y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visita a la fuente",
              "Descanso en bancos"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0577,
              "longitud": -1.6623
            }
          },
          {
            "nombre": "Ruta de Las Cárcavas",
            "descripcion": "Cañón ubicado en las afueras de Calatayud",
            "actividades": [
              "Ruta de senderismo",
              "Avistamiento de aves",
              "Paisajismo"
            ],
            "duracion_visita": 5,
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.1694,
              "longitud": -1.9372
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 14:27:55",
  "location": "Calatayud",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Calatayud",
      "coordenadas": {
        "latitud": 41.0577,
        "longitud": -1.6619
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Centro de Interpretación de la Traición de Calatayud",
            "descripcion": "Museo que relata la historia de la traición de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones",
              "Visita al jardín botánico"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0446,
              "longitud": -1.6636
            }
          },
          {
            "nombre": "Parque de la Alameda",
            "descripcion": "Espacio verde con áreas de descanso y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visitando el estanque"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0523,
              "longitud": -1.6699
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de Calatayud",
            "descripcion": "Museo que muestra la historia y cultura de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0663,
              "longitud": -1.6683
            }
          },
          {
            "nombre": "Salto de Baños",
            "descripcion": "Parque natural con impresionantes caídas de agua",
            "actividades": [
              "Ruta senderista",
              "Picnic",
              "Visita a los miradores"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0341,
              "longitud": -1.6676
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Castillo Mayor",
            "descripcion": "Ruinas del antiguo castillo de Calatayud con vistas panorámicas",
            "actividades": [
              "Visita a las ruinas",
              "Fotografía",
              "Exploración del entorno"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0553,
              "longitud": -1.6643
            }
          },
          {
            "nombre": "Parque Ribota",
            "descripcion": "Jardín público con áreas de juego y paseo",
            "actividades": [
              "Paseo por el parque",
              "Descanso en áreas verdes",
              "Juegos infantiles"
            ],
            "duracion_visita": "1.5 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0519,
              "longitud": -1.6649
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Casa Natal de Buenaventura Díaz",
            "descripcion": "Museo que rinde homenaje al héroe local Buenaventura Díaz",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.046,
              "longitud": -1.6686
            }
          },
          {
            "nombre": "Convento de San Francisco",
            "descripcion": "Antiguo convento con visitas que incluyen la ermita de la Virgen de la Peña",
            "actividades": [
              "Visita a la ermita",
              "Exploración del convento",
              "Visita al museo"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0517,
              "longitud": -1.6639
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque Oropesa",
            "descripcion": "Jardín con áreas de recreo y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visita a la fuente",
              "Descanso en bancos"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0577,
              "longitud": -1.6623
            }
          },
          {
            "nombre": "Ruta de Las Cárcavas",
            "descripcion": "Cañón ubicado en las afueras de Calatayud",
            "actividades": [
              "Ruta de senderismo",
              "Avistamiento de aves",
              "Paisajismo"
            ],
            "duracion_visita": 5,
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.1694,
              "longitud": -1.9372
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-08 16:44:54",
  "location": "Calatayud",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Calatayud",
      "coordenadas": {
        "latitud": 41.0577,
        "longitud": -1.6619
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Centro de Interpretación de la Traición de Calatayud",
            "descripcion": "Museo que relata la historia de la traición de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones",
              "Visita al jardín botánico"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0446,
              "longitud": -1.6636
            }
          },
          {
            "nombre": "Parque de la Alameda",
            "descripcion": "Espacio verde con áreas de descanso y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visitando el estanque"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0523,
              "longitud": -1.6699
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Museo de Calatayud",
            "descripcion": "Museo que muestra la historia y cultura de Calatayud",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0663,
              "longitud": -1.6683
            }
          },
          {
            "nombre": "Salto de Baños",
            "descripcion": "Parque natural con impresionantes caídas de agua",
            "actividades": [
              "Ruta senderista",
              "Picnic",
              "Visita a los miradores"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0341,
              "longitud": -1.6676
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Castillo Mayor",
            "descripcion": "Ruinas del antiguo castillo de Calatayud con vistas panorámicas",
            "actividades": [
              "Visita a las ruinas",
              "Fotografía",
              "Exploración del entorno"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0553,
              "longitud": -1.6643
            }
          },
          {
            "nombre": "Parque Ribota",
            "descripcion": "Jardín público con áreas de juego y paseo",
            "actividades": [
              "Paseo por el parque",
              "Descanso en áreas verdes",
              "Juegos infantiles"
            ],
            "duracion_visita": "1.5 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0519,
              "longitud": -1.6649
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Casa Natal de Buenaventura Díaz",
            "descripcion": "Museo que rinde homenaje al héroe local Buenaventura Díaz",
            "actividades": [
              "Visita guiada",
              "Observación de exposiciones"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.046,
              "longitud": -1.6686
            }
          },
          {
            "nombre": "Convento de San Francisco",
            "descripcion": "Antiguo convento con visitas que incluyen la ermita de la Virgen de la Peña",
            "actividades": [
              "Visita a la ermita",
              "Exploración del convento",
              "Visita al museo"
            ],
            "duracion_visita": "4 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 41.0517,
              "longitud": -1.6639
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque Oropesa",
            "descripcion": "Jardín con áreas de recreo y paseo",
            "actividades": [
              "Paseo por el parque",
              "Visita a la fuente",
              "Descanso en bancos"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.0577,
              "longitud": -1.6623
            }
          },
          {
            "nombre": "Ruta de Las Cárcavas",
            "descripcion": "Cañón ubicado en las afueras de Calatayud",
            "actividades": [
              "Ruta de senderismo",
              "Avistamiento de aves",
              "Paisajismo"
            ],
            "duracion_visita": 5,
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 41.1694,
              "longitud": -1.9372
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-09 12:45:08",
  "location": "Aranjuez",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos",
    "Parques"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Aranjuez",
      "coordenadas": {
        "latitud": 40.0292,
        "longitud": -3.597
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos",
      "Parques"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Falúas Reales",
            "descripcion": "Museo que alberga una colección de embarcaciones reales utilizadas por la familia real española.",
            "actividades": [
              "Visita guiada",
              "Exploración del museo",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.0253,
              "longitud": -3.598
            }
          },
          {
            "nombre": "Jardín del Príncipe",
            "descripcion": "Un extenso jardín barroco con una gran variedad de plantas y caminos pintorescos.",
            "actividades": [
              "Paseo",
              "Picnic",
              "Observación de flora"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 40.0222,
              "longitud": -3.605
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Palacio Real de Aranjuez",
            "descripcion": "Residencia de la Familia Real Española, conocido por su arquitectura y jardines.",
            "actividades": [
              "Visita al palacio",
              "Exploración de los jardines",
              "Fotografía"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.0338,
              "longitud": -3.6093
            }
          },
          {
            "nombre": "Parque de las Contravallaciones",
            "descripcion": "Parque amplio con espacios verdes y senderos para caminatas y ciclismo.",
            "actividades": [
              "Caminata",
              "Ciclismo",
              "Observación de aves"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 40.0343,
              "longitud": -3.572
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Museo de Innovación y Diseño",
            "descripcion": "Museo que muestra la evolución del diseño y la innovación a través de diferentes épocas.",
            "actividades": [
              "Visita guiada",
              "Talleres interactivos",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.0396,
              "longitud": -3.6148
            }
          },
          {
            "nombre": "Bosque del Prado",
            "descripcion": "Un extenso bosque perfecto para paseos tranquilos y actividades al aire libre.",
            "actividades": [
              "Senderismo",
              "Picnic",
              "Yoga"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 40.0285,
              "longitud": -3.621
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Museo de Antropología y Etnología",
            "descripcion": "Museo que explora la diversidad cultural y antropológica a través de diversas exposiciones.",
            "actividades": [
              "Visita guiada",
              "Talleres culturales",
              "Fotografía"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.0328,
              "longitud": -3.593
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Parque del Ferroviario",
            "descripcion": "Este parque se ubica junto al Museo del Trabajo, en una zona con restos industriales y antiguas fábricas de locomotives",
            "actividades": [
              "Visita a los vestigios ferroviarios",
              "Senderismo",
              "Picnic"
            ],
            "duracion_visita": "3 horas",
            "gusto_asociado": "Parques",
            "coordenadas": {
              "latitud": 40.0088,
              "longitud": -3.6477
            }
          }
        ]
      }
    ]
  }
},
{
  "user": null,
  "date": "2025-04-09 13:08:17",
  "location": "Aranjuez",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "categories": [
    "Museos"
  ],
  "travelPlan": {
    "lugar_visita": {
      "nombre": "Aranjuez",
      "coordenadas": {
        "latitud": 40.0292,
        "longitud": -3.597
      }
    },
    "duracion_viaje": 5,
    "gustos_usuario": [
      "Museos"
    ],
    "plan_visita": [
      {
        "dia": 1,
        "lugares": [
          {
            "nombre": "Museo de Falúas Reales",
            "descripcion": "Museo que alberga una colección de embarcaciones reales utilizadas por la familia real española.",
            "actividades": [
              "Visita guiada",
              "Exploración del museo",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.0253,
              "longitud": -3.598
            }
          },
          {
            "nombre": "Jardines del Príncipe",
            "descripcion": "Jardines del siglo XVIII con una vista impresionante y un paseo tranquilo.",
            "actividades": [
              "Paseo",
              "Picnic",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.019,
              "longitud": -3.617
            }
          }
        ]
      },
      {
        "dia": 2,
        "lugares": [
          {
            "nombre": "Palacio Real de Aranjuez",
            "descripcion": "Palacio histórico con una rica historia y una impresionante arquitectura.",
            "actividades": [
              "Visita guiada",
              "Exploración del palacio",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.01,
              "longitud": -3.605
            }
          },
          {
            "nombre": "Galeria de Pinturas del Palacio",
            "descripcion": "Galeria que contiene una impresionante colección de obras de distintas épocas.",
            "actividades": [
              "Visita guiada",
              "exploración de la coleccion",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.012,
              "longitud": -3.604
            }
          }
        ]
      },
      {
        "dia": 3,
        "lugares": [
          {
            "nombre": "Casa del Labrador",
            "descripcion": "Mansión del siglo XIX con jardines hermosos y una arquitectura impresionante.",
            "actividades": [
              "Visita guiada",
              "Exploración de los jardines",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.033,
              "longitud": -3.6
            }
          }
        ]
      },
      {
        "dia": 4,
        "lugares": [
          {
            "nombre": "Iglesia de San Antonio",
            "descripcion": "Iglesia barroca del siglo XVIII con una arquitectura impresionante.",
            "actividades": [
              "Visita interior",
              "Fotografía"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.033,
              "longitud": -3.595
            }
          },
          {
            "nombre": "Plaza de Torres",
            "descripcion": "Plaza histórica con una fuente central y un ambiente tranquilo.",
            "actividades": [
              "Paseo",
              "Descanso",
              "Fotografía"
            ],
            "duracion_visita": "1 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.043,
              "longitud": -3.6
            }
          }
        ]
      },
      {
        "dia": 5,
        "lugares": [
          {
            "nombre": "Molino de los Gros",
            "descripcion": "Fábrica antiguo usada par al producción de mole",
            "actividades": [
              "Visita interior",
              "Fotografía"
            ],
            "duracion_visita": "1 hora",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.023,
              "longitud": -3.614
            }
          },
          {
            "nombre": "Parque de la Prehistoria",
            "descripcion": "Museo histórico caracterizado por una gran muestra de su prehistoria.",
            "actividades": [
              "Visita guiada",
              "Exploración del parque",
              "Fotografía"
            ],
            "duracion_visita": "2 horas",
            "gusto_asociado": "Museos",
            "coordenadas": {
              "latitud": 40.043,
              "longitud": -3.66
            }
          }
        ]
      }
    ]
  }
}]);