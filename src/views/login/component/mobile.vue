<template>
    <el-form size="large" class="login-content-form">
        <el-form-item class="login-animation1">
            <el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" clearable autocomplete="off">
                <template #prefix>
                    <el-icon><Phone /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="login-animation2">
            <el-col :span="15">
              <el-input
                text
                placeholder="请输入验证码"
                v-model="state.ruleForm.code"
                clearable
                autocomplete="off"
              >
                <template #prefix>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="8">
              <el-button style="width:100%" @click="getCode" :disabled="countdown > 0">{{countdown > 0 ? `${countdown}秒后重发` : '获取验证码'}}</el-button>
            </el-col>
        </el-form-item>
        <el-form-item class="login-animation3">
          <el-button type="primary" round class="login-content-button" @click="signIn">登录</el-button>
        </el-form-item>
        <div class="login-content-msg login-animation4">* 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式</div>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, computed, defineAsyncComponent, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import { NextLoading } from '@/utils/loading';
import { useUserInfos } from '@/stores/userInfos';
import { useRoutesList } from '@/stores/routesList';

// 定义变量
const router = useRouter()
const route = useRoute()
const storesUserInfos = useUserInfos();
const storeRoutesList = useRoutesList();

let countdown = ref(0)
const state = reactive({
	isShowPassword: false,
	ruleForm: {
		phone: '',
		code: '',
	},
});

//获取验证码
const getCode = async () =>{
  //判断手机号格式
  if(!/^1[3|4|5|7|8][0-9]{9}$/.test(state.ruleForm.phone)){
    ElMessage({ type: 'error', message: '请输入正确格式的手机号码！' })
    return
  }
  countdown.value = 60;
  setInterval(() => {
    countdown.value--
  },1000)
}

//登录
const signIn = async () =>{
  //存储token值到sessionStorage中
  sessionStorage.setItem('token',Math.random().toString(36).substr(0))
    // 存储用户信息到sessionStorage中
  let userInfo = {
    userName: "admin",
    photo: "18888888888",
    userTorole: "admin",
  }
  sessionStorage.setItem('userInfos',JSON.stringify(userInfo))
  storesUserInfos.setUserInfos()
  // 存储并添加动态路由
  storeRoutesList.addRoutesList(router)
  // 登录成功，跳到转首页
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
  if(route.query?.redirect){
    router.push({
      path:<string>route.query.redirect,
      query:Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
    })
  }else{
    router.push('/')
  }
  NextLoading.start()
  ElMessage.success(state.ruleForm.phone+'用户欢迎回来');
}


</script>

<style scoped lang="scss">
.login-content-form{
    margin-top: 20px;
    @for $i from 1 through 4 {
      .login-animation#{$i} {
        opacity: 0;
        animation-name: error-num;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: calc($i/10) + s;
      }
	  }
    .login-content-button{
      width: 100%;
      letter-spacing: 5px;
      font-weight: 300;
      margin-top: 15px;
    }
    .login-content-msg{
      font-size: 12px;
      margin-top: 30px;
      color: #a8abb2;
    }
}

@keyframes error-num {
	0% {
		transform: translateY(60px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

</style>
