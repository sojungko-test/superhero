

- Character Object
```json
{
  "powerstats": {
      "intelligence": 88,
      "strength": 11,
      "durability": 40,
      "speed": 33,
      "power": 34,
      "combat": 90
  },
  "biography": {
      "alterEgos": [],
      "alias": [],
      "placeOfBirth": "-",
      "firstAppearance": "Detective Comics #359",
      "publisher": "Oracle",
      "alignment": "good"
  },
  "_id": "5cf387bc5e75ad4a10936d1e",
  "id": 63,
  "name": "Batgirl",
  "image": "https://www.superherodb.com/pictures2/portraits/10/100/1111.jpg",
  "__v": 0
}
```

**GET /api/search/:q**
----
  Returns characters whose names match query.
* **URL Params**
  `q=[string]`
* **Query Params**
  `alignment=['good'|'bad']`
* **Headers**  
  `Content-Type: application/json`
  `Authorization: Bearer <token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
[
  {<character_object>},
  {<character_object>},
  {<character_object>},
  ...,
]
```

**GET /api/alignment/:alignment**
----
  Returns characters of a certain alignment.
  * **URL Params**
    `alignment=['good'|'bad']`
  * **Headers**
    `Content-Type: application/json`
    `Authorization: Bearer <token>`
  * **Success Response:**  
  * **Code:** 200  
    **Content:**
```
[
  {<character_object>},
  {<character_object>},
  {<character_object>},
  ...,
]
```

**GET /api/:id**
----
  Returns the character of an id.
  * **URL Params**
    `id=[integer]`
  * **Headers**
    `Content-Type: application/json`
    `Authorization: Bearer <token>`
  * **Success Response:**  
  * **Code:** 200  
    **Content:**
```
{<character_object>}
```

**GET /api/:id/:queryType**
----
  Returns a particular set of data for a character id.
  * **URL Params**
    `id=[integer]`
    `queryType=['powerstats'|'biography'|'image']`
  * **Headers**
    Content-Type: application/json
    Authorization: Bearer <token>
  * **Success Response:**  
  * **Code:** 200  
    **Content:**
```
[
  {<character_object>},
  {<character_object>},
  {<character_object>},
  ...,
]
```