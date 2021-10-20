import './js/time';
import {setLocalStorage, getLocalStorage} from './js/greeting';

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
