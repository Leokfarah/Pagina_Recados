import { combineReducers } from "@reduxjs/toolkit";
import usuarios from "./userSlice/UserSlice";
import recados from "./recadosSlice/RecadosSlice";

export default combineReducers({
    usuarios,
    recados,
});