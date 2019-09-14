# efrei-expo-2019
## LeBonAngle - School React-Native project
### `Pierre Hérissé - Antoine Nivoy`

## Requirements
- [X] Use GraphQL API, Expo, React Navigation
- [X] Users CRUD
- [X] Posts CRUD
- [X] Add Camera handling for Posts
- [X] Display Posts list
- [X] Filter Posts list
- [X] Display Post details
- [X] Display User details, with the list of his own Posts
- [X] Only needs `npm install && expo start` to start
- [ ] Publish project on Expo, using unique `expo.slug` identifier
- [ ] Publish API on Now

## Bonuses
- [ ] Host images on a S3 bucket
- [ ] Add profile picture for Users, visible on Posts and Profile
- [ ] Send notification to Seller when an User is "interested"
- [ ] Display notification list of Posts sold for Seller
- [ ] Display "interested" Posts list for User
- [ ] Auth by cellphone number, code sent by SMS
- [ ] Add Geolocation of Seller in Posts
- [ ] Display Posts on a map
- [ ] Share Post to a contact via SMS
- [ ] Payment for Seller, Buyer via Stripe

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
