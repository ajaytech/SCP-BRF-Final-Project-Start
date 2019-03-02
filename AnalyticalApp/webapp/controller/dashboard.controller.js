sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("dev.demo.AnalyticalApp.controller.dashboard", {
		onInit: function () {

		
		},

		handleCBSelectionChange: function (e) {
			var ddata = [];
			var cm = this.getView().getModel("demo_data");
			var cmd = cm.getData();
			cm.setData(ddata);
			cm.setData(cmd);
		},
		vizPropertyFormatter: function (vp) {

			return (vp);
		},
		feedsFactory: function (sId, oContext) {
			var oFeed = new sap.viz.ui5.controls.common.feeds.FeedItem({
				title: "{demo_data>title}",
				uid: "{demo_data>uid}",
				type: "{demo_data>type}",
				values: [oContext.getProperty("values")]
			});
			return oFeed;
		},
		measuresFactory: function (sId, oContext) {
			var oMeasureDefinition = new sap.viz.ui5.data.MeasureDefinition({
				title: "{demo_data>title}",
				name: "{demo_data>name}",
				value: {
					path: oContext.getProperty("value")
				}
			});
			return oMeasureDefinition;

		},
		dimsFactory: function (sId, oContext) {
			var oDimensionDefinition = new sap.viz.ui5.data.DimensionDefinition({
				title: "{demo_data>title}",
				name: "{demo_data>name}",
				value: {
					path: oContext.getProperty("value")
				}
			});
			return oDimensionDefinition;

		},
		objToString: function (val) {
			var ostr = JSON.stringify(val, null, "\t");
			return ostr;

		},
		handleBRFTarget: function (newTarget) {
			
			
			var oView = sap.ui.getCore().getModel("oViewHome").getData();
			var oData = oView.getModel("demo_data").getData();
			
			if (newTarget && newTarget.length > 0 ) {
				for (var a = 0; a < oData["tilesPrediction"].length; a++) {
					
					oData["tilesPrediction"][a]["value"] = 
					Math.round((100*(newTarget[a]-parseInt(oData.data[a].actcost)))/newTarget[a]).toString();
					
					if(parseInt(oData["tilesPrediction"][a]["value"])<0){
						oData["tilesPrediction"][a]["valueColor"] = "Error";
					}else{
						oData["tilesPrediction"][a]["valueColor"]  = "Good";
					}
				}
		
			}
			oView.getModel("demo_data").setData(oData);
			

		},
		handlBRFFirstLoad: function(){
			
		
			
		},
		getBRFTarget: function () {
		
	
		}

	});
});