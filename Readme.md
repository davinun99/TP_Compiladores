# UNA - Facultad Politécnica
# Ingeniería en Informática
## Trabajo Práctico de Compiladores

### Tema 

Implementación de un analizador léxico

### Objetivos
Implementar un analizador léxico capaz de reconocer lexemas, actualizar una tabla de símbolos y retornar el valor a intercambiar con el analizador sintáctico para cada palabra en una cadena de entrada. En caso de que no sea posible obtener un lexema válido, el analizador retorna un error léxico.

### Estructura del código fuente
El codigo esta estructurado con 3 archivos en la raiz, _index.html_ con el esqueleto de la pagina, los estilos correspondientes en _style.css_ y el código principal de javascript en _script.js_.

#### Script.js
Este archivo contiene la lógica principal del analizador léxico y es el encargado de invocar a las funciones para convertir la expresión regular a un AFN, luego a un AFD para finalmente minimizarlo y realizar las simulaciones.

### Consideraciones para el uso del analizador

* El alfabeto debe ser ingresado con anticipación.
* El alfabeto puede estar compuesto solo por caracteres
* Los caracteres '(', '*', '|' o ')' no pueden estar en el alfabeto ya que serán usados en los patrones para definir los lexemas.
* Las definiciones regulares deben ser ingresadas separadas una por línea.
* Entre el lexema y el patrón debe estar el carácter (->)
* El patrón puede tener cualquier carácter del alfabeto, * (cerradura de clean), | (OR) o sub expresiones encerradas entre paréntesis.
* El orden de precedencia de las operaciones es el siguiente:
    * Primero se ejecutarán las expresiones entre paréntesis 
    * Luego se ejecutarán los OR con máxima precedencia ( Ej. ab*|c = (ab*) | c)
    * Luego se ejecutarán las cerraduras de clean tomando todo lo que se encuentre a su izquierda. (Ej. abb* = (abb)* )
    * Finalmente se ejecutarán las concatenaciones de caracteres (Ej. ab)

[Documentación y explicación del trabajo práctico](https://docs.google.com/document/d/17d27F08ScnLTWYXUO_VkqreIC9sUOApLNi7km4zcqcw/edit?usp=sharing)


