# efrei-expo-2019
## LeBonAngle - School React-Native project
### `Pierre Hérissé - Antoine Nivoy`

## Server Side

The server is host on **`Heroku`**, and the **GraphQL API interface** can be accessed at this URL :
https://lebonangle.herokuapp.com/

### Run locally
```console
  /efrei-expo-2019/server/$ npm install
  /efrei-expo-2019/server/$ npm run start
```

### Deploy to Heroku
As **`server`** is on the same repository as **`client`**, we had to push manually the **`server tree`** to Heroku, like so :
```console
  /efrei-expo-2019/$ git subtree push --prefix server heroku master
```

### Implementation

There are 3 models that can be used :
- **Users** : represents the users that can use CRUD on **Posts**
- **Posts** : represents announces of products created by **Users**
- **Categories** : represents **Posts** categories, only 1 by post

Each one of these models is persisted on a **PostGres** database and can be accessed through **GraphQL**


### Queries

Each model as at least 2 queries available :
- **GET ALL**
- **GET ONE BY ID**

Here is an example to get one user by using his **ID** :

```crystal
query {
  user(id: 3) {
    firstname
    lastname
    city
  }
}
```

### Mutations

Each model as at least 3 mutations available :
- **CREATE**
- **UPDATE**
- **DELETE**

Here is an example to **create** an user :

```crystal
mutation {
  createUser(data: {
    firstname: "John"
    lastname:"Doe"
    city: "Paris"
  }) {
    id
    firstname
    lastname
    city
  }
}
```


## Client Side
