function Project(name) {
	// private
	var linkedResources = [];

	// public
	this.name = name;

	this.addLinkedResouce = function(res) {
		linkedResources.push(res);
	}

	this.writeXML = function (filePath) {
		var builder = require('xmlbuilder');
		var root = builder.create('projectDescription');
		//<name>this.name</name>
		root.ele('name', this.name);
		//<comment />
		root.ele('comment');
		//<projects />
		root.ele('projects');
		//<buildSpec> ... </buildSpec>
		var buildSpecNode = root.ele('buildSpec');
		var commands = [
			'com.android.ide.eclipse.adt.ResourceManagerBuilder',
			'com.android.ide.eclipse.adt.PreCompilerBuilder',
			'org.eclipse.jdt.core.javabuilder',
			'com.android.ide.eclipse.adt.ApkBuilder'
		];
		for (var i = 0; i < commands.length; i++) {
			var cmdNode = buildSpecNode.ele('buildCommand');
			cmdNode.ele('name', commands[i]);
			cmdNode.ele('arguments');
		}
		//<natures> ... </natures>
		var naturesNode = root.ele('natures');
		var natures = [
			'com.android.ide.eclipse.adt.AndroidNature',
			'org.eclipse.jdt.core.javanature'
		];
		for (var i = 0; i < natures.length; i++) {
			naturesNode.ele('nature', natures[i]);
		}
		//<linkedResources> ... </linkedResources>
		var linkedResRoot = root.ele('linkedResources');
		for (var i = 0; i < linkedResources.length; i++) {
			var item = linkedResources[i];
			var link = linkedResRoot.ele('link');
			link.ele('name', item.name);
			link.ele('type', item.type);
			link.ele('locationURI', item.path);
		}

		var xml = root.end({pretty : true});
		var fs = require('fs');
		fs.writeFileSync(filePath, xml);
	};
}

Project.Link = function(name, path, type) {
	type = type || '2';
	this.name = name;
	this.path = path;
	this.type = type;
}