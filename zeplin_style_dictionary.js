const build_SCSS = () => {
  const StyleDictionary = require('style-dictionary').extend({
    source: ['zeplin_tokens/design_tokens.json'],
    platforms: {
      scss: {
        transformGroup: 'zeplin-scss',
        buildPath: 'build/scss/',
        files: [{
          destination: 'zeplin.scss',
          format: 'scss/variables'
        }]
      }
    }
  });

  // Zeplin to SCSS
  StyleDictionary.registerTransform({
    name: 'text_styles',
    type: 'value',
    matcher: function(prop) {
      return prop.path[0] === 'text_styles';
    },
    transformer: function(prop) {
      return `'${prop.value.font.family}'`;
    }
  });

  StyleDictionary.registerTransformGroup({
    name: 'zeplin-scss',
    transforms: ["text_styles"]
  });

  StyleDictionary.buildPlatform('scss');
}

const build_Flutter = () => {
  const StyleDictionary = require('style-dictionary').extend({
    source: ['zeplin_tokens/design_tokens_pascal.json'],
    platforms: {
      flutter: {
        transformGroup: 'zeplin-flutter',
        buildPath: 'build/flutter/',
        files: [{
          destination: 'zeplin.dart',
          format: 'flutter/class.dart',
          className: 'ZeplinStyleDictionary'
        }]
      }
    }
  });

  // Zeplin to Flutter
  StyleDictionary.registerTransform({
    name: 'text_styles',
    type: 'value',
    matcher: function(prop) {
      return prop.path[0] === 'text_styles';
    },
    transformer: function(prop) {
      const {
        value: { font }
      } = prop;
      return `TextStyle(
        fontFamily: '${font.family}',
        fontSize: ${font.size},
        fontWeight: FontWeight.w${font.weight},
      )`;
    }
  });

  StyleDictionary.registerTransform({
    name: 'colors',
    type: 'value',
    matcher: function(prop) {
      return prop.path[0] === 'colors';
    },
    transformer: function(prop) {
      const {
        value
      } = prop;
      return value.replace('rgb', 'Color.fromRGBO').replace(')', ', 1)');
    }
  });

  StyleDictionary.registerTransformGroup({
    name: 'zeplin-flutter',
    transforms: ["text_styles", "colors"]
  });

  StyleDictionary.buildPlatform('flutter');
}

build_SCSS();
build_Flutter();
