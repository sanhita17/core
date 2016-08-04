<?php
    require_once("../global.php");
    $folderArr = scandir(dirname(__file__));
    foreach($folderArr as $folder){
        if($folder !=='.' && $folder !== '..' && is_dir($folder)){
            $cssFolder = scandir(realpath($folder));
            foreach($cssFolder as $cssFile){
                if(strpos($cssFile,'.css')!==false){ ?>
                    <link rel="stylesheet" type="text/css" href="<?php echo "generatedComponents".DIRECTORY_SEPARATOR.$cssFile;?>"/>                             
                <?php }
            }
        }
            
    }