exports.constants = {
  OK: 200,
  RESOURCE_CREATED: 201,
  REDIRECT: 302,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

/** LOGIN:
 * - 200: standard
 * - 201: se creo una risorsa (es: sessione salvata in db)
 * - 302: se faccio un dedirect in un'altra page
 * - 401: Se username o password sono errate
 */