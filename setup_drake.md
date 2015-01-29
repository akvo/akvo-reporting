## Installing drake and python for ReportServer

### Drake

Simplest way to setup drake is to download the latest drake.jar from the [github repo](https://github.com/Factual/drake) and create a small bash script to be able to run it from anywhere.

	sudo wget -O /usr/local/bin/drake.jar https://github.com/Factual/drake/releases/download/v0.1.6/drake.jar
	sudo chmod 755 /usr/local/bin/drake.jar

Create a file ```/usr/local/bin/drake``` and enter:

	#!/bin/bash
	java -cp /usr/local/bin/drake.jar drake.core "$@"

Finally set the perms on the file: 

	sudo chmod 755 /usr/local/bin/drake.jar

### Python:

Not sure about the exact process here, Carl/Oli should have more info. But something like this.

Intall pip following: https://pip.pypa.io/en/latest/installing.html the gist of which is:

	wget https://bootstrap.pypa.io/get-pip.py
	python get-pip.py

or install python 2.7.9 which inclides pip!

With pip in place:

	pip install virtualenv
	
Create a virtualenv as the user intended to run drake:

	cd ~/
	mkdir .envs
	virtualenv .envs/drake
	source .envs/drake/bin/activate
	pip intall tablib drakeutil
	
The last command might look like it's generating errors, but I think things install correctly anyway...

