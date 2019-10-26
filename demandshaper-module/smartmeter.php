<div id="scheduler-outer">
  <div class="delete-device"><i class="icon-trash icon-white"></i></div>
  <div class="node-scheduler-title"></div>
  <div class="node-scheduler" node="">

    <div class="scheduler-inner">
      <div class="scheduler-inner2">
        
        <div style="text-align:center">
            <div class="value-block col6" name="W">
                <div class="value-block-inner">
                    <p>Power</p>
                    <div><span class="value" name="W" dp=0 style="font-size:22px"></span>W</div>
                </div>
            </div>
            <div class="value-block col6" name="Hz">
                <div class="value-block-inner">
                    <p>Frequency</p>
                    <div><span class="value" name="Hz" dp=3 style="font-size:22px"></span>Hz</div>
                </div>
            </div>
            <div class="value-block col6" name="pf">
                <div class="value-block-inner">
                    <p>Power Factor</p>
                    <div><span class="value" name="pf" dp=2  style="font-size:22px"></span></div>
                </div>
            </div>
            <div class="value-block col6" name="V">
                <div class="value-block-inner">
                    <p>Voltage</p>
                    <div><span class="value" name="V"  style="font-size:22px"></span>V</div>
                </div>
            </div>
            <div class="value-block col6" name="imkWh">
                <div class="value-block-inner">
                    <p>Import</p>
                    <div><span class="value" name="imkWh" dp=0  style="font-size:22px"></span>kWh</div>
                </div>
            </div>
            <div class="value-block col6" name="exkWh">
                <div class="value-block-inner">
                    <p>Export</p>
                    <div><span class="value" name="exkWh" dp=0  style="font-size:22px"></span>kWh</div>
                </div>
            </div>
            <div style="clear:both"></div>
            <br>
        </div>

        <div style="text-align:center; border: 1px solid #333;">
            <div class="viewmode col3" mode="power"><div class="pad10" style="border-right: 1px solid #333;">Power</div></div>
            <div class="viewmode col3" mode="halfhourly"><div class="pad10" style="border-right: 1px solid #333;">Half-hourly</div></div>
            <div class="viewmode col3" mode="daily"><div class="pad10">Daily</div></div>
            <div style="clear:both"></div>
        </div>
    
        <div id="placeholder_bound" style="width:100%; height:500px; position:relative">
        
            <div id="placeholder" style="height:400px"></div>
            
            <div id="graph-buttons" style="position:absolute; top:18px; right:32px; opacity:0.5;">
                <div class='btn-group'>
                    <button class='btn graph-time' type='button' time='1'>D</button>
                    <button class='btn graph-time' type='button' time='7'>W</button>
                    <button class='btn graph-time' type='button' time='30'>M</button>
                    <button class='btn graph-time' type='button' time='365'>Y</button>
                </div>

                <div class='btn-group' id='graph-navbar'>
                    <button class='btn graph-nav' id='zoomin'>+</button>
                    <button class='btn graph-nav' id='zoomout'>-</button>
                    <button class='btn graph-nav' id='left'><</button>
                    <button class='btn graph-nav' id='right'>></button>
                </div>
            </div>
        </div>
        
        <br>
        <div style="text-align:center">
            <div class="col4 fl">
                <div class="pad5">
                    <p>Min</p>
                    <div><span id="smartmeter_min" style="font-size:22px"></span></div>
                </div>
            </div>
            <div class="col4 fl">
                <div class="pad5">
                    <p>Max</p>
                    <div><span id="smartmeter_max" style="font-size:22px"></span></div>
                </div>
            </div>
            <div class="col4 fl">
                <div class="pad5">
                    <p>Mean</p>
                    <div><span id="smartmeter_mean" style="font-size:22px"></span></div>
                </div>
            </div>
            <div class="col4 fl">
                <div class="pad5">
                    <p>Energy</p>
                    <div><span id="smartmeter_kwh" style="font-size:22px"></span>kWh</div>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
      </div> <!-- schedule-inner2 -->
    </div> <!-- schedule-inner -->
  </div> <!-- node-scheduler -->
</div> <!-- table -->
</div>

<div id="DeleteDeviceModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="DeleteDeviceModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="feedDeleteModalLabel">Delete Device: <span class='device-name'></span></h3>
    </div>
    <div class="modal-body">
         <p>Are you sure you want to delete device <span class='device-name'></span>?</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true"><?php echo _('Close'); ?></button>
        <button id="delete-device-confirm" class="btn btn-danger"><?php echo _('Confirm'); ?></button>
    </div>
</div>

<script language="javascript" type="text/javascript" src="<?php echo $path;?>Modules/vis/visualisations/common/vis.helper.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>Modules/demandshaper/smartmeter.js?v=6"></script>
