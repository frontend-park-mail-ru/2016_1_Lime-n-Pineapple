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
                            'define(function () { return <%= contents %> ; });', /* присваиваем функцию-шаблон переменной */
                            {data: data}
                        );
                    },
                    livereload: true
                }
            }
        },
        compass: {
            files: {
                expand: true,
                cwd: 'public_html/css',
                src: '*.css',
                dest: 'public_html/js/css'
            },
            options: {
                sassDir: 'public_html/css',
                cssDir: 'public_html/css'
            }
        },
        watch: {//наблюдает за изменениями: true
            fest: {
                files: ['templates/**/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: false,
                    atBegin: true,
                    spawn: false,
                    livereload: true
                }

            },
            compass: {
                files: ['public_html/css/**/*.scss'],
                tasks: ['compass', 'fest'],
                options: {
                    interrupt: true,
                    atBegin: false,
                    spawn: false,
                    livereload: true
                }
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
            target: ['watch', 'compass', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['concurrent']);

};
