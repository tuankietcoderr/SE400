#!/bin/sh

cd booking-mf && gnome-terminal -- npm start
cd ../payment-mf && gnome-terminal -- npm start
cd ../marketing-mf && gnome-terminal -- npm start
cd ../user-profile-mf && gnome-terminal -- npm start
cd ../review-mf && gnome-terminal -- npm start
cd ../container && gnome-terminal -- npm start