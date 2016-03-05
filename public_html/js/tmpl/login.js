define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}__fest_buf+=("<style type=\"text\/css\">\/* line 3, login.scss *\/\n.js-form__login {\n  margin-top: 5px;\n}\n\/* line 7, login.scss *\/\n.js-form__login .panel .panel-body \u003E .form-group {\n  margin-top: 10px;\n}\n\/* line 10, login.scss *\/\n.js-form__login .panel .panel-body \u003E .form-group \u003E .input-group {\n  padding-bottom: 20px;\n}\n\/* line 14, login.scss *\/\n.js-form__login .panel .panel-body \u003E .sign_up_here {\n  border-top: 1px solid #baaaaa;\n  padding-top: 10px;\n  font-size: 85%;\n}\n</style><div class=\"js-form__login center-block text-center\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Sign In</div></div><div class=\"panel-body\"><div style=\"display:none\" id=\"login-alert\" class=\"alert alert-danger col-sm-12\"></div><form id=\"loginform\" class=\"form-horizontal form-group\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span><input id=\"login-username\" type=\"login\" class=\"form-control\" name=\"username\" value=\"\" placeholder=\"email\" required=\"required\"/></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span><input id=\"login-password\" type=\"password\" value=\"\" class=\"form-control\" name=\"password\" placeholder=\"Your magical password\" required=\"required\" pattern=\".{3,}\"/></div><div class=\"form-group\"><div class=\"col-sm-12 controls\"><button id=\"btn-login\" type=\"submit\" class=\"btn btn-success\" style=\"text-decoration: none\">Login</button></div></div><div class=\"form-group\"><div class=\"col-md-12 control\"><div class=\"sign_up_here\">Don\'t have an account? <a class=\"link control\" href=\"#\">Sign up here!</a></div></div></div></form></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });