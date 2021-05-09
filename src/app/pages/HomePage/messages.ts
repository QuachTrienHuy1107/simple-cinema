/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { _t } from "utils/messages";
import { translations } from "locales/translations";

export const HomeMessages = {
    Title: () => _t(translations.Banner.Title),
    Desc: () => _t(translations.Banner.Description),
};
