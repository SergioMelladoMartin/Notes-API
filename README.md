# Práctica 12: API Node/Express de gestión de información musical

En esta práctica se va a desarrollar una APIRest haciendo uso de NodeJS y Express que va a permitir operaciones de lectura, modificación, creado y borrado de artistas, canciones y playlists en una base de datos implementada con MongoBD y desplegada mediante Heroku.

A continuación vamos a mostrar como hemos modelado cada uno de los tres elementos que acepta nuesta API

## Modelado Canción
Hemos creado una interfaz llamada _'SongDocumentInterface'_ que extiende a la clase _Document_ del módulo mongoose donde hemos definido los atributos necesarios para modelar una canción

```c
interface SongDocumentInterface extends Document {
    title: string,
    artist: string,
    seconds: number,
    minutes: number,
    isSingle: boolean,
    timesListened: number
}
```

A continuación creamos un esquema con el cual definiremos las caracteristicas de cada uno de los atributos de la canción mediante la clase _Schema_ proporcionada por mongoose. Ahora mostraremos las carácteristicas que debe cumplir cada uno de los atributos.

- **title**: Representa el título de la canción. Se ha definido de tipo string, debe ser único en la base de datos, es un atributo obligatorio y se eliminarán los espacios que tenga por delante o detrás para reducir su tamaño. Mediante el módulo validate, se comprueba que el título de la canción debe empezar por mayúscula, en caso contrario se captura y devuelve un error. 
```c
title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
            throw new Error('Song title must start with a capital letter');
        }
    },
},
```

- **artist**: Nombre del artista o grupo creador de la canción. Ha sido definido de tipo string, es obligatorio y también se eliminan los espacios anteriores y posteriores. En este caso no debe ser único ya que se deben poder almacenar varias canciones de un mismo artista.
```c
artist: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
            throw new Error('Song title must start with a capital letter');
        }
    },
},
```

- **seconds**: Duración en segundos de la cancion. Ha sido declarado de tipo number, es un atributo obligatorio y mediante el módulo validate, se comprueba que sea mayor que 0 ya que no tendría sentido una canción con menor duración que 0 segundos
```c
seconds: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('A song must last more than 0 seconds');
        }
    },
},
```

- **minutes**: Duración de la canción en minutos.  Ha sido declarado de tipo number, es un atributo obligatorio y mediante el módulo validate, se comprueba que sea mayor que 0 ya que no tendría sentido una canción con menor duración que 0 minutos
```c
minutes: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('A song must last more than 0 minutes');
        } 
    },
},
```

- **isSingle**: Indica si la canción es un single o por lo contario pertenece a un album. Ha sido declarado de tipo booleano y es un atributo también obligatorio
```c
isSingle: {
    type: Boolean,
    required: true,
},
```

- **timesListened**: Número de veces que ha sido escuchada una canción. Ha sido declarado de tipo number, es un atributo obligatorio y mediante el módulo validate, se comprueba que sea mayor que 0 ya que no tendría sentido una canción con menos de 0 veces escuchada
```c
timesListened: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value < 0) {
            throw new Error('A song must have 0 or more plays');
        }
    },
},
```


## Modelado Artist
Hemos creado una interfaz llamada _'ArtistDocumentInterface'_ que extiende a la clase _Document_ del módulo mongoose donde hemos definido los atributos necesarios para modelar un artista

```c
interface ArtistDocumentInterface extends Document {
    name: string,
    genres: string[],
    songs: string[],
    numberListeners: number,
}
```

A continuación creamos un esquema con el cual definiremos las caracteristicas de cada uno de los atributos del artista mediante la clase _Schema_ proporcionada por mongoose. Ahora mostraremos las carácteristicas que debe cumplir cada uno de los atributos.

- **name**: Nombre del artista. Se ha definido de tipo string, debe ser único en la base de datos, es un atributo obligatorio y se eliminarán los espacios que tenga por delante o detrás para reducir su tamaño. Mediante el módulo validate, se comprueba que el nombre del artista debe empezar por mayúscula, en caso contrario se captura y devuelve un error.

```c
name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
            throw new Error('Song title must start with a capital letter');
        }
    },
},
```

- **genres**: Contiene los géneros relacionados con el artista. Declarado de tipo array de strings y es un atributo obligatorio en la base de datos
```c
genres: {
    type: [String],
    required: true,
},
```

- **songs**: Contiene las canciones lanzadas por el artista. Declarado de tipo array de strings y es un atributo obligatorio en la base de datos 

```c
songs: {
    type: [String],
    required: true
}, 
``` 

- **numberListeners**: Número de oyentes del artista. Declarado de tipo number, es un atributo obligatorio y mediante el módulo validate se comprueba que sea mayor o igual a 0 ya que no tiene sentido un número negativo de oyentes

```c
numberListeners: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('An artists must have 0 listeners or more');
        }
    },
},
```


## Modelado Playlist
Hemos creado una interfaz llamada _'PlaylistDocumentInterface'_ que extiende a la clase _Document_ del módulo mongoose donde hemos definido los atributos necesarios para modelar una playlist

```c
interface PlaylistDocumentInterface extends Document {
    name: string,
    numberSongs: number,
    hours: number,
    minutes: number,
    genres: string[]
}
```

A continuación creaamos un esquema con el cual definiremos las caracteristicas de cada uno de los atributos de la playlist mediante la clase _Schema_ proporcionada por mongoose. Ahora mostraremos las carácteristicas que debe cumplir cada uno de los atributos.

- **name**: Nombre de la playlist. Se ha definido de tipo string, debe ser único en la base de datos, es un atributo obligatorio y se eliminarán los espacios que tenga por delante o detrás para reducir su tamaño. Mediante el módulo validate, se comprueba que el nombre del artista debe empezar por mayúscula, en caso contrario se captura y devuelve un error.

```c
name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
            throw new Error('Song title must start with a capital letter');
        }
    },
},
```

- **numberSongs**: Número de canciones de la playlist. Declarado de tipo number, es un atributo obligatorio y mediante el módulo validate comprobamos que sea igual o mayor 0 ya que no tiene sentido que una playlist tenga un número negativo de canciones

```c
numberSongs: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('A playlist must have more than 0 songs');
        }
    },
},
```

- **minutes**: Duración de la playlist en minutos. Ha sido declarado de tipo number, es un atributo obligatorio y mediante el módulo validate, se comprueba que sea mayor que 0 ya que no tendría sentido una playlist con menor duración que 0 minutos
```c
minutes: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('A playlist must last more than 0 minutes');
        } 
    },
},
```

- **hours**: Duración de la playlist en horas. Ha sido declarado de tipo number, es un atributo obligatorio y mediante el módulo validate, se comprueba que sea mayor que 0 ya que no tendría sentido una playlist con menor duración que 0 horas
```c
hours: {
    type: Number,
    required: true,
    validate: (value: number) => {
        if (value <= 0) {
            throw new Error('A playlist must last more than 0 hours');
        } 
    },
},
```

- **genres**: Contiene los géneros relacionados con la playlist. Declarado de tipo array de strings y es un atributo obligatorio en la base de datos
```c
genres: {
    type: [String],
    required: true,
},
```


## Funciones de la base de datos 

Del mismo modo, vamos a mostrar las funciones encargadas de realizar las operaciones de lectura, modificación, creado y borrado de artistas, canciones y playlists. Estas funcinones se encuentran en la carpeta `routers` dentro del directorio `src`.


### Funcion de creacion

```c
export const postRouter = express.Router();

postRouter.post('/songs', (req, res) => {
  const song = new Song(req.body);

  song.save().then((song) => {
    res.status(201).send(song);
  }).catch((error) => {
    res.status(400).send(error);
  });
});
```

En la primera linea se invoca el metodo `express.Router()`, que retornara un objeto Router, que nos permitirá definir rutas. 

Como se puede observar en el codigo, se invoca el metodo post, que se encarga de crear el objeto que le pasemos a la base de datos. En este caso, esta orientado a las canciones, pero realizando cambios en las rutas y en el objeto creado que se guarda, se puede obtener la funcion de creacion de artistas y de playlist. 

En caso de que se haya creado correctamente, se envia el estado 201, y si por el contrario, no se ha podido crear, se envia un estado 400.

### Funcion de lectura

La operacion de lectura puede realizarse buscando un elemento a partir de su titulo o nombre, o a partir de su identificador. 

```c
export const getRouter = express.Router();

getRouter.get('/songs', (req, res) => {
  const filter = req.query.title?{title: req.query.title.toString()}:{};

  Song.find(filter).then((song) => {
    if (song.length !== 0) {
      res.send(song);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});
```

Para llevar a cabo la operacion de lectura se invoca el metodo get sobre el objeto de tipo Router. Para llevar a cabo la busqueda a partir de su titulo o nombre, se utiliza la funcion find, pasando por parametros el filtro, que es el titulo de nuestro objeto a buscar. 

De la misma manera que en el metodo post, se puede obtener la funcion de creacion de artistas y de playlist si se realizan  cambios en las rutas y en el tipo de objeto sobre el que se realiza la busqueda.

En caso de que se haya no exista el objeto que se esta buscando en la base de datos, se envia el estado 404, pero si el resultado de la busqueda es un error, se enviara un estado 500.


```c
getRouter.get('/songs/:id', (req, res) => {
  Song.findById(req.params.id).then((song) => {
    if (!song) {
      res.status(404).send();
    } else {
      res.send(song);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
```

Con respecto a la operacion de busqueda por el identificador, la unica diferencia con respecto al otro tipo de busqueda es el uso de la funcion `findById`, que realiza una busqueda mediante la id. 


### Funcion de modificacion

La operacion de modificacion puede realizarse buscando un elemento a partir de su titulo o nombre, o a partir de su identificador. 

```c
export const patchRouter = express.Router();

patchRouter.patch('/songs', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
  });

  } else {
    const allowedUpdates = ['artist', 'seconds', 'minutes', 'isSingle', 'timesListened'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Song.findOneAndUpdate({title: req.query.title.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((song) => {
        if (!song) {
          res.status(404).send();
        } else {
          res.send(song);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});
```


Para llevar a cabo la operacion de modificacion se invoca el metodo patch sobre el objeto de tipo Router. Para realizar la busqueda es necesario comprobar si la modificacion que se intenta realizar es valida, para ello, se comprueban los elementos que se pueden modificar y el elemento que se quiere modificar. Tras esto, se emplea la funcion `findOneAndUpdate`, que se encarga de modificar aquel objeto que concuerde con el que estamos buscando. 

Se puede obtener la funcion de creacion de artistas y de playlist si se realizan  cambios en las rutas, en el tipo de objeto sobre el que se realiza la busqueda, y los atributos modificables.

En caso de que se haya no exista el objeto que se esta buscando en la base de datos, se envia el estado 404, pero si el resultado de la busqueda es un error, se enviara un estado 400.


```c
patchRouter.patch('/songs/:id', (req, res) => {
  const allowedUpdates = ['artist', 'seconds', 'minutes', 'isSingle', 'timesListened'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((song) => {
      if (!song) {
        res.status(404).send();
      } else {
        res.send(song);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});
```

Para la modificacion mediante el identificador, se utiliza la funcion `findByIdAndUpdate`, pero sin contar con la comprobacion de los elementos necesarios apra la busqueda del objeto, las dos funciones se desarrollan igual.

### Funcion de eliminacion 

La operacion de eliminacion puede realizarse buscando un elemento a partir de su titulo o nombre, o a partir de su identificador. 


```c
export const deleteRouter = express.Router();


deleteRouter.delete('/songs', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    Song.findOneAndDelete({title: req.query.title.toString()}).then((song) => {
      if (!song) {
        res.status(404).send();
      } else {
        res.send(song);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});
```

Para llevar a cabo la operacion de eliminacion se invoca el metodo delete sobre el objeto de tipo Router. Para realizar la busqueda del objeto a eliminar, se emplea la funcion `findOneAndDelete`, que se encarga de eliminar aquel objeto que concuerde con el que estamos buscando. 

Se puede obtener la funcion de creacion de artistas y de playlist si se realizan  cambios en las rutas y en el tipo de objeto sobre el que se realiza la busquedas.

En caso de que se haya no exista el objeto que se esta buscando en la base de datos, se envia el estado 404, pero si el resultado de la busqueda es un error, se enviara un estado 400.

```c
deleteRouter.delete('/songs/:id', (req, res) => {
  Song.findByIdAndDelete(req.params.id).then((song) => {
    if (!song) {
      res.status(404).send();
    } else {
      res.send(song);
    }
  }).catch(() => {
    res.status(400).send();
  });
});
```

La unica diferencia que se presenta entre la funcion de busqueda por id, y la funcion de busqueda por el titulo, es el uso de la funcion `findByIdAndDelete`.


### Funcion por defecto 

Esta funcion se encarga de tratar las respuestas de aquellas opciones que no han sido implementadas. En este caso, en caso de que no se seleccione una opcion existente, se envia un estado 501.

```c

export const defaultRouter = express.Router();


defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
```

## Aplicacion

El contenido principal de la aplicacion se encuentra en el archivo `index.ts`: 

```c
const app = express();

app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(deleteRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

En este archivo `index.ts` se encuentran importados todos los routers que se han definido previamente. Además, se puede observar que cada uno de esos routers se encuentran registrados en nuestra aplicacion, mediante el metodo `app.use()`. De esta manera, se logra obtener un codigo legible y modular, que cumple con las especificaciones y requerimientos necesarios. 

Al puerto que hemos definido, se le asignará el valor de la variable de entorno `process.env.PORT`, pero en caso de que no se encuentre definida, se le asignará el puerto por defecto 3000.



## Ejecución de la API

La API ha sido desplegada en Heroku y usa una base de datos MongoDB Atlas. 
La URL de la API es: **https://projecto-dsi.herokuapp.com**.

Para probar el correcto funcionamiento de la API hemos desarrollado una serie de pruebas para cada uno de los tres ítems: canciones, artistas y playlists.

1. Se comprueba que al crear un item en la base de datos, este se crea correctamente y devuelve un estado 201
2. Se comprueba que al crear un item sin pasarle el nombre o título, devuelve un estado de error 400
3. Se comprueba que al leer un ítem, se devuelve el ítem correctamente y un estado 200
4. Se comprueba que se pueden leer los ítems por id correctamente y se devuelve un estado 200
5. Se comprueba que al introducir un id que no existe en la base de datos se devuelve un error 500
6. Se comprueba que se devuelven todos los items si no se indica un nombre con un error 200
7. Se comprueba que al leer un nombre que no existe devuelve un error 404
8. Se compruba que se pueden modificar los atributos de un ítem y devuelve un estado 200
9. Se comprueba que se pueden modificar los atributos de un ítem por id y devuelve un estado 200
10. Se comprueba que al modificar por un id que no existe devuelve un error 500
11. Se comprueba que no se permiten modificaciones a atributos no válido y se devuelve un error 400
12. Se comprueba que si el nombre no existe al modificar se devuelve un error 404
13. Se comprueba que se puede eliminar un ítem de la base de datos y se devuelve un estado 200
14. Se comprueba que al borrar un ítem que no existe se devuelve un error
