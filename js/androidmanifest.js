function AndroidManifest(package) {
	// private
	var entries = [];

	// public
	this.package = package;

	this.addEntry = function(entry) {
		entries.push(entry);
	}

	this.writeXML = function (filePath) {
		var builder = require('xmlbuilder');
		var root = builder.create('manifest');
		root.att('xmlns:android', 'http://schemas.android.com/apk/res/android');
		root.att('package', this.package);
		root.att('android:versionCode', '1');
		root.att('android:versionName', '1.0');

		for (var i = 0; i < entries.length; i++) {
			var item = entries[i];
			var ele = root.ele(item.name);
			for (var j = 0; j < item.atts.length; j++) {
				var att = item.atts[j];
				if (att.value != '')
					ele.att(att.name, att.value);
			}
		}

		var xml = root.end({pretty : true});
		var fs = require('fs');
		fs.writeFileSync(filePath, xml);
	};
}

AndroidManifest.UsesSDK = function(vmin, vtarget) {
	vmin = vmin || '8';
	vtarget = vtarget || '17';
	this.min = vmin;
	this.target = vtarget;
	this.name = 'uses-sdk';
	this.atts = [
		{ 
			name : 'android:minSdkVersion',
		    value : this.min
		},
		{
			name : 'android:targetSdkVersion',
			value : this.target
		}
	];
}