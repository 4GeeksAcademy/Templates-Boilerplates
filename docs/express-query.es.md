---
title: 'Consultas con Express y TypeORM'
description: 'Usa TypeORM para consultar tu base de datos, desde tu API Express'
technologies: ['typescript', 'expressjs', 'postgres', 'nodejs', 'postgres']
---

# Opciones de buscar

* [Opciones básicas](#basic-options)
* [Opciones avanzadas](#advanced-options)

## Opciones básicas

Todos los métodos `find` de repositorios y gestores aceptan opciones especiales que puedes usar para consultar los datos que necesites sin usar `QueryBuilder`:

* `select` - indica qué propiedades del objeto principal deben seleccionarse

```typescript
userRepository.find({ select: ["firstName", "lastName"] });
```

* `relations` - debe cargarse con la entidad principal. También se pueden cargar las subrelaciones (abreviatura de join y leftJoinAndSelect)

```typescript
userRepository.find({ relations: ["profile", "photos", "videos"] });
userRepository.find({ relations: ["profile", "photos", "videos", "videos.video_attributes"] });
```

* `join` - necesita ser ejecutado por la entidad. Versión ampliada de "relations".

```typescript
userRepository.find({
    join: {
        alias: "user",
        leftJoinAndSelect: {
            profile: "user.profile",
            photo: "user.photos",
            video: "user.videos"
        }
    }
});
```

* `where` - condiciones simples por las que debe consultarse la entidad.

```typescript
userRepository.find({ where: { firstName: "Timber", lastName: "Saw" } });
```

La consulta de una columna de una entidad incrustada debe hacerse con respecto a la jerarquía en la que se definió. Ejemplo:

```typescript
userRepository.find({ where: { name: { first: "Timber", last: "Saw" } } });
```

Consulta con el operador OR:

```typescript
userRepository.find({
  where: [
    { firstName: "Timber", lastName: "Saw" },
    { firstName: "Stan", lastName: "Lee" }
  ]
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')
```

* `order` - orden de selección.

```typescript
userRepository.find({
    order: {
        name: "ASC",
        id: "DESC"
    }
});
```

* `withDeleted` - incluye entidades que han sido borradas suavemente con `softDelete` o `softRemove`, por ejemplo, que tienen su columna `@DeleteDateColumn` configurada. Por defecto, las entidades borradas suavemente no se incluyen.

```typescript
userRepository.find({
    withDeleted: true
});
```

Los métodos `find` que devuelven múltiples entidades (`find`, `findAndCount`, `findByIds`) también aceptan las siguientes opciones:

* `skip` - Desplazamiento (paginado) desde donde deben tomarse las entidades.

```typescript
userRepository.find({
    skip: 5
});
```

* `take` - limit (paginado) - número máximo de entidades que deben tomarse.

```typescript
userRepository.find({
    take: 10
});
```

* Si utiliza typeORM con MSSQL y desea utilizar `take` o `limit`, deberá utilizar también order o recibirá el siguiente error: `'Invalid usage of the option NEXT in the FETCH statement.'`.

```typescript
userRepository.find({
    order: {
        columnName: 'ASC'
        },
    skip: 0,
    take: 10
})
```

* `cache` - Activa o desactiva el almacenamiento en caché de los resultados de la consulta. <!--- See [caching](caching) for more information and options. esta página aún no existe-->

```typescript
userRepository.find({
    cache: true
})
```

* `lock` - Activa el mecanismo de bloqueo de la consulta. Sólo se puede utilizar en el método `findOne`. `lock` es un objeto que puede ser definido como:

```ts
{ mode: "optimistic", version: number|Date }
```

o

```ts
{ mode: "pessimistic_read"|"pessimistic_write"|"dirty_read"|"pessimistic_partial_write"|"pessimistic_write_or_fail"|"for_no_key_update" }
```

por ejemplo:

```typescript
userRepository.findOne(1, {
    lock: { mode: "optimistic", version: 1 }
})
```

El soporte de los modos de bloqueo, y las sentencias SQL a las que se traducen, se listan en la siguiente tabla (una celda en blanco denota no soportado). Cuando el modo de bloqueo especificado no está soportado, se lanzará un error `LockNotSupportedOnGivenDriverError`.

```text
|                 | pessimistic_read         | pessimistic_write       | dirty_read    | pessimistic_partial_write   | pessimistic_write_or_fail   | for_no_key_update   |
| --------------- | --------------------     | ----------------------- | ------------- | --------------------------- | --------------------------- | ------------------- |
| MySQL           | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED      | FOR UPDATE NOWAIT           |                     |
| Postgres        | FOR SHARE                | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED      | FOR UPDATE NOWAIT           | FOR NO KEY UPDATE   |
| Oracle          | FOR UPDATE               | FOR UPDATE              | (nothing)     |                             |                             |                     |
| SQL Server      | WITH (HOLDLOCK, ROWLOCK) | WITH (UPDLOCK, ROWLOCK) | WITH (NOLOCK) |                             |                             |                     |
| AuroraDataApi   | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     |                             |                             |                     |

```

Ejemplo completo de opciones de búsqueda:

```typescript
userRepository.find({
    select: ["firstName", "lastName"],
    relations: ["profile", "photos", "videos"],
    where: {
        firstName: "Timber",
        lastName: "Saw"
    },
    order: {
        name: "ASC",
        id: "DESC"
    },
    skip: 5,
    take: 10,
    cache: true
});
```

## Advanced options

TypeORM proporciona muchos operadores incorporados que pueden utilizarse para crear comparaciones más complejas:

* `Not`

```ts
import {Not} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Not("About #1")
})
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" != 'About #1'
```

* `LessThan`

```ts
import {LessThan} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: LessThan(10)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" < 10
```

* `LessThanOrEqual`

```ts
import {LessThanOrEqual} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: LessThanOrEqual(10)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" <= 10
```

* `MoreThan`

```ts
import {MoreThan} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: MoreThan(10)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" > 10
```

* `MoreThanOrEqual`

```ts
import {MoreThanOrEqual} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: MoreThanOrEqual(10)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" >= 10
```

* `Equal`

```ts
import {Equal} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Equal("About #2")
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" = 'About #2'
```

* `Like`

```ts
import {Like} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Like("%out #%")
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" LIKE '%out #%'
```

* `ILike`

```ts
import {ILike} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: ILike("%out #%")
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" ILIKE '%out #%'
```

* `Between`

```ts
import {Between} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: Between(1, 10)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" BETWEEN 1 AND 10
```

* `In`

```ts
import {In} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: In(["About #2", "About #3"])
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" IN ('About #2','About #3')
```

* `Any`

```ts
import {Any} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Any(["About #2", "About #3"])
});
```

ejecutará la siguiente consulta: (Notación Postgres):

```sql
SELECT * FROM "post" WHERE "title" = ANY(['About #2','About #3'])
```

* `IsNull`

```ts
import {IsNull} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: IsNull()
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "title" IS NULL
```

* `Raw`

```ts
import {Raw} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: Raw("dislikes - 4")
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "likes" = "dislikes" - 4
```

En el caso más sencillo, se inserta una consulta sin procesar inmediatamente después del símbolo igual. Pero también se puede reescribir completamente la lógica de comparación utilizando la función.

```ts
import {Raw} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    currentDate: Raw(alias =>`${alias} > NOW()`)
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "currentDate" > NOW()
```

Si necesita introducir datos de usuario, no debe incluirlos directamente en la consulta, ya que podría crear una vulnerabilidad de inyección SQL. En su lugar, puede utilizar el segundo argumento de la función `Raw` para proporcionar una lista de parámetros que vincular a la consulta.

```ts
import {Raw} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    currentDate: Raw(alias =>`${alias} > ':date'`, { date: "2020-10-06" })
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "currentDate" > '2020-10-06'
```

Si necesita proporcionar una entrada de usuario que sea una matriz, puede enlazarla como una lista de valores en la sentencia SQL utilizando la sintaxis de expresión especial:

```ts
import {Raw} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Raw(alias =>`${alias} IN (:...titles)`, { titles: ["Go To Statement Considered Harmful", "Structured Programming"] })
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE "titles" IN ('Go To Statement Considered Harmful', 'Structured Programming')
```

## Combining Advanced Options

También puede combinar estos operadores con el operador `Not`:

```ts
import {Not, MoreThan, Equal} from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: Not(MoreThan(10)),
    title: Not(Equal("About #2"))
});
```

ejecutará la siguiente consulta:

```sql
SELECT * FROM "post" WHERE NOT("likes" > 10) AND NOT("title" = 'About #2')
```
