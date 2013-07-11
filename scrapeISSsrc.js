(function(){
    var w = window.open("about:blank","attitudeData","width=1048,height=800,scrollbars=yes");

    attitude = {
        yaw : $('span [field=USLAB000YAW]'),
        yawcmd : $('span [field="USLAB00CYAW"]'),

        pitch : $('span [field=USLAB000PIT]'),
        pitchcmd : $('span [field="USLAB00CPIT"]'),

        roll : $('span [field=USLAB00ROLL]'),
        rollcmd : $('span [field="USLAB0CROLL"]')
    }

    var lastrow = ""; // last row written to database
    var buffrowJSON = {}; // "temporary" row before written to database

    function grabRow() {
        var date = new Date();
        var row = {
            date: date.getUTCFullYear() + leadzero(date.getUTCMonth()+1) + leadzero(date.getUTCDate()),
            time: leadzero(date.getUTCHours()) + leadzero(date.getUTCMinutes()) + leadzero(date.getUTCSeconds()),
        }

        for (var key in attitude) {
            if (key != "date" && key != "time") {
                num = attitude[key].text().trim();
                if (isNaN(num) || !num) {
                    num = -999;
                    return;
                }
                row[key] = num;
            }
        }

        return row;
    }

    function addRow() {
        newrowJSON = grabRow();
        if (!newrowJSON) return; // if undefined row was returned, stop now
        newrow = conv2Table(newrowJSON);
        buffrow = conv2Table(buffrowJSON);

        if ($.isEmptyObject(buffrowJSON) || buffrowJSON.time == newrowJSON.time) {
            // still in the same second
            $.extend(buffrowJSON,newrowJSON);
            return "buffrow = " + JSON.stringify(buffrowJSON) + ", nothing written to database";
        } else if (buffrow != lastrow) { // we have moved onto a new second, and we are not writing the same data
            insertRow(buffrowJSON);
            $(w.document.getElementsByTagName("tr")).last().after(buffrow); //print to window
            lastrow = buffrow;
            buffrowJSON = {};
        }
    }

    function insertRow(row) { // insert into database
        $.post("http://localhost/iss/addentry.php", row, null, "json");
    }
    function conv2Table(obj) {
        var rowdata = "<tr>";
        for (var key in obj) {
            rowdata += "<td>" + obj[key] + "</td>";
        }
        rowdata += "</tr>"
        return rowdata;
    }
    function areEqual(o1, o2) {
        for (var key in o1) {
            if (key != "time" && o1[key] != o2[key]) {
                return false;
            }
        }
        return true;
    }
    function leadzero(num) {
        return num < 10 ? "0" + num : "" + num;
    }

    var tablehtml='<table border="1"><tr><th>Date</th><th>Time(UTC)</th><th>Current Yaw</th><th>Commanded Yaw</th><th>Current Pitch</th><th>Commanded Pitch</th><th>Current Roll</th><th>Commanded Roll</th></tr></table>';

    $(w.document.body).html(tablehtml);

    addRow();

    for (var key in attitude) {
        attitude[key].bind('DOMSubtreeModified', function() {
            addRow();
        });
    }
})();

// USLAB000YAW USLAB000PIT USLAB00ROLL USLAB00CYAW USLAB00CPIT USLAB0CROLL USLAB000024 USLAB000023 USLAB000022 USLAB000027 USLAB000026 USLAB000025 USLAB000008 USLAB000007 USLAB000006

