<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
body{
  font-size:14px;
  // background:#dedede;
  margin:0px;
  padding:0px;
}
.el-table th>.cell{
  text-align:center;
}
a{
  color:#fff;
  text-decoration:none;
}
.main .el-form-item{
  float:left
}
.el-select .el-input__inner {
    cursor: pointer;
    padding-right: 15px; 
}
.el-date-editor--date .el-input__inner{
  padding-right:0px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100%;
}
.titleinfo{
    text-align: left;
    padding: 10px 0px;
    font-size:20px;
}

</style>
