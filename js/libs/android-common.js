function TaskAndroidCommon() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.android.common';
	this.SOURCE = AOSP;
	this.DIR_RELATIVE = '/android-common';
	this.PATH_RELATIVE = '/frameworks/ex/common';

	this.name = 'android-common';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskAndroidCommon, TaskLibsEntry);
TaskAndroidCommon.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(this.DIR + '/res');
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskAndroidCommon.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskAndroidCommon.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskAndroidCommon.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'java'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskAndroidCommon.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskAndroidCommon.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('java', 'PARENT-2-PROJECT_LOC/links/android-common/java'));

	return project;
}
TaskAndroidCommon.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}