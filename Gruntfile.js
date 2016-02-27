//noinspection JSUnresolvedVariable
module.exports = function (grunt) {

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        shell: { // для запуска 8080 своими командами
            dev: {
                command: 'node server'
            },
            options: {
                stdout: true,
                stderr: true
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates', // исходная директория
                    src: '*.xml', // имена шаблонов
                    dest: 'public_html/js/tmpl' // результирующая директория
                }],
                options: {
                    template: function (data) { /* задаем формат функции-шаблона */

                        return grunt.template.process(
<<<<<<< HEAD
                            'var <%= name %>Tmpl = <%= contents %> ;', /* присваиваем функцию-шаблон переменной */
=======
                            'define(function () { return <%= contents %> ; });',
>>>>>>> cc4e5c046ae79fdbb5bb75c13f41453a61b2d838
                            {data: data}
                        );
                    }
                }
            }
        },
        watch: {//наблюдает за измененинями
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true,
                    spawn: false,
                },
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true //подгрузка изменений в реальном времени
                }
            }
        },
        concurrent: { // запускает shell and watch
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }
    });

<<<<<<< HEAD
    require('load-grunt-tasks')(grunt);
=======
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('test', ['qunit:all']);
>>>>>>> cc4e5c046ae79fdbb5bb75c13f41453a61b2d838
    grunt.registerTask('default', ['concurrent']);

};
