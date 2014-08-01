// Need to clean up the formatting on this file - PyCharm has this built in
$(function () {
Highcharts.setOptions({
colors: ['#7cd5ec', '#FF0000', '#90ed7d', '#0971B2', '#8085e9'],
chart: {plotBackgroundColor: 'rgba(255, 255, 255, 0)'}
});





    $.ajax({
        url: 'tweet/',
        type: "GET",
        success: function(data) {
            console.log(data);
            tweetName = data.length;
            console.log(tweetName);
        },
        error: function(data){
            console.log(data);
        }
    });

    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    
        var chart;
        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Twitch tweets/min'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 1000
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
    
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            }]
        });
    });

    $(function () {
    var tweet_list = {};
    var tweet_data = [];
    var newList = [];


//    keys = Object.keys(tweet_list);
//          len = keys.length;
//
//          keys.sort();
//
//          for (i = 0; i < len; i++)
//          {
//              k = keys[i];
//              alert(k + ':' + tweet_list[k]);
//          }
    newList.sort(function(index){
        return function(a,b){
            return (a[index] === b[index]? 0: (a[index] < b[index] ? -1: 1))
        }
    });

    $.ajax({
        url: 'top_tweet/',
        type: "GET",
        success: function(data) {
            console.log(data);
            for (var i= 0; i < data.length; i++) {
                var tweeted = data[i].tweeted;//
//                  tweet_list.push(tweeted)
                if (tweet_list.hasOwnProperty(tweeted)){
                    tweet_list[tweeted] +=1

                }
                else{
                   tweet_list[tweeted] = 1
                }



            }
        console.log(tweet_list);
        },
        error: function(data){
            console.log(data);
        }
    }).complete(function(){
//
          newList.sort(function(a,b) {return a[1] - b[1]});
          for(var key in tweet_list){
              var nestedList = [key, tweet_list[key]];
              newList.push(nestedList);
              newList.sort(function(a,b) {return - (a[1] - b[1])});




          $('#container2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Trending<br>for<br>Twitch',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Top five tweeted',
            innerSize: '50%',
            data: [newList[0], newList[1], newList[2], newList[3], newList[4]]

//                [
//                ['Firefox',   45.0],
//                ['IE',       26.8],
//                ['Chrome', 12.8],
//                ['Safari',    8.5],
//                ['Opera',     6.2]
//                {
//                    name: 'Others',
//                    y: 0.7,
//                    dataLabels: {
//                        enabled: false
//                    }
//                }
//            ]
        }]
    });
          }


//        var tester = newList[1];
//        console.log(tester);

      });


});

});
