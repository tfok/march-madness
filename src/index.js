import './styles/main.scss';
import { SELECTORS } from './utils/constants';
import { TeamService } from './services';
import { AppCtrl, TeamCtrl } from './controllers';

function bindEventListeners(selector) {
  const elements = document.querySelectorAll(selector);

  return (event, listener) => (
    elements.forEach(el => el.addEventListener(event, listener))
  );
}

function init() {
  // bind search fields
  bindEventListeners(SELECTORS.search)('input', TeamCtrl.handleTeamSearch);

  // bind dropdown menus
  bindEventListeners(SELECTORS.dropdown)('click', TeamCtrl.toggleDropdown);

  // bind settings modal
  bindEventListeners(SELECTORS.settings)('click', AppCtrl.openModal);
  bindEventListeners(SELECTORS.modal)('click', AppCtrl.closeModal);

  // get initial team list and populate the dropdown menus
  TeamService.getTeamList()
    .then((teams) => {
      const menus = document.querySelectorAll(SELECTORS.teamList);
      menus.forEach(menu => TeamCtrl.updateTeamMenu(menu)(teams));
    });
}

init();
