/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-08 14:22:02
 * @version $Id$
 */
function loadingData(year, month, day) {
    console.log(year + "-" + month + "-" + day);
}
$(function() {
    horizontalDatepicker.init(loadingData);
});

var horizontalDatepicker = {
    position: 0,
    loadingData: new Function(),
    init: function(callback) {
        horizontalDatepicker.loadingData = callback;
        horizontalDatepicker.initialControl();

        //年份下拉列表
        $('#year-wrapper').hover(function() {
            $('#month-select-list').css('display', 'none');
            $('#year-select-list').css('display', 'block');
        })
        $('#year-select-list').mouseleave(function() {
            $('#year-select-list').css('display', 'none');
        })

        //月份下拉列表
        $('#month-wrapper').hover(function() {
            $('#year-select-list').css('display', 'none');
            $('#month-select-list').css('display', 'block');
        })

        $('#month-select-list').mouseleave(function() {
            $('#month-select-list').css('display', 'none');
        });

        //年份事件绑定
        $('.year-item').on("click", function() {
            var year = $(this).text().replace(/^\s+|\s+$/g, '');
            var month = $('#month').val();
            horizontalDatepicker.hideYearSelectList();
            $('#year').val(year);
            horizontalDatepicker.appendDateHtml(year, month);
        });

        //月份表事件绑定
        $('.month-item').on("click", function() {
            var year = $('#year').val();
            var month = $(this).children('input').val();
            horizontalDatepicker.hideMonthSelectList();
            $('#month').val(month);
            horizontalDatepicker.appendDateHtml(year, month);
        });

        //年份上一页
        $('#pre-year-page').on("click", function() {
            $.each($('td.year-item'), function(index, element) {
                console.log("index=",index,"element=",element);
                $(element).text(eval($(element).text()) - 1);
            });
        });

        //年份下一页
        $('#next-year-page').on("click", function() {
            $.each($('td.year-item'), function(index, element) {
                //alert($(el).text());
                $(element).text(eval($(element).text()) + 1);
            })
        });

        // 日期选中事件
        $('#date-slider span').on("click", function() {
            horizontalDatepicker.toggleSelectedDay($(this));
            horizontalDatepicker.getCurrentDateData($(this));
        });

        //日期右滑动
        $('#turn-date-right').click(function() {
            var itemLength = 320;
            if (horizontalDatepicker.position > -1216) {
                horizontalDatepicker.position = horizontalDatepicker.position - itemLength;
                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                }, 800);
            }
            if (horizontalDatepicker.position < -1216 && horizontalDatepicker.position > -1344) {
                horizontalDatepicker.position = -1344;
                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                }, 800);
                return;
            } else if (horizontalDatepicker.position <= -1344) {
                var month = $('#month').val();
                var year = $('#year').val();
                if (month == '12') {
                    $('#year').val(parseInt(year) + 1);
                    $('#month').val('1');
                    horizontalDatepicker.appendDateHtml(parseInt(year) + 1, 1);
                } else {
                    horizontalDatepicker.appendDateHtml(year, month + 1);
                    $('#month').val(parseInt(month) + 1);
                }

                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                });
            }
        });

        //日期左滑动
        $('#turn-date-left').click(function() {
            var itemLength = 320;
            if (horizontalDatepicker.position < 0 && horizontalDatepicker.position >= -itemLength) {
                horizontalDatepicker.position = 0;
                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                }, 800);
                return;
            }
            if (horizontalDatepicker.position < -itemLength) {
                horizontalDatepicker.position = horizontalDatepicker.position + itemLength;
                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                }, 800);

            } else if (horizontalDatepicker.position == 0) {
                var month = $('#month').val();
                var year = $('#year').val();
                if (month == 1) {
                    $('#year').val(year - 1);
                    $('#month').val('12');
                    horizontalDatepicker.appendDateHtml(year - 1, 12);
                } else {
                    horizontalDatepicker.appendDateHtml(year, month - 1);
                    $('#month').val(month - 1);
                }

                horizontalDatepicker.position = -1344;
                $('#date-slider').animate({
                    left: horizontalDatepicker.position + 'px'
                });
            }
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
        $('#date-slider').html('');
        for (var i = 1; i <= num; i++) {
            // $('#date-slider').append('<span id=span-' + i + ' onclick = hideYearSelectList();hideMonthSelectList();addSelectClass($(this));getExhibitionDetail($(this));selected="#"+$(this).attr("id"); style=vertical-align:middle;text-align:center;cursor:pointer;float:left;width:64px;height:40px;margin-top:8px;padding-top:10px;padding-top:7px;>' + i + '日</span>');
            $('#date-slider').append('<span id=span-' + i + ' class=day-number>' + i + '日</span>');
        }
        horizontalDatepicker.position = 0;
        $('#date-slider').css('left', '0');
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
        $('#span-' + day).addClass('select');
        var j = $('#span-' + day).offset().left;
        var i = $('#span-1').offset().left;
        horizontalDatepicker.position = i - j;
        $('#date-slider').animate({
            left: horizontalDatepicker.position + 'px'
        });
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        horizontalDatepicker.loadingData(year, month, day);
    },
    //隐藏年份下啦列表
    hideYearSelectList: function() {
        $('#year-select-list').css('display', 'none');
    },
    //隐藏月份下拉列表
    hideMonthSelectList: function() {
        $('#month-select-list').css('display', 'none');
    },
    // 更改选中日期的样式
    toggleSelectedDay: function($selectedDaySpan) {
        $selectedDaySpan.addClass('select');
        $selectedDaySpan.siblings().removeClass("select");
    },
    //获取当前日期并执行回调函数
    getCurrentDateData: function($selectedDaySpan) {
        var day = $selectedDaySpan.text();
        day = day.split('日')[0];
        var year = $('#year').val();
        var month = $('#month').val();
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        horizontalDatepicker.loadingData(year, month, day);
    }
};
