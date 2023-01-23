<?php
     
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: PUT, GET, POST");
     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
         
     // Folder Path For Ubuntu
     // $folderPath = "/var/www/my-app/uploads";
     // Folder Path For Window
     $folderPath = "../../public/imagenes";
     
     $file_tmp = $_FILES['file']['tmp_name'];
   //   $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
     $file_ext = "jpg";
     $file = $folderPath . uniqid() . '.'.$file_ext;
     move_uploaded_file($file_tmp, $file);
     $timeofupload = floor(microtime(true));
     rename($file, "$folderPath/$timeofupload.$file_ext");
   //   error_log("\n Nueva llamada a log:".." \n ",3,"/logsnico.txt");
   echo "$timeofupload.$file_ext";
   return json_encode(['status'=>true]);
 ?>