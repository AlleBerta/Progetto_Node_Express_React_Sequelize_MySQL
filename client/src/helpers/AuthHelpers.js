export const handleLoginSuccess = (data, setAuthState, navigate) => {
    // Crea un token di sessione visibile in devTools -> Application -> Local Storage 
    // Uso Local Storage perchè condivide il token tra le pagine del suo dominio
    localStorage.setItem("accessToken", data.token);
    // Modifica il valore dell'authState   
    setAuthState({
        username: data.username,
        id: data.id,
        status: true
    });
    // redirect to home page
    navigate("/");
};
