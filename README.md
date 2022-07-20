# api-test
Api base implementada en frameWork [NestJS](https://docs.nestjs.com/) aplicando [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


# 1. Instalación de dependencias

```bash
$ npm install
```

# 2. Configuración de variables de entorno

-  PORT: Puerto por el cual levantará el servicio (Puerto por defecto: 3000)
-  MONGO_URI: String de conexión a base de datos
-  KEY_PASSWORD_ENCRIPTION: Llave de encriptación de contraseña de usuarios para el registro en abse de datos

# 3. Ejecución

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# 4. Ejecución de pruebas
TODO
```bash
```

# 5. Documentación

En la siguiente ruta pueda encontrar la documentación [swagger](http://[::1]:3000/api-doc) de la api.


