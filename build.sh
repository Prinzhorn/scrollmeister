export NODE_PATH='./src'
export NODE_ENV=development

echo "Building development bundle"

./node_modules/.bin/browserify \
	./src/index.js \
	--standalone Scrollmeister \
	-p [ browserify-banner --file ./src/banner.txt ] \
	> ./dist/scrollmeister.js

echo "Building development bundle with extras"

./node_modules/.bin/browserify \
	./src/index-extras.js \
	--standalone Scrollmeister \
	-p [ browserify-banner --file ./src/banner.txt ] \
	> ./dist/scrollmeister-extras.js

export NODE_ENV=production

#Same as above plus tinyify plugin

echo "Building production bundle"

./node_modules/.bin/browserify \
	./src/index.js \
	--standalone Scrollmeister \
	-p tinyify \
	-p [ browserify-banner --file ./src/banner.txt ] \
	> ./dist/scrollmeister.min.js

echo "Building production bundle with extras"

./node_modules/.bin/browserify \
	./src/index-extras.js \
	--standalone Scrollmeister \
	-p tinyify \
	-p [ browserify-banner --file ./src/banner.txt ] \
	> ./dist/scrollmeister-extras.min.js