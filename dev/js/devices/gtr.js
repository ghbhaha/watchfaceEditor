let wf_data = {
    import: function(json) {
        let data = {};
        if ('Background' in json)
            data.bg = json.Background;
        if ('Time' in json) {
            data.time = json.Time;
            if ('Seconds' in json.Time) {
                data.seconds = json.Time.Seconds;
                delete data.time.Seconds;
            }
            if ('AmPm' in json.Time) {
                data.amPm = json.Time.AmPm;
                delete data.time.AmPm;
            }
        }
        if ('Date' in json) {
            data.date = true;
            if ('WeekDay' in json.Date)
                data.weekDay = json.Date.WeekDay;
            if ('MonthAndDay' in json.Date) {
                data.monthandday = json.Date.MonthAndDay;
                if ('Separate' in json.Date.MonthAndDay) {
                    if ('Day' in json.Date.MonthAndDay.Separate)
                        data.dateDay = json.Date.MonthAndDay.Separate.Day;
                    if ('Month' in json.Date.MonthAndDay.Separate)
                        data.dateMonth = json.Date.MonthAndDay.Separate.Month;
                    delete data.monthandday.Separate;
                }
                if ('OneLine' in json.Date.MonthAndDay) {
                    data.dateOneLine = json.Date.MonthAndDay.OneLine;
                    delete data.monthandday.OneLine;
                }
            }
        } else
            data.date = false;
        if ('Battery' in json) {
            data.battery = true;
            if ('Images' in json.Battery)
                data.batteryIcon = json.Battery.Images;
            if ('Text' in json.Battery)
                data.batteryText = json.Battery.Text;
            if ('Scale' in json.Battery)
                data.batteryScale = json.Battery.Scale;
        } else
            data.battery = false;
        if ('Status' in json) {
            data.status = true;
            if ('Alarm' in json.Status)
                data.statAlarm = json.Status.Alarm;
            if ('Bluetooth' in json.Status)
                data.statBt = json.Status.Bluetooth;
            if ('DoNotDisturb' in json.Status)
                data.statDnd = json.Status.DoNotDisturb;
            if ('Lock' in json.Status)
                data.statLock = json.Status.Lock;
        } else
            data.status = false;
        if ('Activity' in json) {
            data.activity = true;
            if ('Calories' in json.Activity)
                data.actCal = {Number: json.Activity.Calories};
            if ('Steps' in json.Activity)
                if ('Step' in json.Activity.Steps)
                    data.actSteps = {Number: json.Activity.Steps.Step};
            if ('StepsGoal' in json.Activity)
                data.actStepsGoal = {Number: json.Activity.StepsGoal};
            if ('Pulse' in json.Activity)
                data.actPulse = {Number: json.Activity.Pulse};
            if ('Distance' in json.Activity)
                data.actDistance = json.Activity.Distance;
            if ('StarImage' in json.Activity)
                data.stepsGoal = json.Activity.StarImage;
        } else
            data.activity = false;
        if ('StepsProgress' in json) {
            data.stepsprogress = true;
            if ('Circle' in json.StepsProgress)
                data.stepscircle = json.StepsProgress.Circle;
            if ('Linear' in json.StepsProgress)
                data.stepsLinear = json.StepsProgress.Linear;
        } else
            data.stepsprogress = false;
        if ('AnalogDialFace' in json) {
            data.analog = true;
            if ('Hours' in json.AnalogDialFace)
                data.analoghours = json.AnalogDialFace.Hours.CenterImage;
            if ('Minutes' in json.AnalogDialFace)
                data.analogminutes = json.AnalogDialFace.Minutes.CenterImage;
            if ('Seconds' in json.AnalogDialFace)
                data.analogseconds = json.AnalogDialFace.Seconds.CenterImage;
        } else
            data.analog = false;
        return data;
    },
    export: function(data) {
        let obj = JSON.parse(JSON.stringify(data));
        let packed = {};
        if ('bg' in obj)
            packed.Background = obj.bg;
        if ('time' in obj) {
            packed.Time = obj.time;
            if ('seconds' in obj)
                packed.Time.Seconds = obj.seconds;
            if ('amPm' in obj)
                packed.Time.AmPm = obj.amPm;
        }
        if (obj.date) {
            packed.Date = {};
            if ('weekDay' in obj)
                packed.Date.WeekDay = obj.weekDay;
            if ('monthandday' in obj) {
                packed.Date.MonthAndDay = obj.monthandday;
                if ('dateDay' in obj || 'dateMonth' in obj) {
                    packed.Date.MonthAndDay.Separate = {};
                    if ('dateDay' in obj)
                        packed.Date.MonthAndDay.Separate.Day = obj.dateDay;
                    if ('dateMonth' in obj)
                        packed.Date.MonthAndDay.Separate.Month = obj.dateMonth;
                }
                if ('dateOneLine' in obj)
                    packed.Date.MonthAndDay.OneLine = obj.dateOneLine;
            }
        }
        if (obj.status) {
            packed.Status = {};
            if ('statAlarm' in obj)
                packed.Status.Alarm = obj.statAlarm;
            if ('statBt' in obj)
                packed.Status.Bluetooth = obj.statBt;
            if ('statDnd' in obj)
                packed.Status.DoNotDisturb = obj.statDnd;
            if ('statLock' in obj)
                packed.Status.Lock = obj.statLock;
        }
        if (obj.battery) {
            packed.Battery = {};
            if ('batteryIcon' in obj)
                packed.Battery.Images = obj.batteryIcon;
            if ('batteryText' in obj)
                packed.Battery.Text = obj.batteryText;
            if ('batteryScale' in obj)
                packed.Battery.Scale = obj.batteryScale;
        }
        if (obj.activity) {
            packed.Activity = {};
            if ('actCal' in obj)
                packed.Activity.Calories = obj.actCal.Number;
            if ('actSteps' in obj){
                packed.Activity.Steps = {};
                packed.Activity.Steps.Step = obj.actSteps.Number;
            }
            if ('actStepsGoal' in obj)
                packed.Activity.StepsGoal = obj.actStepsGoal.Number;
            if ('actPulse' in obj)
                packed.Activity.Pulse = obj.actPulse.Number;
            if ('actDistance' in obj)
                packed.Activity.Distance = obj.actDistance;
            if ('stepsGoal' in obj)
                packed.Activity.StarImage = obj.stepsGoal;
        }
        if (obj.stepsprogress) {
            packed.StepsProgress = {};
            if ('stepscircle' in obj)
                packed.StepsProgress.Circle = obj.stepscircle;
            if ('stepsLinear' in obj)
                packed.StepsProgress.Linear = obj.stepsLinear;
        }
        if (obj.analog) {
            packed.AnalogDialFace = {};
            if ('analoghours' in obj) {
                packed.AnalogDialFace.Hours = JSON.parse('{"unknown1":0,"unknown2":0,"unknown3":{"X":0,"Y":0},"unknown4":{"X":0,"Y":0},"CenterImage":{"X":38,"Y":227,"ImageIndex":42}}')
                packed.AnalogDialFace.Hours.CenterImage = obj.analoghours;
            }
            if ('analogminutes' in obj){
                packed.AnalogDialFace.Minutes =  JSON.parse('{"unknown1":0,"unknown2":0,"unknown3":{"X":0,"Y":0},"unknown4":{"X":0,"Y":0},"CenterImage":{"X":38,"Y":227,"ImageIndex":42}}')
                packed.AnalogDialFace.Minutes.CenterImage = obj.analogminutes;
            }
            if ('analogseconds' in obj){
                packed.AnalogDialFace.Seconds = JSON.parse('{"unknown1":0,"unknown2":0,"unknown3":{"X":0,"Y":0},"unknown4":{"X":0,"Y":0},"CenterImage":{"X":38,"Y":227,"ImageIndex":42}}')
                packed.AnalogDialFace.Seconds.CenterImage = obj.analogseconds;
            }
        }
        return packed;
    }
};

let device = {
    height: 454,
    width: 454,
    // 'analog-watch-tab',
    tabs: ['editor-tab', 'jsonEditor-tab', 'resources-tab'],
    images: {
        watchface_block: {
            left: 78,
            top: 168,
            height: 640,
            width: 530,
            image: 'gtr.png'
        }
    },
    data: wf_data,
    default_coords: wf_data.import(JSON.parse('{\n' +
        '    "Background": {\n' +
        '        "Image": {\n' +
        '            "ImageIndex": 302,\n' +
        '            "X": 0,\n' +
        '            "Y": 0\n' +
        '        }\n' +
        '    },\n' +
        '    "Time": {\n' +
        '        "Hours": {\n' +
        '            "Ones": {\n' +
        '                "ImageIndex": 255,\n' +
        '                "ImagesCount": 10,\n' +
        '                "X": 156,\n' +
        '                "Y": 120\n' +
        '            },\n' +
        '            "Tens": {\n' +
        '                "ImageIndex": 255,\n' +
        '                "ImagesCount": 10,\n' +
        '                "X": 99,\n' +
        '                "Y": 120\n' +
        '            }\n' +
        '        },\n' +
        '        "Minutes": {\n' +
        '            "Ones": {\n' +
        '                "ImageIndex": 255,\n' +
        '                "ImagesCount": 10,\n' +
        '                "X": 301,\n' +
        '                "Y": 120\n' +
        '            },\n' +
        '            "Tens": {\n' +
        '                "ImageIndex": 255,\n' +
        '                "ImagesCount": 10,\n' +
        '                "X": 244,\n' +
        '                "Y": 120\n' +
        '            }\n' +
        '        }\n' +
        '    },\n' +
        '    "Battery": {\n' +
        '        "Text": {\n' +
        '            "TopLeftX": 86,\n' +
        '            "TopLeftY": 311,\n' +
        '            "BottomRightX": 110,\n' +
        '            "BottomRightY": 320,\n' +
        '            "Alignment": "TopLeft",\n' +
        '            "Spacing": 2,\n' +
        '            "ImageIndex": 200,\n' +
        '            "ImagesCount": 10\n' +
        '        }\n' +
        '    },\n' +
        '    "Activity": {\n' +
        '        "Steps": {\n' +
        '            "Step": {\n' +
        '                "TopLeftX": 325,\n' +
        '                "TopLeftY": 314,\n' +
        '                "BottomRightX": 367,\n' +
        '                "BottomRightY": 323,\n' +
        '                "Alignment": "TopLeft",\n' +
        '                "Spacing": 2,\n' +
        '                "ImageIndex": 200,\n' +
        '                "ImagesCount": 10\n' +
        '            }\n' +
        '        },\n' +
        '        "Pulse": {\n' +
        '            "TopLeftX": 216,\n' +
        '            "TopLeftY": 359,\n' +
        '            "BottomRightX": 240,\n' +
        '            "BottomRightY": 368,\n' +
        '            "Alignment": "TopLeft",\n' +
        '            "Spacing": 2,\n' +
        '            "ImageIndex": 200,\n' +
        '            "ImagesCount": 10\n' +
        '        }\n' +
        '    }\n' +
        '}'))
};
export default device;