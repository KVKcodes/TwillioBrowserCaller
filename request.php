<?php
header('Content-type: text/xml');
?>
<Response>
    <Dial callerId="+14706605983"><?php  echo $_POST['To'];?></Dial>
</Response>