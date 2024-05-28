## API `Repository` 

* `createQueryBuilder` - Crea un constructor de consultas utilizado para construir consultas SQL.
<!--- Learn more about [QueryBuilder](select-query-builder). Esta página aún no existe -->

```typescript
const users = await repository
    .createQueryBuilder("user")
    .where("user.name = :name", { name: "John" })
    .getMany();
```

* `hasId` - Comprueba si la propiedad de columna primaria de la entidad dada está definida.

```typescript
 if (repository.hasId(user)) {
    // ... do something
 }
```

* `getId` - Obtiene los valores de las propiedades de la columna primaria de la entidad dada. 
Si la entidad tiene claves primarias compuestas, el valor devuelto será un objeto con los nombres y valores de las columnas primarias.

```typescript
const userId = repository.getId(user); // userId === 1
```

* `create` - Crea una nueva instancia de `User`. Opcionalmente acepta un objeto literal con propiedades de usuario que serán escritas en el nuevo objeto de usuario creado.

```typescript
const user = repository.create(); // igual que const user = new User();
const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw"
}); // igual que const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
```

* `merge` - Fusiona varias entidades en una sola.

```typescript
const user = new User();
repository.merge(user, { firstName: "Timber" }, { lastName: "Saw" }); // same as user.firstName = "Timber"; user.lastName = "Saw";
```

* `preload` - Crea una nueva entidad a partir del objeto simple JavaScript dado. Si la entidad ya existe en la base de datos, entonces
la carga (y todo lo relacionado con ella), sustituye todos los valores por los nuevos del objeto dado
y devuelve la nueva entidad. La nueva entidad es en realidad una entidad cargada desde la base de datos con todas las propiedades
reemplazadas desde el nuevo objeto. 

Tenga en cuenta que el objeto tipo entidad dado debe tener un id de entidad / clave primaria por la que buscar la entidad.
Devuelve undefined si no se encuentra la entidad con el id dado.

```typescript
const partialUser = {
    id: 1,
    firstName: "Rizzrak",
    profile: {
        id: 1
    }
};
const user = await repository.preload(partialUser);
// user contendrá todos los datos que falten de partialUser con los valores de la propiedad partialUser:
// { id: 1, firstName: "Rizzrak", lastName: "Saw", profile: { id: 1, ... } }
```

* `save` - Guarda una entidad o matriz de entidades dada.
Si la entidad ya existe en la base de datos, se actualiza.
Si la entidad no existe en la base de datos, se inserta.
Guarda todas las entidades dadas en una única transacción (en el caso de la entidad, el gestor no es transaccional).
También admite la actualización parcial, ya que se omiten todas las propiedades no definidas.
Devuelve la entidad o entidades guardadas.

```typescript
await repository.save(user);
await repository.save([
    category1,
    category2,
    category3
]);
```

* `remove` - Elimina una entidad o matriz de entidades dada.
Elimina todas las entidades dadas en una única transacción (en el caso de entidad, el gestor no es transaccional).
Devuelve la entidad o entidades eliminadas.

```typescript
await repository.remove(user);
await repository.remove([
    category1,
    category2,
    category3
]);
```

* `insert` - Inserta una nueva entidad, o arreglo de entidades.

```typescript
await repository.insert({
    firstName: "Timber",
    lastName: "Timber"
});


await manager.insert(User, [{
    firstName: "Foo",
    lastName: "Bar"
}, {
    firstName: "Rizz",
    lastName: "Rak"
}]);
```

* `update` - Actualiza parcialmente la entidad mediante una opción de actualización o un id de entidad dados.

```typescript
await repository.update({ firstName: "Timber" }, { firstName: "Rizzrak" });
// ejecuta UPDATE user SET firstName = "Rizzrak" WHERE firstName = "Timber"

await repository.update(1, { firstName: "Rizzrak" });
// ejecuta UPDATE user SET firstName = "Rizzrak" WHERE id = 1
```

* `delete` - Deletes entities by entity id, ids or given conditions:

```typescript
await repository.delete(1);
await repository.delete([1, 2, 3]);
await repository.delete({ firstName: "Timber" });
```

* `softDelete` y `restore` - Borrado suave y restablecimiento de una fila por id

```typescript
const repository = connection.getRepository(Entity);
// Eliminar una entidad
await repository.softDelete(1);
// Y puedes restaurarlo usando `restore`;
await repository.restore(1);
```

* `softRemove` y `recover` - Se trata de una alternativa a `softDelete` y `restore`.

```typescript
// Puedes borrarlos con softRemove
const entities = await repository.find();
const entitiesAfterSoftRemove = await repository.softRemove(entities);

// Y puedes recuperarlos usando recover;
await repository.recover(entitiesAfterSoftRemove);
```


* `count` - Cuenta las entidades que coinciden con las opciones dadas. Útil para la paginación.

```typescript
const count = await repository.count({ firstName: "Timber" });
```

* `increment` - Incrementa alguna columna por el valor proporcionado de las entidades que coinciden con las opciones dadas.

```typescript
await manager.increment(User, { firstName: "Timber" }, "age", 3);
```

* `decrement` - Disminuye alguna columna por el valor proporcionado que coincide con las opciones dadas.
```typescript
await manager.decrement(User, { firstName: "Timber" }, "age", 3);
```

* `find` - Busca entidades que coincidan con las opciones dadas.

```typescript
const timbers = await repository.find({ firstName: "Timber" });
```

* `findAndCount` - Busca las entidades que coinciden con las opciones de búsqueda dadas. También cuenta todas las entidades que coinciden con las condiciones dadas, pero ignora la configuración de paginación.(opciones `skip` y `take`).

```typescript
const [timbers, timbersCount] = await repository.findAndCount({ firstName: "Timber" });
```

* `findByIds` - Busca múltiples entidades por id.

```typescript
const users = await repository.findByIds([1, 2, 3]);
```

* `findOne` - Busca la primera entidad que coincida con algún id u opciones de búsqueda.

```typescript
const user = await repository.findOne(1);
const timber = await repository.findOne({ firstName: "Timber" });
```

* `findOneOrFail` - Busca la primera entidad que coincida con el mismo id u opciones de búsqueda.
Rechaza la promesa devuelta si nada coincide.

```typescript
const user = await repository.findOneOrFail(1);
const timber = await repository.findOneOrFail({ firstName: "Timber" });
```

> Nota: Se recomienda encarecidamente asegurarse de que el valor de `id` o `FindOptions` no es `null` o `undefined` antes de llamar a `findOne` y `findOneOrFail`. Si se le pasa `null` o `undefined`, la consulta coincidirá con todas las entidades del repositorio y devolverá el primer registro.

* `query` - Ejecuta una consulta SQL sin procesar.

```typescript
const rawData = await repository.query(`SELECT * FROM USERS`);
```

* `clear` - Borra todos los datos de la tabla dada (los trunca/elimina).

```typescript
await repository.clear();
```
### Additional Options

Opcional `SaveOptions` puede ser pasado como parámetro para `save`.

* `data` - Datos adicionales a pasar con el método persist. Estos datos se pueden utilizar en los subscribers a continuación.
* Listeners`: boolean - Indica si los listeners y subscribers son llamados para esta operación. Por defecto están activados, puedes desactivarlos poniendo `{ listeners: false }` en las opciones de guardar/eliminar.
* Transaction`: boolean - Por defecto las transacciones están habilitadas y todas las consultas en la operación de persistencia se envuelven en la transacción. Puedes desactivar este comportamiento estableciendo `{ transaction: false }` en las opciones de persistencia.
* `chunk`: number - Divide la ejecución de guardado en múltiples grupos de trozos. Por ejemplo, si quieres guardar 100.000 objetos pero tienes problemas para guardarlos, puedes dividirlos en 10 grupos de 10.000 objetos (estableciendo `{ chunk: 10000 }`) y guardar cada grupo por separado. Esta opción es necesaria para realizar inserciones muy grandes cuando tienes problemas con la limitación del número de parámetros del controlador subyacente.
* `reload`: boolean - Bandera para determinar si la entidad que está siendo persistida debe ser recargada durante la operación de persistencia. Sólo funcionará en bases de datos que no soporten la sentencia RETURNING / OUTPUT. Habilitado por defecto.

Ejemplo:
```typescript
// users contiene una matriz de entidades de usuario
userRepository.save(users, {chunk: users.length / 1000});
```

Opcional `RemoveOptions` se puede pasar como parámetro para `remove` y `delete`.

*  `data` - Datos adicionales que se pasan con el método remove. Estos datos se pueden utilizar en los subscribers a continuación.
* `listener`: boolean - Indica si los listeners y subscribers son llamados para esta operación. Por defecto están activados, puedes desactivarlos poniendo `{ listeners: false }` en las opciones de guardar/eliminar.
* `transaction`: boolean - Por defecto las transacciones están habilitadas y todas las consultas en la operación de persistencia se envuelven en la transacción. Puedes desactivar este comportamiento estableciendo `{ transaction: false }` en las opciones de persistencia.
* `chunk`: number - Divide la ejecución de guardado en múltiples grupos de trozos. Por ejemplo, si quieres guardar 100.000 objetos pero tienes problemas para guardarlos, puedes dividirlos en 10 grupos de 10.000 objetos, estableciendo `{ chunk: 10000 }`, y guardar cada grupo por separado. Esta opción es necesaria para realizar inserciones muy grandes cuando tiene problemas con la limitación del número de parámetros del controlador subyacente. 

Ejemplo:
```typescript
// users contiene una matriz de entidades de usuario
userRepository.remove(users, {chunk: entities.length / 1000});
```
