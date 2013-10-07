//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        function decToBin(number, len) {
            len = len || 8;
            var bin = number.toString(2);
            var pad = "";
            for (var i = len; i > bin.length; i--){
                pad += "0"
            }
            return pad + bin;
        }


        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }

            var $table = $content.find(".explanation").find("table");
            var binA = decToBin(checkioInput[0]);
            var binB = decToBin(checkioInput[1]);
            var $first = $table.find(".first");
            var $second = $table.find(".second");
            var $xor = $table.find(".xor");
            $first.append($("<td>").text(checkioInput[0] + " = "));
            $second.append($("<td>").text(checkioInput[1] + " = "));
            $xor.append($("<td>").text("H = "));
            for (var i = 1; i < binA.length; i++) {
                $first.append($("<td>").text(binA[i]));
                $second.append($("<td>").text(binB[i]));
                if (i < binA.length - 1) {
                    $xor.append($("<td>").text(binB[i] == binA[i] ? "0+" : "1+"));
                }
                else {
                    $xor.append($("<td>").text(binB[i] == binA[i] ? "0" : "1"));
                }

            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
//
        ext.set_console_process_ret(function (this_e, ret) {
            $tryit.find(".checkio-result-in").html("Your Result: " + ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));

            var $first = $tryit.find(".first");
            var $second = $tryit.find(".second");

            function changeRow(e) {
                var $this = $(this);
                var v = parseInt($this.val());
                if (!v || isNaN(v)) {
                    v = 1;
                }
                else if (v > 255) {
                    v = 255;
                }
                $this.val(v);
                var binV = decToBin(v);
                var $row = $tryit.find("tr." + $this.attr("class")).find("td");
                for (var i = 0; i < binV.length; i++){
                    $($row[i + 2]).html(binV[i]);
                }
                return false;
            }
            $tryit.find("input[type=number]").change(changeRow);
            $tryit.find("input[type=number]").keyup(changeRow);



            $tryit.find('.bn-check').click(function (e) {
                var data = [
                    parseInt($tryit.find("input.first").val()),
                    parseInt($tryit.find("input.second").val()),
                ];
                this_e.sendToConsoleCheckiO(data);
                e.stopPropagation();
                return false;
            });

        });

    }
);
