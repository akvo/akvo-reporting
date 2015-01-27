## Installing drake and python for ReportServer

### Drake

Drake wants to run as a user, not as root, so create a drake user. I'm not sure if putting lein and drake in /bin is right or if you create a ~/bin an put the stuff there. In any case drake is setup under ~/ and then I create symlinks. But there may be better ways, consult with the devops pros.

	sudo wget -O /bin/lein https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
	sudo chmod 755 /bin/lein
	cd
	git clone https://github.com/Factual/drake.git
	cd drake/
	lein uberjar
	cd ~/drake/target
	touch drake

In the file ```~/drake/target/drake``` enter:

	#!/bin/bash
	java -cp $(dirname $0)/drake.jar drake.core "$@"


Set perms on the bash script and create symlinks into /bin for it and the uberjar.

	chmod 755 ~/drake/target/drake
	sudo ln -s ~/drake/target/drake /bin/drake	
	sudo ln -s ~/drake/target/drake.jar /bin/drake.jar

### Python:

Not sure about the exact process here, Carl/Oli should have more info. But something like this.

Intall pip following: https://pip.pypa.io/en/latest/installing.html the gist of which is:

	wget https://bootstrap.pypa.io/get-pip.py
	python get-pip.py

or install python 2.7.9 which inclides pip!

With pip in place:

	pip install virtualenv
	
Create a virtualenv as the drake user:

	cd ~/
	mkdir .envs
	virtualenv .envs/drake
	source .envs/drake/bin/activate
	pip intall tablib drakeutil
	
The last command might look like it's generating errors, but I think things install correctly anyway...

