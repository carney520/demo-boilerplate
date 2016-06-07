module.exports = {
  default: 'default task.runs a sequence of task: clean,sprite,sass,coffee,template,template:client,sync',
  clean:    'clean dist/',
  sprite:   'generate sprite image and _sprite.scss',
  'sprite:watch': 'watch and generate sprite images',
  sass:     'compile *.scss',
  'sass:watch': 'watch and compile *.scss',
  coffee:   'compile *.coffee',
  'coffee:watch': 'watch and compile *.coffee',
  template: 'compile *.jade',
  sync:     'copy static files to dist/',
  'sync:watch':   'watch and copy static files to dist/',
  'template:client': 'compile browser templates by jade',
  'template:watch':  'watch and compile templates by jade',
  info:     'show environment detail',
  server:   'start dev server',
  watch: 'watch and exec all sources'
};
