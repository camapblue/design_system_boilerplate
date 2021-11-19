upToDate:
	node zeplin_design_tokens.js
	style-dictionary build
	node zeplin_style_dictionary.js
	cp -rf ./build/scss/styles.scss ./src
	cp -rf ./build/scss/zeplin.scss ./src
