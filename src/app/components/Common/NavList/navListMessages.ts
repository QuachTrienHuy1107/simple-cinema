/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from "locales/translations";
import { _t } from "utils/messages";

export const navListMessages = {
    // someThing: () => _t(translations.someThing,'default value'),
    HomePage: () => _t(translations.Header.Navbar.Home),
    MovieList: () => _t(translations.Header.Navbar.MovieList),
    CinemaList: () => _t(translations.Header.Navbar.CinemaList),
    News: () => _t(translations.Header.Navbar.News),
    Applications: () => _t(translations.Header.Navbar.Applications),
};
