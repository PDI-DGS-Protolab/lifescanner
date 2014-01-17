# use the ubuntu latest image provided by dotCloud
FROM ubuntu:precise

MAINTAINER inLabFIB inlab-ulab@fib.upc.edu

# make sure the package repository is up to date
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update

# install the app requirements

# install python
RUN apt-get install -y build-essential
RUN apt-get install -y libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

RUN apt-get install -y python-software-properties
RUN add-apt-repository ppa:fkrull/deadsnakes
RUN apt-get update
RUN apt-get install python2.7

RUN apt-get install -y python-pip

# install django 1.5.2
RUN pip install django==1.5.2

# install git & download project
RUN apt-get install -y git-core
RUN git clone https://github.com/PDI-DGS-Protolab/live_scanner

# setup database and start app
ENTRYPOINT cd live_scanner && python manage.py syncdb --noinput && echo $VARIABLE && python manage.py runserver 0.0.0.0:8000

