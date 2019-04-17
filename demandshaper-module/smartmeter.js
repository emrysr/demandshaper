var inputs = {};
var graph_feed = false;
var graph_feed_name = false;

view.end = +new Date;
view.start = view.end - (3600000*24.0*1);

function load_device() {

    if (device!=undefined && devices[device]!=undefined) {
        device_loaded = true;
        console.log("device loaded");

        $("#devicename").html(jsUcfirst(device));
        $(".node-scheduler-title").html("<span class='icon-"+devices[device].type+"'></span>"+device);
        $(".node-scheduler").attr("node",device);
        
        first_load = true;
        update_status();
        setInterval(update_status,5000);
        function update_status(){
            $.ajax({ url: emoncmspath+"input/get/"+device+apikeystr, dataType: 'json', async: true, success: function(result) {
                if (result!=null) {
                    inputs = result;
                    if (inputs.kW!=undefined) {
                        $(".value").each(function(){
                            var name = $(this).attr("name");
                            var scale = $(this).attr("scale");
                            if (scale==undefined) scale = 1;
                            var dp = $(this).attr("dp");
                            if (dp==undefined) dp = 1;
                            $(this).html((inputs[name].value*scale).toFixed(dp));
                        });
                        
                        if (first_load) {
                            first_load = false;
                            graph_feed_name = "kW";
                            load_graph();
                        }
                    }
                }
            }});
        }
    }
    
    $(window).resize(function(){
        draw_graph();
    });
}

$(".value-block").click(function(){
    graph_feed_name = $(this).attr("name");
    load_graph();
});

function load_graph() {

    var processList = (inputs[graph_feed_name].processList).split(",");
    var processListItem = (processList[0]).split(":");
    if (processListItem[0]=="1") graph_feed = 1*processListItem[1];

    interval = Math.round(((view.end - view.start)/800)/1000);
    
    data = []
    $.ajax({                                      
        url: emoncmspath+"feed/data.json?id="+graph_feed+"&start="+view.start+"&end="+view.end+"&interval="+interval+apikeystr,
        dataType: 'json',
        async: true,                      
        success: function(result) {
            data = result
            draw_graph();
            
            // -----------------------------------------
            // min/max/mean
            // -----------------------------------------
            var V_min = 100;
            var V_max = -100;
            var V_sum = 0;
            var n = 0;
            
            for (var z in data) {
                var V = data[z][1];
                if (V<V_min) V_min = V;
                if (V>V_max) V_max = V;
                V_sum += V;
                n++;
            }
            V_mean = V_sum / n;
            
            $("#smartmeter_min").html((V_min).toFixed(1));
            $("#smartmeter_max").html((V_max).toFixed(1));
            $("#smartmeter_mean").html((V_mean).toFixed(1));
        }
    });
}

function draw_graph() {
    var flot_font_size = 12;
    var options = {
        xaxis: { 
            mode: "time", 
            timezone: "browser", 
            font: {size:flot_font_size, color:"#666"}, 
            // labelHeight:-5
            reserveSpace:false,
            min: view.start,
            max: view.end
        },
        yaxis: { 
            font: {size:flot_font_size, color:"#666"}, 
            // labelWidth:-5
            reserveSpace:false
        },
        selection: { mode: "x" },
        grid: {
            show:true, 
            color:"#aaa",
            borderWidth:0,
            hoverable: true, 
            clickable: true
        }
    }
    
    var width = $("#placeholder_bound").width();
    if (width>0) {
        $("#placeholder").width(width);
        $.plot($('#placeholder'), [{data:data,color:"#000"}], options);
    }
}

$("#zoomout").click(function () {view.zoomout(); load_graph();});
$("#zoomin").click(function () {view.zoomin(); load_graph();});
$('#right').click(function () {view.panright(); load_graph();});
$('#left').click(function () {view.panleft(); load_graph();});
$('.graph-time').click(function () {view.timewindow($(this).attr("time")); load_graph();});

$("#placeholder").bind("plotselected", function (event, ranges)
{
    view.start = ranges.xaxis.from;
    view.end = ranges.xaxis.to;
    load_graph(graph_feed_name);
});

function jsUcfirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
