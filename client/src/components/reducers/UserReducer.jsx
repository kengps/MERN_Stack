
export function userReducer(state = null, action) {

    switch (action.type) {
      case "LOGIN":
        return action.payload; //ต้องการค่าอะไรให้ส่งค่านั้นไป
      case "LOGOUT":
        localStorage.clear();
        return action.payload;
      default:
        return state
        
    }
}
