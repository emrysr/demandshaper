<div id="scheduler-outer">
  <div class="delete-device"><i class="icon-trash icon-white"></i></div>
  <div class="node-scheduler-title"></div>
  <div class="node-scheduler" node="">

    <div class="scheduler-inner">
      <div class="scheduler-inner2">
        
        <div style="text-align:center">
            <div class="value-block" name="W">
                <div class="value-block-inner">
                    <p>Power</p>
                    <div><span class="value" name="W" dp=0 style="font-size:22px"></span>W</div>
                </div>
            </div>
            <div class="value-block" name="Hz">
                <div class="value-block-inner">
                    <p>Frequency</p>
                    <div><span class="value" name="Hz" dp=3 style="font-size:22px"></span>Hz</div>
                </div>
            </div>
            <div class="value-block" name="pf">
                <div class="value-block-inner">
                    <p>Power Factor</p>
                    <div><span class="value" name="pf" dp=2  style="font-size:22px"></span></div>
                </div>
            </div>
            <div class="value-block" name="V">
                <div class="value-block-inner">
                    <p>Voltage</p>
                    <div><span class="value" name="V"  style="font-size:22px"></span>V</div>
                </div>
            </div>
            <div class="value-block" name="imkWh">
                <div class="value-block-inner">
                    <p>Import</p>
                    <div><span class="value" name="imkWh" dp=0  style="font-size:22px"></span>kWh</div>
                </div>
            </div>
            <div class="value-block" name="exkWh">
                <div class="value-block-inner">
                    <p>Export</p>
                    <div><span class="value" name="exkWh" dp=0  style="font-size:22px"></span>kWh</div>
                </div>
            </div>
            <div style="clear:both"></div>
            <br>
        </div>


    
        <div id="placeholder_bound" style="width:100%; height:400px; position:relative">
        
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
            <div style="width:20%; float:left">
                <p>Min: <span id="smartmeter_min"></span></p>
            </div>
            <div style="width:20%; float:left">
                <p>Max: <span id="smartmeter_max"></span></p>
            </div>
            <div style="width:20%; float:left">
                <p>Mean: <span id="smartmeter_mean"></span></p>
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
<script type="text/javascript" src="<?php echo $path; ?>Modules/demandshaper/smartmeter.js?v=5"></script>
