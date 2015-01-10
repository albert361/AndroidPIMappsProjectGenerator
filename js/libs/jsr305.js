function TaskJsr305() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.google.jsr305';
	this.SOURCE = AOSP;
	this.DIR_RELATIVE = '/jsr305';
	this.PATH_RELATIVE = '/external/jsr305/ri/src/main';

	this.name = 'jsr305';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskJsr305, TaskLibsEntry);
TaskJsr305.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(this.DIR + '/res');
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskJsr305.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskJsr305.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskJsr305.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'java'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskJsr305.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskJsr305.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('java', 'PARENT-2-PROJECT_LOC/links/jsr305/java'));

	return project;
}
TaskJsr305.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}