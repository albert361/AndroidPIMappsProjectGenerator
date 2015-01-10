function Classpath() {
	// private
	var entries = [];

	// public
	this.addEntry = function(entry) {
		entries.push(entry);
	}

	this.writeXML = function (filePath) {
		var builder = require('xmlbuilder');
		var root = builder.create('classpath');

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

Classpath.ClasspathEntry = function(vkind, vpath, vexported, vcombineaccessrules, vexcluding) {
	vkind = vkind || '';
	vpath = vpath || '';
	vexported = vexported || '';
	vcombineaccessrules = vcombineaccessrules || '';
	vexcluding = vexcluding || '';
	this.kind = vkind;
	this.path = vpath;
	this.exported = vexported;
	this.combineaccessrules = vcombineaccessrules;
	this.excluding = vexcluding;

	this.name = 'classpathentry';
	this.atts = [
		{ 
			name : 'kind',
		    value : this.kind
		},
		{
			name : 'path',
			value : this.path
		},
		{ 
			name : 'exported',
		    value : this.exported
		},
		{
			name : 'combineaccessrules',
			value : this.combineaccessrules
		},
		{
			name : 'excluding',
			value : this.excluding
		}
	];
}