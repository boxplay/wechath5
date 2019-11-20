<?php
/*
 * 单例数据库连接
 */
class Db {
    private static $_instance;  //static可以保存值不丢失
    private $_dbConnect;
    private $_dbConfig = array(
        'host' => '192.168.99.100',
        'user' => 'web',
        'password' => 'web',
        'database' => 'web',
        'port' => '3306'
    );//保存数据库的配置信息

    //使用private防止用户new
    private function __construct(){
        self::connect();
    }

    //重写clone防止用户进行clone
    private function __clone(){
        //当用户clone操作时产生一个错误信息
        trigger_error("Can't clone object",E_USER_ERROR);
    }
    //由类的自身来进行实例化
    public static function getInstance(){
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function connect(){
        $this->_dbConnect = mysqli_connect($this->_dbConfig['host'],
            $this->_dbConfig['user'],$this->_dbConfig['password'],$this->_dbConfig['database'],$this->_dbConfig['port']);

        if(!$this->_dbConnect){
            throw new Exception("mysql connect error".mysqli_connect_error());
            //die("mysql connect error".mysql_error());
        }
        mysqli_query($this->_dbConnect,"SET NAMES UTF8");
    }
    public function query($sql){
        $res = mysqli_query($this->_dbConnect,$sql);
        return $res;
    }
    public function destroyDb(){
        mysqli_close($this->_dbConnect);
    }
}
