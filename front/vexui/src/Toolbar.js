Vex.UI.Toolbar = function (handler) {
	this.handler = handler;
	this.buttons = {};
	this.buttonGroups = {};
	var opts = this.handler.options;

	var toolbar = document.createElement('div');
	toolbar.className = "toolbar";

	if (opts.canChangeNoteValue) {
		var noteValuesGroup = this.createButtonGroup(Vex.UI.TickableType.NOTE);
		this.buttonGroups[noteValuesGroup.name] = noteValuesGroup;

		this.buttons.wholeNote = noteValuesGroup.appendChild(this.createIcon("wholeNote", "musisync-wholeNote"));
		this.buttons.halfNote = noteValuesGroup.appendChild(this.createIcon("halfNote", "musisync-halfNote"));
		this.buttons.quarterNote = noteValuesGroup.appendChild(this.createIcon("quarterNote", "musisync-quarterNote"));
		this.buttons.eightNote = noteValuesGroup.appendChild(this.createIcon("eightNote", "musisync-eightNote"));
		this.buttons.sixteenthNote = noteValuesGroup.appendChild(this.createIcon("sixteenthNote", "musisync-sixteenthNote"));

		toolbar.appendChild(noteValuesGroup);

		var restValuesGroup = this.createButtonGroup(Vex.UI.TickableType.REST);
		this.buttonGroups[restValuesGroup.name] = restValuesGroup;

		this.buttons.wholeRest = restValuesGroup.appendChild(this.createIcon("wholeRest", "musisync-wholeRest"));
		this.buttons.halfRest = restValuesGroup.appendChild(this.createIcon("halfRest", "musisync-halfRest"));
		this.buttons.quarterRest = restValuesGroup.appendChild(this.createIcon("quarterRest", "musisync-quarterRest"));
		this.buttons.eightRest = restValuesGroup.appendChild(this.createIcon("eightRest", "musisync-eightRest"));
		this.buttons.sixteenthRest = restValuesGroup.appendChild(this.createIcon("sixteenthRest", "musisync-sixteenthRest"));

		toolbar.appendChild(restValuesGroup);
		

	}
	if (opts.canPlay) {
		this.buttons.play = toolbar.appendChild(this.createIcon("play", "icomoon-play"));
		this.buttons.stop = toolbar.appendChild(this.createIcon("stop", "icomoon-stop", true));
		this.buttons.save = toolbar.appendChild(this.createIcon("save", "icomoon-floppy-disk"));
		//this.buttons.cogs = toolbar.appendChild(this.createIcon("save", "icomoon-cogs"));
		//this.buttons.bin = toolbar.appendChild(this.createIcon("save", "icomoon-bin"));
		this.buttons.load = toolbar.appendChild(this.createIcon("load", "icomoon-envelop"));
		/*this.buttons.link = toolbar.appendChild(this.createIcon("save", "icomoon-link"));
		this.buttons.warning = toolbar.appendChild(this.createIcon("save", "icomoon-warning"));
		this.buttons.enlarge = toolbar.appendChild(this.createIcon("save", "icomoon-enlarge"));
		this.buttons.shrink = toolbar.appendChild(this.createIcon("save", "icomoon-shrink"));
		this.buttons.pause = toolbar.appendChild(this.createIcon("save", "icomoon-pause"));
		this.buttons.backward = toolbar.appendChild(this.createIcon("save", "icomoon-backward"));
		this.buttons.forward = toolbar.appendChild(this.createIcon("save", "icomoon-forward"));
		this.buttons.first = toolbar.appendChild(this.createIcon("save", "icomoon-first"));
		this.buttons.last = toolbar.appendChild(this.createIcon("save", "icomoon-last"));
		this.buttons.volumehigh = toolbar.appendChild(this.createIcon("save", "icomoon-volume-high"));
		this.buttons.volumemedium = toolbar.appendChild(this.createIcon("save", "icomoon-volume-medium"));
		this.buttons.volumelow = toolbar.appendChild(this.createIcon("save", "icomoon-volume-low"));
		this.buttons.volumemute = toolbar.appendChild(this.createIcon("save", "icomoon-volume-mute"));*/
	}

	this.createTickableController();

	this.handler.container.appendChild(toolbar);
};


Vex.UI.Toolbar.prototype.handleEvent = function (evt) {
	if (evt.target.parentNode === this.tickableController) {
		this.hideAllGroups();
		this.showGroup(evt.target.name);
		this.handler.updateProvisoryType(evt.target.name);
	}


	switch (evt.target.name) {
	    case "load" :
	        this.handler.load();
	        break;
	    case "save" :
	        this.handler.save();
	        break;
		case "play":
			this.handler.play();
			break;
		case "stop":
			this.handler.stop();
			break;
		case "wholeNote":
			this.handler.updateProvisoryType(Vex.UI.TickableType.NOTE);
			this.handler.updateProvisoryDuration(1);
			//eel.save_to_midi_file() test�� �����ư(����ǥ)
			break;
		case "wholeRest":
			this.handler.updateProvisoryType(Vex.UI.TickableType.REST);
			this.handler.updateProvisoryDuration(1);
			break;
		case "halfNote":
			this.handler.updateProvisoryType(Vex.UI.TickableType.NOTE);
			this.handler.updateProvisoryDuration(2);
			break;
		case "halfRest":
			this.handler.updateProvisoryType(Vex.UI.TickableType.REST);
			this.handler.updateProvisoryDuration(2);
			break;
		case "quarterNote":
			this.handler.updateProvisoryType(Vex.UI.TickableType.NOTE);
			this.handler.updateProvisoryDuration(4);
			break;
		case "quarterRest":
			this.handler.updateProvisoryType(Vex.UI.TickableType.REST);
			this.handler.updateProvisoryDuration(4);
			break;
		case "eightNote":
			this.handler.updateProvisoryType(Vex.UI.TickableType.NOTE);
			this.handler.updateProvisoryDuration(8);
			break;
		case "eightRest":
			this.handler.updateProvisoryType(Vex.UI.TickableType.REST);
			this.handler.updateProvisoryDuration(8);
			break;
		case "sixteenthNote":
			this.handler.updateProvisoryType(Vex.UI.TickableType.NOTE);
			this.handler.updateProvisoryDuration(16);
			break;
		case "sixteenthRest":
			this.handler.updateProvisoryType(Vex.UI.TickableType.REST);
			this.handler.updateProvisoryDuration(16);
			break;
	}
};

Vex.UI.Toolbar.prototype.createIcon = function (buttonName, aditionalClasses, disabled) {
	var button = document.createElement('button');
	button.type = "button";
	button.name = buttonName;
	button.className = "icon";
	if (aditionalClasses)
		button.className += " " + aditionalClasses;

	if (disabled)
		button.disabled = true;

	button.addEventListener("click", this, false);
	return button;
};



Vex.UI.Toolbar.prototype.createButtonGroup = function (groupName) {
	var span = document.createElement('span');
	span.name = groupName;

	span.addEventListener("click", function (evt) {
		if (!evt.target.disabled) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].disabled = false;
			}
		}

		evt.target.disabled = true;

	});

	return span;
};

Vex.UI.Toolbar.prototype.createTickableController = function () {
	var tickableController = this.createButtonGroup("tickableController");

	var groups = Object.keys(this.buttonGroups);
	for (var i = 0; i < groups.length; i++) {
		var group = this.buttonGroups[groups[i]];

		/*var icon = tickableController.appendChild(this.createIcon(group.name));
		icon.innerHTML = group.name;
		icon.className += " icon-group"*/
	}

	this.tickableController = tickableController;

	this.updateActiveControllerButton();
	this.handler.container.insertBefore(tickableController, this.handler.container.children[1]);
};

Vex.UI.Toolbar.prototype.hideAllGroups = function () {
	var groups = Object.keys(this.buttonGroups);
	for (var i = 0; i < groups.length; i++) {
		this.buttonGroups[groups[i]].style.display = 'none';
	}
};

Vex.UI.Toolbar.prototype.showGroup = function (groupName) {
	this.buttonGroups[groupName].style.display = '';
};

Vex.UI.Toolbar.prototype.hideGroup = function (groupName) {
	this.buttonGroups[groupName].style.display = 'none';
};

Vex.UI.Toolbar.prototype.updateActiveControllerButton = function () {
	for (var i = 0; i < this.tickableController.children.length; i++) {
		var button = this.tickableController.children[i];
		if (this.buttonGroups[button.name].style.display === 'none')
			button.disabled = false;
		else
			button.disabled = true;
	}
};
