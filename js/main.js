var tasks = [];
function Submit(root, aosp, amax) {
	if (!root.startsWith('/') || !aosp.startsWith('/') || !amax.startsWith('/'))
		return;

	if (root.trim().length > 0)
		ROOT = root;
	if (aosp.trim().length > 0)
		AOSP = aosp;
	if (amax.trim().length > 0)
		AMAX = amax;
	console.log(root);
	console.log(aosp);
	console.log(amax);

	tasks.push(new TaskRoot());

	tasks.push(new TaskApps());
	tasks.push(new TaskCalendar());
	tasks.push(new TaskEmail());
	tasks.push(new TaskExchangeResource());
	tasks.push(new TaskTask());

	tasks.push(new TaskLibs());
	tasks.push(new TaskLinks());
	tasks.push(new TaskAndroidCommon());
	tasks.push(new TaskAndroidCommonChips());
	tasks.push(new TaskCalendarCommon());
	tasks.push(new TaskContract());
	tasks.push(new TaskCalendarContract());
	tasks.push(new TaskSupportV4());
	tasks.push(new TaskGuava());
	tasks.push(new TaskJsr305());
	//tasks.push(new TaskMailCommon());

	makeDirectories();

	makeSymbolicLinks();

	makeAndroidManifest();

	makeClassPath();

	makeProject();

	makeProjectProperties();
}

function makeDirectories() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeFolder();
	}
}

function makeSymbolicLinks() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeSymlink();
	}
}

function makeAndroidManifest() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeAndroidManifest();
	}
}

function makeClassPath() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeClassPath();
	}
}

function makeProject() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeProject();
	}
}

function makeProjectProperties() {
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].makeProjectProperties();
	}
}