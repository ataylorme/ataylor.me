#!/bin/bash

# Install dependencies with npm
NPM_FOUND=`which npm`
if [ ! -x "$NPM_FOUND" ]; then
	echo -e "\nError: executable npm not found on path"
	exit 1
fi
if [ ! -f ./package.json ]; then
	echo -e "\nError: package.json not found"
	exit 1
fi

echo -e "\nRunning npm install"
npm install

# Build site with gatsby
GATSBY_FOUND=`which gatsby`
if [ ! -x "$GATSBY_FOUND" ]; then
	echo -e "\nError: executable gatsby not found on path"
	exit 1
fi
if [ ! -f ./gatsby-config.js ]; then
	echo -e "\nError: gatsby-config.js not found"
	exit 1
fi

echo -e "\nRunning gatsby build --prefix-paths"
gatsby build --prefix-paths
