<template>

</template>

<script>
export default {
  name: "mainCheck",
  created() {
    //验证登录态，决定跳转登录还是首页？
    let userid = this.$Cookie.get("userId");
    console.log(userid)
    if(!userid){
        this.$router.push("/login");
    }else{
        this.$router.push('/home');
    }
    
  }
};
</script>

<style scoped>
</style>
