function TaskContract() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.google.contract';
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/com.google.contract';
	this.PATH_RELATIVE = '/packages/apps/Task/taskcontract';

	this.name = 'com.google.contract';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskContract, TaskLibsEntry);
TaskContract.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(this.DIR + '/res');
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskContract.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskContract.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskContract.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'src'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', '/' + AOSP_PROJECT_NAME));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskContract.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskContract.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('src', 'PARENT-2-PROJECT_LOC/links/com.google.contract/src'));
	
	return project;
}
TaskContract.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}