/**
 * 输出帮助信息
 */

module.exports = {
  'default':      'default task.runs a sequence of task: clean,sprite,sass,coffee,template,template:client,sync',
  'clean':        'clean dist/',
  'sprite':       'generate sprite image and _sprite.scss',
  'sprite:watch': 'watch and generate sprite images',
  'svgSprite':    'generate svg sprite',
  'svgSprite:watch': 'watch and generate svg sprite',
  'iconfont':     'generate svg iconfont',
  'iconfont:watch': 'watch and generate svg iconfont',
  'sass':       'compile *.scss',
  'sass:watch': 'watch and compile *.scss',
  'coffee':     'compile *.coffee',
  'js':         'compile *.js with babel',
  'coffee:watch': 'watch and compile *.coffee',
  'js:watch':   'watch and compile *.js',
  'template':   'compile *.jade to *.html',
  'sync':       'copy static files to dist/',
  'sync:watch':   'watch and copy static files to dist/',
  'template:client': 'compile browser templates by jade',
  'template:watch':  'watch and compile templates by jade',
  'info':       'show environment detail',
  'server':     'start dev server',
  'watch':      'watch and exec all sources'
}
