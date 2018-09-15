import I18n from 'ex-react-native-i18n';
import English from './translations/en.json'
import Persian from "./translations/per.json"

I18n.fallbacks=true;
I18n.translations={
    'en':English,
    "per":Persian
};
export default I18n;