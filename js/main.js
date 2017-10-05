var makeCalendar = function () {
    var e = $('#calendar');
    var calendar = calendarData();

    // options
    var _month = 0; // data의 month값을 지정하는 변수
    var _last = 0; // month가 바뀌는 주의 일요일이 무슨 date인지 파악하는 변수

    for (var i = 0; i < calendar.data.length; i++) {
        var calData = calendar.data[i];

        if (_month != calData.month) { // 월이 바뀔경우 진입
            // console.log(calendar.data[i]);
            e.append(createMonth(calData)); // 월 표시를 append
            _last = moment().day(0).week(calendar.data[i].week).format('D'); // sunday가 1일인지 확인후, 1일이 아닐경우 1주 전 데이터를 한번더 출력함.

            if (_last > 1 && _month !== 0) {
                e.append(createWeek(calendar.data[i - 1], calendar.today, calData.month, calData.year)); // 전주 생성
            }

            e.append(createWeek(calData, calendar.today, calData.month, calData.year)); // 이번주 생성
            _month = calData.month; // month 값을 바꿈
        } else if (_month == calData.month) {
            e.append(createWeek(calData, calendar.today, calData.month, calData.year)); // 이번주 생성
        }
    }

    $('.' + calendar.today.format('YYYY-MM-DD')).addClass('day-today'); //
    $('.calendar-week:nth-child(3)').addClass('week-selected'); // 왜 3번째인지.. 참..
};

var createMonth = function (time) {
  var _template =
    '<div class="calendar-month c-month-' + time.month + '">' +
        '<h2 class="calendar-title">' + time.year + '년 ' + time.month + '월</h2>' +
        '<div class="calendar-grid c-grid-' + time.month + '">' +
        '</div>' +
    '</div>';

  return _template;
};


var createWeek = function (time, today, month, year) {
    var _templateBody = '';
    for (var i = 0; i < 7; i++) {
        var date = moment().day(i).week(time.week);
        var startDate = moment([year, month * 1 - 1]);
        var endDate = moment(startDate).endOf('month');

        var pastClass = '';
        var notClass = '';

        if (date.isBefore(today)) {
            pastClass = 'past-day';
        }

        /**
         * if date is after last day or before start day
         * notClass == 'not-day'
         */

        if (date.isBefore(startDate) || date.isAfter(endDate)) {
            notClass = 'not-day'
        }

        var _week = '<div class="calendar-day calendar-day-grid calendar-date ' + date.format('YYYY-MM-DD') + ' ' + pastClass + ' ' + notClass + ' ">' + date.format('D') + '</div>';

        _templateBody += week; // add week html string
    }
    var _template = '<div class="calendar-week c-week-' + time.week + '">' + _templateBody + '</div>';

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
            year: moment().day(0).week(i + (thisWeek * 1)).format('YYYY')
        };

        //data 객체를 배열로 push
        calendar.data.push(_data);
    }

    // console.log(calendar.today);
    console.log(calendar)
    return calendar;
};
$.fn.xclndr = function () {
    //this or $(this)
};