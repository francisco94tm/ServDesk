<?php
    include_once("classes/xlsxwriter.class.php");
    include_once("classes/system.class.php");
    
    $system = new System(); 
    $obj = [ 'table' => 'request' ];
    $data = $system->getReport(); 
 
    $header = [
        'ID'                => 'integer',
        'ASUNTO'            => 'string',
        'DESCRIPCIÓN'       => 'string',
        'TIPO DE CASO'      => 'string',
        'CLIENTE'           => 'string',
        'RESPONSABLE'       => 'string',
        'MEDIO DE REGISTRO' => 'string',
        'AGENTE DE AMENAZA' => 'string',
        'INFRAESTRUCTURA'   => 'string',
        'ESTADO'            => 'string',
        'FECHA DE REGISTRO' => 'string',
        'FECHA DE ATENCIÓN' => 'string',
        'FECHA DE SOLUCIÓN' => 'string',
        'SOLUCIÓN'          => 'string',
        'AGENTE REAL DE AMENAZA' => 'string',
        'ATENDIDO POR'      => 'string' 
    ];  

    $writer = new XLSXWriter(); 
    
    
    $col_options = [
        // Cols width ---
        'widths'=>[5,20,30,13,25,25, 18,20,30,12,18,18,18,25, 30, 20], 

        // Header format ----
        'height'=>[60],
        'font'=>'Calibri',
        'font-size'=>10, 
        'freeze_rows'=>true,
        'fill'=>"#7C0040", 
        'valign'=>"center", 
        'halign'=>"center", 
        'color'=>"#ffffff", 
        'font-style'=>"bold"
    ];

    // Cols format ---------
    $row_options = [
        'font'=>'Calibri',
        'font-size'=>10.5,
        'height'=>15,
        'valign'=>"center",
        'halign'=>"left",
    ];

    $writer->writeSheetHeader('Casos', $header, $col_options);
    foreach($data as $index => $row){
        if($index%2 == 0) $row_options['fill'] = "#ffffff";
        else $row_options['fill'] = "#dddddd";
        $writer->writeSheetRow('Casos', $row,  $row_options);
    } 

    // Set metadata and download --------------------------------------------

    date_default_timezone_set('America/Mexico_City');
    $date = date('Y_m_d___h_i_s', time());
    $filename = '__temp__/ServDesk___'.$date.'.xlsx';
    $writer->writeToFile($filename);   

    if (file_exists($filename)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename='.basename($filename));
        header("Content-Transfer-Encoding: binary");
        header("Expires: 0");
        header("Pragma: public");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
        header('Content-Length: ' . filesize($filename));
        readfile($filename);   
        unlink($filename);
        exit; 
    } 
?>