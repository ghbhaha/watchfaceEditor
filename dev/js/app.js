/* global UIkit */
import {
    $ as $
} from './utils.js';
import devices from './devices/devices_list';
/**
 * Changes device
 *
 * @param {string} name device
 * @param {object} wfe_obj main app object
 * @returns {undefined} undefined
 */
function change_device(name, wfe_obj) {

    localStorage.device = name;
    let device = devices[name];

    $('watchfaceimage').style.zoom = '0.5';
    // $('editor').style.zoom = '0.5'
    // $('editor').style.zoom = '0.5'

    $('watchface').style.height = device.height + 'px';
    $('watchface').style.width = device.width + 'px';
    $('editor').style.height = device.height + 'px';
    $('editor').style.width = device.width + 'px';
    $('analog').style.height = device.height + 'px';
    $('analog').style.width = device.width + 'px';
    $('.analog-block')[0].style.height = device.height + 'px';
    $('.analog-block')[0].style.width = device.width + 'px';
    $('watchfaceimage').style.background = 'url(assets/' + device.images.watchface_block.image + ')';
    $('watchfaceimage').style.paddingLeft = device.images.watchface_block.left + 'px';
    $('watchfaceimage').style.paddingTop = device.images.watchface_block.top + 'px';
    $('watchfaceimage').style.height = device.images.watchface_block.height + 'px';
    $('watchfaceimage').style.width = device.images.watchface_block.width + 'px';
    wfe_obj.default_coords = device.default_coords;
    wfe_obj.converter = device.data;
    for (let i = 0, elements = $('.main-tab'); i < elements.length; i++) {
        if (device.tabs.includes(elements[i].id)) {
            elements[i].removeAttribute('hidden');
        } else {
            elements[i].setAttribute('hidden', '');
        }
    }
    wfe_obj.device = {
        name: name,
        height: device.height,
        width: device.width
    };
}

let app_lang = {};
/**
 * Downloads language json and applys it to app_lang
 *
 * @param {string} lang language name
 * @returns {undefined} undefined
 */
function changeLang(lang) {
    fetch('assets/translation/' + lang + '.json').
        then(response => (response.status === 200 ? response : null)).
        then(response => response.json()).
        then(translation => {
            app_lang = translation;
            let strings = document.querySelectorAll('[data-translate-id]');
            for (let i = 0; i < strings.length; i++) {
                if (strings[i].dataset.translateId in app_lang)
                    if (strings[i].dataset.link)
                        strings[i].innerHTML = app_lang[strings[i].dataset.translateId].replace(/\$link/gu, strings[i].dataset.link);
                    else
                        strings[i].innerHTML = app_lang[strings[i].dataset.translateId];
            }
        }).
        catch(error => {
            console.warn("Loading translation error", error);
            UIkit.notification('<b>Loading translation error: </b>' + error, {
                status: 'danger',
                pos: 'top-left',
                timeout: 5000
            });
        });
}

/**
 * Changes application theme
 *
 * @param {string} theme name
 * @returns {undefined} undefined
 */
function changeTheme(theme) {
    if (localStorage.appTheme === 'amazfit') {
        $('.uk-navbar-left')[0].innerHTML = '<a class="uk-navbar-item uk-logo we-white" href="https://v1ack.github.io/watchfaceEditor/"><img src="assets/icon/android-chrome-192x192.png" style="width: auto; height: 60%; margin-right: 10px;">Watchface Editor</a>';
        $('<html')[0].style.background = '';
        $('.uk-navbar')[0].style.height = '';
        $('.uk-navbar')[0].classList.add('we-white');
        $('.uk-navbar')[0].classList.remove('amazfit');
        $('.uk-navbar-container')[0].style.background = 'linear-gradient(to left, #28a5f5, #1e87f0)';
        $('menu-amazfit').setAttribute('hidden', '');
        $('tablist-amazfit').setAttribute('hidden', '');
        $('tablist').removeAttribute('hidden');
        $('donate-link').removeAttribute('hidden');
        $('theme-settings').removeAttribute('hidden');
    }
    switch (theme) {
    case 'light':
        localStorage.appTheme = 'light';
        document.body.classList.remove('uk-light');
        $('<html')[0].classList.remove('uk-background-secondary');
        $('vars').classList.remove('uk-card-secondary');
        $('modal-howto').childNodes[1].classList.remove('uk-background-secondary');
        $('modal-about').childNodes[1].classList.remove('uk-background-secondary');
        $('modal-donate').childNodes[1].classList.remove('uk-background-secondary');
        $('jsonerrormodal').childNodes[1].classList.remove('uk-background-secondary');
        $('modal-preview').childNodes[1].classList.remove('uk-background-secondary');
        $('modal-settings').childNodes[1].classList.remove('uk-background-secondary');
        break;
    case 'dark':
        localStorage.appTheme = 'dark';
        document.body.classList.add('uk-light');
        $('<html')[0].classList.add('uk-background-secondary');
        $('vars').classList.add('uk-card-secondary');
        $('modal-howto').childNodes[1].classList.add('uk-background-secondary');
        $('modal-about').childNodes[1].classList.add('uk-background-secondary');
        $('modal-donate').childNodes[1].classList.add('uk-background-secondary');
        $('jsonerrormodal').childNodes[1].classList.add('uk-background-secondary');
        $('modal-preview').childNodes[1].classList.add('uk-background-secondary');
        $('modal-settings').childNodes[1].classList.add('uk-background-secondary');
        break;
    case 'amazfit':
        changeTheme('dark');
        $('.uk-navbar-left')[0].innerHTML = '<a class="uk-navbar-item uk-logo we-white" href="https://amazfitwatchfaces.com/"><img src="assets/logo.png" style="width: 200px; image-rendering: auto;"></a>';
        localStorage.appTheme = 'amazfit';
        $('<html')[0].style.background = '#121314';
        $('.uk-navbar')[0].style.height = '50px';
        $('.uk-navbar')[0].classList.remove('we-white');
        $('.uk-navbar')[0].classList.add('amazfit');
        $('.uk-navbar-container')[0].style.background = '#222';
        $('menu-amazfit').removeAttribute('hidden');
        $('tablist-amazfit').removeAttribute('hidden');
        $('tablist').setAttribute('hidden', '');
        $('donate-link').setAttribute('hidden', '');
        $('theme-settings').setAttribute('hidden', '');
        break;
    default:
        changeTheme('light');
    }
}

$('lang-ru').addEventListener('click', () => {
    localStorage.lang = 'ru';
    changeLang('russian');
});
$('lang-en').addEventListener('click', () => {
    localStorage.lang = 'en';
    changeLang('english');
});
$('lang-zh').addEventListener('click', () => {
    localStorage.lang = 'zh';
    changeLang('chinese');
});
$('lang-de').addEventListener('click', () => {
    localStorage.lang = 'de';
    changeLang('german');
});
$('lang-nl').addEventListener('click', () => {
    localStorage.lang = 'nl';
    changeLang('dutch');
});
$('lang-tr').addEventListener('click', () => {
    localStorage.lang = 'tr';
    changeLang('turkish');
});
$('theme-light').addEventListener('click', () => changeTheme('light'));
$('theme-dark').addEventListener('click', () => changeTheme('dark'));

export default {
    changeLang: changeLang,
    changeTheme: changeTheme,
    change_device: change_device
};