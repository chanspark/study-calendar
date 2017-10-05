var makeCalendar = function () {
    // console.log(calendarData());
    var e = $('#calendar');
    var calendar = calendarData();
    // console.log(calendar);

    // options
    var _month = 0;
    var _last = 0;
    // console.log(calendar.today);

    for (var i = 0; i < calendar.data.length; i++) {
        // console.log(i);
        if (_month != calendar.data[i].month) {

            // console.log('hello');

            // 이곳에서 startofMonth & endofMonth를 파악해야한다?
            //
            /**
             * month가 바뀌었다.
             * 전 month의 마지막 day를 출력하였는가??
             * yes -> 진행
             * no -> week를 하나 더 붙인다.
             */
            console.log(calendar.data[i]);

            e.append(createMonth(calendar.data[i]));
            _last = moment().day(0).week(calendar.data[i].week).format('D'); // sunday가 1일인지 확인후, 1일이 아닐경우 1주 전 데이터를 한번더 출력함.
            if (_last > 1 && _month !== 0) {
                e.append(createWeek(calendar.data[i - 1], calendar.today, calendar.data[i].month));
            }
            e.append(createWeek(calendar.data[i], calendar.today, calendar.data[i].month));

            // month 값을 바꿈
            _month = calendar.data[i].month;
        } else if (_month == calendar.data[i].month) {
            // var endMonth = moment().endOf('month')
            // console.log(endMonth)
            // console.log('hello2');
            e.append(createWeek(calendar.data[i], calendar.today, calendar.data[i].month));
        }
    }

    // var setToday = calendar.today.format('YYYY-MM-DD');
    // console.log(calendar.today.format('YYYY-MM-DD'));
    $('.' + calendar.today.format('YYYY-MM-DD')).addClass('day-today');
    // $('.calendar-week');
    $('.calendar-week:nth-child(3)').addClass('week-selected');
    // $('.calendar-week:first-of-type').addClass('week-selected');
};

var createMonth = function (time) {
  // console.log(time);
  var _template =
    '<div class="calendar-month c-month-' + time.month + '">' +
        '<h2 class="calendar-title">' + time.year + '년 ' + time.month + '월</h2>' +
        '<div class="calendar-grid c-grid-' + time.month + '">' +
        '</div>' +
    '</div>';

  return _template;
};


var createWeek = function (time, today, month) {
    var _templateBody = '';
    console.log(moment().endOf('month'));
    for (var i = 0; i < 7; i++) {
        // var date = moment().day(i).week(time.week).format('D');

        var date = moment().day(i).week(time.week);
        // console.log(date)
        // var startDate = date.startOf('month');
        // var endDate = date.endOf('month');

        // console.log(startDate, endDate);

        // if (startDate) {
        //
        // }
        // if (i == 0) {
        //     _last = date.foramt('D');
        // }

        var pastClass = '';
        var notClass = '';


        // if (date.format('D') * 1 < today.format('D') * 1) {
        if (date.isBefore(today)) {
            pastClass = 'past-day';
        }

        /**
         * if date is after last day or before start day
         * notClass == 'past-day'
         */

        var week = '<div class="calendar-day calendar-day-grid calendar-date ' + date.format('YYYY-MM-DD') + ' ' + pastClass + ' ">' + date.format('D') + '</div>';
        // console.log(_templateBody)
        _templateBody += week;
    }
    var _template =
        // '<div class="calendar-week week-today week-' + time.week + '">' + _templateBody + '</div>';
    '<div class="calendar-week c-week-' + time.week + '">' + _templateBody + '</div>';

    return _template
};



var calendarData = function () {
    // console.log("ha2");
    var today = moment();
    // console.log(today);
    var calendar = {
        data: [],
        today: moment(),
        day: today.isoWeekday()
    };
    // console.log(calendar.today);
    var thisWeek = moment().isoWeek();
    // var thisYear = moment().year();
    var day = 0;
    // calendar의 data 객체를 생성함.
    for (i = 0; i < 24; i++) { // 오늘 부터 +6주까지 계산함
        // '오늘'을 계산하기 위한 변수. 값이 0이면 오늘 값을 넣고 아니면 1주일을 더한날을 입력
        if (day == 0) {
            day = today;
        } else {
            day = day.add(7, 'days');
        }

        // moment().day(i).week(time.week)
        // data 객체 생성
        var _data = {
            week: i + (thisWeek * 1), // iso 포맷의 week number를 저장
            month: moment().day(0).week(i + (thisWeek * 1)).format('MM'), //
            year: day.format('YYYY')
        };

        //data 객체를 배열로 push
        calendar.data.push(_data);
    }

    // console.log(calendar.today);
    // console.log(calendar)
    return calendar;
};

// var test = moment().day(5).week(39)var test = moment().day(5).week(39)

