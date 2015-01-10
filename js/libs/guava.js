function TaskGuava() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.google.common';
	this.SOURCE = AOSP;
	this.DIR_RELATIVE = '/guava';
	this.PATH_RELATIVE = '/external/guava/guava';

	this.name = 'guava';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskGuava, TaskLibsEntry);
TaskGuava.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(this.DIR + '/res');
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskGuava.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskGuava.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskGuava.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'java'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskGuava.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskGuava.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('java', 'PARENT-2-PROJECT_LOC/links/guava/src'));

	return project;
}
TaskGuava.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}

// project.properties
TaskGuava.prototype.genProjectProperties = function () {
	var text = DEFAULT_PROPERTIES +
		'target=android-17\n' +
		'android.library=true\n' +
		'android.library.reference.1=../jsr305\n';
	return text;
}