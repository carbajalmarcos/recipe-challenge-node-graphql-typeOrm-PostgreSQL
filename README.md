# RECIPES

# Description

This is a challenge in which I have to use node js, graphql, apollo server, JWT, typeOrm and postgreSQL.

### Installation

- clone repo
- cd repo
- npm install
- configure postgreSQL
- npm run dev

## Use

### register

```graphql
mutation register {
  signUp(
    input: { name: "marcos", password: "123", email: "marcos@gmail.com" }
  ) {
    id
    name
    email
    password
  }
}
```

```json
- Response
{
  "data": {
    "signUp": {
      "id": "8",
      "name": "marcos",
      "email": "ma@gmail.com",
      "password": "$2a$10$igoknr7ivREJN3wwjqcbUuZiVWVpBqxl78D.mnsKyGDOdOVdxBvay"
    }
  }
}
```

### login

```graphql
mutation login {
  login(input: { email: "marcos@gmail.com", password: "1234" }) {
    token
  }
}
```

```json
- Response
{
  "data":{
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwMDY5NjE5NCwiZXhwIjoxNjAwNzgyNTk0fQ.KoM0rIvW6jQ1qRuk0NfQCdtZWu4RX0_ycpaX05cJcvI"
    }
  }
}
```

###### WARNING ! Before the next uses , you must to set the authorization header that you receive after to login.

### create category

```graphql
mutation createCategory {
  createCategory(name: "category 1") {
    id
    name
  }
}
```

```json
- Response
{
  "data": {
    "createCategory": {
      "id": "3",
      "name": "category 1"
    }
  }
}
```

### update category

```graphql
mutation updateCategory {
  updateCategory(categoryId: 1, name: "new category") {
    id
    name
  }
}
```

```json
- Response
{
  "data": {
    "updateCategory": {
      "id": "1",
      "name": "new category"
    }
  }
}
```

### delete category

```graphql
mutation deleteCategory {
  deleteCategory(categoryId: 2)
}
```

```json
- Response
{
  "data": {
    "deleteCategory": "true"
  }
}
```

### create recipe

```graphql
mutation createRecipe {
  createRecipe(
    input: {
      name: "milanesas"
      description: "milanesas de carne de vaca"
      ingredients: "pan rayado, carne de vaca"
      categoryId: 1
    }
  ) {
    id
    name
    description
    ingredients
    category {
      id
      name
    }
  }
}
```

```json
- Response
{
  "data": {
    "createRecipe": {
      "id": "5",
      "name": "milanesas",
      "description": "milanesas de carne de vaca",
      "ingredients": "pan rayado, carne de vaca",
      "category": {
        "id": "3",
        "name": "category 1"
      }
    }
  }
}
```

### delete recipe

```graphql
mutation deleteRecipe {
  deleteRecipe(recipeId: 5)
}
```

```json
- Response
{
  "data": {
    "deleteRecipe": "true"
  }
}
```

### update recipe

```graphql
mutation updateRecipe {
  updateRecipe(
    input: {
      name: "napo"
      ingredients: "queso y carne de vaca"
      categoryId: 1
      description: "mila pero con salsa y queso arriba"
    }
    recipeId: 2
  ) {
    name
    description
    ingredients
    category {
      id
      name
    }
  }
}
```

```json
- Response
{
  "data": {
    "updateRecipe": {
      "name": "napo",
      "description": "mila pero con salsa y queso arriba",
      "ingredients": "queso y carne de vaca",
      "category": {
        "id": "3",
        "name": "category 1"
      }
    }
  }
}
```
