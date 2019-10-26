var feeds = {};
var graph_feed = false;
var graph_feed_name = false;

var viewmode = "standard";

view.end = +new Date;
view.start = view.end - (3600000*24.0*1);

var options = {
    xaxis: { 
        mode: "time", 
        timezone: "browser", 
        font: {size:12, color:"#666"}, 
        // labelHeight:-5
        reserveSpace:false
    },
    yaxis: { 
        font: {size:12, color:"#666"}, 
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

function load_device() {

    device_loaded = true;
    console.log("device loaded");

    $("#devicename").html(jsUcfirst(device_name));
    $(".node-scheduler-title").html("<span class='icon-"+device_type+"'></span>"+device_name);
    $(".node-scheduler").attr("node",device_name);
    
    first_load = true;
    update_status();
    setInterval(update_status,5000);
    function update_status(){
        $.ajax({ url: emoncmspath+"feed/list.json?apikey="+apikeystr, dataType: 'json', async: true, success: function(result) {
            if (result!=null) {
                for (var z in result) {
                    feeds[result[z].name] = result[z];
                }
                
                if (feeds.W!=undefined) {
                    $(".value").each(function(){
                        var name = $(this).attr("name");
                        var scale = $(this).attr("scale");
                        if (scale==undefined) scale = 1;
                        var dp = $(this).attr("dp");
                        if (dp==undefined) dp = 1;
                        $(this).html((feeds[name].value*scale).toFixed(dp));
                    });
                    
                    if (first_load) {
                        first_load = false;
                        graph_feed_name = "W";
                        load_graph();
                    }
                }
            }
        }});
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
   
    graph_feed = feeds[graph_feed_name].id;
    
    if (viewmode=="standard") {
        interval = Math.round(((view.end - view.start)/800)/1000);
        data = []
        $.ajax({                                      
            url: emoncmspath+"feed/data.json?id="+graph_feed+"&start="+view.start+"&end="+view.end+"&interval="+interval+apikeystr,
            dataType: 'json',
            async: true,                      
            success: function(result) {
                data = result
                if (options.bars!=undefined) delete options.bars;
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
    
    if (viewmode=="halfhourly" || viewmode=="daily") {
    
        if (viewmode=="halfhourly") interval = 1800;
        if (viewmode=="daily") interval = 24*3600;
        
        var intervalms = interval * 1000;
        view.start = Math.floor(view.start/intervalms)*intervalms;
        view.end = Math.ceil(view.end/intervalms)*intervalms;
        var npoints = (view.end - view.start)/intervalms;
        
        if (npoints<8000) {
            data = []
            $.ajax({                                      
                url: emoncmspath+"feed/data.json?id="+graph_feed+"&start="+view.start+"&end="+view.end+"&interval="+interval+apikeystr,
                dataType: 'json',
                async: true,                      
                success: function(result) {
                
                    data = []
                    for (var z=1; z<result.length; z++) {
                        let delta = null;
                        if (result[z][1]!=null && result[z][1]!=null) {
                            delta = result[z][1] - result[z-1][1];
                        }
                        data.push([result[z][0],delta])
                    }
                    
                    options.bars = { show: true, align: "center", barWidth: 0.75*interval*1000, fill: 1.0, lineWidth:0}
                    
                    draw_graph();
                    
                    $("#smartmeter_min").html("");
                    $("#smartmeter_max").html("");
                    $("#smartmeter_mean").html("");
                }
            });
        }
    }
}

function draw_graph() {
    options.xaxis.min = view.start;
    options.xaxis.max = view.end;
    
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

$(".viewmode").click(function(){
    var mode = $(this).attr("mode");
    if (mode=="power") {
        graph_feed_name = "W";
        viewmode = "standard";
        load_graph();
    }
    if (mode=="halfhourly") {
        graph_feed_name = "imkWh";
        viewmode = "halfhourly";
        load_graph();
    }  
    if (mode=="daily") {
        graph_feed_name = "imkWh";
        viewmode = "daily";
        load_graph();
    }    
});

function jsUcfirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
