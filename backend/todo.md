## Registr/ Authz

- Entrar al formulario de registro, donde ingresará sus datos
    - nombre
    - mail
    - contraseña

- El front enviará este formulario ( Endpoint: /api/auth/register )

- El backend validará los datos, si sale bien, envía un mail de verificación.
    1. 1. Validar los datos que envía el usuario
    1. 2. validar que dicho mail no exista en mi db
    2. Crear un token de validación de mail emitido con una clave secreta emitido desde nuestro backend (Crar un token de validación, firma, clave secreta)
    3. Envaimos el token al mail del usuario
    4. Encriptar/ hashear la contraseña
    5. Guardamos en el DB al usuario
    6. Respondo al front-end