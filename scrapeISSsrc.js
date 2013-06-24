(function(){
    var w = window.open("about:blank","attitudeData","width=1048,height=800,scrollbars=yes");
    var lastrow = "";

    attitude = {
        yaw : $('span [field=USLAB000YAW]'),
        yawcmd : $('span [field="USLAB00CYAW"]'),

        pitch : $('span [field=USLAB000PIT]'),
        pitchcmd : $('span [field="USLAB00CPIT"]'),

        roll : $('span [field=USLAB00ROLL]'),
        rollcmd : $('span [field="USLAB0CROLL"]')
    }

    function makeRow() {
        var date = new Date();

        var rowdata="<tr><td>" + date.getUTCFullYear() + leadzero(date.getUTCMonth()+1) + leadzero(date.getUTCDate()) + "</td><td>" + leadzero(date.getUTCHours()) + leadzero(date.getUTCMinutes()) + leadzero(date.getUTCSeconds()) + "</td>";

        for (var key in attitude) {
            num = attitude[key].text().trim();
            if (isNaN(num) || num == "") {  yyy
                num = -999;
            }
            rowdata += "<td>" + num + "</td>";
        }

        rowdata += "</tr>";
        return rowdata;
    }

    function addRow() {
        newrow = makeRow();
        if (newrow != lastrow) {
            // Prevents duplicate rows
            $(w.document.getElementsByTagName("tr")).last().after(newrow); //print to window
            insertRow(newrow);
            lastrow = newrow;
        }
    }

    function insertRow(row) { // insert into database
        $.post("http://localhost/iss/addentry.php", row, function(data) { console.log(data); }, "json");
    }

    function leadzero(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return "" + num;
        }
    }

    var tablehtml='<table border="1"><tr><th>Date</th><th>Time(UTC)</th><th>Current Yaw</th><th>Commanded Yaw</th><th>Current Pitch</th><th>Commanded Pitch</th><th>Current Roll</th><th>Commanded Roll</th></tr><tr>' + makeRow() + '</tr></table>';

    $(w.document.body).html(tablehtml);

    for (var key in attitude) {
        attitude[key].bind('DOMSubtreeModified', function() {
            addRow();
        });
    }
})();

// USLAB000YAW USLAB000PIT USLAB00ROLL USLAB00CYAW USLAB00CPIT USLAB0CROLL USLAB000024 USLAB000023 USLAB000022 USLAB000027 USLAB000026 USLAB000025 USLAB000008 USLAB000007 USLAB000006

