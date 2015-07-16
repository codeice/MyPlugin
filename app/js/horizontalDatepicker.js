/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-08 14:22:02
 * @version $Id$
 */
 function loadData(year, month, day) {
    console.log("Current selected day is:", year + "-" + month + "-" + day);
}
$(function() {
    horizontalDatepicker.init(loadData);
});

var horizontalDatepicker = {
    offset: 0,
    dayNumber: 0,
    step: 5,
    dayElementWidth: 64,
    loadData: new Function(),
    init: function(callback) {
        horizontalDatepicker.loadData = callback;
        horizontalDatepicker.initialControl();
        //年份下拉列表
        $('#year-wrapper').hover(function() {
            horizontalDatepicker.hoverYear();
        })
        $('.year-container').mouseleave(function() {
            $('#year-select-list').css('display', 'none');
        })

        //月份下拉列表
        $('#month-wrapper').hover(function() {
            horizontalDatepicker.hoverMonth();
        })

        $('.month-container').mouseleave(function() {
            $('#month-select-list').css('display', 'none');
        });

        //更改年份
        $('#year-select-list').delegate(".year-item","click", function() {
            var year = $(this).text().replace(/^\s+|\s+$/g, '');
            horizontalDatepicker.changeYear(year);
        });

        //更改月份
        $('#month-select-list').delegate(".month-item","click", function() {
            var month = $(this).children('input').val();
            horizontalDatepicker.changeMonth(month);
        });

        //年份上一页
        $('#pre-year-page').on("click", function() {
            horizontalDatepicker.changeYearPage(-1);
        });

        //年份下一页
        $('#next-year-page').on("click", function() {
            horizontalDatepicker.changeYearPage(1);
        });

        //日期点击事件
        $("#date-slider").delegate(".day-number","click",function(){
            horizontalDatepicker.chooseDay($(this));
        });

        //日期右滑动
        $('.date-container').delegate("#turn-date-right","click",function() {
            horizontalDatepicker.turnToRight();
        });

        //日期左滑动
        $('.date-container').delegate("#turn-date-left","click",function() {
            horizontalDatepicker.turnToLeft();
        });
    },
    // 每月的天数
    dayNumOfMonth: function(year, month) {
        var d = new Date(year, month, 0);
        return (d.getDate());
    },
    //日期html初始化
    appendDateHtml: function(year, month) {
        var num = horizontalDatepicker.dayNumOfMonth(year, month);
        //根据每月天数计算date-slider的宽度
        var dateSliderWidth = num * parseInt(horizontalDatepicker.dayElementWidth);
        $("#date-slider").width(dateSliderWidth);
        $('#date-slider').html('');
        for (var i = 1; i <= num; i++) {
            $('#date-slider').append('<span id=span-' + i + ' class=day-number>' + i + '日</span>');
        }
        horizontalDatepicker.offset = 0;
        horizontalDatepicker.dayNumber = 1;
        $('#date-slider').css('left', '0');
        /*horizontalDatepicker.chooseDay();*/
    },
    // 日期控件视图初始化
    initialControl: function() {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();

        $('#year').val(year);
        $('#month').val(month);
        horizontalDatepicker.appendDateHtml(year, month);

        //设置当前日期为选中状态
        horizontalDatepicker.dayNumber = day;
        $('#span-' + day).addClass('select');
        var firstDayOffset = $('#span-1').offset().left;
        var currentDayOffset = $('#span-' + day).offset().left;
        horizontalDatepicker.offset = firstDayOffset - currentDayOffset;
        $('#date-slider').animate({
            left: horizontalDatepicker.offset + 'px'
        });
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        if(horizontalDatepicker.loadData!=undefined)
        {
            horizontalDatepicker.loadData(year, month, day);
        }
    },
    hoverYear: function() {
        $('#month-select-list').css('display', 'none');
        $('#year-select-list').css('display', 'block');
    },
    hoverMonth: function() {
        $('#year-select-list').css('display', 'none');
        $('#month-select-list').css('display', 'block');
    },
    //改变年份
    changeYear: function(year) {
        horizontalDatepicker.hideYearMonthSelectList();
        var month = $('#month').val();
        $("#year").val(year);
        horizontalDatepicker.appendDateHtml(year, month);
    },
    //改变月份
    changeMonth: function(month) {
        horizontalDatepicker.hideYearMonthSelectList();
        var year = $('#year').val();
        $("#month").val(month);
        horizontalDatepicker.appendDateHtml(year, month);
    },
    //年份翻页
    changeYearPage: function(pageStep) {
        $.each($('td.year-item'), function(index, element) {
            $(element).text(eval($(element).text()) + pageStep);
        });
    },
    //选择日期事件
    chooseDay: function($dayElement) {
        horizontalDatepicker.hideYearMonthSelectList();
        horizontalDatepicker.toggleSelectedDay($dayElement);
        horizontalDatepicker.getCurrentDateData($dayElement);
        horizontalDatepicker.selectedDayEleId = "#" + $dayElement.attr("id");
    },
    hideYearMonthSelectList: function() {
        $('#year-select-list').css("display","none");
        $('#month-select-list').css("display","none");
    },

    // 更改选中日期的样式
    toggleSelectedDay: function($dayElement) {
        $dayElement.addClass('select');
        $dayElement.siblings().removeClass("select");
    },
    //获取当前日期并执行回调函数
    getCurrentDateData: function($selectedDayElement) {
        var day = $selectedDayElement.text();
        day = day.split('日')[0];
        var year = $('#year').val();
        var month = $('#month').val();
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        if(horizontalDatepicker.loadData!=undefined)
        {
            horizontalDatepicker.loadData(year, month, day);
        }
    },
    //日期向右滚动事件
    turnToRight: function() {
        horizontalDatepicker.dayNumber = horizontalDatepicker.dayNumber + (horizontalDatepicker.step);
        if (horizontalDatepicker.dayNumber >= 26) {
            //如果第一个显示日期为27号，则翻向下一个月
            var month = parseInt($("#month").val()) + 1;
            if (month == 13) {
                month = 1;
                var year = parseInt($("#year").val()) + 1;
                $("#year").val(year);
            }
            horizontalDatepicker.changeMonth(month);
            return false;
        } else if (horizontalDatepicker.dayNumber > 21) {
            horizontalDatepicker.dayNumber = 21;
        }
        horizontalDatepicker.offset = -(horizontalDatepicker.dayNumber * horizontalDatepicker.dayElementWidth);
        $('#date-slider').animate({
            left: horizontalDatepicker.offset + 'px'
        });
    },
    //日期向左滚动时间
    turnToLeft: function() {
        if (horizontalDatepicker.dayNumber != 0) {
            horizontalDatepicker.dayNumber = horizontalDatepicker.dayNumber - (horizontalDatepicker.step);
        }
        if (horizontalDatepicker.dayNumber <= 1) {
            var month = parseInt($("#month").val()) - 1;
            if (month == 1) {
                month = 12;
                var year = parseInt($("#year").val()) - 1;
                $("#year").val(year);
            }
            horizontalDatepicker.changeMonth(month);
            return false;
        }
        horizontalDatepicker.offset = -(horizontalDatepicker.dayNumber * horizontalDatepicker.dayElementWidth);
        $('#date-slider').animate({
            left: horizontalDatepicker.offset + 'px'
        });
    }
};
