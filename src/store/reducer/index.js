import { combineReducers } from "redux";
import {
  pasienReducer,
  createPasienReducer,
  updataPasienReducer,
  deletePasienReducer,
} from "./pasiensReducer";
import { authReducer, cekTokenReducer, registerReducer } from "./authReducer";
import {
  getRekamMedisReducer,
  createRekamMedisReducer,
  updateRekamMedisReducer,
  deleteRekamMedisReducer,
  getRekamMedisByUserReducer
} from "./rekammedisReducer";
import { getLaporanReducer } from "./laporanReducer";

const rootReducer = combineReducers({
  authReducer,
  registerReducer,
  cekTokenReducer,
  pasienReducer,
  createPasienReducer,
  updataPasienReducer,
  deletePasienReducer,
  getRekamMedisReducer,
  createRekamMedisReducer,
  updateRekamMedisReducer,
  deleteRekamMedisReducer,
  getLaporanReducer,
  getRekamMedisByUserReducer
});

export default rootReducer;
