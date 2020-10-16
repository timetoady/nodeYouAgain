# Product API: Controllers

### URL
https://obscure-earth-19852.herokuapp.com/

## Methods  Endpoints

`GET` '/':                Gives basic welcome message.

`GET` '/controllers':     Returns all stored controllers with manufacturer info populated.

`GET` '/manufacturers':  Returns all stored manufacturers

`GET` '/controllers/:name'    Returns one entry by full, complete name.

`GET` 'controllersByManu/:manuID  Given a manufacturer ID by parameters, returns all controllers that match that manufacturer with manufacturer info populated.

`POST` '/controllers":      Given name, category, cost, quantity, and manufacturer as query params, adds controller.

`POST` '/manufacturers":      Given name, address, and phone as query params, adds manufacturer.

`PUT` '/controllers/:id/:key/:value":      Given controller id ID, key, and value as params, lets you edit or add any key value pair from controllers.

`PUT` '/manufacturers/:id/:key/:value":      Given manufacturer id ID, key, and value as params, lets you edit or add any key value pair from manufacturers.

`DELETE` '/controller/:id':   Given controller ID as param, removes controller from db. Will confirm removed object ID or return an error if matching ID is not found.

`DELETE` '/manufacturers/:id':   Given manufacturer ID as param, removes manufacture from db. Will confirm removed object ID or return an error if matching ID is not found.