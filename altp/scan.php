<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta  name="robots" content="noindex, nofollow" />
<title>Scan Shell</title>
<style>body {background-color: black;}</style>
<head>
<body>
<center><form action="<?=$_SERVER['PHP_SELF']?>" method="get" autocomplete="on" name="form">
<input style="background-color: white;width: 270px;border: 1px solid #424242;border-radius: 5px;color: #333;margin-top: 5px;padding: 5px;" type="text" value="" id="search" name="search" placeholder="Nhập từ khoá cần tìm..."><input style="background-color: #F7DF2B;
font-weight: 700;padding: 5px 15px;border: 1px solid #424242;border-radius: 5px;color: #333;margin-top: 5px;" name="submit" type="submit" value="Tìm kiếm">
</form>
</center>
<div style="text-align: center;"><font color="#fffffff">
Từ khoá mẫu:
<a href="<?=$_SERVER['PHP_SELF']?>?search=eval(base64_decode" title="Tìm eval(base64_decode"><font color="#00EE00">eval(base64_decode</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=base64_decode" title="Tìm base64_decode"><font color="#00EE00">base64_decode</a></font> ||
<a href="<?=$_SERVER['PHP_SELF']?>?search=symlink" title="Tìm symlink"><font color="#00EE00">symlink</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=sym/root" title="Tìm sym/root"><font color="#00EE00">sym/root</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=etc/" title="Tìm etc/"><font color="#00EE00">etc/</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=IyEvdX" title="Tìm IyEvdX"><font color="#00EE00">IyEvdX</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=safe_mode" title="Tìm safe_mode"><font color="#00EE00">safe_mode</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=perl" title="Tìm perl"><font color="#00EE00">perl</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=r57" title="Tìm r57"><font color="#00EE00">r57</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=c99" title="Tìm c99"><font color="#00EE00">c99</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=phpinfo" title="Tìm phpinfo"><font color="#00EE00">phpinfo</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=cmd" title="Tìm cmd"><font color="#00EE00">cmd</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=shell" title="Tìm shell"><font color="#00EE00">shell</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=hack" title="Tìm hack"><font color="#00EE00">hack</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=check" title="Tìm check"><font color="#00EE00">check</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=@getmyuid" title="Tìm @getmyuid"><font color="#00EE00">@getmyuid</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=@php_uname" title="Tìm @php_uname"><font color="#00EE00">@php_uname</a></font>
<!--
<a href="<?=$_SERVER['PHP_SELF']?>?search=eval(gzinflate(base64_decode(" title="Tìm evaleval(gzinflate(base64_decode("><font color="00EE00">eval(gzinflate(base64_decode(</a></font> || 
<a href="<?=$_SERVER['PHP_SELF']?>?search=/etc/passwd" title="Tìm /etc/passwd/"><font color="$00EE00">/etc/passwd</a></font> || 
-->
</div><hr/><div style="font: normal 12px/2.4em Menlo, 'Andale Mono', 'Courier New', sans-serif;"><? error_reporting(NULL);header("Content-Type: text/html; charset=utf-8");find_files('.');function find_files($seed){if(! is_dir($seed)) return false;$files = array();$dirs = array($seed);while(NULL !== ($dir = array_pop($dirs))){if($dh = opendir($dir)){while( false !== ($file = readdir($dh))){if($file == '.' || $file == '..') continue;$path = $dir . '/' . $file;if(is_dir($path)) {    $dirs[] = $path; }else { if(preg_match('/^.*\.(php[\d]?|txt)$/i', $path)) { check_files($path); }}}closedir($dh);}}}function check_files($this_file){$str_to_find = $_GET['search'];if(!($content = file_get_contents($this_file))){echo("<p>Chú ý: Không thể kiểm tra <a href=\"$this_file\" target=\"_blank\"  style=\"color: red;\" title=\"Xem $this_file\">$this_file</a></p>\n");}else{if(stristr($content, $str_to_find)){echo("<p>Phát hiện <a href=\"$this_file\" target=\"_blank\"  style=\"color: red;\" title=\"Xem $this_file\">$this_file</a> -> Có chứa từ khoá <i style=\"color: #2E577A;\" >$str_to_find</i> Nhấn <a href=\"$this_file\" target=\"_blank\"  style=\"color: red;\" title=\"Xem $this_file\">vào đây</a> để kiểm tra</p>\n");}}unset($content);}?></div>
<hr>
</font>
</body>
</html>