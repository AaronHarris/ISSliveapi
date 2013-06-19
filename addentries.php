<?php
    $host   =   "localhost"  ;
    $user   =   "root"  ;
    $pass   =   ""  ;
    $db   =   "issdata"  ;
       
    $link  =  mysql_connect ( $host ,  $user ,  $pass );
    if (! $link ) {
        die( 'Could not connect: '  .  mysql_error ());
    }
  
    $db_selected  =  mysql_select_db ( $db ,  $link );
    if (! $db_selected ) {
        die ( 'Can\'t use $db : '  .  mysql_error ());
    }
  
    $params = $_POST;
    $cols = array('date','time','yaw','yawcmd','pitch','pitch','pitchcmd','roll','rollcmd');
    foreach ($cols as $col) {
    	$$col = $params[$col];
    }

    //$created_at = date("Y-m-d H:i:s");
    // INSERT INTO `issdata`.`attitude` (`date`, `time`, `yaw`, `yawcmd`, `pitch`, `pitchcmd`, `roll`, `rollcmd`) VALUES ('20130619', '150238', '-5.79', '-6.00', '-1.57', '-2.30', '0.17', '0.60');

  
    $query = sprintf("INSERT INTO `issdata`.`attitude` (`date`, `time`, `yaw`, `yawcmd`, `pitch`, `pitchcmd`, `roll`, `rollcmd`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        mysql_real_escape_string($date),
        mysql_real_escape_string($time),
        mysql_real_escape_string($yaw),
        mysql_real_escape_string($yawcmd),
        mysql_real_escape_string($pitch),
        mysql_real_escape_string($pitchcmd),
        mysql_real_escape_string($roll),
        mysql_real_escape_string($rollcmd),
        );
      
    $success = mysql_query($query);
  
    if ($success) {
    	echo 'success';
        // header( 'Location: addmany.php' ); redirect
        exit;
    } else {
    	echo 'failure';
    }
  
?>