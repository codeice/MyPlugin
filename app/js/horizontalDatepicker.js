/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-08 14:22:02
 * @version $Id$
 */

/*
var horizontalDatepicker={
    position:0,
    selectedDate:0,
    loadingDate:new Object(),

};*/



var position = 0;
var selected = '';

function DayNumOfMonth(year, month) {
    var d = new Date(year, month, 0);
    return (d.getDate());
}

function addSelectClass(id) {
    $('#date-slider span').removeClass('select');
    id.addClass('select');
}

function getInitUrl() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();


    $('#year').val(year);
    $('#month').val(month);
    appendDateHtml(year, month);
    $('#span-' + day).addClass('select');
    selected = '#span-' + day;
    var j = $('#span-' + day).offset().left;
    var i = $('#span-1').offset().left;
    this.position = i - j;
    $('#date-slider').animate({
        left: position + 'px'
    });
    if (month.toString().length < 2) {
        month = "0" + month;
    }
    if (day.toString().length < 2) {
        day = "0" + day;
    }

    //搜索函数 loadingExhibit(year, month, day);
}

function getExhibitionDetail(id) {
    var day = id.text();
    day = day.split('日')[0];
    var year = $('#year').val();
    var month = $('#month').val();
    if (month.toString().length < 2) {
        month = "0" + month;
    }
    if (day.toString().length < 2) {
        day = "0" + day;
    }
    loadingExhibit(year, month, day);
}

function hideYearSelectList() {
    $('#year-select-list').css('display', 'none');
}

function hideMonthSelectList() {
    $('#month-select-list').css('display', 'none');
}


function appendDateHtml(year, val) {
    var num = DayNumOfMonth(year, val);
    $('#date-slider').html('');
    for (var i = 1; i <= num; i++) {
        $('#date-slider').append('<span id=span-' + i + ' onclick = hideYearSelectList();hideMonthSelectList();addSelectClass($(this));getExhibitionDetail($(this));selected="#"+$(this).attr("id"); style=vertical-align:middle;text-align:center;cursor:pointer;float:left;width:64px;height:40px;margin-top:8px;padding-top:10px;padding-top:7px;>' + i + '日</span>');
    }
    position = 0;
    $('#date-slider').css('left', '0');
}

$(document).ready(function() {
    var month;
    var year;
    for (var i = 1; i <= 31; i++) {
        $('#date-slider').append('<span id=span-' + i + ' style=vertical-align:middle;text-align:center;cursor:pointer;float:left;width:64px;height:40px;margin-top:10px;>' + i + 'ºÅ</span>');
    }

    $('#date-slider span').click(function() {
        $(this).addClass('select')

        getExhibitionDetail($(this));
    })

    $('.year-item').click(function() {
        var val = $(this).text().replace(/^\s+|\s+$/g, '');
        var month = $('#month').val();
        hideYearSelectList();
        $('#year').val(val);
        appendDateHtml(val, month);
    })

    $('.month-item').click(function() {
        var year = $('#year').val();
        var val = $(this).children('input').val();

        hideMonthSelectList();
        $('#month').val(val);
        appendDateHtml(year, val);
    })

    //年份上一页
    $('#pre-year-page').click(function() {
        $.each($('td.year-item'), function(index, el) {
            $(el).text(eval($(el).text()) - 1);
        })
    })
    //年份下一页
    $('#next-year-page').click(function() {
        $.each($('td.year-item'), function(index, el) {
            //alert($(el).text());
            $(el).text(eval($(el).text()) + 1);
        })
    })


    $('#year-wrapper').hover(function() {
        $('#month-select-list').css('display', 'none');
        $('#year-select-list').css('display', 'block');
    })

    $('#month-wrapper').hover(function() {
        $('#year-select-list').css('display', 'none');
        $('#month-select-list').css('display', 'block');
    })

    //日期右滑动
    $('#turn-date-right').click(function() {

        var itemLength = 320;
        if (position > -1216) {
            position = position - itemLength;
            $('#date-slider').animate({
                left: position + 'px'
            }, 800);
        }
        if (position < -1216 && position > -1344) {
            position = -1344;
            $('#date-slider').animate({
                left: position + 'px'
            }, 800);
            return;
        } else if (position <= -1344) {
            var month = $('#month').val();
            var year = $('#year').val();

            if (month == '12') {
                $('#year').val(parseInt(year) + 1);
                $('#month').val('1');
                appendDateHtml(parseInt(year) + 1, 1);
            } else {
                appendDateHtml(year, month + 1);
                $('#month').val(parseInt(month) + 1);
            }

            $('#date-slider').animate({
                left: position + 'px'
            });
        }

    })

    //日期左滑动
    $('#turn-date-left').click(function() {
        var itemLength = 320;
        if (position < 0 && position >= -itemLength) {
            position = 0;
            $('#date-slider').animate({
                left: position + 'px'
            }, 800);
            return;
        }
        if (position < -itemLength) {
            position = position + itemLength;
            $('#date-slider').animate({
                left: position + 'px'
            }, 800);

        } else if (position == 0) {

            var month = $('#month').val();
            var year = $('#year').val();
            if (month == 1) {
                $('#year').val(year - 1);
                $('#month').val('12');
                appendDateHtml(year - 1, 12);
            } else {
                appendDateHtml(year, month - 1);
                $('#month').val(month - 1);
            }

            position = -1344;
            $('#date-slider').animate({
                left: position + 'px'
            });
        }
    })

    $('#month-select-list').mouseleave(function() {
        $('#month-select-list').css('display', 'none');
    });

    $('#year-select-list').mouseleave(function() {
        $('#year-select-list').css('display', 'none');
    })

    getInitUrl();
});
