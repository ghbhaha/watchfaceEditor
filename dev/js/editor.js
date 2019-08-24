/* global pageXOffset, pageYOffset */
import wfe from './wfe_obj.js';
import {
    $ as $,
    $c as $c
} from './utils.js';
import updateWatchface from "./watchface_react";

/**
 * Makes block and inserts it (TopLeft and BottomRight) for visual editor
 *
 * @param {string} el name
 * @returns {null} null
 */
function makeBlock(el) {
    $("editor").innerHTML +=
        '<div id="' + wfe.elements[el].editorId + '" style="height:' + ((wfe.elements[el].coords().BottomRightY - wfe.elements[el].coords().TopLeftY + 1)) + 'px; width:' + ((wfe.elements[el].coords().BottomRightX - wfe.elements[el].coords().TopLeftX + 1)) + 'px; top:' + (wfe.elements[el].coords().TopLeftY) + 'px; left:' + (wfe.elements[el].coords().TopLeftX) + 'px;" class="editor-elem" uk-tooltip="title: ' + wfe.elements[el].name + '; delay: 750; offset: 1"></div>';
}

/**
 * Makes block and insetrs it (X and Y) for visual editor
 *
 * @param {string} el name
 * @returns {null} null
 */
function makeImg(el) {
    $("editor").innerHTML +=
        '<div id="' + wfe.elements[el].editorId + '" style="height:' + ($(wfe.elements[el].coords().ImageIndex).height) + 'px; width:' + ($(wfe.elements[el].coords().ImageIndex).width) + 'px; top:' + (wfe.elements[el].coords().Y) + 'px; left:' + (wfe.elements[el].coords().X) + 'px;" class="editor-elem" uk-tooltip="title: ' + wfe.elements[el].name + '; delay: 750; offset: 1"></div>';
}

/**
 * Makes block and inserts it (only for status) for visual editor
 *
 * @param {string} el element
 * @param {string} id in editor html
 * @returns {null} null
 */
function makeImgStat(el, id) {
    $("editor").innerHTML +=
        '<div id="' + id + '" style="height:' + ($('ImageIndexOn' in el ? el.ImageIndexOn : el.ImageIndexOff).height) + 'px; width:' + ($('ImageIndexOn' in el ? el.ImageIndexOn : el.ImageIndexOff).width) + 'px; top:' + (el.Coordinates.Y) + 'px; left:' + (el.Coordinates.X) + 'px;" class="editor-elem"></div>';
}

/**
 * Convert style value to Number
 *
 * @param {string} el style value
 * @returns {Number} style value in number
 */
function styleToNum(el) {
    return Number(el.replace('px', ''));
}

/**
 * Initialise this tab
 * @returns {null} null
 */
function init() {
    // if (!('designtabversion' in localStorage) || localStorage.designtabversion < wfe.app.designtabversion)
    //     localStorage.designtabversion = wfe.app.designtabversion;
    $("editor").innerHTML = '';
    if ('bg' in wfe.coords) {
        let bg = $c(wfe.coords.bg.Image.ImageIndex);
        bg.style.left = wfe.coords.bg.Image.X + "px";
        bg.style.top = wfe.coords.bg.Image.Y + "px";
        bg.style.position = "absolute";
        bg.height *= 1;
        bg.width *= 1;
        bg.removeAttribute("id");
        $("editor").appendChild(bg);
        setTimeout(function () {
            $("editor").childNodes[0].ondragstart = function () {
                return false;
            };
        }, 10);
    }
    if ('time' in wfe.coords) {
        makeImgAndInitDrag('timeHoursTens');
        makeImgAndInitDrag('timeHoursOnes');
        makeImgAndInitDrag('timeMinutesTens');
        makeImgAndInitDrag('timeMinutesOnes');
        if ('seconds' in wfe.coords) {
            makeImgAndInitDrag('timeSecondsTens');
            makeImgAndInitDrag('timeSecondsOnes');
        }
        if ('amPm' in wfe.coords) {
            $("editor").innerHTML +=
                '<div id="e_time_am" style="height:' + ($(wfe.coords.amPm.ImageIndexAm).height) + 'px; width:' + ($(wfe.coords.amPm.ImageIndexAm).width) + 'px; top:' + (wfe.coords.amPm.Y) + 'px; left:' + (wfe.coords.amPm.X) + 'px;" class="editor-elem"></div>';
            initdragN('timeM');
        }
    }
    if (wfe.coords.date) {
        if ('weekDay' in wfe.coords)
            makeImgAndInitDrag('dateWeekday');
        if ('dateDay' in wfe.coords)
            makeBlockAndInitDrag('dateDay');
        if ('dateMonth' in wfe.coords)
            makeBlockAndInitDrag('dateMonth');
        if ('dateOneLine' in wfe.coords)
            makeBlockAndInitDrag('dateOneLine');
    }
    if (wfe.coords.activity) {
        if ('actCal' in wfe.coords)
            makeBlockAndInitDrag('actCalories');
        if ('actSteps' in wfe.coords)
            makeBlockAndInitDrag('actSteps');
        if ('actStepsGoal' in wfe.coords)
            makeBlockAndInitDrag('actStepsGoal');
        if ('actPulse' in wfe.coords)
            makeBlockAndInitDrag('actPulse');
        if ('actDistance' in wfe.coords)
            makeBlockAndInitDrag('actDistance');
    }
    if (wfe.coords.battery) {
        if ('batteryIcon' in wfe.coords)
            makeImgAndInitDrag('batteryIcon');
        if ('batteryText' in wfe.coords)
            makeBlockAndInitDrag('batteryText');
        if ('batteryScale' in wfe.coords) {
            let e_battery_linar_initdrag = i => initdrag(('e_battery_linar_' + i), wfe.coords.batteryScale.Segments[i]);
            for (let i = 0; i < wfe.coords.batteryScale.Segments.length; i++) {
                $("editor").innerHTML +=
                    '<div id="e_battery_linar_' + i + '" style="height:' + ($(wfe.coords.batteryScale.StartImageIndex + i).height) + 'px; width:' + ($(wfe.coords.batteryScale.StartImageIndex + i).width) + 'px; top:' + (wfe.coords.batteryScale.Segments[i].Y) + 'px; left:' + (wfe.coords.batteryScale.Segments[i].X) + 'px;" class="editor-elem"></div>';
                setTimeout(e_battery_linar_initdrag, 10, i);
            }
        }
    }
    if (wfe.coords.status) {
        if ('statAlarm' in wfe.coords) {
            makeImgStat(wfe.coords.statAlarm, "e_stat_alarm");
            initdragN('statAlarm');
        }
        if ('statBt' in wfe.coords) {
            makeImgStat(wfe.coords.statBt, "e_stat_bt");
            initdragN('statBluetooth');
        }
        if ('statDnd' in wfe.coords) {
            makeImgStat(wfe.coords.statDnd, "e_stat_dnd");
            initdragN('statDND');
        }
        if ('statLock' in wfe.coords) {
            makeImgStat(wfe.coords.statLock, "e_stat_lock");
            initdragN('statLock');
        }
    }
    if (wfe.coords.weather) {
        if ('weathericon' in wfe.coords)
            if ('CustomIcon' in wfe.coords.weathericon) {
                $("editor").innerHTML +=
                    '<div id="e_weather_icon" style="height:' + ($(wfe.coords.weathericon.CustomIcon.ImageIndex).height) + 'px; width:' + ($(wfe.coords.weathericon.CustomIcon.ImageIndex).width) + 'px; top:' + (wfe.coords.weathericon.CustomIcon.Y) + 'px; left:' + (wfe.coords.weathericon.CustomIcon.X) + 'px;" class="editor-elem"></div>';
                setTimeout(function () {
                    initdrag('e_weather_icon', wfe.coords.weathericon.CustomIcon);
                }, 10);
            } else {
                $("editor").innerHTML +=
                    '<div id="e_weather_icon" style="height:' + ($("weather").height) + 'px; width:' + ($("weather").width) + 'px; top:' + (wfe.coords.weathericon.Coordinates.Y) + 'px; left:' + (wfe.coords.weathericon.Coordinates.X) + 'px;" class="editor-elem"></div>';
                setTimeout(function () {
                    initdrag('e_weather_icon', wfe.coords.weathericon.Coordinates);
                }, 10);
            }
        if ('weatherOneLine' in wfe.coords)
            makeBlockAndInitDrag('weatherOneLine');
        if ('weatherDay' in wfe.coords)
            makeBlockAndInitDrag('weatherDay');
        if ('weatherNight' in wfe.coords)
            makeBlockAndInitDrag('weatherNight');
        if ('weatherDayAlt' in wfe.coords)
            makeBlockAndInitDrag('weatherDayAlt');
        if ('weatherNightAlt' in wfe.coords)
            makeBlockAndInitDrag('weatherNightAlt');
        if ('weatherCurrent' in wfe.coords)
            makeBlockAndInitDrag('weatherCurrent');
        if ('weatherAirIcon' in wfe.coords)
            makeImgAndInitDrag('weatherAirIcon');
        if ('weatherAirText' in wfe.coords)
            makeBlockAndInitDrag('weatherAirText');
    }
    if (wfe.coords.stepsprogress) {
        // if ('stepscircle' in wfe.coords) {}
        if ('stepsLinear' in wfe.coords) {
            let e_steps_linar_initdrag = i => initdrag(('e_steps_linar_' + i), wfe.coords.stepsLinear.Segments[i]);
            for (let i = 0; i < wfe.coords.stepsLinear.Segments.length; i++) {
                $("editor").innerHTML +=
                    '<div id="e_steps_linar_' + i + '" style="height:' + ($(wfe.coords.stepsLinear.StartImageIndex + i).height) + 'px; width:' + ($(wfe.coords.stepsLinear.StartImageIndex + i).width) + 'px; top:' + (wfe.coords.stepsLinear.Segments[i].Y) + 'px; left:' + (wfe.coords.stepsLinear.Segments[i].X) + 'px;" class="editor-elem"></div>';
                setTimeout(e_steps_linar_initdrag, 10, i);
            }
        }
        if ('stepsGoal' in wfe.coords)
            makeImgAndInitDrag('stepsGoal');
    }
    if ('Animation' in wfe.coords)
        makeImgAndInitDrag('Animation');
}

/**
 * Init drag&drop for element
 *
 * @param {number} el id
 * @param {object} elcoords coordinates object
 * @returns {null} null
 */
function initdrag(el, elcoords) {
    el = $(el);

    /**
     * Set moving
     *
     * @param {Event} e mouse down event
     * @returns {null} null
     */
    el.onmousedown = function (e) {
        wfe.coordsHistory.push(JSON.stringify(wfe.coords));
        let ed = getOffsetRect($("editor")),
            curcoords = getCoords(el),
            shiftX = e.pageX - curcoords.left,
            shiftY = e.pageY - curcoords.top;
        el.style.position = 'absolute';
        moveAt(e);

        el.style.zIndex = 1000;

        function moveAt(e) {
            el.style.left = e.pageX - ed.left - shiftX + 'px';
            el.style.top = e.pageY - ed.top - shiftY + 'px';
            $("e_coords").innerHTML = "X: " + (styleToNum(el.style.left) - styleToNum(el.style.left) % 3) + ", Y: " + (styleToNum(el.style.top) - styleToNum(el.style.top) % 3);
        }

        $("editor").onmousemove = function (e) {
            moveAt(e);
        };

        el.onmouseup = function () {
            $("editor").onmousemove = null;
            el.onmouseup = null;
            el.style.zIndex = 'auto';
            let top = styleToNum(el.style.top),
                left = styleToNum(el.style.left);
            el.style.top = top > 0 && top < wfe.device.height ? Math.round(top) + 'px' : "0px";
            el.style.left = left > 0 && left < wfe.device.width ? Math.round(left) + 'px' : "0px";
            if ('X' in elcoords) {
                elcoords.X = styleToNum(el.style.left);
                elcoords.Y = styleToNum(el.style.top);
            } else {
                let t1 = elcoords.TopLeftX,
                    t2 = elcoords.TopLeftY;
                elcoords.TopLeftX = styleToNum(el.style.left);
                elcoords.TopLeftY = styleToNum(el.style.top);
                elcoords.BottomRightX += elcoords.TopLeftX - t1;
                elcoords.BottomRightY += elcoords.TopLeftY - t2;
            }
            updateWatchface();
            $("e_coords").innerHTML = ('coordinates' in wfe.app.lang ? wfe.app.lang.coordinates : "Coordinates");
        };

    };

    el.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}

/**
 * Init drag&drop with data from wfe.elements
 * *I dot't give a fuck why timeout is here
 *
 * @param {string} el name
 * @returns {null} null
 */
function initdragN(el) {
    setTimeout(function () {
        initdrag(wfe.elements[el].editorId,
            wfe.elements[el].coords());
    }, 10);
}

function makeImgAndInitDrag(el) {
    makeImg(el);
    initdragN(el);
}

function makeBlockAndInitDrag(el) {
    makeBlock(el);
    initdragN(el);
}

/**
 * Magic function for drag&drop from stackoverflow
 *
 * @param {object} elem idk
 * @returns {object} top & left paddings
 */
function getOffsetRect(elem) {
    let box = elem.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left)
    };
}

/**
 * Calculate element's best size
 *
 * @param {string} el element
 * @param {number} digitcount max digits count
 * @returns {null} null
 */
function calc(el, digitcount) {
    let width = 0,
        height = 0;
    for (let i = 0; i < el.ImagesCount; i++) {
        if ($(el.ImageIndex + i).width > width)
            width = $(el.ImageIndex + i).width;
        if ($(el.ImageIndex + i).height > height)
            height = $(el.ImageIndex + i).height;
    }
    width = width * digitcount + el.Spacing * (digitcount - 1);
    if (arguments.length > 2)
        for (let i = 2; i < arguments.length; i++)
            width += $(arguments[i]).width + el.Spacing;
    if (el.Alignment === "TopRight") {
        el.BottomRightY = el.TopLeftY + height - 1;
        el.TopLeftX = el.BottomRightX - width + 1;
    } else {
        el.BottomRightY = el.TopLeftY + height - 1;
        el.BottomRightX = el.TopLeftX + width - 1;
    }
}

/**
 * Apply calc() to elements
 *
 * @returns {null} null
 */
function makejsbetter() {
    if (wfe.coords.date) {
        if ('dateDay' in wfe.coords)
            calc(wfe.coords.dateDay, 2);
        if ('dateMonth' in wfe.coords)
            calc(wfe.coords.dateMonth, 2);
        if ('dateOneLine' in wfe.coords)
            calc(wfe.coords.dateOneLine.Number, 4, wfe.coords.dateOneLine.DelimiterImageIndex);
    }
    if ('batteryText' in wfe.coords)
        calc(wfe.coords.batteryText, 3);
    if (wfe.coords.activity) {
        if ('actCal' in wfe.coords)
            calc(wfe.coords.actCal.Number, 4);
        if ('actSteps' in wfe.coords)
            calc(wfe.coords.actSteps.Number, 5);
        if ('actStepsGoal' in wfe.coords)
            calc(wfe.coords.actStepsGoal.Number, 5);
        if ('actPulse' in wfe.coords)
            calc(wfe.coords.actPulse.Number, 3);
        if ('actDistance' in wfe.coords)
            calc(wfe.coords.actDistance.Number, 4, wfe.coords.actDistance.DecimalPointImageIndex, wfe.coords.actDistance.SuffixImageIndex);
    }
    if (wfe.coords.weather) {
        if ('weatherOneLine' in wfe.coords)
            calc(wfe.coords.weatherOneLine.Number, 4, wfe.coords.weatherOneLine.MinusSignImageIndex, wfe.coords.weatherOneLine.MinusSignImageIndex, wfe.coords.weatherOneLine.DelimiterImageIndex, wfe.coords.weatherOneLine.DegreesImageIndex);
        if ('weatherDay' in wfe.coords)
            calc(wfe.coords.weatherDay.Number, 2, wfe.coords.weatherDay.MinusImageIndex, wfe.coords.weatherDay.DegreesImageIndex);
        if ('weatherNight' in wfe.coords)
            calc(wfe.coords.weatherNight.Number, 2, wfe.coords.weatherNight.MinusImageIndex, wfe.coords.weatherNight.DegreesImageIndex);
        if ('weatherCurrent' in wfe.coords)
            calc(wfe.coords.weatherCurrent.Number, 2, wfe.coords.weatherCurrent.MinusImageIndex, wfe.coords.weatherCurrent.DegreesImageIndex);
    }
    init();
    wfe.makeWf();
}

/**
 * Undo action
 *
 * @returns {null} null
 */
function undo() {
    if (wfe.coordsHistory.length) {
        wfe.coords = JSON.parse(wfe.coordsHistory.pop());
        init();
        wfe.makeWf();
    }
}

$('editor-tab').addEventListener('click', init);
$('fix-coords').addEventListener('click', makejsbetter);
$('editor-undo').addEventListener('click', undo);