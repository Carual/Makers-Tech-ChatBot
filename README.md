# Resumen del Proyecto

Makers chatBot, es un chat que conecta las preguntas que hace un cliente y proporciona información real del estado actual

_Video de presentación_:
[![Watch the video](https://i9.ytimg.com/vi/AZMUM6lF4Lw/mqdefault.jpg?sqp=CJjV3rkG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLCSXIhdE3nEniO0kGEdNQqVKUatiw)](https://youtu.be/AZMUM6lF4Lw?si=95Nj2fk2ZwhOhuWS)

# Como funciona

Cuando el Usuario pregunta sobre algo, el servidor obtiene el prompt y le pide a un LLM (a eleccion del usuario) que identifique si el usuario hizo un prompt de conversacion, o de busqueda, y basado en este, el LLM devuelve una respuesta o un query, si este es un query, se hace la busqueda en la base datos y se vuelve a hacer un prompt para dar una respuesta teniendo los datos que pedía el usarío

# Caracteristicas

Se utilizó una Base de datos NoSQL, mongoDB, para la prueba, pero ya que el query de busqueda es seleccionado por el LLM es posible hacerlo para otros tipos de bases de Datos

# Requerimientos y Tecnologías usadas

Para este Repositorio se utilizo una Base de datos externa de Mongo Db y el api para LLMs te groq, estos son necesarios para el funcionamiento, Se utlizó react para el cliente, y express para el backend, se utilizó el runtime de BUN por su facilidad con la integracion de typescript.

Se asumió la estructura de la base de datos de los productos, el prompt se basa en esta, si se cambia la estructura habría que cambiar el prompt, se asumió que se comportaba de la siguiente Manera:

```javascript
Collection: products

Structure:
{
    name: String,
	type: 'Computer' | 'Smartphone' | 'Tablet' | 'Gadgets' | 'Accessories',
	brand: String,
	quantity: Number,
	description: String,
	price: Number,
}

```

### Variables de entorno utilizadas y necesarias

```javascript
MONGO_URI = stringWithCollectionIncluded
GROQ_API_KEY = apiKey
LLM_MODEL = nameOfTheLLModel
```

# Limites y Errores

1. Debido al riesgo que puede existir al darle acceso a un query a un LLM se colocaron limites de lo que podia o no podia hacer el LLM esto también limita el entendimiento o la interpretación de las preguntas, haciendo que sea proclive a Errores de interpretación por parte del LLM
2. Debido al tiempo limitado de la prueba, la parte del front end visual para el cliente no tiene todas las características que hubiera deseado, teniendo ademas uno que otro problema visual, que son fácilmente arreglables con mas tiempo de trabajo
