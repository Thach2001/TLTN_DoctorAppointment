const initialStateAuth = {
   user:
      localStorage.getItem("user") !== undefined
         ? JSON.parse(localStorage.getItem("user"))
         : null,
   token: localStorage.getItem("token") || null,
   role: localStorage.getItem("role") || null,
};

function authReducer(state = initialStateAuth, action) {
   switch (action.type) {
      case "LOGIN_SUCCESS":
         return {
            user: action.payload.data,
            token: action.payload.token,
            role: action.payload.role,
         };

      case "LOGOUT":
         return {
            user: null,
            token: null,
            role: null,
         };

      default:
         return state;
   }
}

export default authReducer;
