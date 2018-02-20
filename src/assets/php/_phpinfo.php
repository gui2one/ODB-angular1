

<?php
/// php version ODB server --> PHP Version 5.3.2-1ubuntu4.26

//// php version pi server  --> PHP Version 5.6.30-0+deb8u1

// Show all information, defaults to INFO_ALL



// ini_set(session.upload_progress.enabled, 'TRUE');
echo(ini_get("session.upload_progress.enabled"));
echo($_POST[ini_get("session.upload_progress.name")]);
phpinfo();

?>